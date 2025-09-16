// app/api/sheets/[sheetId]/route.js

import { NextResponse } from 'next/server';

// La route dynamique [sheetId] est passée via le paramètre 'params'
export async function GET(request, context) {
  // Correction Next.js : params doit être awaité
  const params = context?.params ? await context.params : {};
  const { sheetId } = params;
  const { searchParams } = new URL(request.url);
  const sheetName = searchParams.get('sheetName') || 'Feuille1';

  // Utilise l'URL gviz pour obtenir un JSON "parseable"
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=${sheetName}`;

  try {
    const response = await fetch(url);
    const text = await response.text();

    // Nettoyage et parsing du JSON Google Sheets (format gviz)
    const jsonStart = text.indexOf('{');
    const jsonEnd = text.lastIndexOf('}') + 1;
    if (jsonStart === -1 || jsonEnd === -1) throw new Error('Réponse Google Sheets non reconnue');
    const jsonText = text.substring(jsonStart, jsonEnd);
    let data;
    try {
      data = JSON.parse(jsonText);
    } catch (err) {
      throw new Error('Erreur de parsing JSON Google Sheets');
    }


    // Colonnes attendues
    const expectedColumns = ["name", "title", "link", "snippet", "envoi_message"];
    let columns = data.table.cols.map(col => col.label);
    // Si les labels sont vides ou incorrects, on force les bons noms
    const allLabelsEmpty = columns.every(label => !label || label.trim() === "");
    if (allLabelsEmpty || columns.length !== expectedColumns.length) {
      columns = expectedColumns;
    }

    const rows = data.table.rows.map(row => {
      const rowData = {};
      expectedColumns.forEach((col, index) => {
        const cell = row.c[index];
        rowData[col] = cell && cell.v !== null ? cell.v : '';
      });
      return rowData;
    });

    return NextResponse.json(rows);

  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
    return NextResponse.json({ error: 'Échec de la récupération des données.' }, { status: 500 });
  }
}
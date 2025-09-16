// app/api/sheets/[sheetId]/route.js

import { NextResponse } from 'next/server';

// La route dynamique [sheetId] est passée via le paramètre 'params'
export async function GET(request, { params }) {
  const { sheetId } = params;
  const { searchParams } = new URL(request.url);
  const sheetName = searchParams.get('sheetName') || 'Feuille1';

  // L'URL de l'API de Google reste la même
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=${sheetName}`;

  try {
    const response = await fetch(url);
    const text = await response.text();
    
    // Nettoyage et parsing du JSON
    const jsonText = text.substring(text.indexOf('{'), text.lastIndexOf('}') + 1);
    const data = JSON.parse(jsonText);

    // Formatage des données
    const columns = data.table.cols.map(col => col.label);
    const rows = data.table.rows.map(row => {
      const rowData = {};
      row.c.forEach((cell, index) => {
        if (cell && cell.v !== null) {
          rowData[columns[index]] = cell.v;
        }
      });
      return rowData;
    });

    return NextResponse.json(rows);

  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
    return NextResponse.json({ error: 'Échec de la récupération des données.' }, { status: 500 });
  }
}
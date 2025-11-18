// app/api/sheets/[sheetId]/route.js

import { NextResponse } from 'next/server';

// La route dynamique [sheetId] est passée via le paramètre 'context.params'
export async function GET(request, context) {
  const { sheetId } = context.params;
  const { searchParams } = new URL(request.url);
  const sheetName = searchParams.get('sheetName') || 'Feuille1';

  // Utilise l'URL gviz pour obtenir un JSON "parseable"
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=${sheetName}`;

  try {
    const response = await fetch(url, {
      // Ajout d'un timeout pour éviter les attentes indéfinies
      signal: AbortSignal.timeout(30000), // 30 secondes
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP de Google: ${response.status} ${response.statusText}`);
    }

    const text = await response.text();

    // Nettoyage et parsing plus robustes du JSON Google Sheets (format gviz)
    const match = text.match(/google\.visualization\.Query\.setResponse\((.*)\)/s);
    if (!match || !match[1]) {
      console.error("Réponse inattendue de Google Sheets:", text.substring(0, 500));
      throw new Error("La réponse de Google Sheets n'est pas au format JSON attendu. Vérifiez les permissions du document.");
    }

    const jsonText = match[1];
    let data;
    try {
      data = JSON.parse(jsonText);
    } catch (err) {
      console.error("Erreur de parsing JSON:", err);
      console.error("Texte JSON qui a échoué:", jsonText.substring(0, 500));
      throw new Error('Erreur de parsing du JSON fourni par Google Sheets.');
    }

    // Vérifier si la réponse contient bien une table
    if (!data.table || !data.table.cols || !data.table.rows) {
        throw new Error("Le JSON de Google Sheets ne contient pas de données de table valides.");
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
      // S'assurer que row.c existe et est un tableau
      if (row && Array.isArray(row.c)) {
        expectedColumns.forEach((col, index) => {
          const cell = row.c[index];
          rowData[col] = cell && cell.v !== null ? cell.v : '';
        });
      }
      return rowData;
    });

    return NextResponse.json(rows);

  } catch (error) {
    console.error('Erreur lors de la récupération des données Google Sheets:', error.message);
    return NextResponse.json({ error: `Échec de la récupération des données: ${error.message}` }, { status: 500 });
  }
}
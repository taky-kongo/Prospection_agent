import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const boardId = process.env.MONDAY_BOARD_ID;
  const token = process.env.MONDAY_API_TOKEN;

  if (!boardId || !token) {
    return NextResponse.json({ error: "Les variables d'environnement MONDAY ne sont pas configurées." }, { status: 500 });
  }

  const query = `
    query GetProspectionPage($boardId: ID!, $limit: Int) {
      boards(ids: [$boardId]) {
        id
        name
        items_page(limit: $limit) {
          cursor
          items {
            id
            name
            column_values {
              id
              text
              value
            }
          }
        }
      }
    }
  `;

  const variables = {
    boardId: parseInt(boardId), // Assurez-vous que l'ID est un nombre si nécessaire
    limit: 200,
  };

  try {
    const response = await fetch("https://api.monday.com/v2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
      },
      body: JSON.stringify({ query, variables }),
      // Important pour Next.js pour ne pas mettre en cache les appels API
      cache: 'no-store', 
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Erreur de l'API Monday:", errorBody);
      return NextResponse.json({ error: "Réponse invalide de l'API Monday", details: errorBody }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error: any) {
    console.error("Erreur interne lors de l'appel à l'API Monday:", error);
    return NextResponse.json({ error: "Erreur interne du serveur", details: error.message }, { status: 500 });
  }
}
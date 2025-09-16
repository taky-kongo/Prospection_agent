'use client';

import { LogEntry, generateFakeLog, Prospect as ProspectType } from '@/lib/fakeData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useState } from 'react';



// On rend les champs link et email optionnels pour la compatibilité
type UnifiedProspect = ProspectType & { link?: string; email?: string };

export function RealTimeLog({ searchStarted, searchResults, isLoading }: { searchStarted: boolean, searchResults: UnifiedProspect[], isLoading: boolean }) {

  return (
    <Card className="h-130 overflow-y-auto">
      <CardHeader>
        <CardTitle className="text-lg">Profils correspondants</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        {!searchStarted && (
          <p className="text-gray-500 italic text-center">
            Lancez une recherche pour voir les résultats ici... 🔎
          </p>
        )}

        {searchStarted && searchResults.length === 0 && (
          <p className="text-gray-500 italic text-center">
            Recherche en cours ou aucun résultat trouvé.
          </p>
        )}

        {isLoading && searchResults.length === 0 ? (
          <p className="text-gray-500 italic">Lancement de la recherche en cours...</p>
        ) : (
          searchResults.length > 0 && (
            <div className="w-full overflow-x-auto">
              <div className="min-w-[900px] max-w-screen-lg mx-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nom
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Profil
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status message
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {searchResults.map((prospect, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {prospect.name || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {prospect.title || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {prospect.link ? (
                            <a
                              href={prospect.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              {prospect.link}
                            </a>
                          ) : (
                            'N/A'
                          )}
                        </td>
                        <td>

                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )
        )}
      </CardContent>
    </Card>
  );
}
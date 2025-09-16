"use client";
import { useState } from 'react';
import type { Prospect as ProspectType } from '@/lib/fakeData';
import { ProspectSearchForm } from '@/components/dashboard/prospecting/ProspectSearchForm';
import { RealTimeLog } from '@/components/dashboard/prospecting/RealTimeLog';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Search } from 'lucide-react';
import { toast } from 'sonner';



export default function ProspectingPage() {
  const [searchStarted, setSearchStarted] = useState(false);
  const [searchResults, setSearchResults] = useState<ProspectType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  const handleSearchStart = () => {
    setSearchStarted(true);
    setIsLoading(true);
    setError(null);
  };

  const handleSearchResults = (results: ProspectType[]) => {
    setSearchResults(results);
    setIsLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) {
      toast.error('Veuillez saisir une requête de recherche.');
      return;
    }

    handleSearchStart();
    fetch('https://prontix.app.n8n.cloud/webhook-test/df85e0ee-937e-4dde-a5b9-308ead972e16', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: query }),
    })
      .then(async (res) => {
        if (!res.ok) {
          let errorMsg = `Erreur HTTP ${res.status}`;
          try {
            const data = await res.json();
            errorMsg += data?.message ? `: ${data.message}` : '';
          } catch {}
          throw new Error(errorMsg);
        }
        const response = await res.json();
        console.log(response);
        // Supposons que l'API retourne un tableau de prospects (à ajuster selon la réponse réelle)
        const prospects: ProspectType[] = response?.data || [];
        handleSearchResults(prospects);
        setQuery('');
        toast.success('Recherche lancée avec succès.');
      })
      .catch((err) => {
        setError(err.message || 'Erreur lors du lancement de la recherche.');
        toast.error(err.message || 'Erreur lors du lancement de la recherche.');
        setIsLoading(false);
      });
  };


  return (
    <div className="flex flex-col space-y-6 min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 p-6">
      <div className="flex items-center gap-3 mb-2">
        <span className="bg-blue-500 text-white rounded-full p-2 shadow-lg">
          <Search className="w-7 h-7" />
        </span>
        <div>
          <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight leading-tight">Recherche de Prospects</h1>
          <h2 className="text-base font-medium text-blue-700 mt-1">Trouvez des prospects ciblés en quelques secondes</h2>
          <p className="text-sm text-gray-500 mt-1">Lancez une recherche intelligente et suivez les résultats en temps réel pour maximiser vos opportunités.</p>
        </div>
      </div>

      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-blue-700">Lancer une nouvelle recherche</CardTitle>
        </CardHeader>
        <CardContent>
          <ProspectSearchForm 
            query={query}
            setQuery={setQuery}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            />
        </CardContent>
      </Card>

      <div className="flex-1">
        <RealTimeLog searchStarted={searchStarted} searchResults={searchResults} isLoading={isLoading} />
      </div>
    </div>
  );
}
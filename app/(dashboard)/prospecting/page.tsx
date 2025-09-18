"use client";

import { useState } from 'react';
import { toast } from 'sonner';
import { ProspectSearchForm } from '@/components/dashboard/prospecting/ProspectSearchForm';
import { RealTimeLog } from '@/components/dashboard/prospecting/RealTimeLog';
import { Bot } from 'lucide-react';

export default function ProspectingPage() {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchStarted, setSearchStarted] = useState(false);

  const handleSubmit = async (query: string) => {
    if (!query) {
      toast.error('Veuillez entrer une requête de recherche.');
      return;
    }

    setIsLoading(true);
    setSearchStarted(true);
    setSearchResults([]); // Réinitialiser les résultats précédents

    try {
      const response = await fetch('https://prontix.app.n8n.cloud/webhook-test/a2a1553a-ac8a-4b6a-a23a-45a752252a9d', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error('La requête a échoué. Veuillez réessayer.');
      }

      const result = await response.json();
      setSearchResults(result.data);
      toast.success('Recherche lancée avec succès !');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-6 p-6 bg-gradient-to-br from-stone-50 via-white to-stone-100 dark:from-stone-950 dark:via-stone-900 dark:to-stone-950">
      <div className="flex items-center gap-3 mb-2">
        <span className="bg-blue-600 text-white rounded-full p-2 shadow-lg">
          <Bot className="w-7 h-7" />
        </span>
        <div>
          <h1 className="text-3xl font-extrabold text-stone-800 tracking-tight leading-tight dark:text-stone-200">
            Recherche de Prospects
          </h1>
          <p className="text-sm text-stone-500 mt-1 dark:text-stone-400">
            Lancez une nouvelle recherche pour trouver des prospects pertinents.
          </p>
        </div>
      </div>

      <ProspectSearchForm onSubmit={handleSubmit} isLoading={isLoading} />
      <RealTimeLog searchStarted={searchStarted} isLoading={isLoading} results={searchResults} />
    </div>
  );
}
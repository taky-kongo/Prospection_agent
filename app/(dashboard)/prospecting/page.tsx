"use client";

import { useState, useEffect, FormEvent } from 'react';
import { toast } from 'sonner';
import { ProspectSearchForm } from '@/components/dashboard/prospecting/ProspectSearchForm';
import { RealTimeLog } from '@/components/dashboard/prospecting/RealTimeLog';
import { Bot } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ProspectingPage() {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchStarted, setSearchStarted] = useState(false);
  const [query, setQuery] = useState('');
  const [history, setHistory] = useState<string[]>([]);

  // Charger l'historique depuis le localStorage au montage du composant
  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem('prospecting_history');
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.error("Échec de la lecture de l'historique depuis localStorage", error);
    }
  }, []);

  const updateHistory = (newQuery: string) => {
    // Empêche l'ajout de requêtes vides à l'historique
    if (!newQuery.trim()) return;
    
    // Crée un nouvel historique sans doublons et limité à 5 éléments
    const updatedHistory = [newQuery, ...history.filter(h => h !== newQuery)].slice(0, 5);
    setHistory(updatedHistory);
    try {
      localStorage.setItem('prospecting_history', JSON.stringify(updatedHistory));
    } catch (error) {
      console.error("Échec de la sauvegarde de l'historique dans localStorage", error);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); // Empêche le rechargement de la page
    if (!query) {
      toast.error('Veuillez entrer une requête de recherche.');
      return;
    }

    updateHistory(query);
    setIsLoading(true);
    setSearchStarted(true);
    setSearchResults([]);

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
      setSearchResults(result.data || []);
      toast.success('Recherche lancée avec succès !');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Gère le clic sur un élément de l'historique
  const handleHistoryClick = (historyQuery: string) => {
    setQuery(historyQuery);
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

      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur dark:bg-stone-900/80 dark:border-stone-800">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-stone-800 dark:text-stone-200">
            Définir la recherche
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ProspectSearchForm
            query={query}
            setQuery={setQuery}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            history={history}
            onHistoryClick={handleHistoryClick}
          />
        </CardContent>
      </Card>
      
      <RealTimeLog searchStarted={searchStarted} isLoading={isLoading} results={searchResults} />
    </div>
  );
}
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';


export function ProspectSearchForm({ onSearchStart }: { onSearchStart: () => void }) {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) {
      toast.error('Veuillez saisir une requête de recherche.');
      return;
    }

    setIsLoading(true);
    onSearchStart();
    // Appel réel à l'API n8n
    fetch('https://prontix.app.n8n.cloud/webhook/63f53fe9-4a5f-4134-9aea-0a7489fa4b87/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
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
        await res.json();
        setIsLoading(false);
        setQuery('');
        toast.success('Recherche lancée avec succès.');
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error(err.message || 'Erreur lors du lancement de la recherche.');
      });
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2">
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ex: 'Directeur marketing en Côte d'Ivoire'"
        className="flex-1 transition-all duration-200 focus:scale-105 focus:shadow-lg"
        disabled={isLoading}
      />
      <Button
        type="submit"
        disabled={isLoading}
  className="transition-all duration-200 active:scale-95 active:shadow-xl focus:scale-105 focus:shadow-lg hover:ring-2 hover:ring-blue-400 cursor-pointer"
        style={{ transition: 'transform 0.15s cubic-bezier(.4,0,.2,1), box-shadow 0.15s cubic-bezier(.4,0,.2,1)' }}
      >
        {isLoading ? 'Lancement...' : 'Lancer la recherche'}
      </Button>
    </form>
  );
}
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Loader2 } from 'lucide-react';

interface ProspectSearchFormProps {
  onSubmit: (query: string) => void;
  isLoading: boolean;
}

export function ProspectSearchForm({ onSubmit, isLoading }: ProspectSearchFormProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(query);
  };

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur dark:bg-stone-900/80 dark:border-stone-800">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-stone-800 dark:text-stone-200">
          Définir la recherche
        </CardTitle>
        <CardDescription className="dark:text-stone-400">
          Entrez le poste, l'entreprise ou les mots-clés pour votre recherche.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Ex: 'Directeur Marketing chez Google France'"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10"
              disabled={isLoading}
            />
          </div>
          <Button type="submit" disabled={isLoading} className="min-w-[120px]">
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Search className="mr-2 h-4 w-4" />
            )}
            Lancer
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
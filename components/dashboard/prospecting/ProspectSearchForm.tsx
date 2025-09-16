'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface Prospect {
  id: string;
  name: string;
  title: string;
  company: string;
  email: string;
  // ... other fields
}


export function ProspectSearchForm({ query, setQuery, handleSubmit, isLoading }: { query: string, setQuery: (value: string) => void, handleSubmit: (e: React.FormEvent) => void, isLoading: boolean }) {

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2">
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ex: Directeur marketing en Côte d'Ivoire"
        className="flex-1 transition-all duration-200"
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
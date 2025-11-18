"use client";

import { Dispatch, SetStateAction, FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Loader2, History } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ProspectSearchFormProps {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  handleSubmit: (e: FormEvent) => void;
  isLoading: boolean;
  history: string[];
  onHistoryClick: (query: string) => void;
}

export function ProspectSearchForm({ query, setQuery, handleSubmit, isLoading, history, onHistoryClick }: ProspectSearchFormProps) {
  return (
    <div>
      <form onSubmit={handleSubmit} className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Ex: 'Directeur Marketing chez Google France'"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 dark:bg-stone-800"
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

      {history.length > 0 && (
        <div className="mt-4 flex items-center gap-2 flex-wrap">
          <History className="h-4 w-4 text-muted-foreground" />
          {history.map((item) => (
            <Badge
              key={item}
              variant="secondary"
              onClick={() => onHistoryClick(item)}
              className="cursor-pointer hover:bg-stone-200 dark:hover:bg-stone-700"
            >
              {item}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
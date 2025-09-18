'use client';

import { useState, useEffect, useMemo } from 'react';
import { CampaignStatusTable } from '@/components/dashboard/campaigns/CampaignStatusTable';
import { toast } from 'sonner';
import { BarChart3, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { CampaignTableSkeleton } from '@/components/dashboard/campaigns/CampaignTableSkeleton';

export default function CampaignsPage() {
  const [prospects, setProspects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const uniqueStatuses = useMemo(() => {
    if (prospects.length === 0) return [];
    const statuses = prospects.map(p => p.status).filter(Boolean); // Filtre les valeurs vides/null
    return ['all', ...Array.from(new Set(statuses))];
  }, [prospects]);

  useEffect(() => {
    const fetchProspects = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/sheets/1oavCo85kTfYGMeqQZYGK6-8JGTXeiE0n5OE-Gt0y4xU');
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Erreur lors de la récupération des données');
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setProspects(data);
        } else {
          throw new Error('Le format des données est incorrect.');
        }
      } catch (error: any) {
        toast.error(error.message || 'Impossible de charger les prospects.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProspects();
  }, []);

  const filteredProspects = useMemo(() => {
    return prospects.filter(prospect => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        prospect.name?.toLowerCase().includes(searchLower) ||
        prospect.title?.toLowerCase().includes(searchLower);
      
      const matchesStatus = 
        statusFilter === 'all' || prospect.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [prospects, searchQuery, statusFilter]);

  return (
    <div className="flex flex-col space-y-6 p-6 bg-gradient-to-br from-stone-50 via-white to-stone-100 dark:from-stone-950 dark:via-stone-900 dark:to-stone-950">
      <div className="flex items-center gap-3 mb-2">
        <span className="bg-blue-600 text-white rounded-full p-2 shadow-lg">
          <BarChart3 className="w-7 h-7" />
        </span>
        <div>
          <h1 className="text-3xl font-extrabold text-stone-800 tracking-tight leading-tight dark:text-stone-200">Statut des Campagnes</h1>
          <p className="text-sm text-stone-500 mt-1 dark:text-stone-400">Recherchez, filtrez et suivez le statut de vos prospects.</p>
        </div>
      </div>

      {/* Barre de recherche et filtres */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher par nom, titre..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 dark:bg-stone-800"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px] dark:bg-stone-800">
            <SelectValue placeholder="Filtrer par statut" />
          </SelectTrigger>
          <SelectContent>
            {uniqueStatuses.map(status => (
              <SelectItem key={status} value={status} className="capitalize">
                {status === 'all' ? 'Tous les statuts' : status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur dark:bg-stone-900/80 dark:border-stone-800">
        <CardContent className="p-0">
          {isLoading ? (
            <CampaignTableSkeleton />
          ) : (
            <CampaignStatusTable prospects={filteredProspects} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
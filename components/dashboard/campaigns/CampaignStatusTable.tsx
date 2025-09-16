'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Prospect, generateFakeProspects } from '@/lib/fakeData';
import { campaignRunningAtom, prospectsAtom } from '@/lib/store';
import { useAtom, useAtomValue } from 'jotai';
import { useEffect } from 'react';

const getStatusColor = (status: Prospect['status']) => {
  switch (status) {
    case 'en attente':
      return 'bg-gray-400';
    case 'message généré':
      return 'bg-blue-500';
    case 'envoyé':
      return 'bg-green-500';
    case 'erreur':
      return 'bg-red-500';
    default:
      return 'bg-gray-400';
  }
};


export function CampaignStatusTable({ prospects }: { prospects: any[] }) {
  if (!Array.isArray(prospects)) {
    return (
      <div className="text-center text-red-500 p-4">
        Erreur : les données prospects ne sont pas valides.
      </div>
    );
  }
  return (
    <div
      className="w-full overflow-x-auto max-h-[60vh]"
      tabIndex={0}
      aria-label="Tableau des prospects"
      role="region"
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      <Table
        className="min-w-[600px] w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md"
        aria-label="Liste des prospects"
      >
        <caption className="sr-only">Liste des prospects de la campagne</caption>
        <TableHeader className="sticky top-0 z-10 bg-white/95 backdrop-blur border-b border-gray-200">
          <TableRow>
            <TableHead scope="col">Nom</TableHead>
            <TableHead scope="col">Titre</TableHead>
            <TableHead scope="col">Lien</TableHead>
            <TableHead scope="col">Snippet</TableHead>
            <TableHead scope="col" className="text-right">Statut</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {prospects.slice(1).map((prospect, idx) => (
            <TableRow key={prospect.id || idx} tabIndex={0} aria-label={`Prospect ${prospect.name || idx}`}> 
              <TableCell className="font-medium max-w-[120px] break-words whitespace-pre-line text-sm md:text-base">{prospect.name}</TableCell>
              <TableCell className="max-w-[180px] break-words whitespace-pre-line text-xs md:text-base">{prospect.title}</TableCell>
              <TableCell className="max-w-[100px] break-words whitespace-pre-line text-xs md:text-base">
                {prospect.link ? (
                  <a href={prospect.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline focus:outline focus:outline-2 focus:outline-blue-400" tabIndex={0} aria-label={`Voir le profil de ${prospect.name}`}>Voir profil</a>
                ) : '-'}
              </TableCell>
              <TableCell className="max-w-[200px] break-words whitespace-pre-line text-xs md:text-base">{prospect.snippet}</TableCell>
              <TableCell className="text-right">
                <Badge className="bg-blue-500 text-white text-xs md:text-base" aria-label={`Statut: ${prospect.envoi_message || '—'}`}>{prospect.envoi_message || '—'}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
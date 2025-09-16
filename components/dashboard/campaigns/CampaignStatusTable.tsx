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
  return (
    <div
      style={{ width: '100%', overflowX: 'auto', overflowY: 'auto', maxHeight: '60vh' }}
      className="overflow-x-auto overflow-y-auto w-full max-h-[60vh]"
    >
      <Table className="min-w-[1000px] max-w-4xl mx-auto bg-white rounded-lg shadow-md">
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Titre</TableHead>
            <TableHead>Lien</TableHead>
            <TableHead>Snippet</TableHead>
            <TableHead className="text-right">Statut</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {prospects.map((prospect, idx) => (
            <TableRow key={prospect.id || idx}>
              <TableCell className="font-medium max-w-[120px] break-words whitespace-pre-line">{prospect.name}</TableCell>
              <TableCell className="max-w-[220px] break-words whitespace-pre-line">{prospect.title}</TableCell>
              <TableCell className="max-w-[120px] break-words whitespace-pre-line">
                {prospect.link ? (
                  <a href={prospect.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                    Voir profil
                  </a>
                ) : '-'}
              </TableCell>
              <TableCell className="max-w-[320px] break-words whitespace-pre-line">{prospect.snippet}</TableCell>
              <TableCell className="text-right">
                <Badge className="bg-blue-500 text-white">
                  {prospect.envoi_message || '—'}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
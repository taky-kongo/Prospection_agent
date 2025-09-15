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


export function CampaignStatusTable({ prospects }: { prospects: Prospect[] }) {
  return (
    <Table className="bg-white rounded-lg shadow-md">
      <TableHeader>
        <TableRow>
          <TableHead>Nom</TableHead>
          <TableHead>Titre</TableHead>
          <TableHead>Entreprise</TableHead>
          <TableHead className="text-right">Statut</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {prospects.map((prospect) => (
          <TableRow key={prospect.id}>
            <TableCell className="font-medium">{prospect.name}</TableCell>
            <TableCell>{prospect.title}</TableCell>
            <TableCell>{prospect.company}</TableCell>
            <TableCell className="text-right">
              <Badge className={getStatusColor(prospect.status)}>
                {prospect.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
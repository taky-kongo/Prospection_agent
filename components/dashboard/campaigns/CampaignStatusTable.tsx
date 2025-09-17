'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Inbox, CheckCircle2, Clock, ChevronsLeft, ChevronsRight, MoreHorizontal } from 'lucide-react';

// Fonction pour déterminer la couleur du badge en fonction du statut
const getStatusVariant = (status?: string): 'default' | 'secondary' | 'destructive' | 'outline' => {
  if (!status) return 'secondary';
  const lowerCaseStatus = status.toLowerCase();

  if (lowerCaseStatus.includes('répondu') || lowerCaseStatus.includes('interested')) {
    return 'default';
  }
  if (lowerCaseStatus.includes('non intéressé') || lowerCaseStatus.includes('not interested')) {
    return 'destructive';
  }
  if (lowerCaseStatus.includes('connecté') || lowerCaseStatus.includes('message envoyé')) {
    return 'outline';
  }
  return 'secondary';
};


export function CampaignStatusTable({ prospects }: { prospects: any[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  if (!Array.isArray(prospects) || prospects.length === 0) {
    return (
      <div className="text-center text-stone-500 py-16 flex flex-col items-center gap-4 bg-stone-50/50 rounded-lg border border-dashed">
        <Inbox className="w-12 h-12 text-stone-400" />
        <h3 className="text-lg font-semibold">Aucun prospect à afficher</h3>
        <p className="text-sm">Les données de votre campagne apparaîtront ici.</p>
      </div>
    );
  }

  // Les données sont des objets, donc isArrayOfArrays sera faux.
  // On garde la logique pour la robustesse, mais on s'attend à des objets.
  const isArrayOfArrays = Array.isArray(prospects[0]) && !Object.keys(prospects[0]).includes('name');
  const headers = Object.keys(prospects[0] || {});
  const dataRows = prospects.slice(1); // On ignore la première ligne de données
  
  // Calculs pour la pagination
  const totalPages = Math.ceil(dataRows.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRows = dataRows.slice(startIndex, endIndex);

  // Trouver l'index des colonnes importantes
  const statusColumnIndex = headers.findIndex(h => h.toLowerCase() === 'status');
  const nameColumnIndex = headers.findIndex(h => h.toLowerCase() === 'name');
  const envoiMessageColumnIndex = headers.findIndex(h => h.toLowerCase().replace(/_/g, '') === 'envoimessage');

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
  };


  return (
    <div className="w-full rounded-lg border border-stone-200 shadow-sm bg-white">
      <div className="overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow className="border-b-stone-200">
              {headers.map((header, index) => (
                <TableHead key={index} className="h-12 px-4 text-left align-middle font-medium text-stone-500 uppercase text-xs tracking-wider">
                  {header}
                </TableHead>
              ))}
              <TableHead className="relative px-4">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentRows.map((row, idx) => {
              const rowData = Object.values(row);
              if (!rowData || rowData.length === 0) return null;

              return (
                <TableRow key={idx} className="hover:bg-stone-50 transition-colors duration-150 border-b-stone-200">
                  {headers.map((header, cellIdx) => {
                    const cell = row[header];
                    const cellClasses = "p-4 align-top break-words whitespace-normal max-w-xs";

                    if (header.toLowerCase().replace(/_/g, '') === 'envoimessage') {
                      const hasValue = cell && cell.toString().trim() !== '';
                      return (
                        <TableCell key={cellIdx} className={cellClasses}>
                          {hasValue ? (
                            <div className="flex items-center gap-2 text-green-600">
                              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                              <span className="font-medium text-xs">Done</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 text-amber-600">
                              <Clock className="w-4 h-4 flex-shrink-0" />
                              <span className="font-medium text-xs">En attente</span>
                            </div>
                          )}
                        </TableCell>
                      );
                    }
                    if (header.toLowerCase() === 'status') {
                      return (
                        <TableCell key={cellIdx} className={cellClasses}>
                          <Badge variant={getStatusVariant(cell)} className="capitalize text-xs font-semibold">
                            {cell || 'N/A'}
                          </Badge>
                        </TableCell>
                      );
                    }
                    if (header.toLowerCase() === 'name') {
                      return (
                        <TableCell key={cellIdx} className={`${cellClasses} font-medium text-stone-900`}>
                          {cell}
                        </TableCell>
                      );
                    }
                    return (
                      <TableCell key={cellIdx} className={`${cellClasses} text-stone-600`}>
                        {cell}
                      </TableCell>
                    );
                  })}
                  <TableCell className="p-4 align-top text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Ouvrir le menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => alert(`Voir le profil de ${row.name}`)}>
                          Voir le profil
                        </DropdownMenuItem>
                        <DropdownMenuItem>Modifier le statut</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-500 focus:text-red-500 focus:bg-red-50">
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      {/* Contrôles de pagination */}
      <div className="flex items-center justify-between p-4 border-t border-stone-200">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-stone-600">
            Page {currentPage} sur {totalPages > 0 ? totalPages : 1}
          </span>
          <Select value={String(itemsPerPage)} onValueChange={handleItemsPerPageChange}>
            <SelectTrigger className="w-auto h-9 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[10, 20, 30, 40, 50].map(size => (
                <SelectItem key={size} value={String(size)} className="text-sm">
                  {size} par page
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9"
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
          >
            <ChevronsLeft className="h-4 w-4" />
            <span className="sr-only">Première page</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Précédent
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages || dataRows.length === 0}
          >
            Suivant
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9"
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages || dataRows.length === 0}
          >
            <ChevronsRight className="h-4 w-4" />
            <span className="sr-only">Dernière page</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
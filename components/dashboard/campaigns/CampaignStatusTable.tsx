'use client';

import { useState, useMemo } from 'react';
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
import { Inbox, ChevronsLeft, ChevronsRight, MoreHorizontal, Link as LinkIcon } from 'lucide-react';

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

  // Définir les en-têtes de colonnes que nous voulons afficher
  const headers = useMemo(() => {
    if (prospects.length === 0) return [];
    // On prend les clés du premier objet prospect comme en-têtes
    // et on filtre les clés non désirées comme 'id'
    return Object.keys(prospects[0]).filter(key => key !== 'id');
  }, [prospects]);

  if (!Array.isArray(prospects) || prospects.length === 0) {
    return (
      <div className="text-center text-stone-500 py-16 flex flex-col items-center gap-4 bg-stone-50/50 dark:bg-stone-900/50 rounded-lg border border-dashed dark:border-stone-800">
        <Inbox className="w-12 h-12 text-stone-400" />
        <h3 className="text-lg font-semibold dark:text-stone-300">Aucun prospect à afficher</h3>
        <p className="text-sm dark:text-stone-500">Les données de votre campagne apparaîtront ici.</p>
      </div>
    );
  }
  
  const totalPages = Math.ceil(prospects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRows = prospects.slice(startIndex, endIndex);

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
  };

  return (
    <div className="w-full rounded-lg border border-stone-200 shadow-sm bg-white dark:bg-stone-900 dark:border-stone-800">
      <div className="overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader className="bg-transparent"><TableRow className="border-b-stone-200 dark:border-b-stone-800 hover:bg-transparent">
            {headers.map((header) => (
              <TableHead key={header} className="h-12 px-4 text-left align-middle font-medium text-stone-500 uppercase text-xs tracking-wider dark:text-stone-400 capitalize">
                {header}
              </TableHead>
            ))}
            <TableHead className="relative px-4">
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow></TableHeader>
          <TableBody>
            {currentRows.map((row) => {
              if (!row || typeof row !== 'object') return null;

              return (
                <TableRow key={row.id} className="hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors duration-150 border-b-stone-200 dark:border-b-stone-800">
                  {headers.map((header) => {
                    const cell = row[header];
                    const cellClasses = "p-4 align-top break-words whitespace-normal max-w-xs";

                    if (header.toLowerCase() === 'status') {
                      return (
                        <TableCell key={header} className={cellClasses}>
                          <Badge variant={getStatusVariant(cell)} className="capitalize text-xs font-semibold">
                            {cell || 'N/A'}
                          </Badge>
                        </TableCell>
                      );
                    }
                    if (header.toLowerCase() === 'link') {
                      return (
                        <TableCell key={header} className={cellClasses}>
                          <a href={cell} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:underline dark:text-blue-400">
                            <LinkIcon className="w-4 h-4 flex-shrink-0" />
                            <span>Voir le profil</span>
                          </a>
                        </TableCell>
                      );
                    }
                    if (header.toLowerCase() === 'name') {
                      return (
                        <TableCell key={header} className={`${cellClasses} font-medium text-stone-900 dark:text-stone-100`}>
                          {cell}
                        </TableCell>
                      );
                    }
                    return (
                      <TableCell key={header} className={`${cellClasses} text-stone-600 dark:text-stone-300`}>
                        {cell}
                      </TableCell>
                    );
                  })}
                  <TableCell className="p-4 align-top text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200">
                          <span className="sr-only">Ouvrir le menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => window.open(row.link, '_blank')}>
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
      <div className="flex items-center justify-between p-4 border-t border-stone-200 dark:border-stone-800">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-stone-600 dark:text-stone-300">
            Page {currentPage} sur {totalPages > 0 ? totalPages : 1}
          </span>
          <Select value={String(itemsPerPage)} onValueChange={handleItemsPerPageChange}>
            <SelectTrigger className="w-auto h-9 text-sm dark:bg-stone-800 dark:border-stone-700">
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
            disabled={currentPage === totalPages || prospects.length === 0}
          >
            Suivant
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9"
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages || prospects.length === 0}
          >
            <ChevronsRight className="h-4 w-4" />
            <span className="sr-only">Dernière page</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
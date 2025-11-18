import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function CampaignTableSkeleton() {
  return (
    <div className="w-full rounded-lg border border-stone-200 shadow-sm bg-white p-0 dark:bg-stone-900 dark:border-stone-800">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-transparent"><TableRow className="border-b-stone-200 hover:bg-transparent dark:border-b-stone-800">
              {Array.from({ length: 5 }).map((_, index) => (
                <TableHead key={index} className="h-12 px-4">
                  <Skeleton className="h-4 w-24" />
                </TableHead>
              ))}
            </TableRow></TableHeader>
          <TableBody>
            {Array.from({ length: 10 }).map((_, rowIndex) => (
              <TableRow key={rowIndex} className="border-b-stone-200 dark:border-b-stone-800">
                {Array.from({ length: 5 }).map((_, cellIndex) => (
                  <TableCell key={cellIndex} className="p-4">
                    <Skeleton className="h-5 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between p-4 border-t border-stone-200 dark:border-t-stone-800">
        <div className="flex items-center gap-4">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-9 w-32" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-9" />
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-9" />
        </div>
      </div>
    </div>
  );
}
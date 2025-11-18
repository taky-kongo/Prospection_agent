import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Bot, Loader2, SearchCheck } from "lucide-react";

interface RealTimeLogProps {
  searchStarted: boolean;
  isLoading: boolean;
  results: any[];
}

export function RealTimeLog({ searchStarted, isLoading, results }: RealTimeLogProps) {
  if (!searchStarted) {
    return (
      <div className="text-center text-stone-500 py-16 flex flex-col items-center gap-4 bg-stone-100/50 dark:bg-stone-900/50 rounded-lg border border-dashed dark:border-stone-800">
        <SearchCheck className="w-12 h-12 text-stone-400" />
        <h3 className="text-lg font-semibold dark:text-stone-300">En attente d'une recherche</h3>
        <p className="text-sm dark:text-stone-500">Les résultats de votre prospection apparaîtront ici.</p>
      </div>
    );
  }

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur dark:bg-stone-900/80 dark:border-stone-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-bold text-stone-800 dark:text-stone-200">
          <Bot className="text-blue-600" />
          Résultats de la Prospection
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-72 w-full rounded-md border p-4 dark:border-stone-800">
          {isLoading && results.length === 0 && (
            <div className="flex items-center gap-3 text-stone-500 dark:text-stone-400">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Recherche en cours...</span>
            </div>
          )}
          {results.length > 0 && (
            <div className="space-y-4">
              {results.map((item, index) => (
                <div key={index}>
                  <div className="text-sm">
                    <p className="font-medium text-stone-800 dark:text-stone-200">{item.name}</p>
                    <p className="text-stone-600 dark:text-stone-400">{item.title}</p>
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-xs">
                      Voir le profil
                    </a>
                  </div>
                  {index < results.length - 1 && <Separator className="my-4 dark:bg-stone-800" />}
                </div>
              ))}
            </div>
          )}
          {!isLoading && results.length === 0 && (
            <p className="text-sm text-stone-500 dark:text-stone-400">Recherche effectuée</p>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
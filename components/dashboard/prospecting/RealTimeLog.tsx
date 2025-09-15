'use client';

import { LogEntry, generateFakeLog } from '@/lib/fakeData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useState } from 'react';


export function RealTimeLog({ searchStarted }: { searchStarted: boolean }) {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!searchStarted) {
      setLogs([]);
      setIsLoading(true);
      return;
    }
    const fakeLogs = generateFakeLog();
    let index = 0;
    const interval = setInterval(() => {
      if (index < fakeLogs.length) {
        setLogs((prevLogs) => {
          const newLog = fakeLogs[index];
          index++;
          return newLog ? [...prevLogs, newLog] : prevLogs;
        });
        setIsLoading(false);
      } else {
        clearInterval(interval);
        setIsLoading(false);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [searchStarted]);

  return (
    <Card className="h-96 overflow-y-auto">
      <CardHeader>
        <CardTitle className="text-lg">Journal des événements</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        {isLoading && logs.length === 0 ? (
          <p className="text-gray-500 italic">En attente d'un lancement de recherche...</p>
        ) : (
          logs.map((log, index) => (
            <div key={index} className="flex space-x-2 text-gray-600">
              <span className="font-mono text-xs text-gray-400 shrink-0">
                [{log.timestamp}]
              </span>
              <span>{log.message}</span>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
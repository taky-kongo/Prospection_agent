'use client';


import { CampaignStatusTable } from '@/components/dashboard/campaigns/CampaignStatusTable';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Send } from 'lucide-react';
import { useState, useEffect } from 'react';
// import { generateFakeProspects, Prospect } from '@/lib/fakeData';

export default function CampaignsPage() {
  const [prospects, setProspects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const sheetId = '1oavCo85kTfYGMeqQZYGK6-8JGTXeiE0n5OE-Gt0y4xU'; // Remplace par ton vrai sheetId si besoin

  useEffect(() => {
    setIsLoading(true);
    fetch(`/api/sheets/${sheetId}?sheetName=Feuille1`)
      .then(res => res.json())
      .then(data => setProspects(data))
      .catch(() => setProspects([]))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="flex flex-col space-y-6 p-6 bg-gradient-to-br from-stone-50 via-white to-stone-100">
      <div className="flex items-center gap-3 mb-2">
        <span className="bg-blue-600 text-white rounded-full p-2 shadow-lg">
          <BarChart3 className="w-7 h-7" />
        </span>
        <div>
          <h1 className="text-3xl font-extrabold text-stone-800 tracking-tight leading-tight">Statut des Campagnes</h1>
          <h2 className="text-base font-medium text-blue-600 mt-1">Suivez et gérez vos prospects</h2>
          <p className="text-sm text-stone-500 mt-1">Suivez le statut de chaque prospect et optimisez vos résultats.</p>
        </div>
      </div>

      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur">
        <CardHeader>
          <div className="flex justify-between items-center">
            {/*
            <CardTitle className="text-xl font-bold text-blue-700">Campagne d'envoi de messages</CardTitle>
            {/*
            // Pour activer le bouton de lancement de campagne, décommentez ci-dessous et ajoutez la logique souhaitée :
            // <Button
            //   onClick={handleStartCampaign}
            //   className="transition-all duration-200 active:scale-95 active:shadow-xl focus:scale-105 focus:shadow-lg hover:ring-2 hover:ring-blue-400 cursor-pointer"
            // >
            //   Démarrer l'envoi
            // </Button>
            */}
          </div>
        </CardHeader>
        <CardContent>
          {/* Animation de chargement */}
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <span className="inline-block w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" aria-label="Chargement..." />
            </div>
          ) : (
            <CampaignStatusTable prospects={prospects} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
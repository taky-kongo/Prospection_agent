'use client';


import { CampaignStatusTable } from '@/components/dashboard/campaigns/CampaignStatusTable';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Send } from 'lucide-react';
import { useState, useEffect } from 'react';
import { generateFakeProspects, Prospect } from '@/lib/fakeData';

export default function CampaignsPage() {
  const [prospects, setProspects] = useState<Prospect[]>([]);

  useEffect(() => {
    setProspects(generateFakeProspects(10));
  }, []);
  
  const handleStartCampaign = () => {
    setCampaignRunning(true);
  };

  return (
    <div className="flex flex-col space-y-6 min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 p-6">
      <div className="flex items-center gap-3 mb-2">
        <span className="bg-blue-500 text-white rounded-full p-2 shadow-lg">
          <Send className="w-7 h-7" />
        </span>
        <div>
          <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight leading-tight">Gestion des prospects</h1>
          <h2 className="text-base font-medium text-blue-700 mt-1">Suivez et gérez vos prospects</h2>
          <p className="text-sm text-gray-500 mt-1">Lancez une campagne, surveillez le statut de chaque prospect et optimisez vos résultats.</p>
        </div>
      </div>

      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-bold text-blue-700">Campagne d'envoi de messages</CardTitle>
            {/* <Button 
              onClick={handleStartCampaign}
              className="transition-all duration-200 active:scale-95 active:shadow-xl focus:scale-105 focus:shadow-lg hover:ring-2 hover:ring-blue-400 cursor-pointer"
            >
              Démarrer l'envoi
            </Button> */}
          </div>
        </CardHeader>
        <CardContent>
          <CampaignStatusTable prospects={prospects} />
        </CardContent>
      </Card>
    </div>
  );
}
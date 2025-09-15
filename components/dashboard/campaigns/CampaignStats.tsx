import { useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Prospect } from '@/lib/fakeData';

ChartJS.register(ArcElement, Tooltip, Legend);

export function CampaignStats({ prospects }: { prospects: Prospect[] }) {
  const total = prospects.length;
  const sent = prospects.filter(p => p.status === 'envoyé').length;
  const pending = prospects.filter(p => p.status === 'en attente').length;
  const error = prospects.filter(p => p.status === 'erreur').length;

  const data = useMemo(() => ({
    labels: ['Envoyé', 'En attente', 'Erreur'],
    datasets: [
      {
        data: [sent, pending, error],
        backgroundColor: ['#3b82f6', '#fbbf24', '#ef4444'],
        borderWidth: 2,
      },
    ],
  }), [sent, pending, error]);

  return (
    <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center gap-4">
      <h2 className="text-lg font-bold text-gray-700 mb-2">Statistiques de la campagne</h2>
      <div className="w-32 h-32">
        <Doughnut data={data} />
      </div>
      <div className="flex gap-6 mt-4">
        <div className="flex flex-col items-center">
          <span className="text-blue-500 font-bold text-xl">{sent}</span>
          <span className="text-xs text-gray-500">Envoyés</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-yellow-500 font-bold text-xl">{pending}</span>
          <span className="text-xs text-gray-500">En attente</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-red-500 font-bold text-xl">{error}</span>
          <span className="text-xs text-gray-500">Erreurs</span>
        </div>
      </div>
      <div className="mt-2 text-sm text-gray-600">Total prospects : <span className="font-semibold">{total}</span></div>
    </div>
  );
}

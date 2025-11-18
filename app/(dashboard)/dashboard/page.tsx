'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, MessageCircleReply, Percent, BarChart3 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { toast } from 'sonner';

// Couleurs pour le graphique
const COLORS = {
  'Répondu': '#10B981', // Vert
  'Non intéressé': '#EF4444', // Rouge
  'Connecté': '#3B82F6', // Bleu
  'Message envoyé': '#6366F1', // Indigo
  'En attente': '#F59E0B', // Ambre
  'Autre': '#6B7280', // Gris
};

// Fonction pour obtenir la couleur correspondante
const getColor = (status: string) => {
  const lowerStatus = status.toLowerCase();
  if (lowerStatus.includes('répondu')) return COLORS['Répondu'];
  if (lowerStatus.includes('non intéressé')) return COLORS['Non intéressé'];
  if (lowerStatus.includes('connecté')) return COLORS['Connecté'];
  if (lowerStatus.includes('message envoyé')) return COLORS['Message envoyé'];
  return COLORS['Autre'];
};

export default function DashboardPage() {
  const [stats, setStats] = useState({ total: 0, responded: 0, responseRate: 0 });
  const [chartData, setChartData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/sheets/1oavCo85kTfYGMeqQZYGK6-8JGTXeiE0n5OE-Gt0y4xU');
        if (!response.ok) throw new Error('Failed to fetch prospects data');
        
        const prospects = await response.json();
        if (!Array.isArray(prospects)) throw new Error('Invalid data format');

        // Calcul des statistiques
        const total = prospects.length;
        const responded = prospects.filter(p => p.status?.toLowerCase().includes('répondu')).length;
        const responseRate = total > 0 ? Math.round((responded / total) * 100) : 0;
        setStats({ total, responded, responseRate });

        // Préparation des données pour le graphique
        const statusCounts = prospects.reduce((acc, p) => {
          const status = p.status || 'En attente de réponse';
          acc[status] = (acc[status] || 0) + 1;
          return acc;
        }, {});

        const formattedChartData = Object.entries(statusCounts).map(([name, value]) => ({
          name,
          value,
        }));
        setChartData(formattedChartData);

      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-stone-50 via-white to-stone-100 space-y-6">
      {/* Cartes de KPIs */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Prospects</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Réponses</CardTitle>
            <MessageCircleReply className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.responded}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux de Réponse</CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.responseRate}%</div>
          </CardContent>
        </Card>
      </div>

      {/* Graphique */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            Répartition par Statut
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={(props: any) => `${props.name} (${(props.percent * 100).toFixed(0)}%)`}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getColor(entry.name)} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
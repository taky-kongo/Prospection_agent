'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// MODIFICATION : Ajout de l'icône "Target" pour la prise de contact
import { Users, Percent, BarChart3, Target } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { toast } from 'sonner';

// --- Début des modifications pour Monday.com ---

// Helper pour mapper les IDs de colonnes Monday à des noms de champs simples
const MONDAY_COLUMN_MAPPING: { [key: string]: string } = {
  'text_mkw9jnfn': 'name',
  'text_mkw966ha': 'title',
  'text_mkw95m5j': 'link',
  'text_mkw9kysm': 'description',
  'color_mkw9cw95': 'status',
};

// Fonction pour transformer un item Monday en un objet prospect simple
const transformMondayItem = (item: any) => {
  const prospect: { [key: string]: any } = { id: item.id, name: item.name };
  item.column_values.forEach((col: any) => {
    const fieldName = MONDAY_COLUMN_MAPPING[col.id];
    if (fieldName && col.text) {
      prospect[fieldName] = col.text;
    }
  });
  return prospect;
};

// Couleurs pour le graphique (vous pouvez les ajuster)
const COLORS: { [key: string]: string } = {
  'Répondu': '#10B981',
  'Intéressé': '#10B981', // Même couleur que répondu
  'Non intéressé': '#EF4444',
  'Connecté': '#3B82F6',
  'Message envoyé': '#6366F1',
  'Prise de contact': '#F59E0B',
  'prospect trouvé': '#A855F7', // Violet
  'Autre': '#6B7280',
};

// Fonction pour obtenir la couleur correspondante
const getColor = (status: string) => {
  for (const key in COLORS) {
    if (status.toLowerCase().includes(key.toLowerCase())) {
      return COLORS[key as keyof typeof COLORS];
    }
  }
  return COLORS['Autre'];
};

// --- Fin des modifications pour Monday.com ---

export default function DashboardPage() {
  // MODIFICATION : Mise à jour de la structure de l'état des statistiques
  const [stats, setStats] = useState({ total: 0, contacted: 0, contactRate: 0 });
  const [chartData, setChartData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/monday');
        if (!response.ok) throw new Error('Failed to fetch prospects data from Monday.com');
        
        const mondayResponse = await response.json();
        const items = mondayResponse?.data?.boards?.[0]?.items_page?.items;
        if (!Array.isArray(items)) throw new Error('Invalid data format from Monday.com');

        const prospects = items.map(transformMondayItem);

        // MODIFICATION : Mise à jour de la logique de calcul
        const total = prospects.length;
        // Compte le nombre de prospects avec le statut "Prise de contact"
        const contacted = prospects.filter(p => p.status?.toLowerCase().includes('prise de contact')).length;
        const contactRate = total > 0 ? Math.round((contacted / total) * 100) : 0;
        setStats({ total, contacted, contactRate });

        // Préparer les données pour le graphique (inchangé)
        const statusCounts = prospects.reduce((acc, p) => {
          const status = p.status || 'Non défini';
          acc[status] = (acc[status] || 0) + 1;
          return acc;
        }, {} as { [key: string]: number });

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
        {/* MODIFICATION : Carte "Prise de contact" */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prise de contact</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.contacted}</div>
          </CardContent>
        </Card>
        {/* MODIFICATION : Carte "Taux de Prise de contact" */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux de Prise de contact</CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.contactRate}%</div>
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
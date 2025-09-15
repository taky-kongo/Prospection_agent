"use client";
import { Sidebar } from '@/components/shared/Sidebar';
import { Header } from '@/components/shared/Header';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="flex min-h-screen bg-gray-100 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen">
        <Header />
        <main className="flex-1 min-h-0 overflow-hidden flex flex-col p-0">
          <div className="h-full flex flex-col">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
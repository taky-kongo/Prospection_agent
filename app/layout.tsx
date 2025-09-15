import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner'; // <-- Ajoute cette ligne

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'n8n Dashboard',
  description: 'Pilotage et supervision du workflow de prospection LinkedIn.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster /> {/* <-- Ajoute cette ligne pour afficher les toasts */}
      </body>
    </html>
  );
}
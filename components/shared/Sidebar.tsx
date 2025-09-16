'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Mail, Search, Send } from 'lucide-react';

const navItems = [
  {
    name: 'Campagne',
    href: '/prospecting',
    icon: Search,
  },
  {
    name: 'Prospects',
    href: '/campaigns',
    icon: Send,
  },
  // {
  //   name: 'Inbox',
  //   href: '/inbox',
  //   icon: Mail,
  // },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-64 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 text-white p-4 space-y-4 shadow-xl">
      <div className="flex items-center gap-2 mb-6">
        <span className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center shadow-lg animate-bounce">
          <Search className="w-6 h-6 text-white" />
        </span>
        <span className="text-xl font-bold tracking-wide">ProstIx Agent</span>
      </div>
      <nav className="flex-1">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={cn(
                  'flex items-center space-x-3 p-2 rounded-lg transition-all duration-200 group',
                  pathname === item.href
                    ? 'bg-blue-600 text-white shadow-lg scale-105'
                    : 'hover:bg-blue-500 hover:text-white hover:scale-105'
                )}
              >
                <item.icon className={cn('w-5 h-5 transition-transform duration-200', pathname === item.href ? 'animate-spin' : 'group-hover:scale-110')} />
                <span className="font-semibold tracking-wide">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
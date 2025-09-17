'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Users,
  BarChart3,
  Settings,
  Bot,
  LayoutDashboard,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const links = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Prospecting', href: '/prospecting', icon: Bot },
  { name: 'Campaigns', href: '/campaigns', icon: BarChart3 },
  // { name: 'Prospects', href: '/prospects', icon: Users },
  // { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-stone-100 text-stone-800 flex flex-col border-r border-stone-200">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-blue-600">ProstIx Agent</h1>
      </div>
      <nav className="flex-1 px-4">
        <ul>
          {links.map((link) => (
            <li key={link.name} className="mb-2">
              <Link
                href={link.href}
                className={cn(
                  'flex items-center p-3 rounded-lg transition-colors',
                  pathname === link.href
                    ? 'bg-blue-100 text-blue-600'
                    : 'hover:bg-stone-200'
                )}
              >
                <link.icon className="w-5 h-5 mr-3" />
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-stone-200">
        {/* User profile or other footer content can go here */}
      </div>
    </aside>
  );
}
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bot, BarChart3, Settings, Users, LayoutDashboard,} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const links = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Prospecting', href: '/prospecting', icon: Bot },
  { name: 'Campaigns', href: '/campaigns', icon: BarChart3 },
  // { name: 'Prospects', href: '/prospects', icon: Users },
  // { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar({ isCollapsed }: { isCollapsed: boolean }) {
  const pathname = usePathname();

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          'flex flex-col bg-stone-100 border-r border-stone-200 transition-all duration-300 ease-in-out',
          isCollapsed ? 'w-20' : 'w-64'
        )}
      >
        <div className="flex items-center justify-center h-16 border-b border-stone-200 px-4">
          <Link href="/dashboard" className="flex items-center gap-2 overflow-hidden">
            <Bot className="h-8 w-8 text-blue-600 flex-shrink-0" />
            <span
              className={cn(
                'text-xl font-bold text-stone-800 whitespace-nowrap transition-opacity duration-200',
                isCollapsed ? 'opacity-0' : 'opacity-100'
              )}
            >
              ProstIx Agent
            </span>
          </Link>
        </div>
        <nav className="flex-1 space-y-2 p-4">
          {links.map((link) => {
            const LinkIcon = link.icon;
            const isActive = pathname === link.href;

            if (isCollapsed) {
              return (
                <Tooltip key={link.name}>
                  <TooltipTrigger asChild>
                    <Link
                      href={link.href}
                      className={cn(
                        'flex items-center justify-center h-12 rounded-lg transition-colors',
                        isActive
                          ? 'bg-blue-100 text-blue-600'
                          : 'text-stone-600 hover:bg-stone-200'
                      )}
                    >
                      <LinkIcon className="h-6 w-6" />
                      <span className="sr-only">{link.name}</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="flex items-center gap-4">
                    {link.name}
                  </TooltipContent>
                </Tooltip>
              );
            }

            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  'flex items-center gap-4 p-3 rounded-lg transition-colors',
                  isActive
                    ? 'bg-blue-100 text-blue-600 font-semibold'
                    : 'text-stone-600 hover:bg-stone-200'
                )}
              >
                <LinkIcon className="h-5 w-5" />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </TooltipProvider>
  );
}
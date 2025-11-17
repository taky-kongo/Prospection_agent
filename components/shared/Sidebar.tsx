'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bot, BarChart3, Settings, LayoutDashboard, User, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '../ui/button';

const mainLinks = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Prospecting', href: '/prospecting', icon: Bot },
  { name: 'Campaigns', href: '/campaigns', icon: BarChart3 },
];

export function Sidebar({ isCollapsed }: { isCollapsed: boolean }) {
  const pathname = usePathname();

  const renderLink = (link: typeof mainLinks[0], isCollapsed: boolean) => {
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
                  ? 'bg-blue-100 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400'
                  : 'text-stone-600 hover:bg-stone-200 dark:text-stone-400 dark:hover:bg-stone-800'
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
            ? 'bg-blue-100 text-blue-600 font-semibold dark:bg-blue-950/50 dark:text-blue-400'
            : 'text-stone-600 hover:bg-stone-200 dark:text-stone-400 dark:hover:bg-stone-800'
        )}
      >
        <LinkIcon className="h-5 w-5" />
        <span>{link.name}</span>
      </Link>
    );
  };

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          'flex flex-col bg-stone-100 border-r border-stone-200 transition-all duration-300 ease-in-out dark:bg-stone-900 dark:border-stone-800',
          isCollapsed ? 'w-20' : 'w-64'
        )}
      >
        <div className="flex items-center justify-center h-16 border-b border-stone-200 px-4 dark:border-stone-800">
          <Link href="/dashboard" className="flex items-center gap-2 overflow-hidden">
            <Bot className="h-8 w-8 text-blue-600 flex-shrink-0" />
            <span
              className={cn(
                'text-xl font-bold text-stone-800 whitespace-nowrap transition-opacity duration-200 dark:text-stone-200',
                isCollapsed ? 'opacity-0' : 'opacity-100'
              )}
            >
              Prospect Agent
            </span>
          </Link>
        </div>
        
        <div className="flex flex-col flex-1 justify-between">
          <nav className="flex-1 space-y-2 p-4">
            {mainLinks.map((link) => renderLink(link, isCollapsed))}
          </nav>
          
          <div>
            <div className="p-4 space-y-2 border-t border-stone-200 dark:border-stone-800">
              {renderLink({ name: 'Settings', href: '/settings', icon: Settings }, isCollapsed)}
            </div>
            <div className="p-2 border-t border-stone-200 dark:border-stone-800">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="w-full justify-start h-auto p-2">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        {/*<AvatarImage src="/avatars/01.png" alt="Avatar" />*/}
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                      <div className={cn("overflow-hidden transition-opacity duration-200", isCollapsed ? "opacity-0" : "opacity-100")}>
                        <p className="text-sm font-medium text-stone-800 dark:text-stone-200 truncate text-left">Utilisateur</p>
                        <p className="text-xs text-stone-500 dark:text-stone-400 truncate text-left">utilisateur@exemple.com</p>
                      </div>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="top" align="start" className="w-56 mb-2">
                  <DropdownMenuLabel>Mon Compte</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profil</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Paramètres</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Déconnexion</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </aside>
    </TooltipProvider>
  );
}
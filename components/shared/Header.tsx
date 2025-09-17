'use client';

import { usePathname } from 'next/navigation';
import { Bell, User, LogOut, Settings, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

// ... (getPageTitle function remains the same)
const getPageTitle = (pathname: string) => {
  const name = pathname.split('/').pop();
  if (!name) return 'Dashboard';
  return name.charAt(0).toUpperCase() + name.slice(1);
};

export function Header({ isCollapsed, onToggleCollapse }: { isCollapsed: boolean, onToggleCollapse: () => void }) {
  const pathname = usePathname();
  const title = getPageTitle(pathname);

  return (
    <header className="flex h-16 items-center justify-between border-b border-stone-200 bg-stone-100 px-6 shrink-0">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onToggleCollapse} className="rounded-full text-stone-600 hover:text-stone-900 hover:bg-stone-200">
          {isCollapsed ? <PanelLeftOpen className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
        <h1 className="text-xl font-semibold text-stone-800">{title}</h1>
      </div>
      <div className="flex items-center gap-4">
        {/* ... (le reste du header ne change pas) ... */}
        <Button variant="ghost" size="icon" className="rounded-full text-stone-600 hover:text-stone-900 hover:bg-stone-200">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarImage src="/avatars/01.png" alt="Avatar" />
                <AvatarFallback>
                  <User className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Utilisateur</p>
                <p className="text-xs leading-none text-muted-foreground">
                  utilisateur@exemple.com
                </p>
              </div>
            </DropdownMenuLabel>
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
    </header>
  );
}
'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Bot, BarChart3, LayoutDashboard, CornerDownLeft } from 'lucide-react';

// On réutilise la même structure de liens que dans le Sidebar
const links = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Prospecting', href: '/prospecting', icon: Bot },
  { name: 'Campaigns', href: '/campaigns', icon: BarChart3 },
];

export function CommandPalette({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [open, setOpen]);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Tapez une commande ou recherchez..." />
      <CommandList>
        <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
        <CommandGroup heading="Navigation">
          {links.map((link) => {
            const LinkIcon = link.icon;
            return (
              <CommandItem
                key={link.href}
                onSelect={() => {
                  runCommand(() => router.push(link.href));
                }}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <CornerDownLeft className="h-4 w-4 text-muted-foreground" />
                  <LinkIcon className="h-4 w-4" />
                  <span>{link.name}</span>
                </div>
              </CommandItem>
            );
          })}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
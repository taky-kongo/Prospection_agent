'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { generateFakeConversations, Conversation } from '@/lib/fakeData';
import { useEffect, useState, useRef } from 'react';
import { useAtom } from 'jotai';
import { conversationsAtom } from '@/lib/store';

const TOTAL_CONVERSATIONS_COUNT = 200;
const INITIAL_CONVERSATIONS_COUNT = 8;
const LOAD_MORE_COUNT = 10; // Nombre de conversations à charger à chaque scroll

export function ConversationList() {
  const pathname = usePathname();
  const [allConversations, setAllConversations] = useAtom(conversationsAtom);
  const [visibleConversations, setVisibleConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Étape 1 : Génère toutes les conversations au montage du composant
  useEffect(() => {
    if (allConversations.length === 0) {
      setAllConversations(generateFakeConversations(TOTAL_CONVERSATIONS_COUNT));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (allConversations.length > 0) {
      setIsLoading(false);
    }
  }, [allConversations]);

  // Étape 2 : Affiche les premières conversations quand elles sont prêtes
  useEffect(() => {
    if (allConversations.length > 0) {
      setVisibleConversations(allConversations.slice(0, INITIAL_CONVERSATIONS_COUNT));
    }
  }, [allConversations]);

  // Fonction pour charger plus de conversations
  const loadMoreConversations = () => {
    const nextIndex = visibleConversations.length;
    const newConversations = allConversations.slice(nextIndex, nextIndex + LOAD_MORE_COUNT);
    
    if (newConversations.length > 0) {
      setVisibleConversations((prev) => [...prev, ...newConversations]);
    }
  };

  // Étape 3 : Gère le chargement de nouvelles conversations au scroll
  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      // Détecte si l'utilisateur est arrivé près du bas de la liste
      if (scrollTop + clientHeight >= scrollHeight - 100) {
        loadMoreConversations();
      }
    }
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-xl font-bold p-4 pb-0">Conversations</h2>
      <nav
        ref={containerRef}
        className="flex-1 overflow-y-auto px-4 pt-2"
        onScroll={handleScroll}
      >
        <ul className="flex flex-col space-y-2">
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => (
                <li key={i} className="animate-pulse">
                  <div className="flex flex-col p-3 rounded-lg bg-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-full bg-gray-300" />
                      <div className="h-4 w-24 bg-gray-300 rounded" />
                      <div className="h-3 w-12 bg-gray-200 rounded ml-auto" />
                    </div>
                    <div className="h-3 w-32 bg-gray-200 rounded" />
                  </div>
                </li>
              ))
            : visibleConversations.map((conv) => (
                <li key={conv.id}>
                  <Link
                    href={`/inbox/${conv.id}`}
                    className={cn(
                      'flex flex-col p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200',
                      pathname === `/inbox/${conv.id}` ? 'bg-gray-200' : ''
                    )}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <img src={conv.avatar} alt={conv.prospectName} className="w-7 h-7 rounded-full object-cover border border-gray-300 shadow" />
                        <h3 className="text-sm font-semibold">{conv.prospectName}</h3>
                      </div>
                      <span className="text-xs text-gray-500">{conv.lastMessageTimestamp}</span>
                    </div>
                    <p className="text-xs text-gray-600 truncate mt-1">
                      {conv.lastMessage}
                    </p>
                  </Link>
                </li>
              ))}
        </ul>
        {!isLoading && visibleConversations.length < allConversations.length && (
          <div className="text-center text-sm text-gray-500 py-4">
            Chargement...
          </div>
        )}
      </nav>
    </div>
  );
}
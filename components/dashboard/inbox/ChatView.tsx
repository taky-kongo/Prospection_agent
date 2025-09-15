'use client';

import { Conversation, Message } from '@/lib/fakeData';
import { useEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import { conversationsAtom } from '@/lib/store';
import { useParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserIcon, BotIcon, SendIcon } from 'lucide-react';

export function ChatView() {
  const params = useParams();
  const conversationId = params.conversationId as string;

  const conversationsData = useAtomValue(conversationsAtom);
    const [currentConversation, setCurrentConversation] = useState<Conversation | undefined>(undefined);
  const [messageText, setMessageText] = useState('');


  useEffect(() => {
    if (conversationId && conversationsData.length > 0) {
      const foundConversation = conversationsData.find(
        (conv) => conv.id === conversationId
      );
      setCurrentConversation(foundConversation);
    }
  }, [conversationId, conversationsData]);

  // ... (le reste du code est le même) ...

  if (!conversationId) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-lg text-gray-500">Sélectionnez une conversation pour la voir ici.</p>
      </div>
    );
  }

  if (!currentConversation) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-lg text-gray-500">Conversation non trouvée.</p>
      </div>
    );
  }

  const sendMessage = () => {
    if (messageText.trim()) {
      const newMessage: Message = {
        id: Math.random().toString(),
        sender: 'human',
        content: messageText,
        timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      };

      setCurrentConversation((prev) => ({
        ...prev!,
        messages: [...prev!.messages, newMessage],
      }));
      setMessageText('');
    }
  };

  const isHumanTurn = currentConversation.messages[currentConversation.messages.length - 1]?.sender !== 'ia';

  return (
    <Card className="h-full flex flex-col min-h-0">
      <CardHeader className="border-b flex-shrink-0">
        <div className="flex items-center gap-3">
          <img src={currentConversation.avatar} alt={currentConversation.prospectName} className="w-9 h-9 rounded-full object-cover border border-gray-300 shadow" />
          <CardTitle>{currentConversation.prospectName}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
        {currentConversation.messages.map((message, idx) => {
          const isLastMessage = idx === currentConversation.messages.length - 1;
          return (
            <div
              key={message.id}
              className={cn(
                'flex items-end space-x-2 transition-all duration-300',
                message.sender === 'human' ? 'justify-end' : 'justify-start'
              )}
            >
              {message.sender === 'ia' && (
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 mr-2 shadow">
                  <BotIcon size={18} className="text-gray-500" />
                </span>
              )}
              {message.sender === 'human' && (
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 ml-2 shadow">
                  <UserIcon size={18} className="text-blue-500" />
                </span>
              )}
              <div
                className={cn(
                  'rounded-lg p-3 max-w-xs break-words whitespace-pre-line overflow-hidden shadow-md relative',
                  message.sender === 'human'
                    ? 'bg-blue-500 text-white rounded-br-none hover:bg-blue-600'
                    : 'bg-white text-gray-800 rounded-bl-none hover:bg-gray-100 border border-gray-200'
                )}
                style={{ animation: `fadeIn 0.5s ease ${idx * 0.05}s both` }}
              >
                {message.content}
                {message.sender === 'ia' && idx === currentConversation.messages.length - 1 && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full animate-pulse shadow-lg">
                    Nouveau
                  </span>
                )}
              </div>
            </div>
          );
        })}
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(10px); }
              to { opacity: 1; transform: none; }
            }
          `}</style>
      </CardContent>
      <CardFooter className="border-t p-4 flex space-x-2 flex-shrink-0">
          <Input
            type="text"
            placeholder="Écrire un message..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') sendMessage();
            }}
            disabled={!isHumanTurn}
            className="flex-1 focus:ring-2 focus:ring-blue-400 placeholder:animate-pulse transition-all duration-200 focus:scale-105 focus:shadow-lg"
          />
          <Button
            onClick={sendMessage}
            disabled={!isHumanTurn}
            className="flex items-center gap-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 hover:ring-2 hover:ring-blue-400 text-white rounded-lg shadow transition-all duration-200 active:scale-95 active:shadow-xl focus:scale-105 focus:shadow-lg cursor-pointer"
            style={{ transition: 'transform 0.15s cubic-bezier(.4,0,.2,1), box-shadow 0.15s cubic-bezier(.4,0,.2,1)' }}
          >
            <SendIcon size={18} />
            Envoyer
          </Button>
      </CardFooter>
    </Card>
  );
}
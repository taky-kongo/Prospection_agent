import { ConversationList } from '@/components/dashboard/inbox/ConversationList';
import { ChatView } from '@/components/dashboard/inbox/ChatView';
import { MessageCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function InboxPage() {
  return (
    <div className="flex flex-col space-y-6 min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 p-6">
      <div className="flex items-center gap-3 mb-2">
        <span className="bg-blue-500 text-white rounded-full p-2 shadow-lg">
          <MessageCircle className="w-7 h-7" />
        </span>
        <div>
          <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight leading-tight">Inbox</h1>
          <h2 className="text-base font-medium text-blue-700 mt-1">Discutez et gérez vos conversations en toute simplicité</h2>
          <p className="text-sm text-gray-500 mt-1">Retrouvez tous vos échanges, répondez rapidement et gardez le fil de vos interactions.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 flex-1">
        <div className="md:col-span-1 border-r border-gray-200 flex flex-col h-full bg-white/80 backdrop-blur rounded-xl shadow-xl">
          <ConversationList />
        </div>
        <div className="md:col-span-2 lg:col-span-3 h-full min-h-0 flex flex-col">
          <Card className="h-full bg-white/80 backdrop-blur shadow-xl border-0">
            <CardContent className="h-full p-0">
              <ChatView />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
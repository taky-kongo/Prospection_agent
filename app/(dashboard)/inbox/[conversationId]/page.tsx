// app/inbox/[conversationId]/page.tsx
import { ConversationList } from '@/components/dashboard/inbox/ConversationList';
import { ChatView } from '@/components/dashboard/inbox/ChatView';

export default function ConversationPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 h-[calc(100vh-10rem)]">
      <div className="md:col-span-1 border-r border-gray-200">
        <ConversationList />
      </div>
      <div className="md:col-span-2 lg:col-span-3">
        <ChatView />
      </div>
    </div>
  );
}
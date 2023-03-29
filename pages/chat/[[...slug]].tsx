import { Suspense } from 'react';

import ChatPage from '@/features/Chat/ChatPage';
import chatManagerInstance from '@/features/Chat/utils/chatManager';

export default function Landing() {
    console.log(`in the landing page`);
    const newChatID = chatManagerInstance.createChat();
    return (
        <Suspense fallback={null}>
            <ChatPage chatID={newChatID} />
        </Suspense>
    );
}

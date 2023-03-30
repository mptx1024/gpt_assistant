import { useRouter } from 'next/router';
import { Suspense, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { setMessages } from '@/features/Chat/chatSlice';
import ChatManagerInstance, { ChatManager } from '@/features/Chat/utils/chatManager';

import ChatPage from '@/features/Chat/ChatPage';

export default function DynamicChatPage() {
    const router = useRouter();
    const { id } = router.query;
    const chatManager = useRef<ChatManager>(ChatManagerInstance);
    console.log(`in DynamicChatPage`);

    chatManager.current.getChat(id as string);
    // useEffect(() => {
    // }, []);

    if (typeof id !== 'string') {
        return null;
    }
    // return  <ChatPage chatID={id} /> : <div>Loading...</div>;

    return (
        <Suspense fallback={null}>
            <ChatPage chatID={id} />
        </Suspense>
    );
}

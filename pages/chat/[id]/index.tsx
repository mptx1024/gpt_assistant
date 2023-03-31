import { useRouter } from 'next/router';
import { Suspense, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import ChatManagerInstance, { ChatManager } from '@/features/Chat/utils/chatManager';

import ChatPage from '@/features/Chat/ChatPage';

export default function DynamicChatPage() {
    const router = useRouter();
    const { id } = router.query;
    
    if (typeof id !== 'string') {
        return null;
    }

    return (
        <Suspense fallback={null}>
            <ChatPage chatID={id} />
        </Suspense>
    );
}

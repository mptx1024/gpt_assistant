import { Suspense, useEffect } from 'react';

import ChatPage from '@/features/Chat/ChatPage';
import { useAppDispatch } from '@/store/hooks';
import { setOne } from '@/store/chatsSlice';
import { Chat } from '@/types';
import { v4 as uuid } from 'uuid';

export default function Landing() {
    console.log(`in the landing page`);

    const dispatch = useAppDispatch();
    const newChat: Chat = {
        id: uuid(),
        messages: [],
        created: Date.now(),
    };
    useEffect(() => {
        dispatch(setOne(newChat));
    }, []);
    return (
        <Suspense fallback={null}>
            <ChatPage chatID={newChat.id} />
        </Suspense>
    );
}

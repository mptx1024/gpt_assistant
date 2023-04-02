import { Suspense, useEffect, useState } from 'react';
import ChatPage from '@/features/Chat/ChatPage';
import { useAppDispatch } from '@/store/hooks';
import { setOne, setAll } from '@/store/chatsSlice';
import { Chat } from '@/types';
import { v4 as uuid } from 'uuid';

export default function Landing() {
    const [newChat, setNewChat] = useState<string>();
    console.log(`in landing page`);

    const dispatch = useAppDispatch();

    useEffect(() => {
        const newChat: Chat = {
            id: uuid(),
            messages: [],
            created: Date.now(),
        };
        setNewChat(newChat.id);
        dispatch(setOne(newChat));
        console.log(`in the landing page; new chat: ${newChat.id}`);
    }, []);
    if (!newChat) {
        return <div>loading...</div>;
    }
    return <ChatPage chatID={newChat} />;
}

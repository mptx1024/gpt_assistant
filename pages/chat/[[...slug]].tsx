import { Suspense, useEffect, useState } from 'react';
import ChatPage from '@/features/Chat/ChatPage';
import { useAppDispatch } from '@/store/hooks';
import { setOne, setAll } from '@/store/chatsSlice';
import { Chat } from '@/types';
import { v4 as uuid } from 'uuid';

export default function Landing() {
    const [newChat, setNewChat] = useState<string>('');

    const dispatch = useAppDispatch();

    useEffect(() => {
        const newChat: Chat = {
            id: uuid(),
            messages: [],
            created: Date.now(),
        };
        setNewChat(newChat.id);
        dispatch(setOne(newChat));
    }, [dispatch]);
    if (!newChat) {
        return <div>loading...</div>;
    }
    return <ChatPage chatID={newChat} />;
}

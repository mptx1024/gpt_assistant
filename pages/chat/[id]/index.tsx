import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import ChatPage from '@/features/Chat/ChatPage';
import { RootState } from '@/store';
import { selectChatById } from '@/store/chatsSlice';
export default function DynamicChatPage() {
    const router = useRouter();
    const id = useSelector((store: RootState) => store.chats.currentChatID);
    const chat = useSelector((state: RootState) => selectChatById(state, id as string));
    if (!chat) {
        router.push('/role');
        return null;
    }

    return <ChatPage chat={chat} />;
}

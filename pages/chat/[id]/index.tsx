import { useRouter } from 'next/router';
import { selectChatById } from '@/store/chatsSlice';
import { useSelector } from 'react-redux';
import { RootState, store } from '@/store';
import ChatPage from '@/features/Chat/ChatPage';
import { Chat } from '@/types';
export default function DynamicChatPage() {
    const router = useRouter();
    const { id } = router.query;
    const chat = useSelector((state: RootState) => selectChatById(state, id as string));
    if (!chat) {
        router.push('/role');
        return null;
    }

    return <ChatPage chat={chat} />;
}

import { FC } from 'react';

import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { RootState } from '@/store';
import { Chat } from '@/types';

import ChatItem from './ChatItem';

interface ChatListProps {
    chats: Chat[] | null;
}

const ChatList: FC<ChatListProps> = ({ chats }) => {
    const router = useRouter();

    const currentChatID = useSelector((state: RootState) => state.chats.currentChat.id);

    return (
        <div className="scrollbar dark:scrollbarDark mb-3 flex h-[60%] flex-col gap-2 overflow-y-auto py-2">
            {chats?.map((chat) => (
                <ChatItem
                    key={chat.id}
                    chat={chat}
                    currentChatID={currentChatID}
                />
            ))}
        </div>
    );
};

export default ChatList;


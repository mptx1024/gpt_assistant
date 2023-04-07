import { FC, useState, useRef, useEffect } from 'react';
import { Chat } from '@/types';
import ChatItem from './ChatItem';

interface ChatListProps {
    chats: Chat[] | null;
    isSidebarOpen: boolean;
}

const ChatList: FC<ChatListProps> = ({ chats, isSidebarOpen }) => {
    const [currentChat, setCurrentChat] = useState<string>('');

    return (
        <div
            className={`flex flex-col-reverse gap-2 my-2 
        transition-transform  ease-in duration-300 ${
            isSidebarOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
        } `}
        >
            {chats?.map((chat) => (
                <ChatItem key={chat.id} chat={chat} currentChat={currentChat} setCurrentChat={setCurrentChat} />
            ))}
        </div>
    );
};

export default ChatList;

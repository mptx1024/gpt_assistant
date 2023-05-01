import { FC, useState, useRef, useEffect } from 'react';
import { Chat } from '@/types';
import ChatItem from './ChatItem';

interface ChatListProps {
    chats: Chat[] | null;
}

const ChatList: FC<ChatListProps> = ({ chats }) => {
    const [currentChat, setCurrentChat] = useState<string>('');

    return (
        <div className='debug-1 flex flex-col gap-2 my-2 h-1/2'>
            {chats?.map((chat) => (
                <ChatItem key={chat.id} chat={chat} currentChat={currentChat} setCurrentChat={setCurrentChat} />
            ))}
        </div>
    );
};

export default ChatList;

// transition-transform  ease-in duration-300 ${
//     isSidebarOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
// }

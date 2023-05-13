import { FC, useState } from 'react';

import { Chat } from '@/types';

import ChatItem from './ChatItem';

interface ChatListProps {
    chats: Chat[] | null;
}

const ChatList: FC<ChatListProps> = ({ chats }) => {
    const [currentChat, setCurrentChat] = useState<string>('');

    return (
        <div className="flex h-3/5 flex-col gap-2 overflow-y-auto overflow-x-clip py-1">
            {chats?.map((chat) => (
                <ChatItem
                    key={chat.id}
                    chat={chat}
                    currentChat={currentChat}
                    setCurrentChat={setCurrentChat}
                />
            ))}
        </div>
    );
};

export default ChatList;

// transition-transform  ease-in duration-300 ${
//     isSidebarOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
// }

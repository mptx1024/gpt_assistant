import { FC, useState, useRef, useEffect } from 'react';
import { Chat } from '@/types';
import ChatItem from './ChatItem';


interface ChatListProps {
    chats: Chat[] | null;
}

const ChatList: FC<ChatListProps> = ({ chats }) => {
    const [currentChat, setCurrentChat] = useState<string>('');

    return (
        <div className='flex flex-col-reverse gap-2 my-2 '>
            {chats?.map((chat) => (
                <ChatItem key={chat.id} chat={chat} currentChat={currentChat} setCurrentChat={setCurrentChat} />
            ))}
        </div>
    );
};

export default ChatList;

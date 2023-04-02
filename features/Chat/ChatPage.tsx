import { useEffect, useState, useRef, memo } from 'react';
import Input from './Input';
import ChatMessage from './ChatMessage';
import { Message } from '@/types';
import { selectChatById } from '@/store/chatsSlice';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

function ChatPage({ chatID }: { chatID: string }) {
    let messages: Message[] = useSelector((state: RootState) => selectChatById(state, chatID)?.messages || []);

    return (
        <div>
            {messages.length === 0 ? (
                <div>new msg. show home page stuff</div>
            ) : (
                <div>
                    {messages.map((message, index) => (
                        <ChatMessage key={index} message={message.content} />
                    ))}
                </div>
            )}
            <Input chatID={chatID} />
        </div>
    );
}
export default memo(ChatPage);

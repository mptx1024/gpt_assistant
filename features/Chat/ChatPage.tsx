import { useEffect, useState, useRef, memo } from 'react';
import Input from './Input';
import ChatMessage from './ChatMessage';
import { Message } from '@/types';
import { selectChatById } from '@/store/chatsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch, } from '@/store';

function ChatPage({ chatID }: { chatID: string }) {
    let messages: Message[] = useSelector((state: RootState) => selectChatById(state, chatID)?.messages || []);

    return (
        <div>
            {messages.length === 0 ? (
                <div>No messages yet</div>
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

import { useEffect, useState, useRef, memo } from 'react';
import Input from './Input';
import ChatMessage from './ChatMessage';
import ChatManagerInstance, { ChatManager } from './utils/chatManager';
import { UserSubmitMessage, Message } from '@/types';

import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { setMessages } from './chatSlice';

function ChatPage({ chatID }: { chatID: string }) {
    const [userInput, setUserInput] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const chatManager = useRef<ChatManager>(ChatManagerInstance);

    const messages = useSelector((state: RootState) => {
        console.log('in useSelector');
        return state.chat.messages;
    });

    const handleSubmit = async () => {
        await chatManager.current.generateReply({ chatID, content: userInput });
        setUserInput('');
    };

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
            <Input handleSubmit={handleSubmit} setUserInput={setUserInput} userInput={userInput} />
        </div>
    );
}
export default memo(ChatPage);

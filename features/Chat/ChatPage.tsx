import { useEffect, useState, useRef, memo } from 'react';
import Input from './Input';
import ChatMessage from './ChatMessage';
import ChatManagerInstance, { ChatManager } from './utils/chatManager';
import { UserSubmitMessage, Message } from '@/types';
import { setMessages } from './chatSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';

function ChatPage({ chatID }: { chatID: string }) {
    console.log('🚀 ~ file: ChatPage.tsx:11 ~ ChatPage ~ chatID:', chatID);
    const [userInput, setUserInput] = useState('');
    const chatManager = useRef<ChatManager>(ChatManagerInstance);
    console.log(`chatManger.chats.size: ${chatManager.current.chats.size}`);

    const dispatch = useDispatch<AppDispatch>();
    const messages = useSelector((state: RootState) => state.chat.messages);

    const updateMessages = (newMessages: Message[]) => {
        dispatch(setMessages(newMessages));
    };

    const handleSubmit = async () => {
        await chatManager.current.generateReply({ chatID, content: userInput }, updateMessages);
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

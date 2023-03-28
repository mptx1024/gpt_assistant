import { useEffect, useState } from 'react';
import { Chat, Message } from '@/types';
import Input from './Input';
import ChatMessage from './ChatMessage';
import useChat from './hooks/useChat';

export default function ChatPage({ chatId }: { chatId: string | undefined }) {
    const { generatedMessage, loading, generate } = useChat({ chatId });
    const [userInput, setUserInput] = useState('');

    const handleSubmit = () => {
        console.log(`user input: ${userInput}`);

        generate({ userInput });
        setUserInput('');
    };
    return (
        <div>
            Chat
            <ChatMessage message={generatedMessage} />
            <Input handleSubmit={handleSubmit} setUserInput={setUserInput} userInput={userInput} />
        </div>
    );
}

//     const markdown = `Here is some JavaScript code:
// ~~~js
// console.log('It works!')
// ~~~
// `;

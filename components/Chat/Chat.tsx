import { useEffect } from 'react';
import { Chat, Message } from '@/types';
import ChatMessage from './ChatMessage';
import useChat from './useChat';



export default function ChatPage() {
    //     const markdown = `Here is some JavaScript code:
    // ~~~js
    // console.log('It works!')
    // ~~~
    // `;

    
    const { generatedMessage, loading, generate } = useChat();
    const run = async () => {
        console.log(`generatedMessage before: ${generatedMessage}`);
        await generate();
        console.log(`generatedMessage after: ${generatedMessage}`);
    };

    return (
        <div>
            Chat
            <ChatMessage message={generatedMessage} />
            <button onClick={run}>Generate</button>
        </div>
    );
}

import { useState } from 'react';
import { Chat, Message, OpenAIMessage } from '@/types';
import { v4 as uuid } from 'uuid';

interface UseChatResult {
    generatedMessage: string;
    loading: boolean;
    generate: ({ userInput }: { userInput: string }) => Promise<void>;
}
interface Props {
    chatId: string | undefined;
}
// https://stackoverflow.com/questions/65688201/react-custom-hook-cant-get-an-async-function
// use useRef to get a reference to the generated message
export default function useChat({ chatId }: Props): UseChatResult {
    const [generatedMessage, setGeneratedMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    let currentChat: Chat;
    currentChat = {
        id: uuid(),
        messages: [],
        created: Date.now(),
    };
    // if (!chatId) {
    //     // create new chat
    //     // save to idb
    // } else {
    //     // load existing chat from idb
    // }

    // generate reply message
    const generate = async ({ userInput }: { userInput: string }): Promise<void> => {
        const prompt = 'write a c++ hello world program';
        console.log('🚀 ~ file: useChat.ts:29 ~ generate ~ userInput:', userInput);
        // create a new message
        const message: Message = {
            id: Date.now().toString(),
            chatID: chatId ?? '',
            timestamp: Date.now(),
            role: 'user',
            content: userInput,
        };

        // Update currentChat
        currentChat?.messages.push(message);

        setLoading(true);
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                currentChat,
            }),
        });

        if (!response.ok) {
            console.log(`woops.. ${response.statusText}`);
            throw new Error(response.statusText);
        }
        // This data is a ReadableStream
        const data = response.body;
        if (!data) {
            return;
        }

        const reader = data.getReader();
        const decoder = new TextDecoder();
        let done = false;

        while (!done) {
            const { value, done: doneReading } = await reader.read();
            done = doneReading;
            const chunkValue = decoder.decode(value);
            setGeneratedMessage((prev) => prev + chunkValue);
        }
        setLoading(false);

        // create a new message for the reply
        // const message: Message = {
        //     id: Date.now().toString(),
        //     chatID: chatId ?? '',
        //     timestamp: Date.now(),
        //     role: 'user',
        //     content: userInput,
        // };
    };

    return {
        generatedMessage,
        loading,
        generate,
    };
}

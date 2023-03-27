import { useState } from 'react';
import { Chat } from '@/types';
interface UseChatResult {
    generatedMessage: string;
    loading: boolean;
    generate: () => void;
}
interface Props {
    currentChat: Chat;
}
// https://stackoverflow.com/questions/65688201/react-custom-hook-cant-get-an-async-function
// use useRef to get a reference to the generated message
export default function useChat(): UseChatResult {
    const [generatedMessage, setGeneratedMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const prompt = 'write a python hello world program';

    const generate = async () => {
        setLoading(true);
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt,
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
    };

    return {
        generatedMessage,
        loading,
        generate,
    };
}

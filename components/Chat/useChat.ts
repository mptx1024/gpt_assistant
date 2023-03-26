import { useState } from 'react';

interface UseChatResult {
    generatedMessage: string;
    loading: boolean;
    generate: () => void;
}

export default function useChat(): UseChatResult {
    const [generatedMessage, setGeneratedMessage] = useState<string>('old');
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

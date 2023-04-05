import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Chat, Message, UserSubmitMessage, OpenAIMessage } from '@/types';
import { RootState, AppDispatch, store } from '@/store';
import {
    setAll,
    setOne,
    selectChatById,
    selectAllChats,
    addSingleMessage,
    updateSingleMessage,
} from '@/store/chatsSlice';

interface UseChatResult {
    generatedMessage: string;
    loading: boolean;
    generateReply: (userInput: UserSubmitMessage) => void;
}
interface Props {
    chatID: string | undefined;
}
// https://stackoverflow.com/questions/65688201/react-custom-hook-cant-get-an-async-function
// use useRef to get a reference to the generated message
export default function useChat({ chatID }: Props): UseChatResult {
    const [generatedMessage, setGeneratedMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    let currentChat: Chat;
    currentChat = {
        id: uuid(),
        messages: [],
        created: Date.now(),
    };

    // generate reply message
    const generateReply = async (userInput: UserSubmitMessage) => {
        const { chatID, content } = userInput;
        const userMessage: Message = {
            id: uuid(),
            chatID,
            timestamp: Date.now(),
            role: 'user',
            content: content,
        };
        store.dispatch(addSingleMessage({ chatID, message: userMessage }));

        const currentChat = selectChatById(store.getState(), chatID);
        console.log('🚀 ~ file: chatManager.ts:35 ~ ChatManager ~ generateReply ~ currentChat:', currentChat);

        setLoading(true);
        
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(currentChat),
        });

        if (!response.ok) {
            console.log(`woops.. ${response.statusText}`);
            throw new Error(response.statusText);
        }

        let reply: Message = {
            id: uuid(),
            chatID: chatID,
            timestamp: Date.now(),
            role: 'assistant',
            content: '',
        };
        store.dispatch(addSingleMessage({ chatID, message: reply }));

        // This data is a ReadableStream
        const data: ReadableStream<Uint8Array> | undefined | null = response.body;
        if (!data) {
            throw new Error('Server error');
        }
        const reader: ReadableStreamDefaultReader<Uint8Array> = data?.getReader();
        const decoder = new TextDecoder();
        let done = false;

        while (!done) {
            const { value, done: doneReading } = await reader.read();
            done = doneReading;
            const chunkValue = decoder.decode(value);

            store.dispatch(updateSingleMessage({ chatID, chunkValue }));
        }

        // await this.save();
    };

    return {
        generatedMessage,
        loading,
        generateReply,
    };
}

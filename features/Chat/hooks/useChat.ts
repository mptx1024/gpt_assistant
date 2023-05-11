import { useRef } from 'react';

import { v4 as uuid } from 'uuid';

import { store } from '@/store';
import {
    selectChatById,
    addSingleMessage,
    updateSingleMessage,
    deleteMessageUpTo,
} from '@/store/chatsSlice';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { getApiKey } from '@/store/settingSlice';
import { Message } from '@/types';
import { errorMessage } from '@/utils/config';

interface UseChatResult {
    // generatedMessage: string;
    isLoading: boolean;
    generateReply: (userInput: string) => void;
    regenerate: () => void;
    setStopGenerating: () => void;
}
interface Props {
    chatID: string;
}

export default function useChat({ chatID }: Props): UseChatResult {
    const isLoadingRef = useRef<boolean>(false);
    const stopGeneratingRef = useRef<boolean>(false);
    const apiKey = useAppSelector(getApiKey);
    const dispatch = useAppDispatch();
    const setStopGenerating = () => {
        stopGeneratingRef.current = true;
    };
    const regenerate = async () => {
        const currentChat = selectChatById(store.getState(), chatID);
        const lastUserInput = currentChat?.messages[currentChat.messages.length - 2];
        if (lastUserInput && lastUserInput.role === 'user') {
            dispatch(deleteMessageUpTo({ message: lastUserInput }));
            generateReply(lastUserInput.content);
        }
    };

    const generateReply = async (userInput: string) => {
        isLoadingRef.current = true;

        const userMessage: Message = {
            id: uuid(),
            chatID,
            timestamp: Date.now(),
            role: 'user',
            content: userInput,
        };

        dispatch(addSingleMessage({ chatID, message: userMessage }));

        const currentChat = selectChatById(store.getState(), chatID);

        const response = await fetch('/api/generateReply', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ currentChat, apiKey }),
        });

        const reply: Message = {
            id: uuid(),
            chatID: chatID,
            timestamp: Date.now(),
            role: 'assistant',
            content: '',
        };
        dispatch(addSingleMessage({ chatID, message: reply }));

        if (!response.ok) {
            if (response.status === 401) {
                dispatch(updateSingleMessage({ chatID, chunkValue: errorMessage.unauthorizedMsg }));
            } else if (response.status === 400) {
                dispatch(updateSingleMessage({ chatID, chunkValue: errorMessage.badRequestMsg }));
            } else {
                dispatch(updateSingleMessage({ chatID, chunkValue: errorMessage.serverErrorMsg }));
            }
            return;
        }

        // This data is a ReadableStream
        const data: ReadableStream<Uint8Array> | undefined | null = response.body;
        if (!data) {
            throw new Error('Server error');
        }
        const reader: ReadableStreamDefaultReader<Uint8Array> = data?.getReader();
        const decoder = new TextDecoder();
        let done = false;

        while (!done) {
            if (stopGeneratingRef.current) {
                break;
            }
            const { value, done: doneReading } = await reader.read();
            done = doneReading;
            const chunkValue = decoder.decode(value);
            dispatch(updateSingleMessage({ chatID, chunkValue }));
        }

        isLoadingRef.current = false;
        stopGeneratingRef.current = false;
    };

    return {
        // generatedMessage,
        isLoading: isLoadingRef.current,
        generateReply,
        regenerate,
        setStopGenerating,
    };
}

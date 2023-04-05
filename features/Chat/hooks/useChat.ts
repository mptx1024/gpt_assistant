import { useState, useRef, useCallback, useEffect, Dispatch, SetStateAction } from 'react';
import { v4 as uuid } from 'uuid';
import { Chat, Message, UserSubmitMessage, OpenAIMessage } from '@/types';
import { RootState, AppDispatch, store } from '@/store';
import { useAppSelector, useAppDispatch } from '@/store/hooks';

import {
    setAll,
    setOne,
    selectChatById,
    selectAllChats,
    addSingleMessage,
    updateSingleMessage,
    deleteMessageUpTo,
} from '@/store/chatsSlice';

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
    const dispatch = useAppDispatch();
    const setStopGenerating = () => {
        stopGeneratingRef.current = true;
    };
    const regenerate = async () => {
        const currentChat = selectChatById(store.getState(), chatID);
        let lastUserInput = currentChat?.messages[currentChat.messages.length - 2];
        if (lastUserInput && lastUserInput.role === 'user') {
            dispatch(deleteMessageUpTo({ message: lastUserInput }));
            generateReply(lastUserInput.content);
        }
    };

    const generateReply = async (userInput: string) => {
        const userMessage: Message = {
            id: uuid(),
            chatID,
            timestamp: Date.now(),
            role: 'user',
            content: userInput,
        };
        dispatch(addSingleMessage({ chatID, message: userMessage }));

        const currentChat = selectChatById(store.getState(), chatID);
        console.log('🚀 ~ file: chatManager.ts:35 ~ ChatManager ~ generateReply ~ currentChat:', currentChat);

        isLoadingRef.current = true;

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
            if (stopGeneratingRef.current) {
                break;
            }
            const { value, done: doneReading } = await reader.read();
            done = doneReading;
            const chunkValue = decoder.decode(value);
            store.dispatch(updateSingleMessage({ chatID, chunkValue }));
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

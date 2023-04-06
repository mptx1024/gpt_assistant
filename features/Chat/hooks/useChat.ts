import { useState, useRef, useCallback, useEffect, Dispatch, SetStateAction } from 'react';
import { v4 as uuid } from 'uuid';
import { Chat, Message, UserSubmitMessage, OpenAIMessage } from '@/types';
import { RootState, AppDispatch, store } from '@/store';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { selectApiKey } from '@/store/apiKeySlice';

import {
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
    const apiKey = useAppSelector(selectApiKey);
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

        const response = await fetch('/api/generate', {
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
                const unauthorizedMsg = `It seems the API key you entered can't be authorized by OpenAI server. Please make sure you've entered a valid OpenAI API key and try again 🙏🏼`;
                dispatch(updateSingleMessage({ chatID, chunkValue: unauthorizedMsg }));
            } else {
                const serverErrorMsg = `Oops.. it seems there is an error on the OpenAI server 🙈 Please try again later.`;
                dispatch(updateSingleMessage({ chatID, chunkValue: serverErrorMsg }));
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

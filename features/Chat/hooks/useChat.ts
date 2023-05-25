import { useCallback, useRef, useState } from 'react';

import { v4 as uuid } from 'uuid';

import { store } from '@/store';
import { removeMessageUpTo, selectChatById } from '@/store/chatsSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
    addMessage,
    selectChatMessages,
    selectMessageById,
    setIsLoading,
    updateMessage,
} from '@/store/messagesSlice';
import { getApiKey } from '@/store/settingSlice';
import { Message } from '@/types';
import { errorMessage } from '@/utils/config';

interface Props {
    chatId: string;
}

export default function useChat({ chatId }: Props) {
    const stopGeneratingRef = useRef<boolean>(false);
    const apiKey = useAppSelector(getApiKey);
    const dispatch = useAppDispatch();
    const [userInput, setUserInput] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const setStopGenerating = () => {
        stopGeneratingRef.current = true;
    };

    const generateReply = async (userInput: string) => {
        const userMessage: Message = {
            id: uuid(),
            chatId,
            created: Date.now(),
            role: 'user',
            content: userInput,
        };
        dispatch(addMessage(userMessage));

        const chat = selectChatById(store.getState(), chatId);
        const OpenAIMessages = selectChatMessages(store.getState(), chatId);
        console.log('🚀 ~ file: useChat.ts:65 ~ generateReply ~ OpenAIMessages:', OpenAIMessages);

        const response = await fetch('/api/generateReply', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ chat, OpenAIMessages, apiKey }),
        });

        const reply: Message = {
            id: uuid(),
            chatId,
            created: Date.now(),
            role: 'assistant',
            content: '',
            isFirst: chat?.messages.length === 1 ? true : false, // first api reply (for generating title)
        };
        dispatch(addMessage(reply));
        dispatch(setIsLoading({ status: true, messageId: reply.id }));

        if (!response.ok) {
            let errorMsg;
            if (response.status === 401) {
                errorMsg = errorMessage.unauthorizedMsg;
            } else if (response.status === 400) {
                errorMsg = errorMessage.badRequestMsg;
            } else {
                errorMsg = errorMessage.serverErrorMsg;
            }
            store.dispatch(updateMessage({ messageId: reply.id, chunkValue: errorMsg }));
            return;
        }
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
            dispatch(updateMessage({ messageId: reply.id, chunkValue }));
        }
        dispatch(setIsLoading({ status: false, messageId: reply.id }));
        stopGeneratingRef.current = false;
    };
    // const memorizedGenerateReply = useCallback(
    //     async (userInput: string) => {
    //         setLoading(true);
    //         setUserInput('');
    //         await generateReply(userInput);
    //         setLoading(false);
    //     },
    //     [chatId]
    // );

    const regenerate = useCallback(
        async (chatId: string) => {
            const chat = selectChatById(store.getState(), chatId);
            const lastUserMessageId = chat?.messages[chat.messages.length - 2];
            if (lastUserMessageId) {
                const lastUserMessage = selectMessageById(store.getState(), lastUserMessageId);
                dispatch(removeMessageUpTo({ messageId: lastUserMessageId }));
                if (lastUserMessage) await memorizedGenerateReply(lastUserMessage.content);
            }
        },
        [chatId]
    );

    const memorizedGenerateReply = useCallback(
        async (userInput: string) => {
            setLoading(true);
            setUserInput('');
            await generateReply(userInput);
            setLoading(false);
        },
        [chatId]
    );

    const handleClickSubmit = async (e: React.MouseEvent | React.KeyboardEvent) => {
        e.preventDefault();
        memorizedGenerateReply(userInput);
    };
    const handleClickRegenerate = (e: React.MouseEvent) => {
        e.preventDefault();
        regenerate(chatId);
    };

    return {
        // generatedMessage,
        // isLoading,
        loading,
        generateReply,
        regenerate,
        setStopGenerating,
        userInput,
        setUserInput,
        apiKey,
        handleClickSubmit,
        handleClickRegenerate,
    };
}

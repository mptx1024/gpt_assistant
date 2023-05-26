import { useCallback, useState } from 'react';

import { v4 as uuid } from 'uuid';

import { store } from '@/store';
import { removeMessageUpTo, selectChatById } from '@/store/chatsSlice';
import { useAppSelector } from '@/store/hooks';
import {
    addMessage,
    selectChatMessages,
    selectMessageById,
    setIsLoading,
    updateMessage,
} from '@/store/messagesSlice';
import { getApiKey } from '@/store/settingSlice';
import { Message } from '@/types';
import { abortController } from '@/utils/chats';
import { errorMessage } from '@/utils/config';

interface Props {
    chatId: string;
}

export default function useChat({ chatId }: Props) {
    // console.log(`in useChat. chatId: ${chatId}`);

    // const controller = useRef(new AbortController()); // Now each useChat has its own AbortController

    const apiKey = useAppSelector(getApiKey);
    // const dispatch = useAppDispatch();
    const [userInput, setUserInput] = useState<string>('');
    const loading = useAppSelector((state) => state.messages.loading.status);
    // const stopGeneratingRef = useRef<boolean>(false);
    // const setStopGenerating = () => {
    //     stopGeneratingRef.current = true;
    // };
    interface generateReplyProp {
        chatId: string;
        userInput: string;
        apiKey: string;
        onController?: (controller: AbortController) => void;
    }
    const generateReply = async function ({
        chatId,
        userInput,
        apiKey,
        onController,
    }: generateReplyProp) {
        const userMessage: Message = {
            id: uuid(),
            chatId,
            created: Date.now(),
            role: 'user',
            content: userInput,
        };
        store.dispatch(addMessage(userMessage));

        const chat = selectChatById(store.getState(), chatId);
        console.log(`chat: ${JSON.stringify(chat)}`);

        const OpenAIMessages = selectChatMessages(store.getState(), chatId);
        // console.log('🚀 ~ file: useChat.ts:65 ~ generateReply ~ OpenAIMessages:', OpenAIMessages);
        const controller = new AbortController();
        onController?.(controller);
        const response = await fetch('/api/generateReply', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ chat, OpenAIMessages, apiKey }),
            signal: controller.signal,
        });
        try {
            const reply: Message = {
                id: uuid(),
                chatId,
                created: Date.now(),
                role: 'assistant',
                content: '',
                isFirst: chat?.messages.length === 1 ? true : false, // first api reply (for generating title)
            };
            store.dispatch(addMessage(reply));
            store.dispatch(setIsLoading({ status: true, messageId: reply.id }));

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
            console.log(`contorller.signal: ${controller.signal.aborted}`);

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
                store.dispatch(updateMessage({ messageId: reply.id, chunkValue }));
            }
            store.dispatch(setIsLoading({ status: false, messageId: reply.id }));
            // stopGeneratingRef.current = false;
        } catch (err: any) {
            if (err.name === 'TimeoutError') {
                console.error('Timeout: It took more than 5 seconds to get the result!');
            } else if (err.name === 'AbortError') {
                console.error(
                    'Fetch aborted by user action (browser stop button, closing tab, etc.'
                );
            } else if (err.name === 'TypeError') {
                console.error('AbortSignal.timeout() method is not supported');
            } else {
                // A network error, or some other problem.
                console.error(`Error: type: ${err.name}, message: ${err.message}`);
            }
        }
    };
    const memorizedGenerateReply = useCallback(
        async (chatId: string, userInput: string, apiKey: string) => {
            setUserInput('');
            await generateReply({
                chatId,
                userInput,
                apiKey,
                onController(controller) {
                    abortController.setController(chatId, controller);
                },
            });
        },
        [chatId]
    );
    const memorizedRegenerate = useCallback(
        async (chatId: string) => {
            const chat = selectChatById(store.getState(), chatId);
            const lastUserMessageId = chat?.messages[chat.messages.length - 2];
            if (lastUserMessageId) {
                const lastUserMessage = selectMessageById(store.getState(), lastUserMessageId);
                store.dispatch(removeMessageUpTo({ messageId: lastUserMessageId }));
                if (lastUserMessage)
                    await memorizedGenerateReply(chatId, lastUserMessage.content, apiKey);
            }
        },
        [chatId]
    );

    const handleClickSubmit = async (e: React.MouseEvent | React.KeyboardEvent) => {
        e.preventDefault();
        await memorizedGenerateReply(chatId, userInput, apiKey);
    };
    const handleClickRegenerate = (e: React.MouseEvent) => {
        e.preventDefault();
        memorizedRegenerate(chatId);
    };
    const handleInputChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
        setUserInput(e.currentTarget.value);
    };

    function stopGenerating(e: React.MouseEvent) {
        e.preventDefault();
        abortController.stop(chatId);
        // stopGeneratingRef.current = true;
        // controller.current.abort();
        // controller.current = new AbortController(); // create a new controller after aborting
    }
    return {
        generateReply,
        // setStopGenerating,
        userInput,
        apiKey,
        handleClickSubmit,
        handleClickRegenerate,
        handleInputChange,
        setUserInput,
        stopGenerating,
        loading,
    };
}

import Router from 'next/router';
import { v4 as uuid } from 'uuid';

import { store } from '@/store';
import { addChat, setCurrentChat } from '@/store/chatsSlice';
import { getAppSetting } from '@/store/settingSlice';
import { Chat, Role } from '@/types';
export const copyToClipboard = async (
    text: string,
    setIsCopied: (value: boolean) => void
): Promise<void> => {
    try {
        await navigator.clipboard.writeText(text);
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 1500);
    } catch (err) {
        console.error('Failed to copy text: ', err);
    }
};

export const createNewChat = (selectedRole?: Role): string => {
    const appSetting = getAppSetting(store.getState());
    const newChat: Chat = {
        id: uuid(),
        messages: [],
        title: selectedRole ? selectedRole.roleName : 'New Chat',
        created: Date.now(),
        role: selectedRole ? selectedRole : appSetting.defaultRole,
        modelParams: appSetting.defaultModelParams,
    };
    store.dispatch(addChat(newChat));
    store.dispatch(setCurrentChat(newChat.id));
    Router.push(`/chat/${newChat.id}`, undefined, { shallow: true });
    return newChat.id;
};

export const createTitle = async (content: string) => {
    const apiKey = store.getState().setting.apiKey;
    const response = await fetch('/api/generateTitle', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content, apiKey }),
    });
    if (!response.ok) {
        throw new Error(response.statusText, { cause: response.status });
    }
    const data = await response.json();
    // console.log('🚀 ~ file: chats.ts:52 ~ createTitle ~ data:', data);
    //stringify?
    return data.choices[0].message.content;
};

export const abortController = {
    controllers: new Map(),
    setController(id: string, controller: AbortController) {
        console.log(`In setController: ${id}`);

        this.controllers.set(id, controller);
    },
    stop(id: string) {
        console.log(`In stop: ${id}`);
        this.controllers.get(id)?.abort();
    },
    remove(id: string) {
        this.controllers.delete(id);
    },
};

// const generateReply = async (chatId: string, userInput: string, apiKey: string) => {
//     const userMessage: Message = {
//         id: uuid(),
//         chatId,
//         created: Date.now(),
//         role: 'user',
//         content: userInput,
//     };
//     store.dispatch(addMessage(userMessage));

//     const chat = selectChatById(store.getState(), chatId);
//     const OpenAIMessages = selectChatMessages(store.getState(), chatId);
//     console.log('🚀 ~ file: useChat.ts:65 ~ generateReply ~ OpenAIMessages:', OpenAIMessages);

//     const response = await fetch('/api/generateReply', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ chat, OpenAIMessages, apiKey }),
//     });

//     const reply: Message = {
//         id: uuid(),
//         chatId,
//         created: Date.now(),
//         role: 'assistant',
//         content: '',
//         isFirst: chat?.messages.length === 1 ? true : false, // first api reply (for generating title)
//     };
//     store.dispatch(addMessage(reply));
//     store.dispatch(setIsLoading({ status: true, messageId: reply.id }));

//     if (!response.ok) {
//         let errorMsg;
//         if (response.status === 401) {
//             errorMsg = errorMessage.unauthorizedMsg;
//         } else if (response.status === 400) {
//             errorMsg = errorMessage.badRequestMsg;
//         } else {
//             errorMsg = errorMessage.serverErrorMsg;
//         }
//         store.dispatch(updateMessage({ messageId: reply.id, chunkValue: errorMsg }));
//         return;
//     }
//     const data: ReadableStream<Uint8Array> | undefined | null = response.body;
//     if (!data) {
//         throw new Error('Server error');
//     }
//     const reader: ReadableStreamDefaultReader<Uint8Array> = data?.getReader();
//     const decoder = new TextDecoder();
//     let done = false;

//     while (!done) {
//         if (stopGeneratingRef.current) {
//             break;
//         }
//         const { value, done: doneReading } = await reader.read();
//         done = doneReading;
//         const chunkValue = decoder.decode(value);
//         store.dispatch(updateMessage({ messageId: reply.id, chunkValue }));
//     }
//     store.dispatch(setIsLoading({ status: false, messageId: reply.id }));
//     stopGeneratingRef.current = false;
// };
// const memorizedGenerateReply = useCallback(
//     async (chatId: string, userInput: string, apiKey: string) => {
//         setLoading(true);
//         setUserInput('');
//         await generateReply(chatId, userInput, apiKey);
//         setLoading(false);
//     },
//     [chatId]
// );
// const memorizedRegenerate = useCallback(
//     async (chatId: string) => {
//         const chat = selectChatById(store.getState(), chatId);
//         const lastUserMessageId = chat?.messages[chat.messages.length - 2];
//         if (lastUserMessageId) {
//             const lastUserMessage = selectMessageById(store.getState(), lastUserMessageId);
//             store.dispatch(removeMessageUpTo({ messageId: lastUserMessageId }));
//             if (lastUserMessage)
//                 await memorizedGenerateReply(chatId, lastUserMessage.content, apiKey);
//         }
//     },
//     [chatId]
// );

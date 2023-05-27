import Router from 'next/router';
import { v4 as uuid } from 'uuid';

import { store } from '@/store';
import { addChat, selectCurrentChat, setCurrentChat, setIsLoading } from '@/store/chatsSlice';
import { addMessage, selectChatMessages, updateMessage } from '@/store/messagesSlice';
import { getApiKey, getAppSetting } from '@/store/settingSlice';
import { Chat, Message, Role } from '@/types';
import { errorMessage } from './constant';

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

export interface generateReplyProp {
    userInput: string;
    onController?: (controller: AbortController) => void;
}
export const generateReply = async ({ userInput, onController }: generateReplyProp) => {
    const chat = selectCurrentChat(store.getState());
    const apiKey = getApiKey(store.getState());
    const chatId = chat!.id;
    store.dispatch(setIsLoading(true));

    const userMessage: Message = {
        id: uuid(),
        chatId,
        created: Date.now(),
        role: 'user',
        content: userInput,
    };
    store.dispatch(addMessage(userMessage));

    const OpenAIMessages = selectChatMessages(store.getState(), chat?.id);
    const controller = new AbortController();
    onController?.(controller);
    controller.signal.onabort = () => {
        store.dispatch(setIsLoading(false));
    };
    try {
        const response = await fetch('/api/generateReply', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ chat, OpenAIMessages, apiKey }),
            signal: controller.signal,
        });
        const reply: Message = {
            id: uuid(),
            chatId,
            created: Date.now(),
            role: 'assistant',
            content: '',
            isFirst: chat?.messages.length === 1 ? true : false, // first reply (for generating title)
        };
        store.dispatch(addMessage(reply));

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
            const { value, done: doneReading } = await reader.read();
            done = doneReading;
            const chunkValue = decoder.decode(value);
            store.dispatch(updateMessage({ messageId: reply.id, chunkValue }));
        }

        console.log(`done: ${done}; controller signal: ${controller.signal.aborted}`);
    } catch (err: any) {
        if (err.name === 'TimeoutError') {
            console.error('Timeout');
        } else if (err.name === 'AbortError') {
            console.error('Fetch aborted by user');
            // store.dispatch(setIsLoading({ status: false, messageId: reply.id }));
        } else if (err.name === 'TypeError') {
            console.error('AbortSignal.timeout() method is not supported');
        } else {
            // A network error, or some other problem.
            console.error(`Error: type: ${err.name}, message: ${err.message}`);
        }
    }

    store.dispatch(setIsLoading(false));
};

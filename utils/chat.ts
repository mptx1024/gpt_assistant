import Router from 'next/router';
import { v4 as uuid } from 'uuid';

import { store } from '@/store';
import {
    addChat,
    removeMessageUpTo,
    selectCurrentChat,
    setCurrentChat,
    setIsLoading,
} from '@/store/chatsSlice';
import {
    addMessage,
    selectChatMessages,
    selectMessageById,
    updateMessage,
} from '@/store/messagesSlice';
import { selectApiKey, selectAppSetting, selectattchedMsgCount } from '@/store/settingSlice';
import { Chat, Message, OpenAIStreamPayload, Role } from '@/types';

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
    const appSetting = selectAppSetting(store.getState());
    const newChat: Chat = {
        id: uuid(),
        messages: [],
        title: selectedRole ? selectedRole.roleName : 'New Chat',
        created: Date.now(),
        role: selectedRole ? selectedRole : appSetting.defaultRole,
        modelParams: appSetting.defaultModelParams,
    };
    console.log(`in createNewChat`);

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
    return data.choices[0].message.content;
};

export const abortController = {
    controllers: new Map(),
    setController(id: string, controller: AbortController) {
        this.controllers.set(id, controller);
    },
    stop(id: string) {
        this.controllers.get(id)?.abort();
        this.remove(id);
    },
    remove(id: string) {
        this.controllers.delete(id);
    },
};

export interface generateReplyProp {
    userInput: string;
    isRegenerate?: boolean;
    addController?: (controller: AbortController) => void;
}

export const generateReply = async ({
    userInput,
    isRegenerate,
    addController,
}: generateReplyProp) => {
    const chat = selectCurrentChat(store.getState());
    const attchedMsgCount = selectattchedMsgCount(store.getState());
    if (!chat) return;
    const apiKey = selectApiKey(store.getState());
    const chatId = chat!.id;
    // console.log(`in generateReply. chatID: ${chatId}`);

    const userMessage: Message = {
        id: uuid(),
        chatId,
        created: Date.now(),
        role: 'user',
        content: userInput,
    };
    const reply: Message = {
        id: uuid(),
        chatId,
        created: Date.now(),
        role: 'assistant',
        content: '',
        isFirst: chat?.messages.length === 0 && !isRegenerate ? true : false, // first reply
    };
    store.dispatch(addMessage(userMessage));
    store.dispatch(addMessage(reply));

    const OpenAIMessages = [
        { role: 'system', content: chat.role.prompt },
        ...selectChatMessages(store.getState(), chat?.id),
    ];

    //trim msg count
    if (OpenAIMessages.length > attchedMsgCount) {
        OpenAIMessages.splice(1, OpenAIMessages.length - attchedMsgCount);
    }
    const payload: OpenAIStreamPayload = {
        ...chat.modelParams,
        model: chat.modelParams.model.id,
        messages: OpenAIMessages,
    };
    const controller = new AbortController();
    addController?.(controller);
    controller.signal.onabort = () => {
        store.dispatch(setIsLoading(false));
    };
    store.dispatch(setIsLoading(true));
    try {
        const response = await fetch('/api/generateReply', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey.trim()}`,
            },
            body: JSON.stringify(payload),
            // signal: AbortSignal.timeout(3 * 60 * 1000),
            signal: controller.signal,
        });

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
            store.dispatch(setIsLoading(false));
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
            if (controller.signal.aborted) {
                reader.cancel();
            }
            const { value, done: doneReading } = await reader.read();
            done = doneReading;
            const chunkValue = decoder.decode(value);
            store.dispatch(updateMessage({ messageId: reply.id, chunkValue}));
        }
    } catch (err: any) {
        if (err.name === 'TimeoutError') {
            console.error('Timeout');
        } else if (err.name === 'AbortError') {
            console.error('Fetch aborted by user or timeout');
        } else if (err.name === 'TypeError') {
            console.error('AbortSignal.timeout() method is not supported');
        } else {
            // A network error, or some other problem.
            console.error(`Error: type: ${err.name}, message: ${err.message}`);
        }
    }

    store.dispatch(setIsLoading(false));
};

export const regenerate = async () => {
    const chat = selectCurrentChat(store.getState());
    const lastUserMessageId = chat?.messages[chat.messages.length - 2];
    if (lastUserMessageId) {
        const lastUserMessage = selectMessageById(store.getState(), lastUserMessageId);
        store.dispatch(removeMessageUpTo({ messageId: lastUserMessageId }));
        if (lastUserMessage) {
            await generateReply({
                userInput: lastUserMessage.content,
                isRegenerate: true,
                addController(controller) {
                    abortController.setController(chat.id, controller);
                },
            });
        }
    }
};

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

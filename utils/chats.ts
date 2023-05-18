import { v4 as uuid } from 'uuid';

import { store } from '@/store';
import { setOne } from '@/store/chatsSlice';
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
    store.dispatch(setOne(newChat));
    return newChat.id;
};

export const generateTitle = (title: string) => {
    // TODO
};

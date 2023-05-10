import { v4 as uuid } from 'uuid';

import { store } from '@/store';
import { setOne } from '@/store/chatsSlice';
import {
    Chat,
    Role,
    defaultSystemRole,
    defaultModelParams,
    OpenAIModelID,
    OpenAIModels,
} from '@/types';

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

export const createNewChat = (
    systemRole: Role = defaultSystemRole,
    modelID: OpenAIModelID = OpenAIModelID.GPT_3_5,
    title = ''
): string => {
    const newChat: Chat = {
        id: uuid(),
        messages: [],
        title: systemRole.roleName === 'default' ? 'New Chat' : systemRole.roleName,
        created: Date.now(),
        role: systemRole,
        model: OpenAIModels[modelID],
        modelParams: defaultModelParams,
    };
    store.dispatch(setOne(newChat));
    return newChat.id;
};

export const generateTitle = (title: string) => {
    // TODO
};

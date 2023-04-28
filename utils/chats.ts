import { Chat, SystemPrompt, defaultSystemPrompt, OpenAIModelID, OpenAIModels } from '@/types';
import { v4 as uuid } from 'uuid';
import { store } from '@/store';
import { setOne } from '@/store/chatsSlice';

export const copyToClipboard = async (text: string, setIsCopied: (value: boolean) => void): Promise<void> => {
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
    systemPrompt: SystemPrompt = defaultSystemPrompt,
    modelID: OpenAIModelID = OpenAIModelID.GPT_3_5,
    title: string = ''
): string => {
    const newChat: Chat = {
        id: uuid(),
        messages: [],
        title: systemPrompt.role === 'default' ? 'New Chat' : systemPrompt.role,
        created: Date.now(),
        systemPrompt,
        model: OpenAIModels[modelID],
    };
    store.dispatch(setOne(newChat));
    return newChat.id;
};

export const generateTitle = (title: string) => {};

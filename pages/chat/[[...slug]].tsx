import { Suspense, useEffect, useState } from 'react';
import ChatPage from '@/features/Chat/ChatPage';
import { useAppDispatch } from '@/store/hooks';
import { setOne } from '@/store/chatsSlice';
import { Chat, SystemPrompt, OpenAIModel, OpenAIModels, OpenAIModelID } from '@/types';
import { v4 as uuid } from 'uuid';
import { defaultSystemPrompt } from '@/utils/config';

export default function Landing() {
    const [newChatID, setNewChatID] = useState<string>('');
    const [modelID, setModelID] = useState<OpenAIModelID>(OpenAIModelID.GPT_3_5);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const systemPrompt: SystemPrompt = {
            content: defaultSystemPrompt,
            name: 'default',
            id: uuid(),
        };

        const model = OpenAIModels[modelID];
        const newChat: Chat = {
            id: uuid(),
            messages: [],
            created: Date.now(),
            systemPrompt: systemPrompt,
            model: model,
        };
        setNewChatID(newChat.id);
        dispatch(setOne(newChat));
    }, [dispatch, modelID]);

    if (!newChatID) {
        return <div>loading...</div>;
    }
    return <ChatPage chatID={newChatID} />;
}

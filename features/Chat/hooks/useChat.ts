import { useCallback, useState } from 'react';

import { store } from '@/store';
import { removeMessageUpTo, selectChatById, selectIsLoading } from '@/store/chatsSlice';
import { useAppSelector } from '@/store/hooks';
import { selectMessageById } from '@/store/messagesSlice';
import { getApiKey } from '@/store/settingSlice';
import { abortController, generateReply } from '@/utils/chats';
interface Props {
    chatId: string;
}

export default function useChat({ chatId }: Props) {
    // console.log(`in useChat. chatId: ${chatId}`);

    const apiKey = useAppSelector(getApiKey);
    const [userInput, setUserInput] = useState<string>('');
    const loading = useAppSelector(selectIsLoading);

    const memorizedGenerateReply = useCallback(
        async (chatId: string, userInput: string,) => {
            await generateReply({
                userInput,
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
                    await memorizedGenerateReply(chatId, lastUserMessage.content);
            }
        },
        [chatId]
    );

    const handleClickSubmit = async (e: React.MouseEvent | React.KeyboardEvent) => {
        e.preventDefault();
        await memorizedGenerateReply(chatId, userInput);
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

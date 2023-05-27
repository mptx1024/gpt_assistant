import { useEffect, useRef, useState } from 'react';

import { selectIsLoading } from '@/store/chatsSlice';
import { useAppSelector } from '@/store/hooks';
import { getApiKey } from '@/store/settingSlice';
import { abortController, generateReply, regenerate } from '@/utils/chats';

interface Props {
    chatId: string;
}

export default function useChat({ chatId }: Props) {
    // console.log(`in useChat. chatId: ${chatId}`);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const apiKey = useAppSelector(getApiKey);
    const [userInput, setUserInput] = useState<string>('');
    const loading = useAppSelector(selectIsLoading);

    const handleClickSubmit = async (e: React.MouseEvent | React.KeyboardEvent) => {
        e.preventDefault();
        await generateReply({
            userInput,
            addController(controller) {
                abortController.setController(chatId, controller);
            },
        });
        setUserInput('');
    };
    const handleClickRegenerate = (e: React.MouseEvent) => {
        e.preventDefault();
        regenerate();
    };
    const handleInputChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
        setUserInput(e.currentTarget.value);
    };

    function handleClickStopGenerating(e: React.MouseEvent) {
        e.preventDefault();
        abortController.stop(chatId);
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleClickSubmit(e);
        }
    };
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'inherit';
            // const scrollHeight = textareaRef.current.scrollHeight;
            // textareaRef.current.style.height = scrollHeight + "px";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [userInput]);

    return {
        userInput,
        apiKey,
        loading,
        textareaRef,
        generateReply,
        handleClickSubmit,
        handleClickRegenerate,
        handleInputChange,
        handleClickStopGenerating,
        handleKeyDown,
    };
}

import { selectIsLoading, selectMessageIdsByChat } from '@/store/chatsSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectApiKey } from '@/store/settingSlice';
import { toggleAppSetting } from '@/store/uiSlice';
import { abortController, generateReply, regenerate } from '@/utils/chat';
import { getImage, getPdf } from '@/utils/screenshot';
import { useEffect, useRef, useState } from 'react';

interface Props {
    chatId: string;
}

export default function useChat({ chatId }: Props) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const apiKey = useAppSelector(selectApiKey);
    const [userInput, setUserInput] = useState<string>('');
    const loading = useAppSelector(selectIsLoading);
    const hasMessages = useAppSelector((state) => selectMessageIdsByChat(state, chatId)).length > 0;
    const handleClickSubmit = async (e: React.MouseEvent | React.KeyboardEvent) => {
        e.preventDefault();
        setUserInput('');
        if (!apiKey) {
            alert('Please enter your api key');
            return;
        }
        await generateReply({
            userInput,
            addController(controller) {
                abortController.setController(chatId, controller);
            },
        });
    };
    const handleClickRegenerate = (e: React.MouseEvent) => {
        e.preventDefault();
        if (!hasMessages) {
            alert('No message yet🙀');
            return;
        }
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
    const handleClickGetImage = () => {
        if (!hasMessages) {
            alert('No message yet🙀');
            return;
        }
        getImage();
    };
    const handleClickGetPdf = () => {
        if (!hasMessages) {
            alert('No message yet🙀');
            return;
        }
        getPdf();
    };

    const dispatch = useAppDispatch();
    const toggleSettingModal = () => {
        dispatch(toggleAppSetting());
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
        hasMessages,
        generateReply,
        handleClickSubmit,
        handleClickRegenerate,
        handleInputChange,
        handleClickStopGenerating,
        handleKeyDown,
        handleClickGetImage,
        handleClickGetPdf,
        toggleSettingModal,
    };
}

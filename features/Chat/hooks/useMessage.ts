import { store } from '@/store';
import { removeMessageUpTo, selectChatModelParams } from '@/store/chatsSlice';
import { useAppSelector } from '@/store/hooks';
import { selectMessageById } from '@/store/messagesSlice';
import { Message } from '@/types';
import { abortController, copyToClipboard, generateReply } from '@/utils/chat';
import { useState } from 'react';

interface Props {
    messageId: string;
}

export const useMessage = ({ messageId }: Props) => {
    const [userInput, setUserInput] = useState<string>('');
    const [isCopied, setIsCopied] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const message: Message | undefined = useAppSelector((state) =>
        selectMessageById(state, messageId)
    );
    const chatModelParam = useAppSelector((state) => selectChatModelParams(state, message?.chatId));

    const handleClickCopy = async () => {
        await copyToClipboard(userInput, setIsCopied);
    };
    const handleClickEdit = () => {
        setUserInput(message?.content || '');
        setIsEditing(true);
    };

    const handleClickCancel = () => {
        setIsEditing(false);
    };

    const handleClickSaveSubmit = async (e: React.MouseEvent | React.KeyboardEvent) => {
        e.preventDefault();
        // change chat history in store
        store.dispatch(removeMessageUpTo({ messageId }));
        //  regenerate reply
        await generateReply({
            userInput,
            addController(controller) {
                abortController.setController(message?.chatId || '', controller);
            },
        });
        setIsEditing(false);
        setUserInput('');
    };
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            handleClickSaveSubmit(e);
        }
    };
    const handleInputChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
        setUserInput(e.currentTarget.value);
    };
    return {
        message,
        userInput,
        isCopied,
        isEditing,
        chatModelParam,
        handleClickCopy,
        handleClickEdit,
        handleClickSaveSubmit,
        handleKeyDown,
        handleClickCancel,
        handleInputChange,
    };
};

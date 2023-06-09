import { useState } from 'react';

import { store } from '@/store';
import { removeMessageUpTo, selectChatModelParams } from '@/store/chatsSlice';
import { useAppSelector } from '@/store/hooks';
import { selectMessageById } from '@/store/messagesSlice';
import { Message } from '@/types';
import { abortController, copyToClipboard, generateReply } from '@/utils/chat';

interface Props {
    messageId: string;
}

export const useMessage = ({ messageId }: Props) => {
    const [content, setContent] = useState<string>('');
    const [isCopied, setIsCopied] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const message: Message | undefined = useAppSelector((state) =>
        selectMessageById(state, messageId)
    );
    const chatModelParam = useAppSelector((state) => selectChatModelParams(state, message?.chatId));

    const handleClickCopy = async () => {
        if (message?.content) {
            await copyToClipboard(message.content, setIsCopied);
        }
    };
    const handleClickEdit = () => {
        setContent(message?.content || '');
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
            userInput: content,
            addController(controller) {
                abortController.setController(message?.chatId || '', controller);
            },
        });
        setIsEditing(false);
        setContent('');
    };
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            handleClickSaveSubmit(e);
        }
    };
    const handleInputChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
        setContent(e.currentTarget.value);
    };
    return {
        message,
        content,
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

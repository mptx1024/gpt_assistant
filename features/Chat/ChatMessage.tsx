import { useState } from 'react';

import clsx from 'clsx';
import { HiOutlineClipboard, HiPencilSquare } from 'react-icons/hi2';
import { TbClipboardCheck } from 'react-icons/tb';

import Button from '@/components/Button';
import { Textarea } from '@/components/InputField';
import { removeMessageUpTo } from '@/store/chatsSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectMessageById } from '@/store/messagesSlice';
import { Message } from '@/types';
import { copyToClipboard } from '@/utils/chats';

import useChat from './hooks/useChat';
import Markdown from './Markdown';

interface Props {
    messageId: string;
    chatId: string;
    // generateReply: (content: string) => void;
}

export default function ChatMessage({ messageId, chatId }: Props) {
    const [isCopied, setIsCopied] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    // const [editedContent, setEditedContent] = useState('');
    const dispatch = useAppDispatch();
    const { handleClickSubmit, userInput, setUserInput, handleInputChange } = useChat({
        chatId,
    });
    const message: Message | undefined = useAppSelector((state) =>
        selectMessageById(state, messageId)
    );
    if (!message) {
        return null;
    }
    const handleCopyToClipboard = async () => {
        await copyToClipboard(message.content, setIsCopied);
    };
    // const handleEditContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    //     setEditedContent(e.target.value);
    // };
    const handleEdit = () => {
        setUserInput(message.content);
        setIsEditing(true);
    };

    const handleClickSave = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        // change chat history in store
        dispatch(removeMessageUpTo({ messageId }));
        // then regenerate reply
        handleClickSubmit(e);
        setIsEditing(false);
        // setUserInput('');
    };

    const handleCancel = () => {
        setIsEditing(false);
    };
    const messageContainerClasses = clsx('group animate-slideInFromBottom', {
        'bg-gray-base brightness-[0.97] dark:bg-gray-inverted dark:brightness-[1.15]':
            message.role === 'user',
    });
    return (
        <div className={messageContainerClasses}>
            <div
                className="m-auto flex gap-3 p-4 text-base
            md:max-w-2xl md:gap-6 md:py-6 lg:max-w-2xl lg:px-0 xl:max-w-3xl
            "
            >
                <div className="flex w-8 flex-shrink-0 flex-col items-end text-base">
                    {message.role === 'user' ? 'You' : 'AI'}
                </div>
                <div className="prose relative flex w-[calc(100%-50px)] flex-col gap-1 dark:prose-invert md:w-[calc(100%-115px)] md:gap-3">
                    {!isEditing ? (
                        <Markdown message={message} />
                    ) : (
                        <div className="">
                            <Textarea value={userInput} onChange={handleInputChange} />
                            <div className="mt-1 flex h-8 justify-end gap-2">
                                <Button
                                    onClick={handleClickSave}
                                    size="sm"
                                    text="Save & Submit"
                                    shadow={true}
                                    border={true}
                                />

                                <Button
                                    onClick={handleCancel}
                                    text="Cancel"
                                    shadow={true}
                                    border={true}
                                    size="sm"
                                />
                            </div>
                        </div>
                    )}
                    <div className="mt-2 flex justify-center self-end md:absolute md:right-0 md:top-0 md:mt-0 md:translate-x-full md:gap-3 md:self-center md:pl-2">
                        {!isEditing && (
                            <div className="flex transition-all duration-200 md:translate-x-2 md:opacity-0 md:group-hover:translate-x-0 md:group-hover:opacity-100">
                                {!isCopied ? (
                                    <Button
                                        Icon={HiOutlineClipboard}
                                        onClick={handleCopyToClipboard}
                                        size="md"
                                        iconEffect={true}
                                    />
                                ) : (
                                    <Button
                                        Icon={TbClipboardCheck}
                                        size="md"
                                        iconStyles="!text-green-700"
                                    />
                                    // <TbClipboardCheck className="h-5 w-5 text-base text-green-500" />
                                )}
                                {message.role === 'user' && (
                                    <Button
                                        Icon={HiPencilSquare}
                                        onClick={handleEdit}
                                        size="md"
                                        iconEffect={true}
                                    />
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

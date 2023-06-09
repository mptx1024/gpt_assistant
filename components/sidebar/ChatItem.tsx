import { FC, useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import {
    HiCheck,
    HiOutlineChatBubbleLeftEllipsis,
    HiOutlineTrash,
    HiOutlineXMark,
    HiPencilSquare,
} from 'react-icons/hi2';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';

import { removeChat, setCurrentChat, updateChatTitle } from '@/store/chatsSlice';
import { Chat } from '@/types';

import { useKeyPress } from '@/hooks/useKeyPress';
import SidebarCard from './SidebarCard';
import Button from '../Button';
import { Input } from '../InputField';

interface ChatItemProps {
    chat: Chat;
    currentChatID: string;
}

const ChatItem: FC<ChatItemProps> = ({ chat, currentChatID }) => {
    const router = useRouter();
    const [edit, setEdit] = useState(false);
    const [remove, setRemove] = useState(false);
    const [title, setTitle] = useState(chat.title);
    const dispatch = useDispatch();

    const handleClickChat = () => {
        dispatch(setCurrentChat(chat.id));
        router.push(`/chat/${chat.id}`);
    };
    const handleClickEdit = (e: React.MouseEvent) => {
        e.stopPropagation();
        setEdit(true);
    };

    const handleClickRemove = (e: React.MouseEvent) => {
        e.stopPropagation();
        setRemove(true);
    };

    const cancelAction = () => {
        setEdit(false);
        setRemove(false);
    };
    const confirmAction = () => {
        if (edit) {
            dispatch(updateChatTitle({ chatId: chat.id, title }));
        } else if (remove) {
            dispatch(removeChat(chat.id));
        }
        cancelAction();
    };
    const handleClickCancel = (e: React.MouseEvent) => {
        e.stopPropagation();
        cancelAction();
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };
    const handleClickConfirm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        confirmAction();
        cancelAction();
    };

    const enterPressed = useKeyPress('Enter');
    const escapePressed = useKeyPress('Escape');
    useEffect(() => {
        if (enterPressed) {
            confirmAction();
        } else if (escapePressed) {
            cancelAction();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [enterPressed, escapePressed]);
    return (
        <SidebarCard isSelected={currentChatID === chat.id} onClick={handleClickChat}>
            <div className="flex w-[75%] items-center">
                <HiOutlineChatBubbleLeftEllipsis className="mr-2 h-4 w-4 shrink-0" />
                {edit ? (
                    <Input
                        type="text"
                        placeholder={chat.title || ''}
                        value={title}
                        onChange={handleInputChange}
                        onClick={(e) => e.stopPropagation()}
                        autoFocus={true}
                        styles="bg-gray-base dark:bg-gray-inverted"
                    />
                ) : (
                    <p className="w-screen animate-typing truncate">{chat.title}</p>
                )}
            </div>
            {edit || remove ? (
                <div className="right-1 flex items-center">
                    <Button
                        Icon={HiCheck}
                        onClick={handleClickConfirm}
                        btnSize="sm"
                        iconEffect={true}
                        iconThemeColor={false}
                        btnStyles="!px-1"
                    />
                    <Button
                        Icon={HiOutlineXMark}
                        onClick={handleClickCancel}
                        btnSize="sm"
                        iconEffect={true}
                        iconThemeColor={false}
                        btnStyles="!px-1"
                    />
                </div>
            ) : (
                <div
                    className={clsx(
                        'absolute right-1 flex items-center transition-all duration-150 ease-in',
                        'md:-right-1 md:opacity-0  md:group-hover:right-1 md:group-hover:opacity-100'
                    )}
                >
                    <Button
                        onClick={handleClickEdit}
                        Icon={HiPencilSquare}
                        btnSize="sm"
                        iconEffect={true}
                        iconThemeColor={false}
                        btnStyles="!px-1"
                        iconStyles="!text-neutral-500"
                    />
                    <Button
                        onClick={handleClickRemove}
                        Icon={HiOutlineTrash}
                        btnSize="sm"
                        iconEffect={true}
                        iconThemeColor={false}
                        btnStyles="!px-1"
                        iconStyles="!text-neutral-500"
                    />
                </div>
            )}
        </SidebarCard>
    );
};

export default ChatItem;

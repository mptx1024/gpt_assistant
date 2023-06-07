import { FC, useState } from 'react';

import { useRouter } from 'next/router';
import {
    HiCheck,
    HiOutlineChatBubbleLeftEllipsis,
    HiOutlineTrash,
    HiOutlineXMark,
    HiPencilSquare,
} from 'react-icons/hi2';
import { useDispatch } from 'react-redux';

import { removeChat, setCurrentChat, updateChatTitle } from '@/store/chatsSlice';
import { Chat } from '@/types';

import Button from '../Button';
import { Input } from '../InputField';
import SidebarCard from './SidebarCard';
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
    const handleClickCancel = (e: React.MouseEvent) => {
        e.stopPropagation();
        setEdit(false);
        setRemove(false);
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };
    const handleClickConfirm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        if (edit) {
            dispatch(updateChatTitle({ chatId: chat.id, title }));
        } else if (remove) {
            dispatch(removeChat(chat.id));
        }
        setEdit(false);
        setRemove(false);
    };

    return (
        <SidebarCard isSelected={currentChatID === chat.id} onClick={handleClickChat}>
            <div className="flex w-[75%] items-center">
                <HiOutlineChatBubbleLeftEllipsis className="mr-1 h-4 w-4 shrink-0" />
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
                <div className="absolute -right-1 flex items-center opacity-0 transition-all duration-150 ease-in group-hover:right-1 group-hover:opacity-100">
                    <Button
                        onClick={handleClickEdit}
                        Icon={HiPencilSquare}
                        btnSize="sm"
                        iconEffect={true}
                        iconThemeColor={false}
                        btnStyles="!px-1"
                    />
                    <Button
                        onClick={handleClickRemove}
                        Icon={HiOutlineTrash}
                        btnSize="sm"
                        iconEffect={true}
                        iconThemeColor={false}
                        btnStyles="!px-1"
                    />
                </div>
            )}
        </SidebarCard>
    );
};

export default ChatItem;

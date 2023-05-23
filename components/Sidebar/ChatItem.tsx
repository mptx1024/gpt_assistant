import { FC, useState, useRef } from 'react';

import { set } from 'idb-keyval';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
    HiPencilSquare,
    HiOutlineTrash,
    HiCheck,
    HiOutlineXMark,
    HiOutlineChatBubbleLeftEllipsis,
} from 'react-icons/hi2';
import { useDispatch } from 'react-redux';

import { updateTitle, removeChat, setCurrentChat } from '@/store/chatsSlice';
import { Chat } from '@/types';

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
    const handleClickCancel = (e: React.MouseEvent) => {
        e.stopPropagation();
        setEdit(false);
        setRemove(false);
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };
    const handleClickConfirm = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        if (edit) {
            dispatch(updateTitle({ chatId: chat.id, title }));
        } else if (remove) {
            dispatch(removeChat(chat.id));
        }
        setEdit(false);
        setRemove(false);
    };

    return (
        <SidebarCard isSelected={currentChatID === chat.id} onClick={handleClickChat}>
            <div className="flex w-[75%] items-center gap-2">
                <HiOutlineChatBubbleLeftEllipsis className="mr-1 h-4 w-4" />
                {edit ? (
                    <Input
                        type="text"
                        placeholder={chat.title || ''}
                        value={title}
                        onChange={handleInputChange}
                        onClick={(e) => e.stopPropagation()}
                    />
                ) : (
                    <p className="w-full animate-typing truncate">{chat.title}</p>
                )}
            </div>
            {edit || remove ? (
                <div className="right-1 flex items-center">
                    <Button
                        Icon={HiCheck}
                        onClick={handleClickConfirm}
                        size="sm"
                        iconEffect={true}
                    />
                    <Button
                        Icon={HiOutlineXMark}
                        onClick={handleClickCancel}
                        size="sm"
                        iconEffect={true}
                    />
                </div>
            ) : (
                <div className="absolute -right-1 flex items-center opacity-0 transition-all duration-100 ease-in group-hover:right-1 group-hover:opacity-100">
                    <Button
                        onClick={handleClickEdit}
                        Icon={HiPencilSquare}
                        size="sm"
                        iconEffect={true}
                    />
                    <Button
                        onClick={handleClickRemove}
                        Icon={HiOutlineTrash}
                        size="sm"
                        iconEffect={true}
                    />
                </div>
            )}
        </SidebarCard>
    );
};

export default ChatItem;

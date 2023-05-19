import { FC, useState, useRef } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';
import {
    HiPencilSquare,
    HiOutlineTrash,
    HiCheck,
    HiOutlineXMark,
    HiOutlineChatBubbleLeftEllipsis,
} from 'react-icons/hi2';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/store';
import { updateTitle, removeOne, setCurrentChat } from '@/store/chatsSlice';
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

    const onClickEdit = () => {
        setEdit(true);
        // setTitle(title);
    };
    const onClickChat = () => {
        dispatch(setCurrentChat(chat.id));
    };
    const onClickRemove = (e: React.MouseEvent) => {
        e.stopPropagation();
        setRemove(true);
    };

    const onClickConfirm = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        if (edit) {
            dispatch(updateTitle({ chatID: chat.id, title }));
        } else if (remove) {
            dispatch(removeOne(chat.id));
        }
        setEdit(false);
        setRemove(false);
    };

    const onClickCancel = (e: React.MouseEvent) => {
        e.stopPropagation();
        setEdit(false);
        setRemove(false);
    };

    return (
        // <Link href={`/chat/${encodeURIComponent(chat.id)}`}>
        // <div>
        <SidebarCard isSelected={currentChatID === chat.id} onClick={onClickChat}>
            <div className="flex w-[80%] items-center gap-2">
                <HiOutlineChatBubbleLeftEllipsis className="mr-1 h-4 w-4" />
                {edit ? (
                    <Input
                        type="text"
                        placeholder={chat.title || ''}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                ) : (
                    <p className="w-full animate-typing truncate">{chat.title}</p>
                )}
            </div>
            {edit || remove ? (
                <div className=" right-1 flex items-center">
                    <Button Icon={HiCheck} onClick={onClickConfirm} size="sm" iconEffect={true} />
                    <Button
                        Icon={HiOutlineXMark}
                        onClick={onClickCancel}
                        size="sm"
                        iconEffect={true}
                    />
                </div>
            ) : (
                <div className="-right-1 flex items-center opacity-0 transition-all duration-100 ease-in group-hover:right-1 group-hover:opacity-100">
                    <Button
                        onClick={onClickEdit}
                        Icon={HiPencilSquare}
                        size="sm"
                        iconEffect={true}
                    />
                    <Button
                        onClick={onClickRemove}
                        Icon={HiOutlineTrash}
                        size="sm"
                        iconEffect={true}
                    />
                </div>
            )}
        </SidebarCard>
        // </div>
        // </Link>
    );
};

export default ChatItem;

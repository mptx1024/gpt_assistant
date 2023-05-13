import { FC, useState, useRef, useEffect } from 'react';

import Link from 'next/link';
import {
    HiPencilSquare,
    HiOutlineTrash,
    HiCheck,
    HiOutlineXMark,
    HiOutlineChatBubbleLeftEllipsis,
} from 'react-icons/hi2';
import { useDispatch } from 'react-redux';

import { updateTitle, removeOne } from '@/store/chatsSlice';
import { Chat } from '@/types';

import SidebarCard from './SidebarCard';
import Button from '../Button';
import { Input } from '../InputField';

interface ChatItemProps {
    chat: Chat;
    currentChat: string;
    setCurrentChat: (id: string) => void;
}

const ChatItem: FC<ChatItemProps> = ({ chat, currentChat, setCurrentChat }) => {
    const [edit, setEdit] = useState(false);
    const [remove, setRemove] = useState(false);
    const [title, setTitle] = useState('');
    const dispatch = useDispatch();
    const chatRef = useRef<HTMLDivElement>(null);
    const onClickEdit = () => {
        setEdit(true);
        setTitle(chat.title || chat.id.substring(0, 20));
    };
    const onClickChat = () => {
        setCurrentChat(chat.id);
    };
    const onClickRemove = () => {
        setRemove(true);
    };

    const onClickConfirm = () => {
        if (edit) {
            // TODO: edit chat
            dispatch(updateTitle({ chatID: chat.id, title }));
        } else if (remove) {
            // TODO: remove chat
            dispatch(removeOne(chat.id));
            // router.push('/chat');
        }
        onClickCancel();
    };

    const onClickCancel = () => {
        setEdit(false);
        setRemove(false);
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
                onClickCancel();
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [chatRef]);

    return (
        <Link href={`/chat/${encodeURIComponent(chat.id)}`}>
            <div ref={chatRef} onClick={() => onClickChat()}>
                <SidebarCard isSelected={currentChat === chat.id}>
                    {edit ? (
                        <Input
                            type="text"
                            placeholder={chat.title || ''}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    ) : (
                        <>
                            <HiOutlineChatBubbleLeftEllipsis className="mr-1 h-4 w-4" />
                            <p className="w-7/12 animate-typing truncate text-base">{chat.title}</p>
                        </>
                    )}
                    {edit || remove ? (
                        <div className="flex items-center">
                            <Button
                                Icon={HiCheck}
                                onClick={onClickConfirm}
                                size="sm"
                                iconEffect={true}
                            />
                            <Button
                                Icon={HiOutlineXMark}
                                onClick={onClickCancel}
                                size="sm"
                                iconEffect={true}
                            />
                        </div>
                    ) : (
                        <div className="absolute -right-3 flex items-center opacity-0 transition-all duration-100 ease-in group-hover:right-2 group-hover:opacity-100">
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
            </div>
        </Link>
    );
};

export default ChatItem;

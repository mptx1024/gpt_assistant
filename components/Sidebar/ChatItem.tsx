import { FC, useState, useRef, useEffect } from 'react';

import Link from 'next/link';
import {
    HiPencilSquare,
    HiTrash,
    HiCheck,
    HiOutlineXMark,
    HiChatBubbleLeftEllipsis,
} from 'react-icons/hi2';
import { useDispatch } from 'react-redux';

import { updateTitle, removeOne } from '@/store/chatsSlice';
import { Chat } from '@/types';

import SidebarCard from './SidebarCard';
import Button from '../Button';

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
                    <div className="flex w-44 items-center">
                        <HiChatBubbleLeftEllipsis className="mr-2 h-4 w-4" />
                        {edit ? (
                            <input
                                type="text"
                                placeholder={chat.title || chat.id.substring(0, 20)}
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-36 truncate border-none text-gray-500 focus:border-transparent"
                            />
                        ) : (
                            <p
                                className={`w-36 overflow-hidden truncate whitespace-nowrap text-base ${
                                    chat.title ? 'animate-typing' : ''
                                }`}
                            >
                                {chat.title || chat.id.substring(0, 20)}
                            </p>
                        )}
                    </div>
                    {edit || remove ? (
                        <div className="flex items-center gap-1">
                            <HiCheck
                                className="h-4 w-4 text-slate-400 hover:text-slate-50"
                                onClick={onClickConfirm}
                            />
                            <HiOutlineXMark
                                className="h-4 w-4 text-slate-400 hover:text-slate-50"
                                onClick={onClickCancel}
                            />
                        </div>
                    ) : (
                        <div className="chat-item-btns absolute -right-3 flex items-center opacity-0 transition-all duration-200 ease-in">
                            <Button
                                onClick={onClickEdit}
                                Icon={HiPencilSquare}
                                size="sm"
                                iconEffect={true}
                            />
                            <Button
                                onClick={onClickRemove}
                                Icon={HiTrash}
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

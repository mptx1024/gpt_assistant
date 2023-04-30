import { FC, useState, useRef, useEffect } from 'react';
import { HiPencilSquare, HiTrash, HiCheck, HiOutlineXMark, HiChatBubbleLeftEllipsis } from 'react-icons/hi2';
import { Chat } from '@/types';
import { useDispatch } from 'react-redux';
import { updateTitle, removeOne } from '@/store/chatsSlice';
import Link from 'next/link';

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
    const onClickChat = (id: string) => {
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
            <div ref={chatRef} onClick={() => onClickChat(chat.id)}>
                <div
                    className={`flex gap-2 items-center py-1 px-2 mx-2 h-10 hover:bg-gray-700 rounded-md cursor-pointer relative 
                [&_.chat-item-btns]:hover:opacity-100 [&_.chat-item-btns]:hover:right-2 ${
                    currentChat === chat.id ? 'bg-gray-700' : ''
                }`}
                >
                    <div className='flex items-center w-44 '>
                        <HiChatBubbleLeftEllipsis className='w-4 h-4 mr-2' />
                        {edit ? (
                            <input
                                type='text'
                                placeholder={chat.title || chat.id.substring(0, 20)}
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className=' max-w-xs truncate w-36'
                            />
                        ) : (
                            <div
                                className={`overflow-hidden whitespace-nowrap truncate text-based ${
                                    chat.title ? 'animate-typing' : ''
                                }`}
                            >
                                {chat.title || chat.id.substring(0, 20)}
                            </div>
                        )}
                    </div>
                    {edit || remove ? (
                        <div className='flex items-center gap-1'>
                            <HiCheck className='w-4 h-4 text-slate-400 hover:text-slate-50' onClick={onClickConfirm} />
                            <HiOutlineXMark
                                className='w-4 h-4 text-slate-400 hover:text-slate-50'
                                onClick={onClickCancel}
                            />
                        </div>
                    ) : (
                        <div className='chat-item-btns flex items-center gap-1 absolute -right-3 opacity-0 transition-all ease-in duration-200'>
                            <HiPencilSquare
                                className='w-4 h-4 text-slate-400 hover:text-slate-50 '
                                onClick={onClickEdit}
                            />
                            <HiTrash className='w-4 h-4 text-slate-400 hover:text-slate-50' onClick={onClickRemove} />
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default ChatItem;

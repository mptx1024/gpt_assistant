import { FC, useState, useRef, useEffect } from 'react';
import { HiPencilSquare, HiTrash, HiCheck, HiOutlineXMark, HiChatBubbleLeftEllipsis } from 'react-icons/hi2';
import { Chat } from '@/types';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { updateTitle, removeOne } from '@/store/chatsSlice';
import Link from 'next/link';

interface ChatItemProps {
    chat: Chat;
    currentChat: string;
    setCurrentChat: (id: string) => void;
}

const ChatItem: FC<ChatItemProps> = ({ chat, currentChat, setCurrentChat }) => {
    const router = useRouter();
    const [rename, setRename] = useState(false);
    const [remove, setRemove] = useState(false);
    const [title, setTitle] = useState('');
    const dispatch = useDispatch();

    const onClickRename = () => {
        setRename(true);
        setTitle(chat.title || chat.id.substring(0, 20));
    };
    const onClickChat = (id: string) => {
        setCurrentChat(chat.id);
    };
    const onClickRemove = () => {
        setRemove(true);
    };

    const onClickConfirm = () => {
        if (rename) {
            // TODO: rename chat
            dispatch(updateTitle({ chatID: chat.id, title }));
        } else if (remove) {
            // TODO: remove chat
            dispatch(removeOne(chat.id));
            router.push('/chat');
        }
        onClickCancel();
    };

    const onClickCancel = () => {
        setRename(false);
        setRemove(false);
    };

    return (
        <Link href={`/chat/${encodeURIComponent(chat.id)}`} onClick={() => onClickChat(chat.id)}>
            <div className='flex gap-2 items-center py-1 px-2 mx-2 hover:bg-gray-700 rounded-lg cursor-pointer'>
                <div className='flex items-center'>
                    <HiChatBubbleLeftEllipsis className='w-4 h-4 mr-2' />
                    {rename ? (
                        <input
                            type='text'
                            placeholder={chat.title || chat.id.substring(0, 20)}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className=' max-w-xs truncate w-36'
                        />
                    ) : (
                        <div className='truncate w-36'>{chat.title || chat.id.substring(0, 20)}</div>
                    )}
                </div>
                {chat.id === currentChat &&
                    (rename || remove ? (
                        <div className='flex items-center gap-1'>
                            <HiCheck className='w-4 h-4 text-slate-400 hover:text-slate-50' onClick={onClickConfirm} />
                            <HiOutlineXMark
                                className='w-4 h-4 text-slate-400 hover:text-slate-50'
                                onClick={onClickCancel}
                            />
                        </div>
                    ) : (
                        <div className='flex items-center gap-1'>
                            <HiPencilSquare
                                className='w-4 h-4 text-slate-400 hover:text-slate-50'
                                onClick={onClickRename}
                            />
                            <HiTrash className='w-4 h-4 text-slate-400 hover:text-slate-50' onClick={onClickRemove} />
                        </div>
                    ))}
            </div>
        </Link>
    );
};

export default ChatItem;

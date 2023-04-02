import { FC, useState } from 'react';
import { Chat } from '@/types';
import { HiPencilSquare, HiTrash, HiCheck, HiOutlineXMark, HiChatBubbleLeftEllipsis } from 'react-icons/hi2';
import { useRouter } from 'next/router';

interface ChatListProps {
    chats: Chat[] | null;
}

const ChatList: FC<ChatListProps> = ({ chats }) => {
    const router = useRouter();
    const { id } = router.query;
    const [rename, setRename] = useState(false);
    const [remove, setRemove] = useState(false);

    const handleClickRename = () => {};
    const handleClickRemove = () => {};

    // console.log(`inChatlist: ${id}`);

    const handleClickChat = (id: string) => {
        router.push(`/chat/${id}`);
    };
    if (!chats) return null;
    return (
        <div className='debug-1 flex flex-col-reverse'>
            {chats.map((chat) => (
                <button
                    key={chat.id}
                    className='flex gap-3 items-center py-2 px-2 mx-4 hover:bg-gray-700 rounded-lg cursor-pointer'
                    onClick={() => handleClickChat(chat.id)}
                >
                    <div className='flex items-center'>
                        <HiChatBubbleLeftEllipsis className='w-4 h-4 mr-2' />
                        <div className='truncate w-32 lg:w-auto'>{chat.title || chat.id.substring(0, 20)}</div>
                    </div>
                    {id === chat.id && (
                        <div className='flex items-center gap-1'>
                            <HiPencilSquare
                                className='w-4 h-4 text-slate-400 hover:text-slate-50'
                                onClick={handleClickRename}
                            />
                            <HiTrash className='w-4 h-4 text-slate-400 hover:text-slate-50' />
                        </div>
                    )}
                </button>
            ))}
        </div>
    );
};

export default ChatList;

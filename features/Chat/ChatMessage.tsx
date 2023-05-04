import { useState } from 'react';

import { HiPencilSquare, HiOutlineClipboard } from 'react-icons/hi2';
import { TbClipboardCheck } from 'react-icons/tb';
import { useDispatch } from 'react-redux';

import { deleteMessageUpTo } from '@/store/chatsSlice';
import { Message } from '@/types';
import { copyToClipboard } from '@/utils/chats';

import Markdown from './Markdown';

interface Props {
    message: Message;
    generateReply: (content: string) => void;
}

export default function ChatMessage({ message, generateReply }: Props) {
    const [isHovered, setIsHovered] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState('');
    const dispatch = useDispatch();

    const handleCopyToClipboard = async () => {
        await copyToClipboard(message.content, setIsCopied);
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSaveChanges = () => {
        // change chat history in store
        dispatch(deleteMessageUpTo({ message }));
        // then regenerate reply
        generateReply(editedContent);
        setIsEditing(false);
        setEditedContent('');
    };

    const handleCancel = () => {
        setIsEditing(false);
    };
    return (
        <div
            className={` [&>*]:text-slate-500 ${message.role === 'user' ? 'bg-slate-200' : 'bg-slate-100'}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className='relative m-auto flex 
            md:max-w-2xl md:gap-4 md:py-4 lg:max-w-3xl lg:px-0 xl:max-w-3xl
            '
            >
                <div className='w-10'>{message.role === 'user' ? 'You' : 'AI'}</div>
                {!isEditing ? (
                    <Markdown message={message} />
                ) : (
                    <div className='flex-grow'>
                        <textarea
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                            className='bg-white border border-gray-300 rounded py-2 px-4 block w-full focus:outline-none focus:border-slate-400'
                        />
                        <div className='flex justify-end mt-2 gap-3'>
                            <button
                                onClick={handleSaveChanges}
                                className='btn btn-active btn-primary btn-sm  rounded capitalize font-light text-base'
                            >
                                Save changes
                            </button>
                            <button
                                onClick={handleCancel}
                                className='btn btn-active btn-ghost btn-sm rounded capitalize font-light text-base'
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
                {!isEditing && (
                    <div
                        className={`flex gap-2 absolute right-10 opacity-0 
                        transition-all ease-in-out duration-300 ${isHovered ? 'opacity-100 right-0' : ''}`}
                    >
                        {!isCopied ? (
                            <HiOutlineClipboard
                                onClick={handleCopyToClipboard}
                                className='cursor-pointer hover:scale-110'
                            />
                        ) : (
                            <TbClipboardCheck className='text-green-500' />
                        )}
                        {message.role === 'user' && (
                            <HiPencilSquare onClick={handleEdit} className='cursor-pointer hover:scale-110' />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

import { useEffect, useState } from 'react';
import { Chat } from '@/types';
import { HiPencilSquare, HiTrash, HiCheck, HiOutlineXMark, HiChatBubbleLeftEllipsis } from 'react-icons/hi2';

import { selectAllChats } from '@/store/chatsSlice';
import { useSelector } from 'react-redux';
import ChatList from './ChatList';
interface Props {
    toggleSidebar: () => void;
    isSidebarOpen: boolean;
}

export default function Sidebar({ isSidebarOpen, toggleSidebar }: Props) {
    const chats: Chat[] | null = useSelector(selectAllChats);

    const sidebarClasses = `fixed top-0 left-0 transform transition-transform h-screen w-64 bg-gray-800 text-white ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
    }`;
    return (
        <div className={sidebarClasses}>
            <div className='fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white'>
                <div className='flex flex-row justify-between items-center px-5 h-16 border-b border-gray-700 '>
                    <h1 className='text-2xl font-semibold'>New Chat</h1>
                    <button
                        className='text-white p-2 rounded hover:bg-gray-700 focus:outline-none'
                        onClick={toggleSidebar}
                    >
                        <HiOutlineXMark className='w-6 h-6' />
                    </button>
                </div>

                <ChatList chats={chats} />
            </div>
        </div>
    );
}

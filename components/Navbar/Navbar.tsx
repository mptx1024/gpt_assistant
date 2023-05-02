import { useState } from 'react';

import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import { HiMoon, HiOutlineSun, HiMenu } from 'react-icons/hi';
import { useSelector } from 'react-redux';

import { RootState } from '@/store';
import { selectChatById } from '@/store/chatsSlice';

import Button from '../Button';
type Props = {
    toggleSidebar: () => void;
    isSidebarOpen: boolean;
};
export default function Navbar({ toggleSidebar, isSidebarOpen }: Props) {
    const router = useRouter();
    const { id } = router.query;
    const chat = useSelector((state: RootState) => selectChatById(state, id as string));
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <nav className='flex text- h-16 w-full items-center justify-between bg-white px-4 dark:bg-gray-800'>
            {isSidebarOpen ? null : <Button icon={HiMenu} size='lg' onClick={toggleSidebar} />}
            {/* <button className='text-gray-600 p-2 rounded hover:bg-gray-200 focus:outline-none' 
            onClick={toggleSidebar}>
                <HiMenu className='w-6 h-6' />
            </button> */}
            <p>{chat?.title}</p>
            {<Button icon={theme === 'dark' ? HiOutlineSun : HiMoon} onClick={toggleTheme} size='sm' />}
        </nav>
    );
}

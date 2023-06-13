import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import { HiBars3, HiMoon, HiOutlineSun, HiPlus } from 'react-icons/hi2';
import { useSelector } from 'react-redux';

import { selectCurrentChat } from '@/store/chatsSlice';
import { createNewChat } from '@/utils/chat';

import Button from './Button';
type Props = {
    toggleSidebar: () => void;
};

export default function Navbar({ toggleSidebar }: Props) {
    const router = useRouter();
    const chat = useSelector(selectCurrentChat);
    const [mounted, setMounted] = useState(false);

    const title = () => {
        if (router.pathname === '/role') {
            return 'Assistant Library';
        } else if (chat) {
            return chat.title;
        }
        return '';
    };

    const { theme, setTheme } = useTheme();
    const handleClickNewChat = () => {
        createNewChat();
    };
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }
    const toggleTheme = () => {
        console.log(`theme: ${theme}`);
    };
    const navbarClasses =
        'nav flex-shrink-0 flex h-16 w-full justify-between items-center pr-3 py-3  transition-all duration-300';
    return (
        <div className={navbarClasses}>
            <Button Icon={HiBars3} btnSize="lg" onClick={toggleSidebar} />
            <span className=" mr-auto max-w-[80%] truncate pl-2 text-[1.1rem] font-medium">
                {title()}
            </span>
            <div className="flex items-center justify-end gap-2">
                <Button Icon={HiPlus} btnSize="lg" border={true} onClick={handleClickNewChat} />
                <Button
                    Icon={theme === 'dark' ? HiOutlineSun : HiMoon}
                    onClick={toggleTheme}
                    border={true}
                    btnSize="lg"
                />
            </div>
        </div>
    );
}

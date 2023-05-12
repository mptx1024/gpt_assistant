import clsx from 'clsx';
import { useSelector } from 'react-redux';

import { selectAllChats } from '@/store/chatsSlice';
import { selectAllRoles } from '@/store/rolesSlice';
import { Chat, Role } from '@/types';

import BottomSection from './BottomSection';
import ChatList from './ChatList';
import RoleList from './RoleList';
import TopSection from './TopSection';

interface Props {
    toggleSidebar: () => void;
    isSidebarOpen: boolean;
}

export default function Sidebar({ isSidebarOpen, toggleSidebar }: Props) {
    const chats: Chat[] | null = useSelector(selectAllChats);
    const roles: Role[] | null = useSelector(selectAllRoles);
    console.log(`isSidebarOpen: ${isSidebarOpen}`);

    const sidebarClasses =
        'border relative border-black flex flex-col h-full bg-neutral-100 text-light-text dark:bg-dark-bg dark:text-text-dark transition-all duration-300 overflow-x-hidden';
    return (
        <div
            className={clsx(
                sidebarClasses,
                isSidebarOpen ? 'block w-[20rem] flex-shrink-0' : 'w-0'
            )}
        >
            <TopSection toggleSidebar={toggleSidebar} />

            <ChatList chats={chats} />
            <RoleList roles={roles} />
            <BottomSection />
        </div>
    );
}

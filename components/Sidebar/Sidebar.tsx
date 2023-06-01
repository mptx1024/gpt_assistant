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
    sidebarOpen: boolean;
}

export default function Sidebar({ sidebarOpen: isSidebarOpen, toggleSidebar }: Props) {
    const chats: Chat[] | null = useSelector(selectAllChats);
    const roles: Role[] | null = useSelector(selectAllRoles);

    const sidebarClasses =
        'relative flex flex-col h-full bg-white-base dark:bg-black transition-all duration-200';
    return (
        <div
            className={clsx(
                sidebarClasses,
                isSidebarOpen ? 'w-full sm:w-[17rem] lg:w-[19rem] xl:w-[22rem]' : 'w-0 opacity-0'
            )}
        >
            <TopSection toggleSidebar={toggleSidebar} />
            <div className="relative flex h-[calc(100%-7.5rem)] flex-col px-1">
                <ChatList chats={chats} />
                <RoleList roles={roles} />
            </div>
            <div className="absolute bottom-1 px-3 w-full border-t border-color">
                <BottomSection />
            </div>
        </div>
    );
}

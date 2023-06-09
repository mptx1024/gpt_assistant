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
        'relative flex flex-col h-full bg-emerald-50/75 dark:bg-emerald-800/10 transition-all duration-200';
    return (
        <div
            className={clsx(
                sidebarClasses,
                isSidebarOpen
                    ? 'w-[20rem] shrink-0 sm:w-[15rem] lg:w-[18rem] xl:w-[22rem]'
                    : 'w-0 opacity-0'
            )}
        >
            <TopSection toggleSidebar={toggleSidebar} />
            <div className="relative mb-14 flex h-[91%] flex-col overflow-x-hidden">
                <ChatList chats={chats} />
                <RoleList roles={roles} />
            </div>
            <div className=" absolute bottom-0 flex h-[3rem] w-full items-center p-3 py-8 ">
                <BottomSection />
            </div>
        </div>
    );
}

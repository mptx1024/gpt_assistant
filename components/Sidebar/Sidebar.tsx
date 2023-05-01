import { Chat, SystemPrompt } from '@/types';
import NewChat from './NewChat';
import Settings from './settings/Settings';
import { selectAllChats } from '@/store/chatsSlice';
import { useSelector } from 'react-redux';
import ChatList from './ChatList';
import RoleList from './RoleList';
import { selectAllRoles } from '@/store/rolesSlice';
interface Props {
    toggleSidebar: () => void;
    isSidebarOpen: boolean;
}

export default function Sidebar({ isSidebarOpen, toggleSidebar }: Props) {
    const chats: Chat[] | null = useSelector(selectAllChats);
    const roles: SystemPrompt[] | null = useSelector(selectAllRoles);

    const sidebarClasses = `fixed top-0 left-0 flex flex-col transform transition-transform h-screen w-full sm:w-64 bg-gray-800 text-white ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
    }`;
    return (
        <div className={sidebarClasses}>
            <NewChat toggleSidebar={toggleSidebar} />
            <ChatList chats={chats} />
            <RoleList roles={roles} />
            <Settings />
        </div>
    );
}

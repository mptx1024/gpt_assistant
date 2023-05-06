import clsx from "clsx";
import { useSelector } from "react-redux";

import { selectAllChats } from "@/store/chatsSlice";
import { selectAllRoles } from "@/store/rolesSlice";
import { Chat, Role } from "@/types";

import BottomSection from "./BottomSection";
import ChatList from "./ChatList";
import RoleList from "./RoleList";
import TopSection from "./TopSection";

interface Props {
    toggleSidebar: () => void;
    isSidebarOpen: boolean;
}

export default function Sidebar({ isSidebarOpen, toggleSidebar }: Props) {
    const chats: Chat[] | null = useSelector(selectAllChats);
    const roles: Role[] | null = useSelector(selectAllRoles);

    const sidebarClasses =
        "absolute top-0 flex flex-col h-screen w-full sm:w-64 bg-neutral-100 text-light-text dark:bg-dark-bg dark:text-text-dark transition-all duration-300";
    return (
        <div
            className={clsx(sidebarClasses, {
                "left-0": isSidebarOpen,
                "-left-64": !isSidebarOpen,
            })}
        >
            <TopSection toggleSidebar={toggleSidebar} />
            <ChatList chats={chats} />
            <RoleList roles={roles} />
            <BottomSection />
        </div>
    );
}

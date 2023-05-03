import cx from "classnames";
import { useSelector } from "react-redux";

import { selectAllChats } from "@/store/chatsSlice";
import { selectAllRoles } from "@/store/rolesSlice";
import { Chat, Role } from "@/types";

import ChatList from "./ChatList";
import NewChat from "./NewChat";
import RoleList from "./RoleList";
import Settings from "./settings/Settings";

interface Props {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export default function Sidebar({ isSidebarOpen, toggleSidebar }: Props) {
  const chats: Chat[] | null = useSelector(selectAllChats);
  const roles: Role[] | null = useSelector(selectAllRoles);

  const sidebarClasses =
    "fixed top-0 left-0 flex flex-col transform transition-transform h-screen w-full sm:w-64 bg-light-bg text-light-text dark:bg-dark-bg dark:text-text-dark";
  return (
    <div
      className={cx(sidebarClasses, {
        "translate-x-0": isSidebarOpen,
        "-translate-x-full": !isSidebarOpen,
      })}
    >
      <NewChat toggleSidebar={toggleSidebar} />
      <ChatList chats={chats} />
      <RoleList roles={roles} />
      <Settings />
    </div>
  );
}

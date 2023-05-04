import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import { HiMoon, HiOutlineSun, HiBars3, HiPlus } from "react-icons/hi2";
import { useSelector } from "react-redux";

import { RootState } from "@/store";
import { selectChatById } from "@/store/chatsSlice";
import { createNewChat } from "@/utils/chats";

import Button from "../Button";
type Props = {
    toggleSidebar: () => void;
    isSidebarOpen: boolean;
};

const navbarClasses =
    "flex h-16 w-full items-center justify-between bg-light-bg px-4 dark:bg-dark-bg";
const btnGroupClasses = "flex items-center gap-2 ";

export default function Navbar({ toggleSidebar, isSidebarOpen }: Props) {
    const router = useRouter();
    const { id } = router.query;
    const chat = useSelector((state: RootState) => selectChatById(state, id as string));
    const { theme, setTheme } = useTheme();
    const handleClickNewChat = () => {
        const chatID = createNewChat();
        router.push(`/chat/${chatID}`);
    };
    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <nav className={navbarClasses}>
            {isSidebarOpen ? null : <Button Icon={HiBars3} size="lg" onClick={toggleSidebar} />}
            <p>{chat?.title}</p>
            <div className={btnGroupClasses}>
                <Button Icon={HiPlus} size="lg" border={true} onClick={handleClickNewChat} />

                <Button
                    Icon={theme === "dark" ? HiOutlineSun : HiMoon}
                    onClick={toggleTheme}
                    border={true}
                    size="lg"
                />
            </div>
        </nav>
    );
}

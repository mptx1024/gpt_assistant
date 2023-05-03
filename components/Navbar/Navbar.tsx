import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import { HiMoon, HiOutlineSun, HiMenu } from "react-Icons/hi";
import { useSelector } from "react-redux";

import { RootState } from "@/store";
import { selectChatById } from "@/store/chatsSlice";

import Button from "../Button";
type Props = {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
};
export default function Navbar({ toggleSidebar, isSidebarOpen }: Props) {
  const router = useRouter();
  const { id } = router.query;
  const chat = useSelector((state: RootState) =>
    selectChatById(state, id as string)
  );
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav className="text- flex h-16 w-full items-center justify-between bg-white px-4 dark:bg-gray-800">
      {isSidebarOpen ? null : (
        <Button Icon={HiMenu} size="lg" onClick={toggleSidebar} />
      )}
      <p>{chat?.title}</p>
      {
        <Button
          Icon={theme === "dark" ? HiOutlineSun : HiMoon}
          onClick={toggleTheme}
          size="sm"
        />
      }
    </nav>
  );
}

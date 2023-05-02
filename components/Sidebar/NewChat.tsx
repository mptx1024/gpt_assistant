import Link from "next/link";
import { useRouter } from "next/router";
import { HiOutlineXMark, HiPlus } from "react-icons/hi2";

import { createNewChat } from "@/utils/chats";
interface Props {
  toggleSidebar: () => void;
}
const NewChat = (props: Props) => {
  const router = useRouter();
  const handleClickNewChat = () => {
    const chatID = createNewChat();
    router.push(`/chat/${chatID}`);
  };
  return (
    <div className="flex h-16 flex-row items-center justify-between px-5 ">
      {/* <button
        className="btn-outline btn gap-2 text-lg font-semibold capitalize text-teal-50"
        onClick={handleClickNewChat}
      >
        <HiPlus className="h-6 w-6" />
        New Chat
      </button> */}

      {/* <h1 className='text-2xl font-semibold'>New Chat</h1> */}
      <button
        className="rounded p-2 text-white hover:bg-gray-700 focus:outline-none"
        onClick={props.toggleSidebar}
      >
        <HiOutlineXMark className="h-6 w-6" />
      </button>
    </div>
  );
};
export default NewChat;

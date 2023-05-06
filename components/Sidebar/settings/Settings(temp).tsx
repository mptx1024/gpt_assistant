import Link from "next/link";
import { useRouter } from "next/router";
import {
    HiTrash,
    HiCalculator,
    HiCheck,
    HiOutlineXMark,
    HiOutlineCog6Tooth,
} from "react-icons/hi2";

import { removeAll } from "@/store/chatsSlice";
import { useAppDispatch } from "@/store/hooks";

const BottomSection = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const onClickUsage = () => {
        // Your implementation for Usage onClick event
    };

    const onClickApiSettings = () => {
        // Your implementation for API Settings onClick event
    };

    const onConfirmClearChats = () => {
        // Your implementation for clearing chats

        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }
        dispatch(removeAll());
        // router.push('/chat');
    };

    return (
        <div className="] mt-auto flex flex-col border-t border-gray-500 py-3">
            <div className="dropdown-top dropdown">
                <div
                    tabIndex={0}
                    className="text-md btn m-1 mx-2 flex cursor-pointer items-center justify-start gap-5 rounded-md border-none px-2 py-1 hover:bg-gray-700"
                >
                    <HiTrash className="h-4 w-4" />
                    Clear Chats
                </div>
                <div
                    tabIndex={0}
                    className="dropdown-content text-primary-content flex w-48 items-center gap-3 rounded-lg p-3 shadow"
                >
                    Are you sure?
                    <Link href={"/chat"}>
                        <HiCheck
                            className="h-5 w-5 cursor-pointer hover:bg-gray-700"
                            onClick={onConfirmClearChats}
                        />
                    </Link>
                    <HiOutlineXMark
                        className="h-5 w-5 cursor-pointer hover:bg-gray-700 "
                        onClick={() => {
                            if (document.activeElement instanceof HTMLElement) {
                                document.activeElement.blur();
                            }
                        }}
                    />
                </div>
            </div>

            <label
                htmlFor="usage-modal"
                className="text-md btn m-1 mx-2 flex cursor-pointer items-center justify-start gap-5 rounded-md px-2 py-1 hover:bg-gray-700"
            >
                <HiCalculator className="h-4 w-4" />
                Usage
            </label>

            <label
                htmlFor="setting-modal"
                className="text-md btn m-1 mx-2 flex cursor-pointer items-center justify-start gap-5 rounded-md px-2 py-1 hover:bg-gray-700"
            >
                <HiOutlineCog6Tooth className="h-4 w-4" />
                Settings
            </label>
        </div>
    );
};

export default BottomSection;

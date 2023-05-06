import { useState } from "react";

import clsx from "clsx";
import { HiPencilSquare, HiOutlineClipboard } from "react-icons/hi2";
import { TbClipboardCheck } from "react-icons/tb";
import { useDispatch } from "react-redux";

import { deleteMessageUpTo } from "@/store/chatsSlice";
import { Message } from "@/types";
import { copyToClipboard } from "@/utils/chats";

import Markdown from "./Markdown";

interface Props {
    message: Message;
    generateReply: (content: string) => void;
}

export default function ChatMessage({ message, generateReply }: Props) {
    const [isHovered, setIsHovered] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState("");
    const dispatch = useDispatch();

    const handleCopyToClipboard = async () => {
        await copyToClipboard(message.content, setIsCopied);
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSaveChanges = () => {
        // change chat history in store
        dispatch(deleteMessageUpTo({ message }));
        // then regenerate reply
        generateReply(editedContent);
        setIsEditing(false);
        setEditedContent("");
    };

    const handleCancel = () => {
        setIsEditing(false);
    };
    const messageBackdropClasses = clsx("debug-1", {
        "bg-light-bg dark:bg-dark-bg": message.role === "user",
        "bg-slate-200 dark:bg-slate-700": message.role !== "user",
    });
    return (
        <div
            className={messageBackdropClasses}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className="debug-2 relative m-auto flex 
            md:max-w-2xl md:gap-4 md:py-4 lg:max-w-3xl lg:px-0 xl:max-w-3xl
            "
            >
                <div className="w-10">{message.role === "user" ? "You" : "AI"}</div>
                {!isEditing ? (
                    <Markdown message={message} />
                ) : (
                    <div className="flex-grow">
                        <textarea
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                            className="block w-full rounded border border-gray-300 bg-white px-4 py-2 focus:border-slate-400 focus:outline-none"
                        />
                        <div className="mt-2 flex justify-end gap-3">
                            <button
                                onClick={handleSaveChanges}
                                className="btn btn-active btn-primary btn-sm  rounded text-base font-light capitalize"
                            >
                                Save changes
                            </button>
                            <button
                                onClick={handleCancel}
                                className="btn btn-active btn-ghost btn-sm rounded text-base font-light capitalize"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
                {!isEditing && (
                    <div
                        className={`absolute right-10 flex gap-2 opacity-0 
                        transition-all duration-300 ease-in-out ${
                            isHovered ? "right-0 opacity-100" : ""
                        }`}
                    >
                        {!isCopied ? (
                            <HiOutlineClipboard
                                onClick={handleCopyToClipboard}
                                className="cursor-pointer hover:scale-110"
                            />
                        ) : (
                            <TbClipboardCheck className="text-green-500" />
                        )}
                        {message.role === "user" && (
                            <HiPencilSquare
                                onClick={handleEdit}
                                className="cursor-pointer hover:scale-110"
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

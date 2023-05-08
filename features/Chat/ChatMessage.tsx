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
    const messageBackdropClasses = clsx(
        "group w-full text-gray-800 dark:text-gray-100 border-b border-black/10 dark:border-gray-900/50",
        {
            "bg-light-bg dark:bg-dark-bg": message.role === "user",
            "bg-slate-200 dark:bg-slate-700": message.role !== "user",
        }
    );
    return (
        <div className={messageBackdropClasses}>
            <div
                className="m-auto flex gap-3 p-4 text-base
            md:max-w-2xl md:gap-6 md:py-6 lg:max-w-2xl lg:px-0 xl:max-w-3xl
            "
            >
                <div className="flex w-8 flex-shrink-0 flex-col items-end text-base">
                    {message.role === "user" ? "You" : "AI"}
                </div>
                <div className="prose relative flex w-[calc(100%-50px)] flex-col gap-1 dark:prose-invert md:gap-3 lg:w-[calc(100%-115px)]">
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
                    <div className="mt-2 flex justify-center gap-2 self-end md:absolute md:right-0 md:top-1 md:mt-0 md:translate-x-full md:gap-3 md:self-center md:pl-2">
                        {!isEditing && (
                            <div className="flex gap-2 transition-all duration-200 md:translate-x-full md:opacity-0 md:group-hover:translate-x-0 md:group-hover:opacity-100">
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
            </div>
        </div>
    );
}

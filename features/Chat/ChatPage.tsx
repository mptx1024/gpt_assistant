import { useEffect, useRef, memo } from "react";

import { useSelector } from "react-redux";

import { RootState, store } from "@/store";
import { selectChatById } from "@/store/chatsSlice";
import { Message, Chat } from "@/types";

import ChatMessage from "./ChatMessage";
import useChat from "./hooks/useChat";
import Input from "./Input";

interface Props {
    chat: Chat;
}
const ChatPage = memo(function ChatPage({ chat }: Props) {
    const { generateReply, regenerate, setStopGenerating, isLoading } = useChat({
        chatID: chat.id,
    });

    const messages: Message[] = chat.messages;
    // redirect

    const lastMessageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView(true);
        }
    }, [messages]);

    return (
        <div className="flex h-screen w-full flex-col overflow-hidden overflow-y-auto bg-light-bg duration-300 dark:bg-dark-bg">
            {messages.length === 0 && <div>new msg. show home page stuff</div>}

            {messages && (
                <div id="messages-box" className="mb-32 animate-slideIn">
                    {messages.map((message, index) => (
                        <ChatMessage key={index} message={message} generateReply={generateReply} />
                    ))}
                </div>
            )}
            {/*  The left property places the left edge of the element at the center of the parent, and the -translate-x-1/2 class shifts the element back to the left by half of its width, effectively centering it. */}
            <div ref={lastMessageRef} />
            <div
                className="absolute bottom-0 left-1/2 flex w-full -translate-x-1/2 transform flex-col items-center justify-center
                overflow-y-scroll bg-gradient-to-b from-transparent via-light-bg to-light-bg pt-4 dark:via-dark-bg dark:to-dark-bg"
            >
                <Input
                    generateReply={generateReply}
                    regenerate={regenerate}
                    isLoading={isLoading}
                    setStopGenerating={setStopGenerating}
                />
            </div>
        </div>
    );
});

export default ChatPage;

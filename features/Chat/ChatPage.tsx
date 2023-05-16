import { useEffect, useRef, memo } from 'react';

import { Message, Chat } from '@/types';

import ChatMessage from './ChatMessage';
import useChat from './hooks/useChat';
import Input from './Input';
import { ChatParamsCard } from '../../components/settings/ChatSetting';

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
        <div className=" flex h-full w-full flex-col items-center overflow-y-auto">
            <ChatParamsCard chat={chat} />

            {messages && (
                <div id="messages-section" className="mb-32 flex w-full animate-slideIn flex-col">
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

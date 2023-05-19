import { useEffect, useRef, memo } from 'react';

import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { ChatParamsCard } from '@/components/settings/ChatSetting';
import ChatMessage from '@/features/Chat/ChatMessage';
import ChatPage from '@/features/Chat/ChatPage';
import useChat from '@/features/Chat/hooks/useChat';
import Input from '@/features/Chat/Input';
import { RootState } from '@/store';
import { selectChatById } from '@/store/chatsSlice';
import { Message, Chat } from '@/types';

export default function DynamicChatPage() {
    const router = useRouter();
    // const chatID = useSelector((store: RootState) => store.chats.currentChatID);
    const { id } = router.query;
    const chatID = typeof id === 'string' ? id : '';

    const chat = useSelector((state: RootState) => selectChatById(state, id as string));
    const lastMessageRef = useRef<HTMLDivElement>(null);
    const messageBlockRef = useRef<HTMLDivElement>(null);

    const { generateReply, regenerate, setStopGenerating, isLoading } = useChat({ chatID });

    const messages: Message[] | undefined = chat?.messages;

    useEffect(() => {
        if (
            messageBlockRef.current &&
            lastMessageRef.current &&
            Math.abs(
                messageBlockRef.current.scrollHeight -
                    messageBlockRef.current.clientHeight -
                    messageBlockRef.current.scrollTop
            ) < 10
        ) {
            lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    if (!chat) {
        return null;
    }

    return (
        <div
            id="chat-container"
            ref={messageBlockRef}
            className="flex h-full w-full flex-col items-center overflow-y-auto"
        >
            {messages && (
                <div
                    id="messages-container"
                    className="mb-[9rem] flex w-full flex-col overflow-y-auto"
                >
                    <ChatParamsCard chat={chat} key={Math.random()} />
                    {messages.map((message, index) => (
                        <ChatMessage key={index} message={message} generateReply={generateReply} />
                    ))}
                </div>
            )}

            <div ref={lastMessageRef} />
            <div
                className="absolute bottom-0 left-1/2 flex w-full -translate-x-1/2
            flex-col items-center justify-center  bg-gray-base from-transparent pt-1 dark:bg-gray-inverted"
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
}

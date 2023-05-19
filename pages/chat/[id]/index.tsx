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
    const chatID = useSelector((store: RootState) => store.chats.currentChatID);
    const chat = useSelector((state: RootState) => selectChatById(state, chatID as string));
    const lastMessageRef = useRef<HTMLDivElement>(null);
    const { generateReply, regenerate, setStopGenerating, isLoading } = useChat({ chatID });

    const messages: Message[] | undefined = chat?.messages;

    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView(true);
        }
    }, [messages]);
    if (!chat) {
        // router.push('/role');
        return null;
    }

    // return <ChatPage chatID={chat} />;

    return (
        <div className="flex h-full w-full flex-col items-center overflow-y-auto">
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
                className="absolute bottom-0 left-1/2 flex w-full -translate-x-1/2
            flex-col items-center justify-center overflow-y-scroll bg-gray-base from-transparent pt-4 dark:bg-gray-inverted"
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

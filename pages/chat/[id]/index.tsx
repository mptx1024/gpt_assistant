import { useEffect, useRef } from 'react';

import { useRouter } from 'next/router';

import ChatMessage from '@/features/Chat/ChatMessage';
import Input from '@/features/Chat/Input';
import { MemoizedChatParamsCard } from '@/features/settings/ChatSetting';
import { selectCurrentChat, selectMessageIdsByChat } from '@/store/chatsSlice';
import { useAppSelector } from '@/store/hooks';
export default function DynamicChatPage() {
    const router = useRouter();
    const currentChat = useAppSelector(selectCurrentChat);
    const chatId = typeof currentChat?.id === 'string' ? currentChat?.id : '';
    const messageIds: string[] = useAppSelector((state) =>
        selectMessageIdsByChat(state, chatId as string)
    );
    const lastMessageRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const msgContainerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messageIds]);
    useEffect(() => {
        if (!msgContainerRef.current) return;
        const resizeObserver = new ResizeObserver(() => {
            if (containerRef.current) {
                const isScrolledToBottom =
                    containerRef.current.scrollHeight -
                        containerRef.current.offsetHeight -
                        containerRef.current.scrollTop <
                    100;
                isScrolledToBottom &&
                    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
            }
        });
        resizeObserver.observe(msgContainerRef.current);
        return () => resizeObserver.disconnect();
    }, []);

    if (!currentChat) {
        //redirect to landing
        router.push('/role');
    }

    return (
        <div
            id="chat-container"
            className="mb-[10rem] flex h-full w-full flex-col items-center overflow-y-auto"
            ref={containerRef}
        >
            <div
                id="chat-messages-container"
                className="flex w-full flex-col "
                ref={msgContainerRef}
            >
                <MemoizedChatParamsCard chatId={chatId} />
                {messageIds.map((messageId) => (
                    <ChatMessage key={messageId} messageId={messageId} chatId={chatId} />
                ))}
            </div>
            <div ref={lastMessageRef} />
            <div
                id="chat-input-container"
                className="bg-gray-base dark:bg-gray-inverted absolute bottom-0 right-0 flex min-h-[10rem] w-full 
            justify-center"
            >
                <Input chatId={chatId} />
            </div>
        </div>
    );
}

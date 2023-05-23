import { useEffect, useRef } from 'react';

import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { MemoizedChatParamsCard } from '@/components/settings/ChatSetting';
import ChatMessage from '@/features/Chat/ChatMessage';
import useChat from '@/features/Chat/hooks/useChat';
import Input from '@/features/Chat/Input';
import { RootState } from '@/store';
import { selectChatById } from '@/store/chatsSlice';

export default function DynamicChatPage() {
    const router = useRouter();
    const { id } = router.query;
    const chatId = typeof id === 'string' ? id : '';

    const chat = useSelector((state: RootState) => selectChatById(state, id as string));
    const lastMessageRef = useRef<HTMLDivElement>(null);
    const messageBlockRef = useRef<HTMLDivElement>(null);

    const { generateReply, regenerate, setStopGenerating, isLoading } = useChat({ chatId: chatId });

    // const messages: Message[] | undefined = chat?.messages;

    useEffect(() => {
        if (
            messageBlockRef.current &&
            lastMessageRef.current &&
            Math.abs(
                messageBlockRef.current.scrollHeight -
                    messageBlockRef.current.clientHeight -
                    messageBlockRef.current.scrollTop
            ) < 50
        ) {
            lastMessageRef.current.scrollIntoView(true);
        }
    }, [isLoading]);

    if (!chat) {
        return null;
    }

    return (
        <div id="chat-container" className="flex h-full w-full flex-col items-center overflow-auto">
            <div
                id="messages-container"
                ref={messageBlockRef}
                className="mb-[9rem] flex w-full flex-col overflow-auto"
            >
                <MemoizedChatParamsCard chatId={chat.id} />
                {chat.messages.map((messageId, index) => (
                    <ChatMessage key={index} messageId={messageId} generateReply={generateReply} />
                ))}
                <div ref={lastMessageRef} />
            </div>

            <div
                className="absolute bottom-0 left-1/2 flex w-full -translate-x-1/2
            flex-col items-center justify-center bg-gray-base from-transparent pt-1 dark:bg-gray-inverted"
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

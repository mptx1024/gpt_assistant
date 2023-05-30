import { useEffect, useRef } from 'react';

import { useRouter } from 'next/router';

import ChatMessage from '@/features/Chat/ChatMessage';
import Input from '@/features/Chat/Input';
import { MemoizedChatParamsCard } from '@/features/settings/ChatSetting';
import { selectIsLoading, selectMessageIdsByChat } from '@/store/chatsSlice';
import { useAppSelector } from '@/store/hooks';

export default function DynamicChatPage() {
    const router = useRouter();
    const { id } = router.query;
    const chatId = typeof id === 'string' ? id : '';
    //TODO: only fetch chat Params, not entire chat
    // const chat = useAppSelector((state) => selectChatById(state, chatId as string));
    const messageIds = useAppSelector((state) => selectMessageIdsByChat(state, chatId as string));

    const isLoading = useAppSelector(selectIsLoading);

    const lastMessageRef = useRef<HTMLDivElement>(null);
    const messageBlockRef = useRef<HTMLDivElement>(null);
    console.log(
        `in ChatPage isLoading: ${isLoading}; lastMessageRef.current: ${Boolean(
            lastMessageRef.current
        )}`
    );

    useEffect(() => {
        if (
            messageBlockRef.current &&
            lastMessageRef.current &&
            Math.abs(
                messageBlockRef.current.scrollHeight -
                    messageBlockRef.current.clientHeight -
                    messageBlockRef.current.scrollTop
            ) < 1000
        ) {
            lastMessageRef.current.scrollIntoView(true);
        }
    }, [isLoading]);

    if (typeof messageIds === 'undefined') {
        return null;
    }

    return (
        <div id="chat-container" className="flex h-full w-full flex-col items-center overflow-auto">
            <div
                id="messages-container"
                ref={messageBlockRef}
                className="debug-1 mb-[10rem] flex w-full flex-col"
            >
                <MemoizedChatParamsCard chatId={chatId} />
                {messageIds.map((messageId) => (
                    <ChatMessage key={Math.random()} messageId={messageId} chatId={chatId} />
                ))}
            </div>
            <div ref={lastMessageRef} className="debug-2" />

            <div
                className="debug-3 absolute bottom-0 left-1/2 flex h-[10rem] w-full -translate-x-1/2
            flex-col items-center justify-center bg-gray-base from-transparent pt-1 dark:bg-gray-inverted"
            >
                <Input chatId={chatId} />
            </div>
        </div>
    );
}

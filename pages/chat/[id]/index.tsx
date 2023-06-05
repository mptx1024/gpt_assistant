import ChatMessage from '@/features/Chat/ChatMessage';
import Input from '@/features/Chat/Input';
import { MemoizedChatParamsCard } from '@/features/settings/ChatSetting';
import { selectCurrentChat, selectMessageIdsByChat } from '@/store/chatsSlice';
import { useAppSelector } from '@/store/hooks';
import { Router, useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
export default function DynamicChatPage() {
    const router = useRouter();
    // const { id } = router.query;
    const currentChat = useAppSelector(selectCurrentChat);
    const chatId = typeof currentChat?.id === 'string' ? currentChat?.id : '';
    const messageIds = useAppSelector((state) => selectMessageIdsByChat(state, chatId as string));
    const lastMessageRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const msgContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!msgContainerRef.current) return;
        const resizeObserver = new ResizeObserver(() => {
            // console.log(
            //     `scrollHeight: ${containerRef.current?.scrollHeight}; offsetHeight: ${containerRef.current?.offsetHeight}; clientHeight: ${containerRef.current?.clientHeight}; scrollTop: ${containerRef.current?.scrollTop}`
            // );
            if (containerRef.current) {
                const isScrolledToBottom =
                    containerRef.current.scrollHeight -
                        containerRef.current.offsetHeight -
                        containerRef.current.scrollTop <
                    100;
                // console.log(`isScrolledToBottom: ${isScrolledToBottom}`);
                isScrolledToBottom &&
                    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
            }
        });
        resizeObserver.observe(msgContainerRef.current);
        return () => resizeObserver.disconnect();
    }, []);

    if (!currentChat) {
        //redirect to landing
        router.push('/role')
    }

    return (
        <div
            id="chat-container"
            className="mb-[10rem] flex h-full w-full flex-col items-center overflow-auto"
            ref={containerRef}
        >
            <div id="messages-container" className="flex w-full  flex-col" ref={msgContainerRef}>
                <MemoizedChatParamsCard chatId={chatId} />
                {messageIds.map((messageId) => (
                    <ChatMessage key={Math.random()} messageId={messageId} chatId={chatId} />
                ))}
            </div>
            <div ref={lastMessageRef} />
            {/* <button className="absolute bottom-[10rem] bg-red-600" onClick={onClick}>
                Scroll to bottom
            </button> */}
            <div id="chat-input-container"
                className="absolute bottom-0 left-1/2 flex min-h-[10rem] w-full -translate-x-1/2
            flex-col items-center justify-center bg-gray-base from-transparent pt-1 dark:bg-gray-inverted"
            >
                <Input chatId={chatId} />
            </div>
        </div>
    );
}

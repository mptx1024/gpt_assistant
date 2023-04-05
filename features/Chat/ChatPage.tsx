import Input from './Input';
import ChatMessage from './ChatMessage';
import { Message } from '@/types';
import { selectChatById } from '@/store/chatsSlice';
import { useSelector } from 'react-redux';
import { RootState, store } from '@/store';
import { useEffect, useRef } from 'react';

function ChatPage({ chatID }: { chatID: string }) {
    let messages: Message[] = useSelector((state: RootState) => selectChatById(state, chatID)?.messages || []);

    const lastMessageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView(true);
        }
    }, [messages]);

    return (
        <div className='flex flex-col w-full h-screen duration-300 overflow-hidden overflow-y-scroll bg-slate-200'>
            {messages.length === 0 && <div>new msg. show home page stuff</div>}

            {messages && (
                <div id='messages-box' className='mb-32'>
                    {messages.map((message, index) => (
                        <ChatMessage key={index} message={message} />
                    ))}
                </div>
            )}
            {/*  The left property places the left edge of the element at the center of the parent, and the -translate-x-1/2 class shifts the element back to the left by half of its width, effectively centering it. */}
            <div ref={lastMessageRef} />
            <div
                className='absolute left-1/2 transform -translate-x-1/2 bottom-0 flex flex-col justify-center items-center w-full
                bg-gradient-to-b from-transparent via-white to-white'
            >
                <Input chatID={chatID} />
            </div>
        </div>
    );
}
export default ChatPage;

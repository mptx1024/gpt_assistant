import React, { useState, useRef } from 'react';
import ChatManagerInstance, { ChatManager } from './utils/chatManager';
import { FiSend } from 'react-icons/fi';
import { Chat } from '@/types';

type Props = {
    chatID: string;
};

export default function Input({ chatID }: Props) {
    const [isTyping, setIsTyping] = useState(false);
    const [userInput, setUserInput] = useState('');
    const chatManager = useRef<ChatManager>(ChatManagerInstance);

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUserInput(event.target.value);
    };
    const handleSubmit = async () => {
        await chatManager.current.generateReply({ chatID, content: userInput });
        setUserInput('');
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSubmit();
        }
    };

    return (
        <div className='flex justify-between items-center w-9/12 mb-4 px-2 rounded-lg  border border-slate-300 shadow-md focus-within:border-neutral-500 focus-within:border-1'>
            <textarea
                className='text-base p-2 w-full resize-none outline-none dark:bg-transparent'
                placeholder='Type here...'
                value={userInput}
                rows={1}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
            <button onClick={handleSubmit} className=' text-slate-600 hover:text-slate-400 mr-2'>
                <FiSend />
            </button>
        </div>
    );
}

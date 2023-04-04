import React, { useState, useRef } from 'react';
import ChatManagerInstance, { ChatManager } from './utils/chatManager';
import { FiSend } from 'react-icons/fi';
import { HiArrowPath } from 'react-icons/hi2';

type Props = {
    chatID: string;
};

export default function Input({ chatID }: Props) {
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
        <div className='flex flex-col items-center mb-4 w-10/12 max-w-3xl'>
            <button className='btn btn-sm btn-primary py-1 px-5 my-4 gap-2 capitalize'>
                <HiArrowPath />
                Regenerate
            </button>
            <div className='flex justify-between items-center w-full border border-slate-30 rounded-lg overflow-hidden '>
                <textarea
                    className='text-base p-2 w-full resize-none outline-none'
                    placeholder='Type here...'
                    value={userInput}
                    rows={1}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />
                <button
                    onClick={handleSubmit}
                    disabled={!userInput}
                    className='cursor-pointer disabled:cursor-not-allowed p-4 '
                >
                    <FiSend className='text-slate-600 hover:text-slate-400 ' />
                </button>
            </div>
        </div>
    );
}

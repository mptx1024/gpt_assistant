import React, { useState, useEffect } from 'react';
import { FiSend } from 'react-icons/fi';
import { HiArrowPath } from 'react-icons/hi2';
type Props = {
    chatID: string;
    generateReply: (content: string) => void;
    regenerate: () => void;
    isLoading: boolean;
    setStopGenerating: () => void;
};

export default function Input({ chatID, generateReply, regenerate, isLoading, setStopGenerating }: Props) {
    const [userInput, setUserInput] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUserInput(event.target.value);
    };

    const handleSubmit = async () => {
        generateReply(userInput);
        setUserInput('');
    };
    const handleRegenerate = () => {
        regenerate();
    };
    const handleStopGenerating = () => {
        setStopGenerating();
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSubmit();
        }
    };

    return (
        <div className='flex flex-col items-center mb-4 w-10/12 max-w-3xl'>
            {isLoading ? (
                <button
                    onClick={handleStopGenerating}
                    className='btn btn-sm btn-primary py-1 px-5 my-4 gap-2 capitalize'
                >
                    <HiArrowPath />
                    Stop Generating
                </button>
            ) : (
                <button onClick={handleRegenerate} className='btn btn-sm btn-primary py-1 px-5 my-4 gap-2 capitalize'>
                    <HiArrowPath />
                    Regenerate
                </button>
            )}
            <div className='flex justify-between items-center w-full border border-slate-30 rounded-lg overflow-hidden '>
                <textarea
                    className='text-base p-2 w-full resize-none outline-none'
                    placeholder='Type here...'
                    value={userInput}
                    rows={1}
                    onChange={handleInputChange}
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

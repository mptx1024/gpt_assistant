import React, { useState } from 'react';
import { FiSend } from 'react-icons/fi';
type Props = {};
export default function Input({}: Props) {
    const [content, setContent] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(event.target.value);
    };

    const handleSubmit = () => {};

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSubmit();
            // handle sending message
        }
    };

    return (
        <div className='flex justify-between items-center w-9/12 mb-4 px-2 rounded-lg  border border-slate-300 shadow-md focus-within:border-neutral-500 focus-within:border-1'>
            <textarea
                className='text-base p-2 w-full resize-none outline-none dark:bg-transparent'
                placeholder='Type here...'
                value={content}
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

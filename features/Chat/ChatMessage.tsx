import { Message } from '@/types';
import Markdown from './Markdown';
import { useState } from 'react';
import { HiPencilSquare, HiOutlineClipboard } from 'react-icons/hi2';
import {TbClipboardCheck} from 'react-icons/tb';

interface Props {
    message: Message;
}
export default function ChatMessage({ message }: Props) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={` [&>*]:text-slate-500 ${message.role === 'user' ? 'bg-slate-200' : 'bg-slate-100'}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className='relative m-auto flex 
            md:max-w-2xl md:gap-4 md:py-4 lg:max-w-3xl lg:px-0 xl:max-w-3xl
            '
            >
                <div className='w-10'>{message.role === 'user' ? 'You' : 'AI'}</div>
                <Markdown message={message} />
                {isHovered && (
                    <div className='flex gap-2'>
                        <HiOutlineClipboard />
                        <HiPencilSquare />
                    </div>
                )}
            </div>
        </div>
    );
}

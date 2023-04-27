import { useState } from 'react';
import { SystemPrompt, Chat } from '@/types';
import { useAppDispatch } from '@/store/hooks';
import { setOne } from '@/store/chatsSlice';
import ModalWrapper from '@/components/Modal';
import Button from '@/components/Button';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { createNewChat } from '@/utils/chats';
interface Props {
    systemPrompt: SystemPrompt;
    bgColor: string;
}

const RoleCard = (props: Props) => {
    let [isOpen, setIsOpen] = useState(false);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    const handleClickConfirm = () => {
        const chatID = createNewChat(props.systemPrompt);
        console.log('🚀 ~ file: RoleCard.tsx:25 ~ handleClickConfirm ~ chatID:', chatID);
        router.push(`/chat/${chatID}`);
        setIsOpen(false);
    };

    return (
        <>
            <a
                className={`rounded-xl p-2 sm:p-4 lg:p-6 hover:scale-105 transition-all ease-in-out ${props.bgColor}`}
                href='#'
                onClick={toggleModal}
            >
                <div className='mt-5'>
                    <h3 className='font-bold text-white text-lg sm:text-xl'>{props.systemPrompt.role}</h3>
                    <p className='text-sm text-gray-500 line-clamp-3'>{props.systemPrompt.prompt}</p>
                </div>
            </a>
            <ModalWrapper isOpen={isOpen} toggleModal={toggleModal}>
                <div
                    onClick={(e) => e.stopPropagation()}
                    className={`absolute w-full max-w-lg transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all ${props.bgColor}`}
                >
                    <div className='mt-5 gap-3'>
                        <h3 className='font-bold text-white text-lg sm:text-xl'>{props.systemPrompt.role}</h3>
                        <p className='text-base text-gray-200'>{props.systemPrompt.prompt}</p>
                    </div>
                    <div>
                        <button onClick={handleClickConfirm}>Use</button>
                        <button onClick={toggleModal}>Close</button>
                    </div>
                </div>
            </ModalWrapper>
        </>
    );
};
export default RoleCard;

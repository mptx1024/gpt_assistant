import { useState } from 'react';
import { SystemPrompt, Chat } from '@/types';
import ModalWrapper from '@/components/Modal';
import Button from '@/components/Button';
import { useRouter } from 'next/router';
import { createNewChat } from '@/utils/chats';
interface Props {
    systemPrompt: SystemPrompt;
    bgColor: string;
}

const RoleCard = (props: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleClickConfirm = () => {
        const chatID = createNewChat(props.systemPrompt);
        router.push(`/chat/${chatID}`);
        setIsModalOpen(false);
    };

    return (
        <>
            <div
                className={`${props.bgColor} rounded-lg p-2 sm:p-4 lg:p-6 hover:scale-105  transition-all ease-in-out cursor-pointer`}
                // href='#'
                onClick={toggleModal}
            >
                <div className='mt-2'>
                    <h3 className='font-bold text-white text-lg sm:text-xl mb-1'>{props.systemPrompt.role}</h3>
                    <p className='text-sm text-gray-200 line-clamp-3'>{props.systemPrompt.prompt}</p>
                </div>
            </div>
            <ModalWrapper isOpen={isModalOpen} toggleModal={toggleModal}>
                <div
                    onClick={(e) => e.stopPropagation()} // prevent modal from closing
                    className={`flex flex-col space-y-4 absolute w-full max-w-lg rounded-2xl p-6 overflow-hidden text-left shadow-xl ${props.bgColor}`}
                >
                    <h3 className='role-title font-bold text-white text-lg sm:text-xl'>{props.systemPrompt.role}</h3>
                    <p className='role-prompt text-base text-gray-200'>{props.systemPrompt.prompt}</p>
                    <div className='flex gap-2'>
                        <Button
                            text={'Use'}
                            onClick={handleClickConfirm}
                            className={`border border-gray-50 ${props.bgColor} `}
                        />
                        <Button
                            text={'Close'}
                            onClick={toggleModal}
                            className={`border border-gray-50 ${props.bgColor} `}
                        />
                    </div>
                </div>
            </ModalWrapper>
        </>
    );
};
export default RoleCard;

import { useState } from 'react';
import { SystemPrompt, Chat } from '@/types';
import { useRouter } from 'next/router';
import { createNewChat } from '@/utils/chats';
import RoleModal from './RoleModal';
interface Props {
    role: SystemPrompt;
    bgColor: string;
    setSelectedRoleColor: (bgColor: string) => void;
    setSelectedRole: (role: SystemPrompt) => void;
    toggleRoleCardModal: () => void;
}

const RoleCard = (props: Props) => {
    const handleClickCard = () => {
        props.toggleRoleCardModal();
        props.setSelectedRoleColor(props.bgColor);
        props.setSelectedRole(props.role);
    };

    return (
        <div
            className={`${props.bgColor} rounded-lg p-2 sm:p-4 lg:p-6 hover:scale-105  transition-all ease-in-out cursor-pointer`}
            onClick={handleClickCard}
        >
            <div className='mt-2'>
                <h3 className='font-bold text-white text-lg sm:text-xl mb-1'>{props.role.role}</h3>
                <p className='text-sm text-gray-200 line-clamp-3'>{props.role.prompt}</p>
            </div>
        </div>
    );
};
export default RoleCard;

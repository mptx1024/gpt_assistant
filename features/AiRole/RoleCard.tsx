import { useState } from 'react';

import { useRouter } from 'next/router';

import { Role } from '@/types';
import { createNewChat } from '@/utils/chat';

import RoleModal from './RoleModal';

interface Props {
    role: Role;
    bgColor: string;
}

const RoleCard = (props: Props) => {
    const [isRoleCardModalOpen, setIsRoleCardModalOpen] = useState(false);
    const router = useRouter();

    const handleClickUse = () => {
        createNewChat(props.role);
        setIsRoleCardModalOpen(false);
    };
    const toggleRoleCardModal = () => {
        setIsRoleCardModalOpen(!isRoleCardModalOpen);
    };

    return (
        <div
            className={`${props.bgColor} cursor-pointer rounded-lg p-2 transition-all ease-in-out  hover:scale-[102%] sm:p-4 lg:p-6`}
            onClick={toggleRoleCardModal}
        >
            <div className="mt-2">
                <h3 className="mb-1 text-lg font-bold text-white sm:text-xl">
                    {props.role.roleName}
                </h3>
                <p className="text-sm text-gray-200 line-clamp-3">{props.role.prompt}</p>
            </div>
            {isRoleCardModalOpen ? (
                <RoleModal
                    isOpen={isRoleCardModalOpen}
                    role={props.role}
                    isTemplate={true}
                    toggleModal={toggleRoleCardModal}
                    handleClickUse={handleClickUse}
                />
            ) : null}
        </div>
    );
};
export default RoleCard;

import Button from '@/components/Button';
import { Role } from '@/types';
import { createNewChat } from '@/utils/chat';
import { addOrEditRole } from '@/utils/role';
import { useState } from 'react';
import { HiPlus } from 'react-icons/hi2';
import RoleModal from './RoleModal';

interface Props {
    role: Role;
    bgColor: string;
}

const RoleCard = (props: Props) => {
    const [isRoleCardModalOpen, setIsRoleCardModalOpen] = useState(false);

    const handleClickUse = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        createNewChat(props.role);
        setIsRoleCardModalOpen(false);
    };
    const toggleRoleCardModal = () => {
        setIsRoleCardModalOpen(!isRoleCardModalOpen);
    };
    const handleClickAdd = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addOrEditRole(props.role.prompt, props.role.roleName);
        setIsRoleCardModalOpen(false);
    };

    return (
        <div
            className={`${props.bgColor} flex animate-slideInFromTop cursor-pointer flex-col gap-3 rounded-lg p-5 transition-all ease-in-out hover:scale-[102%] sm:p-4 lg:p-5`}
            onClick={toggleRoleCardModal}
        >
            <Button
                btnSize="sm"
                Icon={HiPlus}
                btnStyles="self-end"
                border
                onClick={handleClickUse}
            />
            <div className="flex h-[7rem] flex-col overflow-hidden">
                <h3 className="mb-1 text-base font-semibold text-white sm:text-xl">
                    {props.role.roleName}
                </h3>
                <p className="text-sm text-neutral-300 line-clamp-3 dark:text-neutral-400 md:line-clamp-4">
                    {props.role.prompt}
                </p>
            </div>
            {isRoleCardModalOpen ? (
                <RoleModal
                    isOpen={isRoleCardModalOpen}
                    role={props.role}
                    isTemplate={true}
                    toggleModal={toggleRoleCardModal}
                    handleClickUse={handleClickUse}
                    handleClickAdd={handleClickAdd}
                />
            ) : null}
        </div>
    );
};
export default RoleCard;

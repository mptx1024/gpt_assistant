import { useState } from 'react';

import { useRouter } from 'next/router';
import { HiOutlineBuildingLibrary, HiPlus } from 'react-icons/hi2';

import RoleEditor from '@/features/AiRole/RoleEditor';
import RoleModal from '@/features/AiRole/RoleModal';
import { Role } from '@/types';
import { createNewChat } from '@/utils/chats';
import { deleteRole } from '@/utils/roles';

import RoleItem from './RoleItem';
import Button from '../Button';

const RoleList = (props: { roles: Role[] }) => {
    const [selectedRole, setSelectedRole] = useState<Role>();
    const [isRoleModalOpen, setIsRoleModalOpen] = useState<boolean>(false);
    const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);
    const router = useRouter();
    const toggleRoleModal = () => {
        setIsRoleModalOpen(!isRoleModalOpen);
    };
    const toggleRoleEditor = () => {
        setIsEditorOpen(!isEditorOpen);
        toggleRoleModal();
    };
    const handleClickUse = () => {
        const chatID = createNewChat(selectedRole);
        router.push(`/chat/${chatID}`);
        toggleRoleModal();
    };
    const handleClickEdit = () => {
        setIsEditorOpen(true);
    };
    const handleClickDelete = () => {
        if (selectedRole) {
            deleteRole(selectedRole.id);
        }
        toggleRoleModal();
    };

    const handleClickRoleLibrary = () => {
        router.push('/role');
    };

    return (
        <>
            <div className={`my-2 flex h-1/2 flex-col gap-2 overflow-y-auto`}>
                <div className='mx-3 flex items-center justify-between'>
                    <p className='text-base text-gray-500 dark:text-gray-400'>Assistants</p>
                    <div className='flex gap-1'>
                        <Button size='sm' Icon={HiPlus} onClick={toggleRoleEditor} iconEffect={true} />
                        <Button
                            size='sm'
                            Icon={HiOutlineBuildingLibrary}
                            onClick={handleClickRoleLibrary}
                            iconEffect={true}
                        />
                    </div>
                </div>
                {props.roles?.map((role) => (
                    <RoleItem
                        key={role.id}
                        role={role}
                        toggleModal={toggleRoleModal}
                        setCurrentRole={setSelectedRole}
                    />
                ))}
            </div>
            {isEditorOpen ? (
                <RoleEditor isOpen={isEditorOpen} toggleModal={toggleRoleEditor} role={selectedRole} />
            ) : (
                <RoleModal
                    isOpen={isRoleModalOpen}
                    bgColor='bg-teal-500'
                    role={selectedRole}
                    toggleModal={toggleRoleModal}
                    handleClickConfirm={handleClickUse}
                    handleClickEdit={handleClickEdit}
                    handleClickDelete={handleClickDelete}
                />
            )}
        </>
    );
};

export default RoleList;

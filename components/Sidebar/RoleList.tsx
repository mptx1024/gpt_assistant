import { SystemPrompt } from '@/types';
import RoleItem from './RoleItem';
import { useState } from 'react';
import RoleModal from '@/features/AiRole/RoleModal';

const RoleList = (props: { roles: SystemPrompt[] }) => {
    const [currentRole, setCurrentRole] = useState<SystemPrompt>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    console.log(`isModalOpen: ${isModalOpen}; currentRole: ${currentRole}`);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };
    const handleClickUse = () => {};
    const handleClickEdit = () => {};
    return (
        <>
            <div className={`debug-2 flex flex-col gap-2 my-2 h-1/2`}>
                <p>AI Roles</p>
                {props.roles?.map((role) => (
                    <RoleItem key={role.id} role={role} toggleModal={toggleModal} setCurrentRole={setCurrentRole} />
                ))}
            </div>
            <RoleModal
                isOpen={isModalOpen}
                bgColor='bg-teal-500'
                role={currentRole}
                handleClickConfirm={handleClickUse}
                toggleModal={toggleModal}
            />
        </>
    );
};

export default RoleList;

import { useState } from 'react';

import { useRouter } from 'next/router';
import { HiOutlineBuildingLibrary, HiPlus } from 'react-icons/hi2';

import RoleEditor from '@/features/AiRole/RoleEditor';
import { Role } from '@/types';

import RoleItem from './RoleItem';
import Button from '../Button';

const RoleList = (props: { roles: Role[] }) => {
    const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);
    const router = useRouter();
    const toggleRoleEditor = () => {
        setIsEditorOpen(!isEditorOpen);
    };

    const handleClickRoleLibrary = () => {
        router.push('/role');
    };

    return (
        <>
            <div
                className={
                    'flex h-[40%] flex-col gap-2 border-y border-gray-300 py-5 dark:border-gray-900'
                }
            >
                <div className="mx-3 flex items-center justify-between">
                    <p className="text-sm text-gray-500 dark:text-gray-400">AI Roles</p>
                    <div className="flex gap-1">
                        <Button
                            size="sm"
                            Icon={HiPlus}
                            onClick={toggleRoleEditor}
                            iconEffect={true}
                        />
                        <Button
                            size="sm"
                            Icon={HiOutlineBuildingLibrary}
                            onClick={handleClickRoleLibrary}
                            iconEffect={true}
                        />
                    </div>
                </div>
                <div className="scrollbar dark:scrollbarDark flex flex-col gap-2 overflow-y-scroll">
                    {props.roles?.map((role) => (
                        <RoleItem key={role.id} role={role} />
                    ))}
                </div>
            </div>
            {isEditorOpen && <RoleEditor isOpen={isEditorOpen} toggleModal={toggleRoleEditor} />}
        </>
    );
};

export default RoleList;

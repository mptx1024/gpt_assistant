import { useState } from 'react';

import RoleEditor from '@/features/AiRole/RoleEditor';
import { Role } from '@/types';
import { useRouter } from 'next/router';
import { HiOutlineBuildingLibrary, HiPlus } from 'react-icons/hi2';
// import { Tooltip } from 'react-tooltip';

import Button from '../Button';
import RoleItem from './RoleItem';

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
        <div className="flex h-[40%] flex-col gap-2 ">
            <div className="mx-3 flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">AI Roles</p>
                <div className="flex gap-1">
                    <Button
                        btnSize="sm"
                        Icon={HiPlus}
                        onClick={toggleRoleEditor}
                        iconEffect={true}
                        tooltipSelector="tooltip"
                        data-tooltip-content="Create a new role"
                    />
                    <Button
                        btnSize="sm"
                        Icon={HiOutlineBuildingLibrary}
                        onClick={handleClickRoleLibrary}
                        iconEffect={true}
                        tooltipSelector="tooltip"
                        data-tooltip-content="Visit Role Library"
                    />
                </div>
            </div>
            <div className="scrollbar dark:scrollbarDark flex flex-col gap-2 overflow-y-scroll">
                {props.roles?.map((role) => (
                    <RoleItem key={role.id} role={role} />
                ))}
            </div>
            {isEditorOpen && <RoleEditor isOpen={isEditorOpen} toggleModal={toggleRoleEditor} />}
        </div>
    );
};

export default RoleList;

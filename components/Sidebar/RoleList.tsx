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
            <div className={'my-2 flex h-2/5 flex-col gap-2 overflow-y-auto'}>
                <div className="mx-3 flex items-center justify-between">
                    <p className="text-base text-gray-500 dark:text-gray-400">Assistant List</p>
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
                {props.roles?.map((role) => (
                    <RoleItem key={role.id} role={role} />
                ))}
            </div>
            {isEditorOpen && <RoleEditor isOpen={isEditorOpen} toggleModal={toggleRoleEditor} />}
        </>
    );
};

export default RoleList;

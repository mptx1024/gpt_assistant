import { Role } from '@/types';

interface Props {
    role: Role;
    bgColor: string;
    setSelectedRole: (role: Role) => void;
    toggleRoleCardModal: () => void;
}

const RoleCard = (props: Props) => {
    const handleClickCard = () => {
        props.toggleRoleCardModal();
        props.setSelectedRole(props.role);
    };

    return (
        <div
            className={`${props.bgColor} cursor-pointer rounded-lg p-2 transition-all ease-in-out  hover:scale-105 sm:p-4 lg:p-6`}
            onClick={handleClickCard}
        >
            <div className='mt-2'>
                <h3 className='mb-1 text-lg font-bold text-white sm:text-xl'>{props.role.roleName}</h3>
                <p className='text-sm text-gray-200 line-clamp-3'>{props.role.prompt}</p>
            </div>
        </div>
    );
};
export default RoleCard;

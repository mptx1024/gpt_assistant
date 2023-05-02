import { HiOutlineXMark } from 'react-icons/hi2';

import Button from '@/components/Button';
import ModalWrapper from '@/components/Modal';
import { Role } from '@/types';

interface Props {
    isOpen: boolean;
    bgColor?: string;
    role?: Role;
    toggleModal: () => void;
    handleClickConfirm: () => void;
    handleClickEdit?: () => void;
    handleClickDelete?: () => void;
}

const RoleModal = (props: Props) => {
    return (
        <ModalWrapper isOpen={props.isOpen} toggleModal={props.toggleModal}>
            <div
                onClick={(e) => e.stopPropagation()} // prevent modal from closing
                className={`absolute flex max-h-fit w-full max-w-lg flex-col space-y-3 overflow-y-scroll rounded-2xl p-6 text-left shadow-xl ${props.bgColor}`}
            >
                <div>
                    <Button size='sm' icon={HiOutlineXMark} onClick={props.toggleModal} className='mr-0 ml-auto' />
                </div>
                <h3 className='role-title text-lg font-bold text-white sm:text-xl'>{props.role?.roleName}</h3>
                <p className='role-prompt text-base text-gray-200'>{props.role?.prompt}</p>
                <div className='flex gap-2'>
                    <Button
                        size='lg'
                        text={'Use'}
                        onClick={props.handleClickConfirm}
                        className={`border border-gray-50 ${props.bgColor}`}
                    />
                    {props.handleClickEdit && (
                        <Button
                            size='lg'
                            text={'Edit'}
                            onClick={props.handleClickEdit}
                            className={`border border-gray-50 ${props.bgColor}`}
                        />
                    )}
                    {props.handleClickDelete && (
                        <Button
                            size='lg'
                            text={'Delete'}
                            onClick={props.handleClickDelete}
                            className={`border border-gray-50 ${props.bgColor}`}
                        />
                    )}
                </div>
            </div>
        </ModalWrapper>
    );
};
export default RoleModal;

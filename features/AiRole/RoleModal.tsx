import { HiOutlineXMark } from 'react-icons/hi2';

import Button from '@/components/Button';
import ModalWrapper from '@/components/Modal';
import { SystemPrompt } from '@/types';

interface Props {
    isOpen: boolean;
    bgColor?: string;
    role?: SystemPrompt;
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
                className={`flex flex-col space-y-3 absolute w-full max-w-lg max-h-fit rounded-2xl p-6 overflow-y-scroll text-left shadow-xl ${props.bgColor}`}
            >
                <div>
                    <Button icon={HiOutlineXMark} onClick={props.toggleModal} className='mr-0 ml-auto' />
                </div>
                <h3 className='role-title font-bold text-white text-lg sm:text-xl'>{props.role?.role}</h3>
                <p className='role-prompt text-base text-gray-200'>{props.role?.prompt}</p>
                <div className='flex gap-2'>
                    <Button
                        text={'Use'}
                        onClick={props.handleClickConfirm}
                        className={`border border-gray-50 ${props.bgColor}`}
                    />
                    {props.handleClickEdit && (
                        <Button
                            text={'Edit'}
                            onClick={props.handleClickEdit}
                            className={`border border-gray-50 ${props.bgColor}`}
                        />
                    )}
                    {props.handleClickDelete && (
                        <Button
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

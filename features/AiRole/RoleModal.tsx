import ModalWrapper from '@/components/Modal';
import Button from '@/components/Button';
import { SystemPrompt } from '@/types';
import { createPortal } from 'react-dom';

interface Props {
    isOpen: boolean;
    bgColor?: string;
    role?: SystemPrompt;
    toggleModal: () => void;
    handleClickConfirm: () => void;
    handleClickEdit?: () => void;
}

const RoleModal = (props: Props) => {
    return createPortal(
        <ModalWrapper isOpen={props.isOpen} toggleModal={props.toggleModal}>
            <div
                onClick={(e) => e.stopPropagation()} // prevent modal from closing
                className={`flex flex-col space-y-4 absolute w-full max-w-lg rounded-2xl p-6 overflow-hidden text-left shadow-xl ${props.bgColor}`}
            >
                <h3 className='role-title font-bold text-white text-lg sm:text-xl'>{props.role?.role}</h3>
                <p className='role-prompt text-base text-gray-200'>{props.role?.prompt}</p>
                <div className='flex gap-2'>
                    <Button
                        text={'Use'}
                        onClick={props.handleClickConfirm}
                        className={`border border-gray-50 ${props.bgColor} `}
                    />
                    {props.handleClickEdit && (
                        <Button
                            text={'Edit'}
                            onClick={props.handleClickEdit}
                            className={`border border-gray-50 ${props.bgColor}`}
                        />
                    )}

                    <Button
                        text={'Close'}
                        onClick={props.toggleModal}
                        className={`border border-gray-50 ${props.bgColor} `}
                    />
                </div>
            </div>
        </ModalWrapper>,
        document.body
    );
};
export default RoleModal;

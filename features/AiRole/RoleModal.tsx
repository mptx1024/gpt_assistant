import { useEffect } from 'react';

import { HiOutlineXMark } from 'react-icons/hi2';

import Button from '@/components/Button';
import ModalWrapper from '@/components/Modal';
import { useKeyPress } from '@/hooks/useKeyPress';
import { Role } from '@/types';

interface Props {
    isOpen: boolean;
    role?: Role;
    isTemplate?: boolean;
    toggleModal: () => void;
    handleClickUse: () => void;
    handleClickEdit?: () => void;
    handleClickDelete?: () => void;
}

const RoleModal = (props: Props) => {

    useKeyPress(props.toggleModal, ['Escape']);
    return (
        <ModalWrapper isOpen={props.isOpen} toggleModal={props.toggleModal}>
            <div
                onClick={(e) => e.stopPropagation()} // prevent modal from closing
                className="flex max-h-[60vh] min-h-[30vh] w-full max-w-lg flex-col justify-between space-y-5 overflow-hidden rounded-xl bg-light-bg p-6 text-left shadow-xl dark:bg-dark-bg"
            >
                <div className="flex justify-between">
                    <span className=" text-2xl text-gray-500 dark:text-gray-400">Role Detail</span>
                    <Button
                        size="lg"
                        Icon={HiOutlineXMark}
                        onClick={props.toggleModal}
                        shadow={true}
                    />
                </div>
                <h3 className="text-lg font-semibold text-light-text dark:text-dark-text sm:text-xl">
                    {props.role?.roleName}
                </h3>
                <p className="flex-grow overflow-y-auto text-base text-light-text dark:text-dark-text">
                    {props.role?.prompt}
                </p>
                <div id="btn-group" className="flex gap-2">
                    <Button
                        size="lg"
                        text={'Use'}
                        onClick={props.handleClickUse}
                        shadow={true}
                        border={true}
                    />
                    {!props.isTemplate && (
                        <Button
                            size="lg"
                            text={'Edit'}
                            onClick={props.handleClickEdit}
                            shadow={true}
                            border={true}
                        />
                    )}
                    {!props.isTemplate && (
                        <Button
                            size="lg"
                            text={'Delete'}
                            onClick={props.handleClickDelete}
                            shadow={true}
                            border={true}
                        />
                    )}
                </div>
            </div>
        </ModalWrapper>
    );
};
export default RoleModal;

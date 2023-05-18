import { memo } from 'react';
import React from 'react';

import { HiOutlineXMark } from 'react-icons/hi2';

import Button from '@/components/Button';
import ModalWrapper from '@/components/Modal';

interface Props {
    isOpen: boolean;
    toggleModal: () => void;
    children: React.ReactNode;
    title: string;
}
const SettingModal = memo(function SettingModal(props: Props) {
    const handleClickClose = () => {
        props.toggleModal();
    };

    return (
        <ModalWrapper isOpen={props.isOpen} toggleModal={props.toggleModal}>
            <div
                onClick={(e) => e.stopPropagation()} // prevent modal from closing
                className="border-major inset-0 flex h-full w-full flex-col gap-0 overflow-hidden bg-card-light px-5 py-3 text-left dark:bg-card-dark sm:h-[90vh] sm:max-w-xl sm:gap-3 sm:rounded-xl sm:py-6"
            >
                <div className="flex justify-between">
                    <span className="text-3xl font-bold">{props.title}</span>
                    <Button
                        size="lg"
                        Icon={HiOutlineXMark}
                        onClick={handleClickClose}
                        shadow={true}
                    />
                </div>

                {props.children}
            </div>
        </ModalWrapper>
    );
});
export default SettingModal;

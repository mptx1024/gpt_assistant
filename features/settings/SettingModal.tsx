import React, { memo } from 'react';

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
                id="setting-modal"
                onClick={(e) => e.stopPropagation()} // prevent modal from closing
                className="border-color absolute flex h-full w-full flex-col border bg-gray-base text-left dark:bg-gray-inverted sm:top-10 sm:h-fit sm:max-h-[95vh] sm:max-w-2xl sm:rounded-xl"
            >
                <div className="flex items-center justify-between px-5 py-3 sm:pt-5 sm:px-10">
                    <span className="text-2xl font-semibold">{props.title}</span>
                    <Button
                        btnSize="lg"
                        Icon={HiOutlineXMark}
                        onClick={handleClickClose}
                        shadow={true}
                    />
                </div>
                <div className="overflow-y-auto px-5 py-2 sm:px-10">{props.children}</div>
            </div>
        </ModalWrapper>
    );
});
export default SettingModal;

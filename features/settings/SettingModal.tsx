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
                onClick={(e) => e.stopPropagation()} // prevent modal from closing
                className="border-color flex h-full w-full flex-col  gap-0 border bg-white text-left dark:bg-white-inverted sm:h-fit sm:max-h-[90%] sm:max-w-xl sm:gap-3 sm:rounded-xl"
            >
                <div className="flex justify-between px-5 py-3 sm:px-10 sm:pt-10">
                    <span className="text-3xl font-bold">{props.title}</span>
                    <Button
                        btnSize="lg"
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

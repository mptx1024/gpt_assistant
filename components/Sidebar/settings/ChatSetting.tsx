import { useState } from 'react';

import ModelParams from '@/components/Sidebar/settings/ModelParams';
import SettingModal from '@/components/Sidebar/settings/SettingModal';
import { Chat } from '@/types';
interface Props {
    chat: Chat;
}
export function ChatParamsCard({ chat }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const toggleModal = () => setIsOpen(!isOpen);

    return (
        <div
            onClick={toggleModal}
            className="flex cursor-pointer flex-col items-start rounded-md border border-gray-500  p-3 text-light-text hover:bg-neutral-200 dark:text-dark-text dark:hover:bg-neutral-700"
        >
            <span>{chat.modelParams.model.name}</span>
            <span>Temperature: {chat.modelParams.temperature}</span>
            <span>Assistant: {chat.role.roleName}</span>
            <SettingModal isOpen={isOpen} toggleModal={toggleModal} title="Chat Setting">
                <ChatParamsModal chat={chat} />
            </SettingModal>
        </div>
    );
}

interface ChatParamsModalProps {
    chat: Chat;
}
export function ChatParamsModal(props: ChatParamsModalProps) {
    return (
        <div className="mt-5 flex flex-col">
            <ModelParams chat={props.chat} />
        </div>
    );
}

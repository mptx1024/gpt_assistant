import { useState } from 'react';

import { useDispatch } from 'react-redux';

import Button from '@/components/Button';
import ModelParamsSection from '@/components/settings/ModelParamsSection';
import SettingModal from '@/components/settings/SettingModal';
import { updateModelParams } from '@/store/chatsSlice';
import { OpenAIModels, OpenAIModel, OpenAIModelID, ModelParams } from '@/types';
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
                <ChatParamsModal chat={chat} toggleModal={toggleModal} />
            </SettingModal>
        </div>
    );
}

interface ChatParamsModalProps {
    chat: Chat;
    toggleModal: () => void;
}
export function ChatParamsModal({ chat, toggleModal }: ChatParamsModalProps) {
    const allModels: OpenAIModel[] = Object.values(OpenAIModels);
    const [temperature, setTemperature] = useState(chat.modelParams.temperature);
    // TODO: get selected model from Chat
    const [selectedModel, setSelectedModel] = useState(chat.modelParams.model);
    const [maxTokens, setMaxTokens] = useState(chat.modelParams.max_tokens);
    const [prompt, setPrompt] = useState(chat.role.prompt);
    const dispatch = useDispatch();

    const handleClickSave = () => {
        const newParam: ModelParams = {
            model: selectedModel,
            temperature,
            max_tokens: maxTokens,
            stream: true,
        };
        dispatch(updateModelParams({ chatID: chat.id, modelParams: newParam }));
        toggleModal();
    };
    return (
        <div className="debug-1 mt-5 flex flex-col gap-10 overflow-y-auto">
            <ModelParamsSection
                isChatSetting={true}
                allModels={allModels}
                temperature={temperature}
                selectedModel={selectedModel}
                maxTokens={maxTokens}
                prompt={prompt}
                setSelectedModel={setSelectedModel}
                setMaxTokens={setMaxTokens}
                setTemperature={setTemperature}
                setPrompt={setPrompt}
            />
            <Button
                text="save"
                size="lg"
                border={true}
                shadow={true}
                onClick={handleClickSave}
                btnStyles="w-[5rem] self-start"
            />
        </div>
    );
}

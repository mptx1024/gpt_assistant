import { useState } from 'react';

import { useDispatch } from 'react-redux';

import Button from '@/components/Button';
import ModelParamsSection from '@/components/settings/ModelParamsSection';
import SettingModal from '@/components/settings/SettingModal';
import { updateModelParams, updateRole } from '@/store/chatsSlice';
import { OpenAIModels, OpenAIModel, ModelParams, Role } from '@/types';
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
            className="my-3 flex w-[40%] max-w-lg cursor-pointer flex-col items-start rounded-md border border-gray-400/50 p-3 transition-all hover:brightness-[1.3]"
        >
            <span className="text-primary w-full truncate whitespace-nowrap">
                {chat.modelParams.model.name}
            </span>
            <span className="text-secondary whitespace-nowrap">
                Temperature: {chat.modelParams.temperature}
            </span>
            <span className="text-secondary max-w-full truncate whitespace-nowrap">
                Assistant: {chat.role.roleName}
            </span>
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
        const newRole: Role = {
            ...chat.role,
            prompt,
        };
        dispatch(updateModelParams({ chatID: chat.id, modelParams: newParam }));
        dispatch(updateRole({ chatID: chat.id, role: newRole }));
        toggleModal();
    };
    return (
        <div className="mt-5 flex flex-col gap-10 overflow-y-auto">
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

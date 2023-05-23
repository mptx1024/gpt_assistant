import { memo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Button from '@/components/Button';
import ModelParamsSection from '@/components/settings/ModelParamsSection';
import SettingModal from '@/components/settings/SettingModal';
import { RootState } from '@/store';
import { selectChatById, updateModelParams, updateRole } from '@/store/chatsSlice';
import { Chat, ModelParams, OpenAIModel, OpenAIModels, Role } from '@/types';
interface Props {
    chatId: string;
}
function ChatParamsCard({ chatId: chatID }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const toggleModal = () => setIsOpen(!isOpen);
    const chat = useSelector((state: RootState) => selectChatById(state, chatID));
    if (!chat) return null;
    return (
        <div
            key={Math.random()}
            onClick={toggleModal}
            className="border-color my-3 flex w-[90%] max-w-lg animate-slideInFromTop cursor-pointer flex-col items-start self-center rounded-md border p-3 transition-all  hover:border-colorPrimary sm:w-[40%]"
        >
            <span className="w-full truncate whitespace-nowrap text-colorPrimary">
                {chat.modelParams.model.name}
            </span>
            <span className="text-subtitle whitespace-nowrap">
                Temperature: {chat.modelParams.temperature}
            </span>
            <span className="text-subtitle max-w-full truncate whitespace-nowrap">
                Assistant: {chat.role.roleName}
            </span>
            <SettingModal isOpen={isOpen} toggleModal={toggleModal} title="Chat Setting">
                <ChatParamsModal chat={chat} toggleModal={toggleModal} />
            </SettingModal>
        </div>
    );
}

export const MemoizedChatParamsCard = memo(ChatParamsCard);

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
        dispatch(updateModelParams({ chatId: chat.id, modelParams: newParam }));
        dispatch(updateRole({ chatId: chat.id, role: newRole }));
        toggleModal();
    };
    return (
        <div className="mt-1 flex flex-col gap-5 overflow-y-auto sm:mt-5">
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
                btnStyles="w-[5rem] self-start ml-1"
            />
        </div>
    );
}

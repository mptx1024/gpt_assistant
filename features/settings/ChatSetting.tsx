import { memo, useState } from 'react';

import Button from '@/components/Button';
import ModelParamsSection from '@/features/settings/ModelParamsSection';
import SettingModal from '@/features/settings/SettingModal';
import {
    selectChatModelParams,
    selectChatRole,
    updateChatModelParams,
    updateChatRole,
} from '@/store/chatsSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { ModelParams, OpenAIModel, OpenAIModels, Role } from '@/types';
interface Props {
    chatId: string;
}
function ChatParamsCard({ chatId }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const toggleModal = () => setIsOpen(!isOpen);
    const chatModalParams = useAppSelector((state) => selectChatModelParams(state, chatId));
    const chatRole = useAppSelector((state) => selectChatRole(state, chatId));
    return (
        <div
            key={Math.random()}
            onClick={toggleModal}
            className="border-color my-3 flex w-[90%] max-w-lg animate-slideInFromTop cursor-pointer flex-col items-start self-center rounded-md border p-3 transition-all  hover:border-colorPrimary sm:w-[40%]"
        >
            <span className="w-full truncate whitespace-nowrap text-colorPrimary">
                {chatModalParams?.model.name}
            </span>
            <span className="text-subtitle whitespace-nowrap">
                Temperature: {chatModalParams?.temperature}
            </span>
            <span className="text-subtitle max-w-full truncate whitespace-nowrap">
                Assistant: {chatRole?.roleName}
            </span>
            {chatModalParams && chatRole && (
                <SettingModal isOpen={isOpen} toggleModal={toggleModal} title="Chat Setting">
                    <ChatParamsModal
                        chatId={chatId}
                        chatModalParams={chatModalParams}
                        chatRole={chatRole}
                        toggleModal={toggleModal}
                    />
                </SettingModal>
            )}
        </div>
    );
}

export const MemoizedChatParamsCard = memo(ChatParamsCard);

interface ChatParamsModalProps {
    // chat: Chat;
    chatId: string;
    chatModalParams: ModelParams;
    chatRole: Role;
    toggleModal: () => void;
}
export function ChatParamsModal({
    chatId,
    chatModalParams,
    chatRole,
    toggleModal,
}: ChatParamsModalProps) {
    const allModels: OpenAIModel[] = Object.values(OpenAIModels);
    const [temperature, setTemperature] = useState(chatModalParams.temperature);
    const [selectedModel, setSelectedModel] = useState(chatModalParams.model);
    const [maxTokens, setMaxTokens] = useState(chatModalParams.max_tokens);
    const [prompt, setPrompt] = useState(chatRole.prompt);
    const dispatch = useAppDispatch();

    const handleClickSave = () => {
        const newParam: ModelParams = {
            model: selectedModel,
            temperature,
            max_tokens: maxTokens,
            stream: true,
        };
        const newRole: Role = {
            ...chatRole,
            prompt,
        };
        dispatch(updateChatModelParams({ chatId, modelParams: newParam }));
        dispatch(updateChatRole({ chatId, role: newRole }));
        toggleModal();
    };
    return (
        <div className="mt-1 flex flex-col gap-5 overflow-y-auto px-5 py-3 sm:p-10">
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
                btnSize="lg"
                border={true}
                shadow={true}
                onClick={handleClickSave}
                btnStyles="w-[5rem] self-start ml-1"
            />
        </div>
    );
}

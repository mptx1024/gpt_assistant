import React, { useState } from 'react';

import Button from '@/components/Button';
import { Input } from '@/components/InputField';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectAppSetting, setAppSetting } from '@/store/settingSlice';
import { OpenAIModels } from '@/types';

import ModelParamsSection from './ModelParamsSection';

interface Props {
    toggleModal: () => void;
}
function AppSetting({ toggleModal }: Props) {
    const dispatch = useAppDispatch();
    let currentSetting = useAppSelector(selectAppSetting);
    const [key, setKey] = useState(currentSetting.apiKey || '');

    // Chat Setting
    const [autoNameChat, setAutoNameChat] = useState(
        currentSetting.defaultChatSetting.autoNameChat
    );
    const [attchedMsgCount, setAttchedMsgCount] = useState(
        currentSetting.defaultChatSetting.attachedMessageCount
    );
    const handleClickAutoNameChat = () => {
        setAutoNameChat(!autoNameChat);
    };
    const handleAttachedMsgCount = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAttchedMsgCount(Number(e.target.value));
    };

    //Model Params
    const allModels = Object.values(OpenAIModels);
    const [temperature, setTemperature] = useState(currentSetting.defaultModelParams.temperature);
    const [selectedModel, setSelectedModel] = useState(currentSetting.defaultModelParams.model);
    const [maxTokens, setMaxTokens] = useState(currentSetting.defaultModelParams.max_tokens);
    const [prompt, setPrompt] = useState(currentSetting.defaultRole.prompt);

    const handleClickSave = () => {
        currentSetting = {
            ...currentSetting,
            apiKey: key,
            defaultModelParams: {
                ...currentSetting.defaultModelParams,
                model: selectedModel,
                temperature,
                max_tokens: maxTokens,
            },
            defaultRole: {
                ...currentSetting.defaultRole,
                prompt,
            },
            defaultChatSetting: {
                autoNameChat,
                attachedMessageCount: attchedMsgCount,
            },
        };
        dispatch(setAppSetting(currentSetting));
        toggleModal();
    };
    return (
        <div className="flex flex-col overflow-auto px-5 py-3  sm:gap-5 sm:p-10">
            <section id="setting-apikey" className="p-1">
                <h3 className="font-semibold">OpenAI API Key</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                    Apply & retrieve your OpenAI API key&nbsp;
                    <a
                        href="https://platform.openai.com/account/api-keys"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold underline"
                    >
                        here.
                    </a>
                    <br/>
                    Your API Key is safely stored on your browser locally.
                </span>
                <Input
                    type="text"
                    placeholder="Enter Your API Key Here"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    showborder={true}
                />
            </section>
            <div className="flex items-center justify-between gap-2">
                <div id="" className="w-[80%]">
                    <span className="block">Auto-generate Chat Title</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        Summurize chat title based on the first reply message. This will consume
                        more tokens used in the first message
                    </span>
                </div>
                <label htmlFor="AcceptConditions" className="relative h-7 w-14 cursor-pointer">
                    <input
                        type="checkbox"
                        id="AcceptConditions"
                        className="peer sr-only"
                        checked={autoNameChat}
                        onChange={handleClickAutoNameChat}
                    />

                    <span className="absolute inset-0 rounded-full bg-gray-300 transition peer-checked:bg-cyan-600"></span>

                    <span className="absolute inset-y-0 start-0 m-1 h-5 w-5 rounded-full bg-white transition-all peer-checked:start-7"></span>
                </label>
            </div>
            <div className="flex items-center justify-between">
                <div id="" className="w-[80%]">
                    <span className="block">Include last N messages</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Number of messages included per each request</span>
                </div>
                <div className="flex-shrink-0 basis-[4rem]">
                    <Input
                        value={attchedMsgCount}
                        showborder={true}
                        onChange={handleAttachedMsgCount}
                    />
                </div>
            </div>
            <section id="setting-model-params" className="">
                <h3 className="font-semibold"></h3>
                <ModelParamsSection
                    isChatSetting={false}
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
            </section>
            <div className="">
                <Button
                    size={'lg'}
                    text="Save"
                    border={true}
                    // shadow={true}
                    onClick={handleClickSave}
                    btnStyles=""
                />
            </div>
        </div>
    );
}
export default AppSetting;

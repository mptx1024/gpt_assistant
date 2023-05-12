import { Listbox } from '@headlessui/react';
import { HiChevronUpDown } from 'react-icons/hi2';

import Button from '@/components/Button';
import { Input, Textarea } from '@/components/InputField';
import { OpenAIModels, OpenAIModel, OpenAIModelID } from '@/types';

interface Props {
    isChatSetting: boolean;
    temperature: number;
    allModels: OpenAIModel[];
    selectedModel: OpenAIModel;
    maxTokens: number;
    prompt: string;
    setSelectedModel: (model: OpenAIModel) => void;
    setMaxTokens: (maxTokens: number) => void;
    setTemperature: (temperature: number) => void;
    setPrompt: (prompt: string) => void;
}
const ModelParamsSection = ({
    isChatSetting,
    temperature,
    allModels,
    selectedModel,
    maxTokens,
    prompt,
    setSelectedModel,
    setMaxTokens,
    setTemperature,
    setPrompt,
}: Props) => {
    return (
        <div className="flex flex-col p-1">
            <div id="setting-role-name" className="mb-3">
                <div className="mb-2">
                    <span className="block text-lg font-semibold">Prompt</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">description</span>
                </div>
                <Textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    showBorder={true}
                    styles=""
                />
            </div>
            <div id="model-params" className="flex flex-col rounded-md border border-gray-300">
                <div
                    id="setting-model"
                    className="flex items-center justify-between border-b border-gray-300 p-3"
                >
                    <span className="block">Model</span>
                    <ModelListBox
                        allModels={allModels}
                        selectedModel={selectedModel}
                        setSelectedModel={setSelectedModel}
                    />
                </div>
                <div
                    id="setting-temperature"
                    className="border-b border-gray-300 p-3 sm:flex sm:items-center sm:justify-between"
                >
                    <div className="mb-3 sm:mb-0 sm:mr-5 sm:w-6/12">
                        <span className="block whitespace-nowrap">Temperature: {temperature}</span>
                        <span className="block text-[0.7rem] text-gray-500 dark:text-gray-400">
                            Higher values like 0.8 will make the output more random, while lower
                            values like 0.2 will make it more focused and deterministic
                        </span>
                    </div>
                    <div className="sm:w-6/12">
                        <TemperatureRangeSlider temp={temperature} setTemp={setTemperature} />
                    </div>
                </div>
                <div id="setting-maxToken" className="flex items-center justify-between p-3">
                    <div className="">
                        <span className="block">Max Token</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            The maximum number of tokens to generate in the reply. 1000 tokens are
                            roughly 750 English words
                        </span>
                    </div>
                    <div className="flex-shrink-0 basis-[5rem]">
                        <Input
                            value={maxTokens}
                            onChange={(e) => setMaxTokens(Number(e.target.value))}
                            showBorder={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ModelParamsSection;

interface ModelListBoxProps {
    allModels: OpenAIModel[];
    selectedModel: OpenAIModel;
    setSelectedModel: (model: OpenAIModel) => void;
}
function ModelListBox({ allModels, selectedModel, setSelectedModel }: ModelListBoxProps) {
    return (
        <Listbox value={selectedModel} onChange={setSelectedModel}>
            <div className="relative w-36">
                <Listbox.Button className="relative w-full">
                    <Button
                        Icon={HiChevronUpDown}
                        size="md"
                        text={selectedModel.name}
                        // border={true}
                        shadow={true}
                        btnStyles="relative w-full justify-between"
                        textStyles="text-sm"
                    />
                </Listbox.Button>
                <Listbox.Options className="absolute w-full overflow-auto rounded-md border border-gray-300 bg-white py-1 text-base shadow-lg sm:text-sm">
                    {allModels.map((model) => (
                        <Listbox.Option
                            key={model.id}
                            value={model}
                            className="text-light-text ui-active:bg-blue-500 ui-active:text-white"
                        >
                            {model.name}
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </div>
        </Listbox>
    );
}

interface TemperatureRangeSliderProps {
    setTemp: (value: number) => void;
    temp: number;
}
function TemperatureRangeSlider({ setTemp, temp }: TemperatureRangeSliderProps) {
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTemp(Number(event.target.value));
    };
    return (
        <div className="w-full">
            <div className="mb-2 flex justify-between gap-3 text-xs text-zinc-500">
                <span>Precise</span>
                <span>Balanced</span>
                <span>Creative</span>
            </div>
            <input
                type="range"
                className="transparent h-1.5 w-full cursor-pointer appearance-none rounded-lg border-transparent bg-neutral-200"
                min="0"
                max="1"
                step="0.1"
                value={temp}
                onChange={handleInputChange}
            />
        </div>
    );
}

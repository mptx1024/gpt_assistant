import { useState } from 'react';

import { Listbox } from '@headlessui/react';
import { HiChevronUpDown } from 'react-icons/hi2';

import Button from '@/components/Button';
import { Input } from '@/components/InputField';
import { OpenAIModels, OpenAIModel, OpenAIModelID } from '@/types';
import { Chat } from '@/types';
interface Props {
    chat: Chat;
}
const ModelParams = ({ chat }: Props) => {
    const models: OpenAIModel[] = Object.values(OpenAIModels);
    const [temp, setTemp] = useState(chat.modelParams.temperature);
    const [selectedModel, setSelectedModel] = useState(models[0]);
    const [maxTokens, setMaxTokens] = useState(chat.modelParams.max_tokens);
    return (
        <div className="flex flex-col">
            <div id="setting-assistant"></div>
            <div id="model-params" className="flex flex-col gap-7 px-10">
                <div id="setting-model" className="flex items-center justify-between">
                    <span className="">Model</span>
                    <ModelListBox
                        models={models}
                        selectedModel={selectedModel}
                        setSelectedModel={setSelectedModel}
                    />
                </div>
                <div
                    id="setting-temperature"
                    className="sm:flex sm:items-center sm:justify-between"
                >
                    <div className="mb-5 sm:mb-0">
                        <span className="block whitespace-nowrap">Temperature: {temp}</span>
                        <span className="block text-sm text-gray-500 dark:text-gray-400">
                            description
                        </span>
                    </div>
                    <div className="sm:w-6/12">
                        <TemperatureRangeSlider temp={temp} setTemp={setTemp} />
                    </div>
                </div>
                <div id="setting-maxToken" className="flex items-center justify-between">
                    <div>
                        <span className="block">Max Token</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            description
                        </span>
                    </div>
                    <div className="w-28">
                        <Input
                            value={maxTokens}
                            onChange={(e) => setMaxTokens(Number(e.target.value))}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ModelParams;

{
    /* <div className="mx-1">
<h1 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
    Jane Doe
</h1>
<p className="text-sm text-gray-500 dark:text-gray-400">
    janedoe@exampl.com
</p>
</div> */
}

interface ModelListBoxProps {
    models: OpenAIModel[];
    selectedModel: OpenAIModel;
    setSelectedModel: (model: OpenAIModel) => void;
}
function ModelListBox({ models, selectedModel, setSelectedModel }: ModelListBoxProps) {
    return (
        <Listbox value={selectedModel} onChange={setSelectedModel}>
            <div className="relative w-36">
                <Listbox.Button className="relative w-full">
                    <Button
                        Icon={HiChevronUpDown}
                        size="md"
                        text={selectedModel.name}
                        border={true}
                        btnStyles="relative w-full justify-between"
                        textStyles="text-sm"
                    />
                </Listbox.Button>
                <Listbox.Options className="absolute w-full overflow-auto rounded-md border border-gray-300 bg-white py-1 text-base shadow-lg sm:text-sm">
                    {models.map((model) => (
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

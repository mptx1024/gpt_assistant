import { Listbox } from '@headlessui/react';
import { HiChevronUpDown } from 'react-icons/hi2';

import Button from '@/components/Button';
import { Input, Textarea } from '@/components/InputField';
import { OpenAIModel } from '@/types';

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
        <div className="flex flex-col gap-2 py-1">
            <div id="setting-prompt" className="">
                <div className="mb-3">
                    <span className="mb-2 block text-title">
                        {isChatSetting ? 'Prompt' : 'App Default Prompt'}
                    </span>
                    <p className="text-subtitle">
                        Instructions that defines the AI assistant role. It is used by the model to
                        understand the context and produce relevant output
                    </p>
                </div>
                <Textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    showborder={true}
                    styles=""
                />
            </div>
            <div id="model-params" className="flex flex-col rounded-md ">
                <div id="setting-model" className="flex items-center justify-between py-3">
                    <span className="text-title block">Model</span>
                    <ModelListBox
                        allModels={allModels}
                        selectedModel={selectedModel}
                        setSelectedModel={setSelectedModel}
                    />
                </div>
                <div
                    id="setting-temperature"
                    className=" py-3 sm:flex sm:items-center sm:justify-between"
                >
                    <div className="mb-3 sm:mb-0 sm:mr-5 sm:w-6/12">
                        <span className="text-title mb-1 block whitespace-nowrap">
                            Temperature: {temperature}
                        </span>
                        <span className="text-subtitle block">
                            Higher values will make the output more random and creative, while lower
                            values will make it more focused and deterministic
                        </span>
                    </div>
                    <div className="sm:w-6/12">
                        <TemperatureRangeSlider temp={temperature} setTemp={setTemperature} />
                    </div>
                </div>
                <div id="setting-maxToken" className="flex items-center justify-between py-3 gap-2">
                    <div className="">
                        <span className="block text-title">Max Token</span>
                        <span className="text-subtitle">
                            The maximum number of tokens to generate in the reply. 1000 tokens are
                            roughly 750 English words
                        </span>
                    </div>
                    <div className="flex-shrink-0 basis-[5rem]">
                        <Input
                            value={maxTokens}
                            onChange={(e) => setMaxTokens(Number(e.target.value))}
                            showborder={true}
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
            {({ open }) => (
                <div className="relative w-36">
                    <Listbox.Button as="div">
                        <Button
                            Icon={HiChevronUpDown}
                            btnSize="md"
                            text={selectedModel.name}
                            border={true}
                            btnStyles=" w-full justify-between active:scale-100"
                            textStyles="text-sm"
                        />
                    </Listbox.Button>
                    {open && (
                        <Listbox.Options
                            static
                            className="border-color absolute w-full overflow-auto rounded-md border bg-gray-base py-1 text-base shadow-lg dark:bg-gray-inverted sm:text-base"
                        >
                            {allModels.map((model) => (
                                <Listbox.Option
                                    key={model.id}
                                    value={model}
                                    className="cursor-pointer ui-active:bg-blue-500 ui-active:text-white"
                                >
                                    {model.name}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    )}
                </div>
            )}
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

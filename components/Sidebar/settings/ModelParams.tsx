import { useState } from 'react';

import { Listbox } from '@headlessui/react';
import { HiChevronUpDown } from 'react-icons/hi2';

import { OpenAIModels, OpenAIModel, OpenAIModelID } from '@/types';
import { Chat } from '@/types';
interface Props {
    chat: Chat;
}
const ModelParams = (props: Props) => {
    return (
        <div className="flex flex-col">
            <div id="setting-assistant"></div>
            <div id="model-params">
                <div id="setting-model" className="flex justify-between">
                    <span>Model:</span>
                    <ModelListBox />
                </div>
                <div id="setting-temperature"></div>
                <div id="setting-maxToken"></div>
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
function ModelListBox() {
    const models: OpenAIModel[] = Object.values(OpenAIModels);

    const [selectedModel, setSelectedModel] = useState(models[0]);

    return (
        <Listbox value={selectedModel} onChange={setSelectedModel}>
            <div className="relative w-36">
                <Listbox.Button className="relative w-full cursor-pointer rounded-md border border-gray-600 py-2 pl-3 pr-8 text-left text-base text-light-text shadow-md dark:text-dark-text sm:text-sm">
                    <span className="block truncate"> {selectedModel.name}</span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                        <HiChevronUpDown className="h-5 w-5" />
                    </span>
                </Listbox.Button>
                <Listbox.Options className="absolute w-full overflow-auto rounded-md border border-gray-300 py-1 text-base shadow-lg sm:text-sm">
                    {models.map((model) => (
                        <Listbox.Option
                            key={model.id}
                            value={model}
                            className="ui-active:bg-blue-500 ui-active:text-white"
                        >
                            {model.name}
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </div>
        </Listbox>
    );
}

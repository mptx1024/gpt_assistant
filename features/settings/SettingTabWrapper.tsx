import { Tab } from '@headlessui/react';
import clsx from 'clsx';
import AppSetting from './AppSetting';

interface Props {
    toggleModal: () => void;
}

function SettingTabWrapper(props: Props) {
    const tabs = {
        'App Setting': <AppSetting toggleModal={props.toggleModal} />,
        'Data Management': 'def',
    };
    return (
        <div className="w-full overflow-auto ">
            <Tab.Group
                onChange={(index) => {
                    console.log('Changed selected tab to:', index);
                }}
            >
                <Tab.List className="mx-auto flex w-[80%] debug-1 space-x-1 rounded-xl bg-blue-900/20 p-1">
                    {Object.keys(tabs).map((tab) => (
                        <Tab
                            key={tab}
                            className={({ selected }) =>
                                clsx(
                                    'w-full rounded-lg py-2 text-sm font-medium leading-5 text-blue-700',
                                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                    selected
                                        ? 'bg-white shadow'
                                        : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                                )
                            }
                        >
                            {tab}
                        </Tab>
                    ))}
                </Tab.List>
                <Tab.Panels className="mt-2">
                    {/* <Tab.Panel>Content 1</Tab.Panel
                    <Tab.Panel>Content 2</Tab.Panel>
                    <Tab.Panel>Content 3</Tab.Panel> */}
                    {Object.values(tabs).map((panel, idx) => (
                        <Tab.Panel key={idx}>{panel}</Tab.Panel>
                    ))}
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
}

export default SettingTabWrapper;

import { Tab } from '@headlessui/react';
import clsx from 'clsx';
import AppSetting from './AppSetting';
import DataSetting from './DataSetting';
interface Props {
    toggleModal: () => void;
}

function SettingTabWrapper(props: Props) {
    const tabs = {
        'App Setting': <AppSetting toggleModal={props.toggleModal} />,
        'Data Management': <DataSetting />,
    };
    return (
        <div className="w-full overflow-auto ">
            <Tab.Group
                onChange={(index) => {
                    console.log('Changed selected tab to:', index);
                }}
            >
                <Tab.List className="border-color mx-auto flex w-[80%] space-x-1 rounded-xl border p-1 ">
                    {Object.keys(tabs).map((tab) => (
                        <Tab
                            key={tab}
                            className={({ selected }) =>
                                clsx(
                                    'transition-all duration-150 w-full rounded-lg py-2 text-sm font-medium leading-5 ',
                                    'focus-ring-2 ring-opacity-60 ring-offset-2 focus:outline-none',
                                    selected ? 'bg-white text-neutral-600 shadow' : ''
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

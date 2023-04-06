import { HiTrash, HiCalculator, HiCheck, HiOutlineXMark, HiOutlineCog6Tooth } from 'react-icons/hi2';

import { removeAll } from '@/store/chatsSlice';
import { useAppDispatch } from '@/store/hooks';
import { useRouter } from 'next/router';

interface Props {}
const Settings = (props: Props) => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const onClickUsage = () => {
        // Your implementation for Usage onClick event
    };

    const onClickApiSettings = () => {
        // Your implementation for API Settings onClick event
    };

    const onConfirmClearChats = () => {
        // Your implementation for clearing chats

        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }
        dispatch(removeAll());
        router.push('/chat');
    };

    return (
        <div className='mt-auto py-3 border-t border-gray-500 flex flex-col ]'>
            <div className='dropdown dropdown-top'>
                <div
                    tabIndex={0}
                    className='btn m-1 flex gap-5 items-center justify-start py-1 px-2 mx-2 text-md hover:bg-gray-700 rounded-md cursor-pointer border-none'
                >
                    <HiTrash className='w-4 h-4' />
                    Clear Chats
                </div>
                <div
                    tabIndex={0}
                    className='dropdown-content flex items-center shadow rounded-lg w-48 gap-3 text-primary-content p-3'
                >
                    Are you sure?
                    <HiCheck className='w-5 h-5 cursor-pointer hover:bg-gray-700' onClick={onConfirmClearChats} />
                    <HiOutlineXMark
                        className='w-5 h-5 cursor-pointer hover:bg-gray-700 '
                        onClick={() => {
                            if (document.activeElement instanceof HTMLElement) {
                                document.activeElement.blur();
                            }
                        }}
                    />
                </div>
            </div>

            <label
                htmlFor='usage-modal'
                className='btn m-1 flex gap-5 items-center justify-start py-1 px-2 mx-2 text-md hover:bg-gray-700 rounded-md cursor-pointer'
            >
                <HiCalculator className='w-4 h-4' />
                Usage
            </label>

            <label
                htmlFor='setting-modal'
                className='btn m-1 flex gap-5 items-center justify-start py-1 px-2 mx-2 text-md hover:bg-gray-700 rounded-md cursor-pointer'
            >
                <HiOutlineCog6Tooth className='w-4 h-4' />
                Settings
            </label>
        </div>
    );
};

export default Settings;

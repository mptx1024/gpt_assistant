import { HiOutlineXMark, HiPlus } from 'react-icons/hi2';
import Link from 'next/link';
interface Props {
    toggleSidebar: () => void;
}
const NewChat = (props: Props) => {
    return (
        <div className='flex flex-row justify-between items-center px-5 h-16 border-b border-gray-500 '>
            <Link href={`/chat`} replace>
                <div className='btn btn-outline capitalize text-lg font-semibold text-teal-50 gap-2'>
                    <HiPlus className='w-6 h-6' />
                    New Chat
                </div>
            </Link>

            {/* <h1 className='text-2xl font-semibold'>New Chat</h1> */}
            <button
                className='text-white p-2 rounded hover:bg-gray-700 focus:outline-none'
                onClick={props.toggleSidebar}
            >
                <HiOutlineXMark className='w-6 h-6' />
            </button>
        </div>
    );
};
export default NewChat;

import { AiOutlineMenu } from 'react-icons/ai';

type Props = {
    toggleSidebar: () => void;
};
export default function Header({ toggleSidebar }: Props) {
    return (
        <header className='h-16 bg-gray-100 border-b border-gray-300 flex items-center justify-between px-4 w-full'>
            <button className='text-gray-600 p-2 rounded hover:bg-gray-200 focus:outline-none' onClick={toggleSidebar}>
                <AiOutlineMenu className='w-6 h-6' />
            </button>
            <h1 className='text-2xl font-semibold'>Main Content</h1>
        </header>
    );
}

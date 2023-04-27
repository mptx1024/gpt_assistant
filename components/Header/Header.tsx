import { AiOutlineMenu } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { selectChatById } from '@/store/chatsSlice';
import { RootState } from '@/store';
type Props = {
    toggleSidebar: () => void;
};
export default function Header({ toggleSidebar }: Props) {
    const router = useRouter();
    const { id } = router.query;
    const chat = useSelector((state: RootState) => selectChatById(state, id as string));
    
    return (
        <header className='h-16 bg-gray-100 border-b border-gray-300 flex items-center justify-between px-4 w-full'>
            <button className='text-gray-600 p-2 rounded hover:bg-gray-200 focus:outline-none' onClick={toggleSidebar}>
                <AiOutlineMenu className='w-6 h-6' />
            </button>
            <p>{chat?.title}</p>
            <h1 className='text-2xl font-semibold'>Main Content</h1>
        </header>
    );
}

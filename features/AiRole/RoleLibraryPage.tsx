import { SystemPrompt } from '@/types';
import RoleCard from './RoleCard';
import rolesList from './utils/roleLibarary.json';
interface Props {}

const getRandomColor = () => {
    const colors = [
        'bg-red-500',
        'bg-yellow-500',
        'bg-green-500',
        'bg-blue-500',
        'bg-indigo-500',
        'bg-purple-500',
        'bg-pink-500',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
};
const RoleLibraryPage = (props: Props) => {

    const cards = rolesList.map((role, index) => {
        return <RoleCard key={index} systemPrompt={role} bgColor={getRandomColor()} />;
    });
    return (
        <div className='h-full w-full animate-slideIn'>
            <div
                className='
                debug-1
                grid grid-cols-1 gap-4 p-5 
                sm:grid-cols-2 
                lg:grid-cols-3 lg:gap-6 lg:p-8
                xl:grid-cols-4 xl:gap-8 xl:p-10
                auto-cols-auto 
                '
            >
                {cards}
            </div>
        </div>
    );
};
export default RoleLibraryPage;

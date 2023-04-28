import { HiPlus } from 'react-icons/hi2';
import RoleCard from './RoleCard';
import rolesList from './utils/roleLibarary.json';
import Button from '@/components/Button';
import { colors } from './utils/colors';
interface Props {}

const getRandomColor = (): string => {
    return colors[Math.floor(Math.random() * colors.length)];
};
const RoleLibraryPage = (props: Props) => {
    const cards = rolesList.map((role, index) => {
        const color = getRandomColor();
        return <RoleCard key={index} systemPrompt={role} bgColor={color} />;
    });
    return (
        <div className='h-full w-full animate-slideIn overflow-y-scroll'>
            <div className='flex justify-center gap-5 my-5'>
                <input
                    placeholder='Search AI Role Library'
                    className='border border-slate-300 rounded-lg overflow-hidden p-2'
                />
                <Button
                    text={'Add Role'}
                    icon={HiPlus}
                    className={
                        'bg-cyan-900 text-white bg-opacity-80 border border-slate-300 rounded-lg overflow-hidden'
                    }
                />
            </div>
            <div
                className='
                debug-2
                grid grid-cols-1 gap-2 p-5 
                sm:grid-cols-2 
                lg:grid-cols-3 lg:gap-3 lg:p-8
                xl:grid-cols-4 xl:gap-5 xl:p-10
                auto-cols-auto
                '
            >
                {cards}
            </div>
        </div>
    );
};
export default RoleLibraryPage;

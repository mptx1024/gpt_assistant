import { useState, useCallback, useMemo } from 'react';
import { HiPlus } from 'react-icons/hi2';
import RoleCard from './RoleCard';
import rolesList from './utils/roleLibarary.json';
import Button from '@/components/Button';
import { colors, getRandomColor } from './utils/colors';
import RoleEditor from './RoleEditor';

interface Props {}

const RoleLibraryPage = (props: Props) => {
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const toggleEditor = () => {
        setIsEditorOpen(!isEditorOpen);
    };

    const cardColors = useMemo(() => {
        // prevent re-generating card colors on every render
        return rolesList.map(() => getRandomColor());
    }, []);

    const cards = rolesList.map((role, index) => {
        const color = cardColors[index];
        return <RoleCard key={index} systemPrompt={role} bgColor={color} />;
    });
    return (
        <div className='h-full w-full overflow-y-scroll'>
            <div className='flex justify-center gap-5 my-5'>
                <input
                    placeholder='Search AI Role Library'
                    className='border border-slate-300 rounded-lg overflow-hidden p-2'
                />
                <Button
                    text={'Add Role'}
                    icon={HiPlus}
                    onClick={toggleEditor}
                    className={'bg-blue-800 text-white border border-slate-300 rounded-lg overflow-hidden'}
                />
                <RoleEditor isOpen={isEditorOpen} toggleModal={toggleEditor} />
            </div>
            <div
                className='
                debug-2
                animate-slideIn
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

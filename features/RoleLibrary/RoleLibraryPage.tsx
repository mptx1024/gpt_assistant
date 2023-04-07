import RoleCard from './RoleCard';
import { Transition } from '@headlessui/react';
import { useState } from 'react';
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
    const cards = Array.from({ length: 20 }).map((_, index) => (
        <RoleCard key={index} title={index} bgColor={getRandomColor()} />
    ));

    // return <div className='flex flex-col gap-3 py-5 lg:flex-row lg:flex-wrap'>{cards}</div>;
    return (
        <div className='h-full w-full'>
            <Transition
                className='my-16 '
                appear={true}
                show={true}
                enter='transition-all ease-in-out duration-500 delay-[200ms]'
                enterFrom='opacity-0 translate-y-6'
                enterTo='opacity-100 translate-y-0'
                leave='transition-all ease-in-out duration-300'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
            >
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
            </Transition>
        </div>
    );
};
export default RoleLibraryPage;

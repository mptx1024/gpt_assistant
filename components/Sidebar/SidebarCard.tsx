import React from 'react';

import clsx from 'clsx';

const cardClasses =
    'bg-white dark:bg-white-inverted hover:brightness-95 dark:hover:brightness-150 transition-all duration-150 mx-2 flex animate-slideIn h-11 cursor-pointer items-center justify-between gap-1 rounded-md p-2 group relative overflow-hidden';

const SidebarCard = (props: {
    children: React.ReactNode;
    isSelected?: boolean;
    onClick?: () => void;
}) => {
    return (
        <div
            onClick={props.onClick}
            className={clsx(cardClasses, {
                'ring-[2px] ring-colorPrimary': props.isSelected,
            })}
        >
            {props.children}
        </div>
    );
};

export default SidebarCard;

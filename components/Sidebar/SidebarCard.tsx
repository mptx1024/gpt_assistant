import React from 'react';

import clsx from 'clsx';

const cardClasses =
    'bg-card-light dark:bg-card-dark text-primary hover:brightness-95 dark:hover:brightness-150 transition-all duration-150 mx-2 flex h-10 animate-slideIn cursor-pointer items-center gap-2 rounded-md py-1 px-2 group relative';

const SidebarCard = (props: { children: React.ReactNode; isSelected?: boolean }) => {
    return (
        <div
            className={clsx(cardClasses, {
                'ring-[2px] ring-primary': props.isSelected,
            })}
        >
            {props.children}
        </div>
    );
};

export default SidebarCard;

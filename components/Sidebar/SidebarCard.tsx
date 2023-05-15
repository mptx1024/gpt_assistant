import clsx from 'clsx';

const cardClasses =
    'bg-light-bg-card hover:bg-light-bg-card-hover  dark:bg-dark-bg-card text-light-text dark:text-gray-400 dark:hover:bg-dark-bg-card-hover mx-2 flex h-10 animate-slideIn cursor-pointer items-center gap-2 rounded-md py-1 px-2 group relative ';
// [&_.chat-item-btns]:hover:right-2 [&_.chat-item-btns]:hover:opacity-100

const SidebarCard = (props: { children: React.ReactNode; isSelected?: boolean }) => {
    return (
        <div
            className={clsx(cardClasses, {
                'ring-[2px] ring-cyan-800': props.isSelected,
            })}
        >
            {props.children}
        </div>
    );
};

export default SidebarCard;

import clsx from 'clsx';

const cardClasses =
    'bg-secondary-base dark:bg-secondary-dark text-primary hover:brightness-90 dark:hover:brightness-150 transition-all duration-150 mx-2 flex h-10 animate-slideIn cursor-pointer items-center gap-2 rounded-md py-1 px-2 group relative';

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

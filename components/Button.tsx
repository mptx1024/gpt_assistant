import clsx from 'clsx';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    onClick?: any;
    Icon?: React.ElementType;
    iconEffect?: boolean;
    text?: string;
    border?: boolean;
    shadow?: boolean;
    title?: string;
    // disabled?: boolean;
    btnSize: 'sm' | 'md' | 'lg';
    type?: 'submit' | 'reset' | 'button' | undefined;
    iconThemeColor?: boolean;
    iconStyles?: string;
    btnStyles?: string;
    textStyles?: string;
}

const btnClasses = {
    base: 'flex items-center justify-center gap-2 rounded-md max-w-xs max-h-[3rem] font-normal transition-all ease-in-out active:scale-[0.9] [&>*]:disabled:!text-gray-500 disabled:cursor-not-allowed',
    shadow: 'hover:bg-gray-200 dark:hover:bg-gray-700',
    border: 'border-[1px] border-gray-300 hover:border-colorPrimary dark:border-gray-500 dark:hover:border-colorPrimary',
    sm: 'px-1 py-1 text-sm',
    md: 'px-2 py-2 text-base',
    lg: 'px-2 py-2 text-lg',
};

const iconClasses = {
    themeColor: 'text-colorPrimary dark:text-colorPrimary',
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
    iconEffect: 'hover:scale-[1.1]',
};
const Button = ({
    onClick,
    Icon,
    iconEffect,
    text,
    border = false,
    shadow = false,
    btnSize: size,
    type,
    iconStyles,
    btnStyles,
    textStyles,
    iconThemeColor = true,
    ...otherProps
}: Props) => {
    return (
        <button
            type={type}
            onClick={onClick}
            // disabled={otherProps?.disabled}
            className={clsx(
                btnClasses.base,
                btnClasses[size],
                shadow && btnClasses.shadow,
                border && btnClasses.border,
                btnStyles
            )}
            {...otherProps}
        >
            {Icon && (
                <Icon
                    className={clsx(
                        iconClasses[size],
                        iconStyles,
                        iconThemeColor && iconClasses.themeColor,
                        iconEffect && iconClasses.iconEffect
                    )}
                />
            )}
            {text && <p className={clsx('mx-1 truncate whitespace-nowrap', textStyles)}>{text}</p>}
        </button>
    );
};

export default Button;

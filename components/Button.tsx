//https://github.com/Yidadaa/ChatGPT-Next-Web/blob/main/app/components/button.tsx

const Button = (props: {
    onClick?: () => void;
    icon?: React.ElementType;
    text?: string;
    bordered?: boolean;
    shadow?: boolean;
    noDark?: boolean;
    className?: string;
    title?: string;
    disabled?: boolean;
}) => {
    return (
        <button
            type='button'
            onClick={props.onClick}
            disabled={props.disabled}
            className={`flex items-center gap-1 rounded-md px-4 py-2 text-sm font-normal text-white bg-black bg-opacity-20 hover:bg-opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 transition-all duration-300 ease-in-out ${
                props.className ?? ''
            }`}
        >
            {props.icon && <props.icon className='h-5 w-5' />}
            {props.text && <div className=''>{props.text}</div>}
        </button>
    );
};

export default Button;

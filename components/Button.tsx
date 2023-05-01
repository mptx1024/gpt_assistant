//https://github.com/Yidadaa/ChatGPT-Next-Web/blob/main/app/components/button.tsx

const Button = (props: {
    onClick?: () => void;
    icon?: React.ElementType;
    text?: string;
    bordered?: boolean;
    shadow?: boolean;
    dark?: boolean;
    className?: string;
    title?: string;
    disabled?: boolean;
    type?: 'submit' | 'reset' | 'button' | undefined;
}) => {
    return (
        <button
            type={props.type}
            onClick={props.onClick}
            disabled={props.disabled}
            className={`
            flex items-center justify-center gap-1 
            rounded-md max-w-xs px-2 py-2 text-base font-normal
            text-white
            bg-gray-800 
            hover:bg-gray-500
            focus:outline-none 
            focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 
            transition-all duration-300 ease-in-out
             ${props.className ?? ''}`}
        >
            {props.icon && <props.icon className='h-4 w-4' />}
            {props.text && <div className=''>{props.text}</div>}
        </button>
    );
};

export default Button;

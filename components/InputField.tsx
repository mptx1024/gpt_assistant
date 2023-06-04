import { useEffect, useRef } from 'react';

import clsx from 'clsx';

interface InputProps extends React.HTMLProps<HTMLInputElement> {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClick?: (e: React.MouseEvent) => void;
    styles?: string;
    showborder?: boolean;
}
const inputBaseClasses = 'p-1 w-full overflow-hidden rounded-lg outline-none';

export function Input({ showborder, styles, onChange, onClick, ...props }: InputProps) {
    return (
        <input
            {...props}
            required={props.required}
            className={clsx(
                styles,
                inputBaseClasses,
                showborder ? 'border-color border-[1.5px] focus:border-colorPrimary' : 'border-none'
            )}
            // type={props.type}
            // placeholder={props.placeholder}
            // value={props.value}
            onChange={onChange}
            onClick={onClick}
        />
    );
}

interface TexareaProps {
    required?: boolean;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    styles?: string;
    rows?: number;
    // [x: string]: any;
    showborder?: boolean;
}
// focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300

const textAreaBaseClasses =
    'focus:border-colorPrimary border-[1.5px] border-color max-h-[20rem] resize-none p-1 rounded-md w-full outline-none debug-1';

export function Textarea(props: TexareaProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = '7rem';
            // const scrollHeight = textareaRef.current.scrollHeight;
            // textareaRef.current.style.height = scrollHeight + "px";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [textareaRef, props.value]);
    return (
        <textarea
            ref={textareaRef}
            required={props.required}
            className={clsx(textAreaBaseClasses, props.styles)}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
            onKeyDown={props.onKeyDown}
            rows={props.rows}
        />
    );
}

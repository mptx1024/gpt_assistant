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
                showborder ? 'border-color border-[2px] focus:border-colorPrimary' : 'border-none'
            )}
            onChange={onChange}
            onClick={onClick}
        />
    );
}

interface TexareaProps extends React.HTMLProps<HTMLTextAreaElement> {
    required?: boolean;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    styles?: string;
    rows?: number;
    showborder?: boolean;
}

const textAreaBaseClasses =
    'focus:border-colorPrimary border-[2px] border-color max-h-[20rem] resize-none p-1 rounded-md w-full outline-none debug-1';

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

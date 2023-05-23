import { useEffect, useRef } from 'react';

import clsx from 'clsx';

interface InputProps {
    required?: boolean;
    type?: string;
    placeholder?: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClick?: (e: React.MouseEvent) => void;
    styles?: string;
    showborder?: boolean;
}
const inputBaseClasses = 'my-2 p-1 w-full overflow-hidden rounded-lg outline-none';

export function Input(props: InputProps) {
    return (
        <input
            required={props.required}
            className={clsx(
                props.styles,
                inputBaseClasses,
                props.showborder
                    ? 'border-color border-[1.5px] focus:border-colorPrimary'
                    : 'border-none'
            )}
            type={props.type}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
            onClick={props.onClick}
        />
    );
}

interface TexareaProps {
    required?: boolean;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    styles?: string;
    rows?: number;
    // [x: string]: any;
    showborder?: boolean;
}

const textAreaBaseClasses =
    'focus:border-colorPrimary border-[1.5px] border-color max-h-[20rem] resize-none p-1 rounded-md w-full outline-none';

export function Textarea(props: TexareaProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    useEffect(() => {
        if (textareaRef.current) {
            // textareaRef.current.style.height = '10rem';
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
            rows={props.rows}
        />
    );
}

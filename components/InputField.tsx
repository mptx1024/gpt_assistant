import { useEffect, useRef } from 'react';

import clsx from 'clsx';

interface InputProps {
    required?: boolean;
    type?: string;
    placeholder?: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    styles?: string;
    showBorder?: boolean;
}
const inputBaseClasses =
    'my-2 p-1 w-full overflow-hidden border-none rounded-lg text-light-text dark:text-dark-text';

export function Input(props: InputProps) {
    return (
        <input
            required={props.required}
            className={clsx(
                props.styles,
                inputBaseClasses,
                props.showBorder ? 'shadow-sm focus:outline-cyan-600' : 'outline-none'
            )}
            type={props.type}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
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
    [x: string]: any;
    showBorder?: boolean;
}

const textAreaBaseClasses =
    'h-[15rem] max-h-[20rem] border-none resize-none px-2 py-2 rounded-md w-full';
export function Textarea(props: TexareaProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    // function auto_grow(element: HTMLTextAreaElement | null) {
    //     if (element) {
    //         element.style.height = 'inherit';
    //         element.style.height = element.scrollHeight + 'px';
    //     }
    // }
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = '5rem';
            // const scrollHeight = textareaRef.current.scrollHeight;
            // textareaRef.current.style.height = scrollHeight + "px";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [textareaRef, props.value]);
    return (
        <textarea
            ref={textareaRef}
            required={props.required}
            className={clsx(
                textAreaBaseClasses,
                props.styles,
                props.showBorder ? 'shadow-sm focus:outline-cyan-600' : 'outline-none'
            )}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
            rows={props.rows}
            {...props}
        />
    );
}

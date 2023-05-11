import { useEffect, useRef } from 'react';

import clsx from 'clsx';

interface InputProps {
    required?: boolean;
    type?: string;
    placeholder?: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    styles?: string;
    border?: boolean;
}
const inputBaseClasses =
    'my-3 p-2 w-full overflow-hidden rounded-lg text-light-text dark:text-dark-text';

export function Input(props: InputProps) {
    return (
        <input
            required={props.required}
            className={clsx(
                props.styles,
                inputBaseClasses,
                props.border
                    ? 'border border-slate-300 shadow-sm focus:outline-1 focus:outline-cyan-600'
                    : 'outline-none'
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
    'h-[8rem] max-h-[20rem] w-full resize-none bg-transparent px-2 py-2 rounded-md overflow-y-auto';
export function Textarea(props: TexareaProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    function auto_grow(element: HTMLTextAreaElement | null) {
        if (element) {
            element.style.height = 'inherit';
            element.style.height = element.scrollHeight + 'px';
        }
    }
    // useEffect(() => {
    //     if (textareaRef.current) {
    //         textareaRef.current.style.height = 'inherit';
    //         // const scrollHeight = textareaRef.current.scrollHeight;
    //         // textareaRef.current.style.height = scrollHeight + "px";
    //         textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    //     }
    // }, [textareaRef, props.value]);
    return (
        <textarea
            onInput={() => auto_grow(textareaRef.current)}
            ref={textareaRef}
            required={props.required}
            className={clsx(
                textAreaBaseClasses,
                props.styles,
                props.showBorder
                    ? 'border border-slate-300 shadow-sm focus:outline-1 focus:outline-cyan-600'
                    : 'outline-none'
            )}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
            rows={props.rows}
            {...props}
        />
    );
}

import clsx from 'clsx';

interface InputProps {
    required?: boolean;
    type?: string;
    placeholder?: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    styles?: string;
}
const inputBaseClasses =
    'my-3 p-2 w-full overflow-hidden rounded-lg text-light-text dark:text-dark-text  outline-none focus:ring-1 focus:ring-inset focus:ring-indigo-700';

export function Input(props: InputProps) {
    const inputClasses = clsx(props.styles, inputBaseClasses);
    return (
        <input
            required={props.required}
            className={inputClasses}
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
    innerref?: any;
}

const textAreaBaseClasses =
    'resize-none outline-none px-3 py-2 w-full rounded-lg focus:ring-1 focus:ring-inset focus:ring-indigo-700';
export function Textarea(props: TexareaProps) {
    const textAreaClasses = clsx(textAreaBaseClasses, props.styles);

    return (
        <textarea
            ref={props.innerref}
            required={props.required}
            className={textAreaClasses}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
            rows={props.rows}
            {...props}
        />
    );
}

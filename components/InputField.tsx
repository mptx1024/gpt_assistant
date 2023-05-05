import clsx from "clsx";

interface InputProps {
    required?: boolean;
    type?: string;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    style?: string;
}
const baseClasses =
    "my-3 p-2 w-full overflow-hidden rounded-lg text-light-text dark:text-dark-text border-[1px] border-slate-300 outline-none focus:border-spacing-1 focus:border-cyan-700";

export function Input(props: InputProps) {
    const inputClasses = clsx(baseClasses, props.style);
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
    style?: string;
    rows?: number;
}
export function Textarea(props: TexareaProps) {
    const textAreaClasses = clsx(baseClasses, props.style, "overflow-y-scroll");
    return (
        <textarea
            required={props.required}
            className={textAreaClasses}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
            rows={props.rows}
        />
    );
}

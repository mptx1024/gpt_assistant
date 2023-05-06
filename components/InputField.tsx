import clsx from "clsx";

interface InputProps {
    required?: boolean;
    type?: string;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    styles?: string;
}
const baseClasses =
    "my-3 p-2 w-full overflow-hidden rounded-lg text-light-text dark:text-dark-text border-[1px] border-slate-300 outline-none focus:ring-1 focus:ring-inset focus:ring-indigo-700";

export function Input(props: InputProps) {
    const inputClasses = clsx(props.styles, baseClasses);
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
}
export function Textarea(props: TexareaProps) {
    const textAreaClasses = clsx(baseClasses, props.styles, "overflow-y-scroll");
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

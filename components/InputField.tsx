interface InputProps {
    required?: boolean;
    type?: string;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    style?: string;
}
const baseClasses =
    "my-3 p-2 w-full overflow-hidden rounded-lg text-light-text dark:text-dark-text border-[1px] border-slate-300 outline-none focus:ring-1 focus:ring-cyan-700";
// const test = "overflow-hidden rounded-lg border-[1px] border-gray-300 p-3 outline-none";

export function Input(props: InputProps) {
    return (
        <input
            required={props.required}
            className={baseClasses}
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
}
export function Textarea(props: TexareaProps) {
    return (
        <textarea
            required={props.required}
            className={baseClasses}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
        />
    );
}

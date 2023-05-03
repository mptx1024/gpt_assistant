//https://github.com/Yidadaa/ChatGPT-Next-Web/blob/main/app/components/button.tsx
import cx from "classnames";

interface Props {
  onClick?: () => void;
  Icon?: React.ElementType;
  text?: string;
  border?: boolean;
  shadow?: boolean;
  className?: string;
  title?: string;
  disabled?: boolean;
  size: "sm" | "md" | "lg";
  type?: "submit" | "reset" | "button" | undefined;
}

const btnClasses = {
  base: "flex items-center justify-center gap-1 rounded-md max-w-xs font-normal text-light-text  transition-all duration-500 ease-in-out",
  shadow: "hover:bg-gray-200 dark:hover:bg-gray-700",
  border: "border-[1px] border-red-500",
  sm: "px-1 py-1 text-sm",
  md: "px-2 py-2 text-base",
  lg: "px-3 py-2 text-lg",
};

const iconClasses = {
  base: "text-light-text hover:scale-125 dark:text-dark-text",
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
};
const Button = ({
  onClick,
  Icon,
  text,
  border = false,
  shadow = false,
  disabled,
  size,
  type,
}: Props) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cx(
        btnClasses.base,
        btnClasses[size],
        shadow && btnClasses.shadow,
        border && btnClasses.border
      )}
    >
      {Icon && <Icon className={cx(iconClasses.base, iconClasses[size])} />}
      {text && <p className="">{text}</p>}
    </button>
  );
};

export default Button;

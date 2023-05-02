//https://github.com/Yidadaa/ChatGPT-Next-Web/blob/main/app/components/button.tsx
import cx from "classnames";

const Button = (props: {
  onClick?: () => void;
  icon?: React.ElementType;
  text?: string;
  bordered?: boolean;
  shadow?: boolean;
  dark?: boolean;
  className?: string;
  title?: string;
  disabled?: boolean;
  size: "sm" | "md" | "lg";
  type?: "submit" | "reset" | "button" | undefined;
}) => {
  const btnClasses = cx(
    `flex items-center justify-center gap-1 rounded-md max-w-xs
     font-normal text-white 
      py-2 px-2
        hover:bg-gray-100
        focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 
        transition-all duration-500 ease-in-out`,
    props.className,
    {
      " text-sm": props.size === "sm",
      "text-base": props.size === "md",
      "text-lg": props.size === "lg",
    }
  );

  const iconClasses = cx(`text-gray-500`, {
    "h-4 w-4": props.size === "sm",
    "h-5 w-5": props.size === "md",
    "h-6 w-6": props.size === "lg",
  });
  return (
    <button
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
      className={btnClasses}
    >
      {props.icon && <props.icon className={iconClasses} />}
      {props.text && <div className="">{props.text}</div>}
    </button>
  );
};

export default Button;

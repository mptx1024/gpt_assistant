interface Props {
    onClick?: () => void;
}
const Button = (props: Props) => {
    return (
        <button
            type='button'
            onClick={props.onClick}
            className='rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'
        ></button>
    );
};
export default Button;


// import * as React from "react";

// import styles from "./button.module.scss";

// export function IconButton(props: {
//   onClick?: () => void;
//   icon: JSX.Element;
//   text?: string;
//   bordered?: boolean;
//   shadow?: boolean;
//   noDark?: boolean;
//   className?: string;
//   title?: string;
//   disabled?: boolean;
// }) {
//   return (
//     <button
//       className={
//         styles["icon-button"] +
//         ` ${props.bordered && styles.border} ${props.shadow && styles.shadow} ${
//           props.className ?? ""
//         } clickable`
//       }
//       onClick={props.onClick}
//       title={props.title}
//       disabled={props.disabled}
//       role="button"
//     >
//       <div
//         className={styles["icon-button-icon"] + ` ${props.noDark && "no-dark"}`}
//       >
//         {props.icon}
//       </div>
//       {props.text && (
//         <div className={styles["icon-button-text"]}>{props.text}</div>
//       )}
//     </button>
//   );
// }
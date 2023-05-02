import cx from "classnames";
const SidebarCard = (props: {
  children: React.ReactNode;
  isSelected?: boolean;
}) => {
  const cardClasses =
    "bg-gray-200 hover:bg-gray-300 dark:bg-gray-900 dark:hover:bg-gray-700 relative mx-2 flex h-12 animate-slideIn cursor-pointer items-center gap-2 rounded-md py-1 px-2 [&_.chat-item-btns]:hover:right-2 [&_.chat-item-btns]:hover:opacity-100";

  return (
    <div
      className={cx(cardClasses, {
        "ring-1 ring-inset ring-cyan-700": props.isSelected,
      })}
    >
      {props.children}
    </div>
  );
};

export default SidebarCard;

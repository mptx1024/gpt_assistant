const SidebarCard = (props: { children: React.ReactNode }) => {
    return (
        <div
            className={`flex gap-2 items-center py-1 px-2 mx-2 h-10 hover:bg-gray-700 rounded-md cursor-pointer relative animate-slideIn
        [&_.chat-item-btns]:hover:opacity-100 [&_.chat-item-btns]:hover:right-2`}
        >
            {props.children}
        </div>
    );
};

export default SidebarCard;

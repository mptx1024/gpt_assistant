import { Chat } from "@/types";
interface Props {
    chat: Chat;
}
export function ChatSettingCard({ chat }: Props) {
    const onClickCard = () => {
        //TODO
    };
    return (
        <div className="dark: flex flex-col items-start rounded-md border border-gray-500 bg-transparent text-light-text dark:text-dark-text">
        <span>{chat.model.name}</span>
            <span>Temperature:{chat.role.roleName}</span>
            <span>Assistant:{chat.role.roleName}</span>
        </div>
    );
}

export function ChatSettingModal() {
    return <div>ChatSetting</div>;
}

import { useState } from "react";

import { useRouter } from "next/router";
import { FiUser } from "react-icons/fi";

import RoleEditor from "@/features/AiRole/RoleEditor";
import RoleModal from "@/features/AiRole/RoleModal";
import { Role } from "@/types";
import { createNewChat } from "@/utils/chats";
import { deleteRole } from "@/utils/roles";

import SidebarCard from "./SidebarCard";

interface Props {
    role: Role;
}
const RoleItem = (props: Props) => {
    const [isRoleModalOpen, setIsRoleModalOpen] = useState<boolean>(false);
    const [isRoleEditorOpen, setIsRoleEditorOpen] = useState<boolean>(false);

    const router = useRouter();

    const toggleRoleModal = () => {
        setIsRoleModalOpen(!isRoleModalOpen);
    };
    const toggleRoleEditor = () => {
        setIsRoleEditorOpen(!isRoleEditorOpen);
    };
    const handleClickUse = () => {
        const chatID = createNewChat(props.role);
        setIsRoleModalOpen(false);
        setIsRoleEditorOpen(false);
        router.push(`/chat/${chatID}`);
    };
    const handleClickEdit = () => {
        setIsRoleEditorOpen(true);
    };
    const handleClickDelete = () => {
        if (props.role) {
            deleteRole(props.role.id);
        }
    };

    const handleClick = () => {
        setIsRoleModalOpen(!isRoleModalOpen);
    };
    return (
        <>
            <div onClick={handleClick}>
                <SidebarCard>
                    <FiUser />
                    <div> {props.role.roleName}</div>
                </SidebarCard>
            </div>
            {isRoleModalOpen && (
                <RoleModal
                    role={props.role}
                    isOpen={isRoleModalOpen}
                    toggleModal={toggleRoleModal}
                    handleClickUse={handleClickUse}
                    handleClickEdit={handleClickEdit}
                    handleClickDelete={handleClickDelete}
                />
            )}
            {isRoleEditorOpen && (
                <RoleEditor
                    isOpen={isRoleEditorOpen}
                    toggleModal={toggleRoleEditor}
                    role={props.role}
                />
            )}
        </>
    );
};
export default RoleItem;

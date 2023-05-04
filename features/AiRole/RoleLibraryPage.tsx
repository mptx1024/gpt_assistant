import { useState, useMemo, useEffect } from "react";

import MiniSearch from "minisearch";
import { useRouter } from "next/router";
import { HiPlus } from "react-icons/hi2";

import Button from "@/components/Button";
import { Role } from "@/types";
import { createNewChat } from "@/utils/chats";

import RoleCard from "./RoleCard";
import RoleEditor from "./RoleEditor";
import RoleModal from "./RoleModal";
import { getRandomColor } from "./utils/colors";
import rolesList from "./utils/roleLibarary.json";

const RoleLibraryPage = () => {
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [isRoleCardModalOpen, setIsRoleCardModalOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState<Role>();
    const [selectedRoleColor, setSelectedRoleColor] = useState("");
    const router = useRouter();

    const [searchInput, setSearchInput] = useState("");
    const [searchResults, setSearchResults] = useState(rolesList);

    // minisearch
    const miniSearch = useMemo(() => {
        const search = new MiniSearch({
            fields: ["roleName"],
            storeFields: ["roleName", "prompt"],
        });
        search.addAll(rolesList);
        return search;
    }, []);

    useEffect(() => {
        const matchedIdList = miniSearch
            .search(searchInput, { prefix: true, fuzzy: 0.2 })
            .map((match) => match.id);
        if (matchedIdList.length !== 0) {
            setSearchResults(rolesList.filter((role) => matchedIdList.includes(role.id)));
        } else {
            setSearchResults(rolesList);
        }
    }, [miniSearch, searchInput]);

    const toggleEditor = () => {
        setIsEditorOpen(!isEditorOpen);
    };

    const toggleRoleCardModal = () => {
        setIsRoleCardModalOpen(!isRoleCardModalOpen);
    };
    // prevent re-generating card colors on every render
    const cardColors = useMemo(() => {
        return rolesList.map(() => getRandomColor());
    }, []);
    const handleClickConfirm = () => {
        const chatID = createNewChat(selectedRole);
        router.push(`/chat/${chatID}`);
        setIsRoleCardModalOpen(false);
    };

    const cards = searchResults.map((role, index) => {
        const color = cardColors[index];
        return (
            <RoleCard
                key={index}
                role={role}
                bgColor={color}
                setSelectedRoleColor={setSelectedRoleColor}
                toggleRoleCardModal={toggleRoleCardModal}
                setSelectedRole={setSelectedRole}
            />
        );
    });
    return (
        <div className="h-full w-full overflow-y-scroll">
            <div className="my-4 flex justify-center gap-5">
                <input
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Search AI Role Library"
                    className="overflow-hidden rounded-lg border-[1px] border-gray-300 p-3 outline-none"
                />
                <Button
                    text={"Add Role"}
                    Icon={HiPlus}
                    onClick={toggleEditor}
                    shadow={true}
                    border={true}
                    size="lg"
                />
                <RoleEditor isOpen={isEditorOpen} toggleModal={toggleEditor} />
            </div>
            <div
                className="
                grid
                animate-slideIn auto-cols-auto grid-cols-1 gap-2 
                p-5 
                sm:grid-cols-2 lg:grid-cols-3 lg:gap-3
                lg:p-8 xl:grid-cols-4 xl:gap-5
                xl:p-10
                "
            >
                {cards}
            </div>
            <RoleModal
                isOpen={isRoleCardModalOpen}
                role={selectedRole}
                isTemplate={true}
                toggleModal={toggleRoleCardModal}
                handleClickConfirm={handleClickConfirm}
            />
        </div>
    );
};
export default RoleLibraryPage;

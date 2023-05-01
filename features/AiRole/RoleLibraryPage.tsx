import { useState, useMemo, useEffect } from 'react';

import MiniSearch, { SearchResult } from 'minisearch';
import { useRouter } from 'next/router';
import { HiPlus } from 'react-icons/hi2';

import Button from '@/components/Button';
import { SystemPrompt } from '@/types';
import { createNewChat } from '@/utils/chats';

import RoleCard from './RoleCard';
import RoleEditor from './RoleEditor';
import RoleModal from './RoleModal';
import { getRandomColor } from './utils/colors';
import rolesList from './utils/roleLibarary.json';

const RoleLibraryPage = () => {
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [isRoleCardModalOpen, setIsRoleCardModalOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState<SystemPrompt>();
    const [selectedRoleColor, setSelectedRoleColor] = useState('');
    const router = useRouter();

    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState(rolesList);
    
    // minisearch
    const miniSearch = useMemo(() => {
        const search = new MiniSearch({
            fields: ['role'],
            storeFields: ['role', 'prompt'],
        });
        search.addAll(rolesList);
        return search;
    }, []);

    useEffect(() => {
        const matchedIdList = miniSearch.search(searchInput, { prefix: true, fuzzy: 0.2 }).map((match) => match.id);
        if (matchedIdList.length !== 0) {
            setSearchResults(rolesList.filter((role) => matchedIdList.includes(role.id)));
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
        <div className='h-full w-full overflow-y-scroll'>
            <div className='flex justify-center gap-5 my-5'>
                <input
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder='Search AI Role Library'
                    className='border border-slate-300 rounded-lg overflow-hidden p-2'
                />
                <Button text={'Add Role'} icon={HiPlus} onClick={toggleEditor} />
                <RoleEditor isOpen={isEditorOpen} toggleModal={toggleEditor} />
            </div>
            <div
                className='
                role-card-lib
                debug-2
                animate-slideIn
                grid grid-cols-1 gap-2 p-5 
                sm:grid-cols-2 
                lg:grid-cols-3 lg:gap-3 lg:p-8
                xl:grid-cols-4 xl:gap-5 xl:p-10
                auto-cols-auto
                '
            >
                {cards}
            </div>
            <RoleModal
                isOpen={isRoleCardModalOpen}
                role={selectedRole}
                bgColor={selectedRoleColor}
                toggleModal={toggleRoleCardModal}
                handleClickConfirm={handleClickConfirm}
            />
        </div>
    );
};
export default RoleLibraryPage;

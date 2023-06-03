import Tooltip from '@/components/Tooltip';
import MiniSearch from 'minisearch';
import { useEffect, useMemo, useState } from 'react';
import { HiPlus } from 'react-icons/hi2';

import Button from '@/components/Button';
import { Input } from '@/components/InputField';

import RoleCard from './RoleCard';
import RoleEditor from './RoleEditor';
import rolesList from './utils/roleLibarary.json';
const RoleLibraryPage = () => {
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState(rolesList);

    // minisearch
    const miniSearch = useMemo(() => {
        const search = new MiniSearch({
            fields: ['roleName'],
            storeFields: ['roleName', 'prompt'],
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

    const cards = searchResults.map((role, index) => {
        return <RoleCard key={index} role={role} bgColor={`bg-gray-500 dark:bg-gray-700`} />;
    });
    return (
        <div className="flex h-full w-full flex-col py-4">
            <div className="flex w-full items-center justify-center gap-5 px-10">
                <Input
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Search Library"
                    showborder
                    styles="max-w-md h-full"
                />
                <Button
                    text={'Create Role'}
                    Icon={HiPlus}
                    onClick={toggleEditor}
                    border={true}
                    btnSize="md"
                    tooltipSelector="create-role-library"
                />
                <Tooltip
                    anchorSelect=".create-role-library"
                    content="Create a new role & add to your role list"
                    place="bottom"
                />
            </div>
            <p className="my-5 self-center">
                From &nbsp;
                <a
                    style={{ textDecoration: 'underline' }}
                    rel="noreferrer"
                    target="_blank"
                    href="https://github.com/f/awesome-chatgpt-prompts#-awesome-chatgpt-prompts"
                >
                    🧠 Awesome ChatGPT Prompts
                </a>
            </p>
            <div
                className="grid auto-cols-auto grid-cols-2 gap-2 overflow-y-scroll 
                p-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-3 lg:p-8 xl:grid-cols-4 xl:gap-5 xl:p-10"
            >
                {cards}
            </div>

            {isEditorOpen ? <RoleEditor isOpen={isEditorOpen} toggleModal={toggleEditor} /> : null}
        </div>
    );
};
export default RoleLibraryPage;

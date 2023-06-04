import { useState } from 'react';

import { HiOutlineXMark } from 'react-icons/hi2';

import Button from '@/components/Button';
import { Input, Textarea } from '@/components/InputField';
import ModalWrapper from '@/components/Modal';
import { useKeyPress } from '@/hooks/useKeyPress';
import { Role } from '@/types';
import { addOrEditRole } from '@/utils/roles';

interface Props {
    isOpen: boolean;
    toggleModal: () => void;
    role?: Role;
}
const RoleEditor = (props: Props) => {
    const [title, setTitle] = useState<string>(props.role ? props.role.roleName : '');
    const [prompt, setPrompt] = useState<string>(props.role ? props.role.prompt : '');
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };
    const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPrompt(e.target.value);
    };

    const handleClickSave = () => {
        addOrEditRole(prompt, title, props.role);
        setTitle('');
        setPrompt('');
        props.toggleModal();
    };
    const handleClickClose = () => {
        setTitle('');
        setPrompt('');
        props.toggleModal();
    };
    useKeyPress(handleClickClose, ['Escape']);

    return (
        <ModalWrapper isOpen={props.isOpen} toggleModal={props.toggleModal}>
            <div
                onClick={(e) => e.stopPropagation()} // prevent modal from closing
                className="border-color flex  max-h-full min-h-[20rem]  w-full max-w-lg flex-col space-y-3 overflow-hidden rounded-xl border bg-gray-base p-6 text-left shadow-xl dark:bg-gray-inverted"
            >
                <div className="mb-5 flex items-center justify-between">
                    <span className="text-2xl text-gray-500 dark:text-gray-400">
                        {props.role ? 'Edit Role' : 'Add Role'}
                    </span>
                    <Button
                        btnSize="lg"
                        Icon={HiOutlineXMark}
                        onClick={handleClickClose}
                        shadow={true}
                    />
                </div>
                <form onSubmit={handleClickSave}>
                    <div className="mb-5 flex flex-col">
                        <div className="mb-5 h-20 w-full">
                            <label className="text-subtitle">Name</label>
                            <Input
                                value={title}
                                onChange={handleTitleChange}
                                required={true}
                                type="text"
                                showborder={true}
                                styles="mt-2"
                            />
                        </div>
                        <div>
                            <span className="text-subtitle">Prompt</span>
                            <Textarea
                                required={true}
                                value={prompt}
                                onChange={handlePromptChange}
                                showborder={true}
                                rows={8}
                                styles="mt-2"
                            />
                        </div>
                    </div>
                    <Button btnSize="lg" type={'submit'} border={true} text="Save" />
                </form>
            </div>
        </ModalWrapper>
    );
};
export default RoleEditor;

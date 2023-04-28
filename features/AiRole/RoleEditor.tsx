import ModalWrapper from '@/components/Modal';
import Button from '@/components/Button';
import { useState } from 'react';
import { SystemPrompt } from '@/types';
import { editRole } from '@/utils/roles';

interface Props {
    isOpen: boolean;
    toggleModal: () => void;
    systemPrompt?: SystemPrompt;
}
const RoleEditor = (props: Props) => {
    const [title, setTitle] = useState('');
    const [prompt, setPrompt] = useState('');
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };
    const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPrompt(e.target.value);
    };

    const handleClickSave = () => {
        editRole(prompt, title);
        props.toggleModal();
    };

    return (
        <ModalWrapper isOpen={props.isOpen} toggleModal={props.toggleModal}>
            <div
                onClick={(e) => e.stopPropagation()} // prevent modal from closing
                className='flex flex-col space-y-4 absolute w-full max-w-lg rounded-xl p-6 overflow-hidden text-left shadow-xl bg-white'
            >
                <div>
                    <p className='text-slate-800 text-xl'>AI Assistant Role</p>
                </div>
                <p>Title</p>
                <input
                    value={title}
                    onChange={handleTitleChange}
                    className='border border-slate-300  focus:outline-none focus-visible:ring-1  rounded-lg overflow-hidden p-2'
                />
                <p>Prompt Insturction</p>
                <textarea
                    value={prompt}
                    onChange={handlePromptChange}
                    className='border border-slate-300  focus:outline-none focus-visible:ring-1 rounded-lg overflow-hidden p-2'
                />
                <Button text={'Save'} onClick={handleClickSave} className='w-20 bg-blue-800' />
            </div>
        </ModalWrapper>
    );
};
export default RoleEditor;

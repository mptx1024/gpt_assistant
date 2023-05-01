import { useState } from 'react';

import { HiOutlineXMark } from 'react-icons/hi2';

import Button from '@/components/Button';
import ModalWrapper from '@/components/Modal';
import { SystemPrompt } from '@/types';
import { addOrEditRole } from '@/utils/roles';

interface Props {
    isOpen: boolean;
    toggleModal: () => void;
    role?: SystemPrompt;
}
const RoleEditor = (props: Props) => {
    const [title, setTitle] = useState<string>(props.role ? props.role.role : '');
    const [prompt, setPrompt] = useState<string>(props.role ? props.role.prompt : '');
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };
    const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPrompt(e.target.value);
    };

    const handleClickSave = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addOrEditRole(prompt, title, props.role);
        setTitle('');
        setPrompt('');
        props.toggleModal();
    };

    return (
        <ModalWrapper isOpen={props.isOpen} toggleModal={props.toggleModal}>
            <div
                onClick={(e) => e.stopPropagation()} // prevent modal from closing
                className='flex flex-col space-y-4 absolute w-full max-w-lg rounded-xl p-6 overflow-hidden text-left shadow-xl bg-white'
            >
                <div className=''>
                    <Button icon={HiOutlineXMark} onClick={props.toggleModal} className='mr-0 ml-auto' />
                </div>
                <div>
                    <p className='text-slate-800 text-xl'>Assistant Role</p>
                </div>
                <form onSubmit={(e) => handleClickSave(e)}>
                    <div>
                        <label className='text-gray-700 text-base'>Title</label>
                        <input
                            required
                            type='text'
                            placeholder=''
                            value={title}
                            onChange={handleTitleChange}
                            className='w-full p-2 my-3 rounded-lg border-slate-300 focus-visible:ring-1 overflow-hidden'
                        />
                        <label className='text-gray-700 text-base'>Prompt Insturction</label>

                        <textarea
                            required
                            value={prompt}
                            placeholder=''
                            onChange={handlePromptChange}
                            className='w-full p-2 my-3 rounded-lg border-slate-300  focus-visible:ring-1 overflow-hidden'
                        />
                    </div>
                    {/* <button type='submit'>save</button> */}
                    <Button type={'submit'} text={'Save'} className='w-20 bg-blue-800' />
                </form>
            </div>
        </ModalWrapper>
    );
};
export default RoleEditor;

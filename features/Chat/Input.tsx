import React, { useEffect, useRef } from 'react';

import { FiSend } from 'react-icons/fi';
import { HiArrowPath, HiOutlineKey, HiOutlineStopCircle, HiShare } from 'react-icons/hi2';

import Button from '@/components/Button';

import useChat from './hooks/useChat';
type Props = {
    chatId: string;
};

export default React.memo(function Input({ chatId }: Props) {
    const {
        handleClickSubmit,
        handleClickRegenerate,
        setStopGenerating,
        userInput,
        setUserInput,
        apiKey,
        loading,
    } = useChat({
        chatId: chatId,
    });
    // const isLoading = useAppSelector((state) => state.messages.loading.status);

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUserInput(event.target.value);
    };

    // const handleSubmit = async () => {
    //     generateReply(userInput);
    //     setUserInput('');
    // };

    const handleStopGenerating = () => {
        setStopGenerating();
    };
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleClickSubmit(e);
        }
    };

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'inherit';
            // const scrollHeight = textareaRef.current.scrollHeight;
            // textareaRef.current.style.height = scrollHeight + "px";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [userInput]);

    if (!apiKey) {
        return (
            <label className="btn btn-primary my-10 gap-2 capitalize" htmlFor="setting-modal">
                <HiOutlineKey size="1rem" />
                Enter Your openAI API Key to Start
            </label>
        );
    }

    return (
        <div className="mb-4 flex w-10/12 max-w-3xl flex-grow flex-col lg:w-9/12">
            <div className="my-2 flex justify-center gap-2">
                {loading ? (
                    <Button
                        onClick={handleStopGenerating}
                        Icon={HiOutlineStopCircle}
                        size="sm"
                        text={'Stop Generating'}
                        // shadow={true}
                        border={true}
                        btnStyles="w-fit h-fit !py-[0.5rem] "
                    />
                ) : (
                    <Button
                        onClick={handleClickRegenerate}
                        Icon={HiArrowPath}
                        size="sm"
                        text={'Regenerate'}
                        // shadow={true}
                        border={true}
                        btnStyles="w-fit h-fit !py-[0.5rem]"
                    />
                )}
                <Button
                    // onClick=
                    Icon={HiShare}
                    size="sm"
                    text={'Share'}
                    shadow={true}
                    border={true}
                    btnStyles="w-fit h-fit !py-[0.5rem] bg-light-bg dark:bg-dark-bg"
                />
            </div>
            <div className="focus-within:border-1 bg-light-bg dark:bg-dark-bg flex min-h-[5rem] w-full items-center rounded-md border border-slate-300 shadow-sm focus-within:border-cyan-600">
                <textarea
                    ref={textareaRef}
                    value={userInput}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    className="m-0 max-h-[20rem] w-full resize-none self-stretch bg-transparent px-2 py-2 outline-none"
                />
                <Button
                    onClick={handleClickSubmit}
                    disabled={!userInput}
                    Icon={FiSend}
                    size="md"
                    shadow={true}
                    btnStyles="mx-3"
                />
            </div>
        </div>
    );
});

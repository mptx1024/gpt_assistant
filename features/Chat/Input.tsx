import { FiSend } from 'react-icons/fi';
import { HiArrowPath, HiOutlineKey, HiOutlineStopCircle, HiShare } from 'react-icons/hi2';
import ThreeDotsLoader from '@/components/icons/threeDotsLoader.svg';
import Button from '@/components/Button';

import useChat from './hooks/useChat';
type Props = {
    chatId: string;
};

export default function Input({ chatId }: Props) {
    const {
        apiKey,
        userInput,
        loading,
        textareaRef,
        hasMessages,
        handleClickSubmit,
        handleClickRegenerate,
        handleInputChange,
        handleClickStopGenerating,
        handleKeyDown,
    } = useChat({ chatId });
    // console.log(`in Input: current chat ID: ${chatId}`);

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
                        onClick={handleClickStopGenerating}
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
                        disabled={!hasMessages}
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
                    border={true}
                    btnStyles="w-fit h-fit !py-[0.5rem] bg-light-bg dark:bg-dark-bg"
                />
            </div>
            <div className="debug-1 px-2 flex min-h-[5rem] w-full items-center rounded-md shadow-sm ring-1 ring-colorPrimary focus-within:ring-[2px] focus-within:ring-colorPrimary">
                <textarea
                    ref={textareaRef}
                    value={userInput}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    className="max-h-[20rem] w-full resize-none self-stretch bg-transparent px-2 py-2 outline-none"
                />
                {loading ? (
                    <ThreeDotsLoader className="dark:fill-gray-base" />
                ) : (
                    <Button
                        onClick={handleClickSubmit}
                        disabled={!userInput}
                        Icon={FiSend}
                        size="md"
                        shadow={true}
                        btnStyles="mx-3"
                    />
                )}
            </div>
        </div>
    );
}

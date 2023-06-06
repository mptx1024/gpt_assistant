import Button from '@/components/Button';
import ThreeDotsLoader from '@/components/icons/threeDotsLoader.svg';
import clsx from 'clsx';
import { FiImage, FiSend } from 'react-icons/fi';
import { HiArrowPath, HiOutlineKey, HiOutlineStopCircle } from 'react-icons/hi2';
import { TbPdf } from 'react-icons/tb';
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
        handleClickGetImage,
        handleClickGetPdf,
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
        <div className="mb-4 flex w-10/12  max-w-[35rem] flex-col">
            <div className="my-2 flex justify-center gap-2">
                {loading ? (
                    <Button
                        onClick={handleClickStopGenerating}
                        Icon={HiOutlineStopCircle}
                        btnSize="sm"
                        text={'Stop Generating'}
                        border={true}
                        btnStyles="w-fit h-fit !py-[0.5rem] "
                    />
                ) : (
                    <Button
                        onClick={handleClickRegenerate}
                        disabled={!hasMessages}
                        Icon={HiArrowPath}
                        btnSize="sm"
                        // text={'Regenerate'}
                        border={true}
                        btnStyles="!py-[0.5rem]"
                    />
                )}
                <Button
                    onClick={handleClickGetPdf}
                    Icon={TbPdf}
                    btnSize="sm"
                    border={true}
                    btnStyles="!py-[0.2rem] !px-[0.5rem]"
                />{' '}
                <Button
                    onClick={handleClickGetImage}
                    Icon={FiImage}
                    btnSize="sm"
                    border={true}
                    btnStyles="!py-[0.2rem] !px-[0.5rem]"
                />
            </div>
            <div
                className={clsx(
                    'flex min-h-[5rem] w-full items-center rounded-md px-2 shadow-sm',
                    'ring-1 ring-colorPrimary focus-within:ring-2 dark:ring-white/20'
                )}
            >
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
                        btnSize="md"
                        shadow={true}
                        btnStyles="mx-3"
                    />
                )}
            </div>
        </div>
    );
}

import clsx from 'clsx';
import { FiImage, FiSend } from 'react-icons/fi';
import { HiArrowPath, HiOutlineKey, HiOutlineStopCircle } from 'react-icons/hi2';
import { TbPdf } from 'react-icons/tb';

import Button from '@/components/Button';
import ThreeDotsLoader from '@/components/icons/threeDotsLoader.svg';
import InfoBar from '@/components/InfoBar';

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
        toggleSettingModal,
    } = useChat({ chatId });

    return (
        <div className="mx-3 mb-4 flex w-[23rem] flex-col sm:w-[30rem] md:w-[30rem] lg:w-[33rem]">
            {!apiKey && (
                <div className="my-5 flex flex-col items-center justify-center gap-3">
                    <InfoBar>
                        <Button
                            Icon={HiOutlineKey}
                            btnSize="md"
                            text="Enter Your openAI API Key to Start"
                            btnStyles="h-5"
                            iconThemeColor={false}
                            onClick={toggleSettingModal}
                        />
                    </InfoBar>
                    <p className="text-sm">
                        You can obtain an API key from &nbsp;
                        <a
                            className="underline"
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://platform.openai.com/account/api-keys"
                        >
                            OpenAI/account/api-keys
                        </a>
                    </p>
                </div>
            )}
            <div className="my-2 flex justify-center gap-2">
                {loading ? (
                    <Button
                        onClick={handleClickStopGenerating}
                        Icon={HiOutlineStopCircle}
                        btnSize="sm"
                        text={'Stop Generating'}
                        border={true}
                        btnStyles="w-fit h-fit !py-[0.5rem]"
                    />
                ) : (
                    <Button
                        onClick={handleClickRegenerate}
                        Icon={HiArrowPath}
                        btnSize="sm"
                        border={true}
                        btnStyles=""
                        tooltipSelector="tooltip"
                        data-tooltip-content="Regenerate last reply"
                    />
                )}
                <Button
                    onClick={handleClickGetPdf}
                    Icon={TbPdf}
                    btnSize="sm"
                    border={true}
                    btnStyles=""
                    tooltipSelector="tooltip"
                    data-tooltip-content="Download PDF of current chat"
                />{' '}
                <Button
                    onClick={handleClickGetImage}
                    Icon={FiImage}
                    btnSize="sm"
                    border={true}
                    btnStyles=""
                    tooltipSelector="tooltip"
                    data-tooltip-content="Download image of current chat"
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

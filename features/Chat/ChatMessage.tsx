import { Avatar } from '@/components/Avatar';
import Button from '@/components/Button';
import { Textarea } from '@/components/InputField';
import ThreeDotsLoader from '@/components/icons/threeDotsLoader.svg';
import clsx from 'clsx';
import { HiOutlineClipboard, HiPencilSquare } from 'react-icons/hi2';
import { TbClipboardCheck } from 'react-icons/tb';
import Markdown from './Markdown';
import { useMessage } from './hooks/useMessage';
interface Props {
    messageId: string;
    chatId: string;
}

export default function ChatMessage({ messageId }: Props) {
    const {
        message,
        userInput,
        isCopied,
        isEditing,
        chatModelParam,
        handleClickCopy,
        handleClickEdit,
        handleClickSaveSubmit,
        handleKeyDown,
        handleClickCancel,
        handleInputChange,
    } = useMessage({
        messageId,
    });

    if (!message) {
        return null;
    }
    const messageContainerClasses = clsx('group flex animate-slideInFromBottom justify-center bg-gray-base dark:bg-gray-inverted', {
        'brightness-[0.95] dark:brightness-[1.2]':
            message.role === 'user',
    });

    return (
        <div className={messageContainerClasses}>
            <div className=" md:w-2xl lg:w-2xl xl:w-3xl relative flex w-[50rem] justify-center gap-3 overflow-hidden px-2 pb-10 pt-5 md:py-6 lg:px-0">
                <div className="flex w-[2rem] flex-col text-base">
                    {message.role === 'user' ? <Avatar /> : <Avatar modelPrams={chatModelParam} />}
                </div>
                {message.content ? (
                    <div className=" relative flex min-w-0 flex-1 flex-col gap-1 sm:w-[30rem] md:w-[40rem] md:gap-3">
                        {!isEditing ? (
                            <Markdown message={message} />
                        ) : (
                            <div className="">
                                <Textarea
                                    value={userInput}
                                    onChange={handleInputChange}
                                    onKeyDown={handleKeyDown}
                                />
                                <div className="mt-1 flex h-8 justify-end gap-2">
                                    <Button
                                        onClick={handleClickSaveSubmit}
                                        btnSize="sm"
                                        text="Save & Submit"
                                        border={true}
                                    />

                                    <Button
                                        onClick={handleClickCancel}
                                        text="Cancel"
                                        border={true}
                                        btnSize="sm"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <ThreeDotsLoader className="fill-gray-inverted dark:fill-gray-base" />
                )}

                <div
                    id="chat-message-btn-group"
                    className={clsx(
                        'flex w-[3rem] justify-end self-start',
                        'absolute bottom-0 right-2 md:static'
                    )}
                >
                    {!isEditing && (
                        <div className="flex transition-all duration-200 md:translate-x-2 md:opacity-0 md:group-hover:translate-x-0 md:group-hover:opacity-100">
                            {!isCopied ? (
                                <Button
                                    Icon={HiOutlineClipboard}
                                    onClick={handleClickCopy}
                                    btnSize="md"
                                    iconEffect={true}
                                    iconStyles="!text-neutral-500"
                                />
                            ) : (
                                <Button
                                    Icon={TbClipboardCheck}
                                    btnSize="md"
                                    iconStyles="!text-green-700"
                                />
                                // <TbClipboardCheck className="h-5 w-5 text-base text-green-500" />
                            )}
                            {message.role === 'user' && (
                                <Button
                                    Icon={HiPencilSquare}
                                    onClick={handleClickEdit}
                                    btnSize="md"
                                    iconEffect={true}
                                    iconStyles="!text-neutral-500"
                                />
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

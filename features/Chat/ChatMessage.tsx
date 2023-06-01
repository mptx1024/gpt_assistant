import { Avatar } from '@/components/Avatar';
import Button from '@/components/Button';
import { Textarea } from '@/components/InputField';
import ThreeDotsLoader from '@/components/icons/threeDotsLoader.svg';
import clsx from 'clsx';
import { HiOutlineClipboard, HiPencilSquare } from 'react-icons/hi2';
import { TbClipboardCheck } from 'react-icons/tb';
import Markdown from './Markdown';
import { useMessage } from './hooks/useMessage';
import Loading from '@/components/Loading';
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
    const messageContainerClasses = clsx('group animate-slideInFromBottom', {
        'bg-gray-base brightness-[0.97] dark:bg-gray-inverted dark:brightness-[1.15]':
            message.role === 'user',
    });

    return (
        <div className={messageContainerClasses}>
            <div
                className="m-auto flex gap-3 p-4 text-base
            md:max-w-2xl md:gap-6 md:py-6 lg:max-w-2xl lg:px-0 xl:max-w-3xl
            "
            >
                <div className="flex w-8 flex-shrink-0 flex-col items-end text-base">
                    {message.role === 'user' ? <Avatar /> : <Avatar modelPrams={chatModelParam} />}
                </div> 

                {
                    message.content ? (
                        <div className="prose relative flex w-[calc(100%-50px)] flex-col gap-1 dark:prose-invert md:w-[calc(100%-115px)] md:gap-3">
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
                                        size="sm"
                                        text="Save & Submit"
                                        shadow={true}
                                        border={true}
                                    />
    
                                    <Button
                                        onClick={handleClickCancel}
                                        text="Cancel"
                                        shadow={true}
                                        border={true}
                                        size="sm"
                                    />
                                </div>
                            </div>
                        )}
                        <div className="mt-2 flex justify-center self-end md:absolute md:right-0 md:top-0 md:mt-0 md:translate-x-full md:gap-3 md:self-center md:pl-2">
                            {!isEditing && (
                                <div className="flex transition-all duration-200 md:translate-x-2 md:opacity-0 md:group-hover:translate-x-0 md:group-hover:opacity-100">
                                    {!isCopied ? (
                                        <Button
                                            Icon={HiOutlineClipboard}
                                            onClick={handleClickCopy}
                                            size="md"
                                            iconEffect={true}
                                        />
                                    ) : (
                                        <Button
                                            Icon={TbClipboardCheck}
                                            size="md"
                                            iconStyles="!text-green-700"
                                        />
                                        // <TbClipboardCheck className="h-5 w-5 text-base text-green-500" />
                                    )}
                                    {message.role === 'user' && (
                                        <Button
                                            Icon={HiPencilSquare}
                                            onClick={handleClickEdit}
                                            size="md"
                                            iconEffect={true}
                                        />
                                    )}
                                </div>
                            )}
                        </div>
                    </div> 
                    ): (   
                        <ThreeDotsLoader className='dark:fill-gray-base fill-gray-inverted' />
                    )
                }

            </div>
        </div>
    );
}

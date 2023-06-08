import { useState } from 'react';

import { HiCheck, HiOutlineClipboard } from 'react-icons/hi2';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

import Button from '@/components/Button';
import { Message } from '@/types';
import { copyToClipboard } from '@/utils/chat';
interface Props {
    message: Message;
}

const Markdown = ({ message }: Props) => {
    if (message.role === 'user') {
        return (
            <div className="prose prose-neutral flex min-h-[20px] flex-col items-start gap-4 whitespace-pre-wrap break-words dark:prose-invert">
                {message.content}
            </div>
        );
    }

    return (
        <ReactMarkdown
            className="prose prose-neutral break-words dark:prose-invert"
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeKatex]}
            components={{
                p: 'div',
                code({ node, inline, className, children, style, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    const code = String(children).replace(/\n$/, '');
                    // console.log(`in Markdown -> code: ${children}`);
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const [isCopied, setIsCopied] = useState(false);

                    const handleClickCopy = async () => {
                        await copyToClipboard(code, setIsCopied);
                    };
                    return !inline ? (
                        <div id="code-block" className="">
                            <div
                                id="code-header"
                                className="flex h-4 items-center justify-between text-sm"
                            >
                                <span>{(match && match[1]) || 'text'}</span>
                                <Button
                                    btnSize="sm"
                                    Icon={isCopied ? HiCheck : HiOutlineClipboard}
                                    text={isCopied ? 'Copied' : 'Copy Code'}
                                    btnStyles="!px-0 !py-2 !gap-1 !text-[0.7rem]"
                                    onClick={handleClickCopy}
                                />
                            </div>
                            <SyntaxHighlighter
                                style={oneDark}
                                customStyle={
                                    {
                                        // border: '1px solid #ccc',
                                        // padding: 0,
                                        // overflowWrap: 'break-word',
                                    }
                                }
                                language={(match && match[1]) || 'text'}
                                {...props}
                                // eslint-disable-next-line react/no-children-prop
                                children={code}
                            />
                        </div>
                    ) : (
                        <code className={className} {...props}>
                            {children}
                        </code>
                    );
                },
            }}
        >
            {message.content}
        </ReactMarkdown>
    );
};

export default Markdown;

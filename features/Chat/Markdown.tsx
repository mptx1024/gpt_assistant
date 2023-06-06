import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

import { Message } from '@/types';

interface Props {
    message: Message;
}

const Markdown = ({ message }: Props) => {
    if (message.role === 'user') {
        return (
            <div className="flex min-h-[20px] flex-col items-start gap-4 whitespace-pre-wrap break-words">
                {message.content}
            </div>
        );
    }
    return (
        <ReactMarkdown
            className="prose break-words dark:prose-invert"
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeKatex]}
            components={{
                p: 'div',
                code({ node, inline, className, children, style, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    console.log(`in Markdown -> className: ${className}; Match: ${match}`);

                    // if code is not inline and has a language, use CodeBlock
                    return !inline ? (
                        <div id="code-block" className="">
                            <div
                                id="code-header"
                                className="flex h-10 items-center justify-between pr-5 text-sm "
                            >
                                <span>{(match && match[1]) || 'text'}</span>
                                <button className="hover:bg-slate-700">
                                    {/* icon */}
                                    <span>Copy</span>
                                </button>
                            </div>
                            <SyntaxHighlighter
                                style={oneDark}
                                customStyle={{
                                    margin: 0,
                                    // padding: 0,
                                    // overflowWrap: 'break-word',
                                }}
                                language={(match && match[1]) || 'text'}
                                // PreTag='div'
                                {...props}
                                children={String(children).replace(/\n$/, '')}
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

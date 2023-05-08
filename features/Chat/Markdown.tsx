import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import { Message } from "@/types";

interface Props {
    message: Message;
}

const Markdown = ({ message }: Props) => {
    return (
        // <div className='debug-2 '>
        <ReactMarkdown
            // className="debug-2 prose relative flex w-[calc(100%-50px)] flex-col gap-1 dark:prose-invert md:gap-3 lg:w-[calc(100%-115px)] [&>pre]:m-0 [&>pre]:p-0"
            className="flex flex-grow flex-col"
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeKatex]}
            components={{
                p: "span",
                code({ node, inline, className, children, style, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");

                    // if code is not inline and has a language, use CodeBlock
                    return !inline ? (
                        <div id="code-block" className="">
                            <div
                                id="code-header"
                                className="flex h-10 items-center justify-between pr-5 text-sm text-slate-300"
                            >
                                <span>{(match && match[1]) || "text"}</span>
                                <button className="btn btn-ghost btn-sm border-none hover:bg-slate-700">
                                    {/* icon */}
                                    <span>Copy</span>
                                </button>
                            </div>
                            <SyntaxHighlighter
                                style={oneDark}
                                customStyle={{ margin: 0 }}
                                language={(match && match[1]) || "text"}
                                // PreTag='div'
                                {...props}
                                // eslint-disable-next-line react/no-children-prop
                                children={String(children).replace(/\n$/, "")}
                            />
                            {/* {String(children).replace(/\n$/, "")}
                            </SyntaxHighlighter> */}
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
        // </div>
    );
};

export default Markdown;

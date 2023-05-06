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
            // className="debug-1 prose flex-grow [&>pre]:m-0 [&>pre]:p-0"
            className="debug-1 prose flex-grow dark:prose-invert [&>pre]:m-0 [&>pre]:p-0"
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeKatex]}
            components={{
                // p: "span",
                code({ node, inline, className, children, style, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");

                    // if code is not inline and has a language, use CodeBlock
                    return !inline ? (
                        <div id="code-block" className="debug-1">
                            <div
                                id="code-header"
                                className="[&:*]: flex h-10 items-center justify-between px-5 text-sm text-slate-300"
                            >
                                <span>{(match && match[1]) || ""}</span>
                                <button className="btn btn-ghost btn-sm border-none hover:bg-slate-700">
                                    {/* icon */}
                                    <span>Copy</span>
                                </button>
                            </div>
                            <SyntaxHighlighter
                                style={oneDark}
                                customStyle={{ margin: 0 }}
                                language={(match && match[1]) || ""}
                                // PreTag='div'
                                {...props}
                            >
                                {String(children).replace(/\n$/, "")}
                            </SyntaxHighlighter>
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

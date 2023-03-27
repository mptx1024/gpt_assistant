import ReactMarkdown from 'react-markdown';
// import from 'react-markdown/lib/ast-to-react';
import { Message } from '@/types';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import remarkGfm from 'remark-gfm';

interface Props {
    message: string;
}
export default function ChatMessage({ message }: Props) {
    return (
        <div className='debug-1'>
            <ReactMarkdown
                remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
                components={{
                    code({ node, inline, className, children, style, ...props }) {
                        /*
                        /language-(\w+)/: This is a regular expression (regex) pattern. It consists of a string language- followed by a capturing group (\w+). The \w+ inside the capturing group represents one or more word characters (letters, digits, or underscores). In this context, it's used to match the language identifier.
                        .exec(className || ""): The exec() method is called on the regex pattern to search for a match in the provided className string. If className is not defined or is a falsy value (e.g., null or undefined), an empty string ("") will be used as a fallback.
                        When the exec() method is called on the regex pattern with the className string, it returns an array of matches if a match is found, or null if no match is found. If there's a match, the returned array will have the following structure:

                        The first element (at index 0) will contain the entire matched string, e.g., language-javascript.
                        The second element (at index 1) will contain the matched language identifier, which is the part captured by the (\w+) capturing group, e.g., javascript.
                        */
                        const match = /language-(\w+)/.exec(className || '');

                        /*inline: This variable is a boolean, which indicates whether the current code element being rendered is an inline code element or a code block. Inline code elements are typically surrounded by single backticks (`) in Markdown, while code blocks are surrounded by triple backticks (```) or indented by 4 spaces. The inline variable helps you differentiate between these two types of code elements and apply different rendering styles accordingly.

                        match: This variable is an array that results from executing a regular expression (regex) on the className string. The regex /language-(\w+)/ is used to extract the language identifier from the className. In Markdown, when you create a code block, you can specify the programming language for syntax highlighting by adding the language identifier after the opening backticks, e.g., ```javascript. The ReactMarkdown component translates this identifier into a className with the format language-{language}. The match variable is used to extract the language identifier from this className. If there's a match, it means the code block has a specified language, and the match array will have the matched language identifier in its second element (i.e., match[1]). If there's no match, it means the code block doesn't have a specified language, and the match variable will be null.

                        In the custom `code` component, the inline and match variables are used together to determine how the code element should be rendered. If the code element is not inline (i.e., it's a code block) and has a specified language (i.e., match is not null), a CodeBlock component will be used for rendering. Otherwise, a simple code HTML element with the given className will be used.*/

                        // if code is not inline and has a language, use CodeBlock
                        return !inline && match ? (
                            <SyntaxHighlighter style={oneDark} language={match[1]} PreTag='div' {...props}>
                                {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                        ) : (
                            <code className={className} {...props}>
                                {children}
                            </code>
                        );
                    },
                }}
            >
                {message}
            </ReactMarkdown>
        </div>
    );
}

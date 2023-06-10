import { memo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import { Message } from '@/types';
import CodeBlock from './CodeBlock';
interface Props {
    message: Message;
}

const Markdown = memo(({ message }: Props) => {
    if (message.role === 'user') {
        return (
            <div className="prose prose-neutral flex whitespace-pre-wrap dark:prose-invert">
                {message.content}
            </div>
        );
    }
    return (
        <ReactMarkdown
            className="prose prose-neutral break-words dark:prose-invert"
            remarkPlugins={[remarkGfm, remarkMath]}
            // rehypePlugins={[rehypeKatex]}
            components={{
                p: 'div',
                code: CodeBlock,
            }}
        >
            {message.content}
        </ReactMarkdown>
    );
});
Markdown.displayName = 'Markdown';

export default Markdown;

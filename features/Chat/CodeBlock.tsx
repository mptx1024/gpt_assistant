import { useState, memo } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { HiCheck, HiOutlineClipboard } from 'react-icons/hi2';
import { copyToClipboard } from '@/utils/chat';
import Button from '@/components/Button';

interface CodeBlockProps {
    node: any;
    inline?: boolean;
    className?: string;
    children: React.ReactNode;
}

const CodeBlock = memo(({ inline = false, className, children, ...props }: CodeBlockProps) => {

    const [isCopied, setIsCopied] = useState(false);
    const handleClickCopy = async (code: string) => {
        await copyToClipboard(code, setIsCopied);
    };
    const match = /language-(\w+)/.exec(className || '');
    const code = String(children).replace(/\n$/, '');
    // console.log(`in CodeBlock -> code: ${children}`);

    return !inline ? (
        <div id="code-block" className="">
            <div id="code-header" className="flex h-4 items-center justify-between text-sm">
                <span>{(match && match[1]) || 'javascript'}</span>
                <Button
                    btnSize="sm"
                    Icon={isCopied ? HiCheck : HiOutlineClipboard}
                    text={isCopied ? 'Copied' : 'Copy Code'}
                    btnStyles="!px-0 !py-2 !gap-1 !text-[0.7rem]"
                    onClick={() => handleClickCopy(code)}
                />
            </div>
            <SyntaxHighlighter
                style={oneDark}
                language={(match && match[1]) || 'javascript'}
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
});
CodeBlock.displayName = 'CodeBlock';
export default CodeBlock;

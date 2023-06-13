import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="en">
            <Head />
            <body className="bg-gray-base font-normal text-[rem] text-black-base dark:bg-gray-inverted dark:text-black-inverted">
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}

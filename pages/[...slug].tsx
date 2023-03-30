import { useRouter } from 'next/router';
import { Suspense } from 'react';
type Props = {};
export default function CatchAll({}: Props) {
    const router = useRouter();
    console.log('🚀 ~ file: [[...slug]].tsx:7 ~ CatchAll ~ router.query:', router.query);
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        router.push('/chat/2b1757d0-006f-4081-b9cc-f755bd313cf1');
    };
    return (
        <Suspense fallback={null}>
            <>
                <div>catch all : {router.asPath}</div>
                <button onClick={handleClick}>visit test chat page</button>
            </>
        </Suspense>
    );
}

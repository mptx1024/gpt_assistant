import { useRouter } from 'next/router';
import { Suspense } from 'react';
type Props = {};
export default function CatchAll({}: Props) {
    const router = useRouter();
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        router.push('/chat/7f0011e6-f577-4b17-ac60-ad968b5b9404');
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

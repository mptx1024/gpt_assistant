import { useRouter } from 'next/router';
import { Suspense } from 'react';
type Props = {};
export default function CatchAll({}: Props) {
    const router = useRouter();

    return (
        <Suspense fallback={null}>
            <>
                <div>catch all : {router.asPath}</div>
            </>
        </Suspense>
    );
}

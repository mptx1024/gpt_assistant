import { Suspense } from 'react';

import { useRouter } from 'next/router';

export default function CatchAll() {
    const router = useRouter();

    return (
        <Suspense fallback={null}>
            <div>
                <div className="[&_.a-child-class]:text-5xl">
                    <p className="a-child-class">first</p>
                    <p className="a-child-class">second</p>
                    <p className="a-child-class">thrid</p>
                    <p className="a-child-class">forth</p>
                    <div>
                        <p className="a-child-class">nested</p>
                    </div>
                </div>
                catch all : {router.asPath}
            </div>
        </Suspense>
    );
}

import { useRouter } from 'next/router';

export default function CatchAll() {
    const router = useRouter();
    router.push('/role');
    // return null
}

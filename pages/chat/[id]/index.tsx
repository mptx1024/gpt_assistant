import { useRouter } from 'next/router';
import Link from 'next/link';

type Props = {};
export default function ChatPage({}: Props) {
    const router = useRouter();
    const { id } = router.query;

    return <div>Chat: {id}</div>;
}


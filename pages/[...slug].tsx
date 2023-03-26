import { useRouter } from 'next/router';

type Props = {};
export default function CatchAll({}: Props) {
    const router = useRouter();
    console.log('🚀 ~ file: [[...slug]].tsx:7 ~ CatchAll ~ router.query:', router.query);
    return <div>catch all : {router.asPath}</div>;
}

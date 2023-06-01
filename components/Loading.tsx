import Spinner from '@/components/icons/spinner1.svg';

function Loading() {
    return (
        <div className="flex h-full w-full items-center justify-center">
            <Spinner className="dark:fill-gray-base" />
        </div>
    );
}
export default Loading;

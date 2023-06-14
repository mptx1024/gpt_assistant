import Spinner from '@/components/icons/spinner1.svg';

function Loading() {
    return (
        <div className="absolute inset-0 flex items-center justify-center">
            <Spinner className="dark:fill-gray-base" />
        </div>
    );
}
export default Loading;

import { useState } from 'react';

import clsx from 'clsx';

import { clearAlert } from '@/store/alertSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

const Alert = () => {
    const dispatch = useAppDispatch();
    const message = useAppSelector((state) => state.alert.message);
    console.log(`in alert. message: ${message}`);

    const [exiting, setExiting] = useState(false);
    const handleClose = () => {
        dispatch(clearAlert());
    };
    // useEffect(() => {
    //     if (message) {
    //         const animationTimer = setTimeout(() => {
    //             setExiting(true);
    //             const clearTimer = setTimeout(() => {
    //                 dispatch(clearAlert());
    //                 setExiting(false);
    //             }, 200); // time for the exit animation to complete
    //             return () => clearTimeout(clearTimer);
    //         }, 1500);
    //         return () => clearTimeout(timeanimationTimer);
    //     }
    // }, [message, dispatch]);

    if (!message) return null;

    return (
        <div
            role="alert"
            className={clsx(
                'fixed left-0 top-[3vh] z-50 flex w-full animate-alertSlideIn transition-all justify-center',
                { 'animate-alertSlideOut': exiting }
            )}
        >
            <div className="border-color flex max-w-[50vw] items-start gap-4 rounded-2xl border bg-gray-base p-3 dark:bg-gray-inverted">
                <div className="flex-1 ">
                    <span className="text-primary">{message}</span>
                </div>

                <button
                    className="text-gray-500 transition hover:text-gray-600"
                    onClick={handleClose}
                >
                    <span className="sr-only">Dismiss popup</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};
export default Alert;

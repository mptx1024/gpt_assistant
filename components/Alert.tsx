import { useEffect, useState } from 'react';

import clsx from 'clsx';

import { clearAlert } from '@/store/alertSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

const Alert = () => {
    const dispatch = useAppDispatch();
    const message = useAppSelector((state) => state.alert.message);

    const [exiting, setExiting] = useState(false);
    const handleClose = () => {
        dispatch(clearAlert());
    };
    useEffect(() => {
        if (message) {
            const animationTimer = setTimeout(() => {
                setExiting(true);
                const clearTimer = setTimeout(() => {
                    dispatch(clearAlert());
                    setExiting(false);
                }, 100); // time delayed before despatching clear
                return () => clearTimeout(clearTimer);
            }, 1500); // alert duration
            return () => clearTimeout(animationTimer);
        }
    }, [message, dispatch]);

    if (!message) return null;

    return (
        <div
            role="alert"
            className={clsx(
                'fixed left-0 top-[1.5rem] z-50 flex w-full animate-alertSlideIn justify-center transition-all',
                { 'animate-alertSlideOut': exiting }
            )}
        >
            <div className=" left-10 flex max-w-[90vw] items-start gap-4 rounded-2xl  bg-emerald-500 px-6 py-3 text-gray-base dark:bg-emerald-800">
                <div className="flex-1 ">
                    <span className="text-primary">{message}</span>
                </div>

                <button
                    className="text-gray-base"
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

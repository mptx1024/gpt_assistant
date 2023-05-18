import { useEffect, useState } from 'react';

import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/store';
import { clearAlert } from '@/store/alertSlice';

const Alert = () => {
    const dispatch = useDispatch();
    const message = useSelector((state: RootState) => state.alert.message);

    const handleClose = () => {
        dispatch(clearAlert());
    };

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                dispatch(clearAlert());
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [message, dispatch]);

    if (!message) return null;

    return (
        <div
            role="alert"
            className={clsx(
                'fixed left-0 top-[5vh] flex w-full animate-slideInFromTop justify-center'
                // message
                //     ? 'opacity-100 transition-all duration-300 ease-in-out'
                //     : 'opacity-0 transition-all  duration-300 ease-in-out'
            )}
        >
            <div className="border-primary dark:bg-secondary-dark flex max-w-[80vh] items-start gap-4 rounded-2xl bg-gray-base p-3 dark:bg-gray-inverted">
                {/* <span className="text-green-600">
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
                            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </span> */}

                <div className="flex-1">
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

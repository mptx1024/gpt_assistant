import React, { Fragment } from 'react';

import { Transition } from '@headlessui/react';
import { createPortal } from 'react-dom';

const Modal = (props: { children: React.ReactNode; isOpen: boolean; toggleModal: () => void }) => {
    return createPortal(
        // Use the `Transition` component at the root level
        <Transition
            show={props.isOpen}
            as={'div'}
            appear={true}
            onClick={props.toggleModal}
            className="fixed inset-0  backdrop-blur"
        >
            {/* Use one Transition.Child to apply one transition to the backdrop...*/}
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div />
            </Transition.Child>

            {/* ...and another Transition.Child to apply a separate transition
        to the contents.*/}
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-200"
                enterFrom="opacity-0 scale-50"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-100"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <div className="fixed inset-0 flex items-center justify-center text-center">
                    {props.children}
                </div>
            </Transition.Child>
        </Transition>,
        document.body
    );
};
export default Modal;

import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';


const Modal = (props: { children: React.ReactNode; isOpen: boolean; toggleModal: () => void }) => {
    return (
        // Use the `Transition` component at the root level
        <Transition show={props.isOpen} as={'div'} className='fixed' onClick={props.toggleModal}>
            {/* Use one Transition.Child to apply one transition to the backdrop...*/}
            <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
            >
                <div className='fixed inset-0 bg-black/30' />
            </Transition.Child>

            {/* ...and another Transition.Child to apply a separate transition
        to the contents.*/}
            <Transition.Child
                as={Fragment}
                enter='ease-out duration-200'
                enterFrom='opacity-0 scale-50'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-100'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
            >
                <div className='fixed inset-0 flex items-center justify-center text-center'>{props.children}</div>
            </Transition.Child>
        </Transition>
    );
};
export default Modal;

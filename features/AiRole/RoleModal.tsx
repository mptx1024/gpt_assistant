import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

interface Props {
    isOpen: boolean;
    toggleModal: () => void;
}

export default function RoleModal({ isOpen, toggleModal }: Props) {
    return (
        // Use the `Transition` component at the root level
        <Transition show={isOpen} as={Fragment}>
            <Dialog onClose={toggleModal}>
                {/*
        Use one Transition.Child to apply one transition to the backdrop...
      */}
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

                {/*
        ...and another Transition.Child to apply a separate transition
        to the contents.
      */}
                <Transition.Child
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0 scale-50'
                    enterTo='opacity-100 scale-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100 scale-100'
                    leaveTo='opacity-0 scale-95'
                >
                    <div className='fixed inset-0 flex items-center justify-center text-center'>
                        <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                            <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900'>
                                Payment successful
                            </Dialog.Title>
                            <div className='mt-2'>
                                <p className='text-sm text-gray-500'>
                                    Your payment has been successfully submitted. We’ve sent you an email with all of
                                    the details of your order.
                                </p>
                            </div>

                            <div className='mt-4'>
                                <button
                                    type='button'
                                    className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                                    onClick={toggleModal}
                                >
                                    Got it, thanks!
                                </button>
                            </div>
                        </Dialog.Panel>
                    </div>
                </Transition.Child>
            </Dialog>
        </Transition>
    );
}

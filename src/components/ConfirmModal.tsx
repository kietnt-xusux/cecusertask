import React, { Fragment, useState } from 'react';
import { Dialog, Transition, TransitionChild } from '@headlessui/react';
import { CheckIcon, LoadingIcon, XIcon } from './Icon';
import {clsx} from "clsx";

interface ConfirmModalProps {
    open: boolean;
    closeModal: () => void;
    overlay?: string;
    message: string;
    process: () => Promise<any>;
    afterLeave?: () => void;
    beforeLeave?: () => void;
}

export const ConfirmModal = ({open, closeModal, overlay, message, process, afterLeave, beforeLeave}: ConfirmModalProps) => {
    const [loading, setLoading] = useState(false);
    const [processed, setProcessed] = useState(false);

    const submit = () => {
        setLoading(true);
        process().then(() => {
            setProcessed(true);
            closeModal();
        }).catch(() => {}).then(() => setLoading(false));
    };
    const afterLeaveHandle = () => {
        processed && afterLeave && afterLeave();
    };
    const beforeLeaveHandle = () => {
        processed && beforeLeave && beforeLeave();
    };

    return (
        <Transition
            appear
            show={open}
            as={Fragment}
            beforeLeave={beforeLeaveHandle}
            afterLeave={afterLeaveHandle}
            beforeEnter={() => setProcessed(false)}
        >
            <Dialog as='div' className='fixed inset-0 z-1000 overflow-y-auto' onClose={closeModal}>
                <div className='min-h-screen px-4 text-center'>
                    <div className='fixed inset-0 bg-gray-100/80' />
                    <span className='inline-block h-screen align-middle' aria-hidden='true'>
                        &#8203;
                    </span>
                    <TransitionChild
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0 scale-95'
                        enterTo='opacity-100 scale-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100 scale-100'
                        leaveTo='opacity-0 scale-95'>
                        <div className={clsx(
                            'inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all',
                            'transform bg-white shadow-xl rounded-2xl'
                        )}>
                            <h3 className='text-lg font-medium leading-6 text-gray-900'>確認</h3>
                            <p className='mt-2 text-sm whitespace-pre'>{message}</p>
                            <div className='flex justify-end'>
                                <button
                                    type='button'
                                    onClick={closeModal}
                                    className={clsx(
                                        'inline-flex justify-center px-4 py-2 mt-2 w-28 text-sm font-medium text-gray-900',
                                        'bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none align-top'
                                    )}>
                                    <XIcon className='w-5 h-5 inline-block' />
                                    いいえ
                                </button>
                                <button
                                    type='button'
                                    className={clsx(
                                        'inline-flex justify-center px-4 py-2 mt-2 ml-4 w-28 text-sm font-medium text-white',
                                        'bg-blue-400 border border-transparent rounded-md hover:bg-blue-500 focus:outline-none align-top',
                                    )}
                                    onClick={submit}
                                >
                                    { loading ? <LoadingIcon /> :
                                        <>
                                            <CheckIcon className='w-5 h-5 inline-block' />
                                            はい{''}
                                        </>
                                    }
                                </button>
                            </div>
                        </div>
                    </TransitionChild>
                </div>
            </Dialog>
        </Transition>
    );
};

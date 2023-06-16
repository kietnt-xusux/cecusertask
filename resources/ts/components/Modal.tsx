import {Fragment, useState} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import React from 'react'

interface ModalProps {
    children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined;
    open: boolean,
    closeModal: any,
    overlay?: string
}

export const Modal = ({ children, open, closeModal, overlay}: ModalProps) => {
    return (
        <Transition appear show={open} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-1000 overflow-y-auto"
                onClose={closeModal}
            >
                <div className="min-h-screen px-4 text-center">
                    <Dialog.Overlay className={ overlay ?? "fixed inset-0 bg-gray-200 opacity-75" } />
                    <span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        {children}
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    )
}

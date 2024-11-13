import {Fragment, JSX} from 'react'
import {Dialog, DialogPanel, Transition, TransitionChild} from '@headlessui/react'
import React from 'react'

interface ModalProps {
    children: boolean | JSX.Element | JSX.Element[] | React.ReactPortal | null | undefined,
    open: boolean,
    closeModal: any,
    overlay?: string,
}

export const Modal = ({children, open, closeModal, overlay}: ModalProps) => {
    return (
        <Transition appear show={open} as={Fragment}>
            <Dialog onClose={closeModal} className="fixed inset-0 z-50 transition">
                <div className="fixed inset-0 bg-black/30"/>
                <TransitionChild
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                        <DialogPanel>
                            {children}
                        </DialogPanel>
                    </div>
                </TransitionChild>
            </Dialog>
        </Transition>
    )
}

import React, {Fragment} from "react";
import {Link} from "react-router-dom";
import {Header, Nav, Logo, NavMobile, XIcon} from "@/components";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/helper/type";
import {ToastContainer} from "react-toastify";
import {Dialog, Transition} from "@headlessui/react";
import { systemSlice } from '@/store';

interface LayoutProps {
    children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined | React.ReactNode;
}

const AdminLayout = ({ children }: LayoutProps) => {
    const openMenu = useSelector((state: RootState) => state.system.openMenu);
    const openMenuMobile = useSelector((state: RootState) => state.system.openMobileMenu);
    const dispatch = useDispatch();

    const closeMobileMenu = () => {
        dispatch(systemSlice.actions.setOpenMobileMenu(false))
    }

    return (
        <>
            <ToastContainer hideProgressBar={true} autoClose={5000} />
            <div className="md:flex flex-col md:flex-row md:min-h-screen w-full">
                <div className={`flex flex-col text-gray-700 bg-white flex-shrink-0 transform duration-300 ease-in-out ` + (openMenu ? 'w-52' : 'w-10')}>
                    <div className={`fixed h-screen overflow-hidden transform duration-300 ease-in-out hidden lg:block ` + (openMenu ? 'w-52' : 'w-10')}>
                        <div className="flex-shrink-0 py-4 flex flex-row items-center justify-center bg-blue-500 h-10">
                            <Link to="/" className="text-white font-bold flex overflow-hidden">
                                <span className="flex-shrink-0">ロゴ</span>
                                <span className={`${openMenu ? '': 'hidden'} whitespace-nowrap ml-2`}>タンク</span>
                            </Link>
                        </div>
                        <Nav />
                    </div>
                </div>
                <Transition appear show={openMenuMobile} as={Fragment}>
                    <Dialog
                        as="div"
                        className="fixed inset-0 z-1000 overflow-y-auto"
                        onClose={closeMobileMenu}
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-warmGray-600 opacity-25" />
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 -left-full"
                            enterTo="opacity-100 left-0"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 left-0"
                            leaveTo="opacity-0 -left-full"
                        >
                            <div className="fixed h-screen overflow-hidden w-64">
                                <div className="flex-shrink-0 flex px-4 flex-row items-center justify-between bg-blue-500 h-12">
                                    <Link to="/">
                                        <Logo />
                                    </Link>
                                    <XIcon className="h-5 w-5 text-white" onClick={closeMobileMenu} />
                                </div>
                                <NavMobile />
                            </div>
                        </Transition.Child>
                    </Dialog>
                </Transition>
                <div className="flex flex-col w-full overflow-hidden">
                    <Header />
                    <div className="h-screen-header overflow-auto">
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}
export default AdminLayout;

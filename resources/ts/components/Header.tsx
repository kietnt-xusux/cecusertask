import React, {Fragment, useEffect, useRef, useState} from "react"
import {useDispatch, useSelector} from "react-redux";
import nprogress from "nprogress";
import {Transition} from "@headlessui/react";
import {Link, useNavigate} from "react-router-dom";
import {RootState} from "@/helper/type";
import {ChevronDownIcon, MenuAlt2Icon, MenuIcon, UserIcon} from "@/components/Icon";
import {commonConstants} from "@/constants";
// import {userService} from "@/services";
import { getAdminRoute } from "@/helper/utils";
import systemSlice from '@/store/modules/systemSlice';
import userService from "@/services/modules/userService";
import authSlice from '@/store/modules/authSlice';

export const Header = () => {
    const adminRoute = getAdminRoute();
    const [isOpen, setOpen] = useState(false);
    const dispatch = useDispatch();
    const wrapperRef = useRef<HTMLDivElement>(null);
    const authentication = useSelector((state :RootState) => state.authentication);
    const openMenu = useSelector((state: RootState) => state.system.openMenu);
    const navigate = useNavigate();

    useEffect(() => {
        function handleClickOutside(event: { target: any; }) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);
    useEffect(() => {
        dispatch(systemSlice.actions.setOpenMobileMenu(false))
    }, [])

    const logout = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        userService.logout().then(() => {
            dispatch(authSlice.actions.logoutSuccess())
            navigate(`/${adminRoute}/login`);
        });
        nprogress.start();
    }

    const toggleMenu = () => {
        dispatch(systemSlice.actions.setOpenMenu(!openMenu))
    }

    const openMobileMenu = () => {
        dispatch(systemSlice.actions.setOpenMobileMenu(true))
    }

    return (
        <nav className="bg-white shadow-md">
            <div className="pl-2 pr-2 lg:pr-8">
                <div className="flex items-center justify-between h-10">
                    <div className="flex">
                        <button className="px-1 py-1 cursor-pointer focus:outline-none hidden lg:block" onClick={toggleMenu}>
                        { openMenu ?
                            <MenuAlt2Icon className="w-5 h-5 text-blue-500" /> :
                            <MenuIcon className="w-5 h-5 text-blue-500" />
                        }
                        </button>
                        <button className="px-1 py-1 cursor-pointer focus:outline-none block lg:hidden" onClick={openMobileMenu}>
                            <MenuIcon className="w-5 h-5 text-blue-500" />
                        </button>
                    </div>
                    <div>
                        <div className="flex items-center">
                            <div className="relative" ref={wrapperRef}>
                                <button type="button" onClick={() => setOpen(!isOpen)}
                                        className="text-gray-400 p-1 max-w-xs flex items-center text-sm focus:outline-none pr-6 relative"
                                        id="user-menu" aria-expanded="false" aria-haspopup="true">
                                    { authentication.user && authentication.user.detail?.picture ?
                                        <span className="inline-block h-8 w-8 rounded-full overflow-hidden bg-cover bg-center"
                                              style={{ backgroundImage: `url(${authentication.user.detail.picture})`}}>
                                        </span> :
                                        <span className="inline-block h-8 w-8 rounded-full overflow-hidden bg-gray-100">
                                            <UserIcon className="h-full w-full text-gray-300" />
                                        </span>
                                    }
                                    <ChevronDownIcon />
                                </button>
                                <Transition
                                    show={isOpen}
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    enter="transition ease-out duration-100"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                    leave="transition ease-in duration-75"
                                    as={Fragment}
                                >
                                    <div className={"origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 " +
                                        "bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-100"}
                                         role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                                        <Link to={`/${adminRoute}/profile`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">マイページ</Link>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                           role="menuitem" onClick={logout}>ログアウト</a>
                                    </div>
                                </Transition>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

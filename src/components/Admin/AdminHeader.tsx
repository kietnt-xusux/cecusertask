'use client';

import Link from "next/link";
import {ChevronDownIcon, UserIcon} from "@/components";
import {useEffect, useRef, useState} from "react";
import {useStore} from "@/stores/auth.storage";
import {Transition} from "@headlessui/react";
import {userService} from "@/services";
import {useRouter} from "next/navigation";

export const AdminHeader = () => {
    const [isOpen, setOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const auth = useStore(state => state);
    const router = useRouter();

    useEffect(() => {
        function handleClickOutside(event: { target: any }) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [wrapperRef]);

    const logout = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        userService.logout().then(() => {
            auth.logout();
            router.replace('/admin/login');
        });
    };

    return <div className='pr-2 lg:pr-8 bg-white shadow-md'>
        <div className='flex justify-end h-12'>
            <div className='flex items-center'>
                <div className='relative' ref={wrapperRef}>
                    <div className='flex'>
                        <p className='flex items-center pr-2 text-blue-500'>{auth?.detail?.name}</p>
                        <button
                            type='button'
                            onClick={() => setOpen(!isOpen)}
                            className='text-gray-400 p-1 max-w-xs flex items-center text-sm focus:outline-none pr-6 relative'
                            id='user-menu'
                            aria-expanded='false'
                            aria-haspopup='true'
                        >
                            {auth?.detail?.picture ? (
                                <span
                                    className='inline-block h-10 w-10 rounded-full overflow-hidden bg-cover bg-center'
                                    style={{backgroundImage: `url(${auth?.detail?.picture})`}}></span>
                            ) : (
                                <span className='inline-block h-10 w-10 rounded-full overflow-hidden bg-gray-100'>
                                        <UserIcon className='h-full w-full text-gray-300'/>
                                    </span>
                            )}
                            <ChevronDownIcon/>
                        </button>
                    </div>
                    <Transition
                        show={isOpen}
                        enterFrom='transform opacity-0 scale-95'
                        enterTo='transform opacity-100 scale-100'
                        enter='transition ease-out duration-100'
                        leaveFrom='transform opacity-100 scale-100'
                        leaveTo='transform opacity-0 scale-95'
                        leave='transition ease-in duration-75'
                        className='z-[700] relative'
                        as='div'>
                        <div
                            className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white
                                ring-1 ring-black ring-opacity-5 focus:outline-none z-[700]'
                            role='menu'
                            aria-orientation='vertical'
                            aria-labelledby='user-menu'
                        >
                            <Link
                                href='/admin/profile'
                                className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                                マイページ
                            </Link>
                            <a
                                href='#'
                                className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                                role='menuitem'
                                onClick={logout}>
                                ログアウト
                            </a>
                        </div>
                    </Transition>
                </div>
            </div>
        </div>
    </div>
}

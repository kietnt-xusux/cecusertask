import React, { Fragment, useEffect, useRef, useState } from 'react';
import { ChevronDownIcon,  LeftSideBar, MenuIcon, UserIcon } from "@/components";
import { Transition } from "@headlessui/react";
import { Link, useLocation } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";

export const PublicHeader = () => {
    const location = useLocation();
    const [isOpen, setOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [openSideBar, setOpenSideBar] = useState(false);
    const { i18n, t } = useTranslation('common', { useSuspense: false });

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

    const handleChangeLanguage = (locale: string) => {
        i18n.changeLanguage(locale);
        setOpen(!isOpen);
    }

    const getTxtLang = () => {
        let textLang = 'English';
        switch (i18n.language) {
            case 'vi':
                textLang = 'Tiếng Việt';
                break;
            case 'en':
                textLang = 'English';
                break;
            case 'ja':
                textLang = '日本';
                break;
        }

        return textLang;
    }

    const classActiveLink = (path: string) => {
        if (path == location.pathname) {
            return ' text-orange-500 ';
        }

        return '';
    }

    return <div className="pl-9 pr-36 py-2 max-w-[1280px] mx-auto">
        <p className="text-xs text-neutral-400 ml-7">{ t('headers.introduction') }</p>
        <div className="flex justify-between">
            <div className="flex items-center mt-2">
                <button
                    onClick={() => setOpenSideBar(true)}
                >
                    <MenuIcon />
                </button>
                <img src="/img/logo_full.svg" alt="" className="ml-2"/>
            </div>

            <div className="flex">
                <div className="mt-2 mr-8 text-sm font-bold">
                <Link to={'/logo-mark-req'} className={'flex items-center leading-8 text-neutral-600'+ classActiveLink('/logo-mark-req')}>
                    { t('headers.logo_mark_req') }
                </Link>
                </div>
                <div className="mt-2 text-sm font-bold">
                    <Link to={'/about'} className={'flex items-center leading-8 text-neutral-600' + classActiveLink('/about')}>
                        { t('headers.about') }
                    </Link>
                </div>
            </div>

            <div className="flex">
                <button
                    className={"text-orange-600 border border-orange-600 rounded h-10 flex justify-center items-center " +
                        "w-32 focus:outline-none"}
                >
                    {t('headers.sign_in')}
                </button>
                <div className="relative" ref={wrapperRef}>
                    <button type="button" onClick={() => setOpen(!isOpen)}
                            className="flex h-10 items-center justify-center focus:outline-none relative bg-zinc-200 rounded ml-5 w-28"
                            id="user-menu" aria-expanded="false" aria-haspopup="true">
                        <>{ getTxtLang() }</>
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
                            <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" onClick={() => handleChangeLanguage('en')}>English</p>
                            <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" onClick={() => handleChangeLanguage('vi')}>Tiếng Việt</p>
                        </div>
                    </Transition>
                </div>
            </div>
        </div>

        <LeftSideBar open={openSideBar} closeModal={setOpenSideBar} />
    </div>
}

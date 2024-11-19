import React, {useEffect, useRef, useState} from "react"
import {ArrowLongLeftIcon, ArrowLongRightIcon, ChevronLeftIcon, ChevronRightIcon} from './Icon';
import { Transition } from '@headlessui/react'
import {clsx} from "clsx";

interface PaginationProps {
    page: number,
    lastPage: number,
    setPage: any,
    path: string,
    choosePage?: boolean;
}

interface PageListProps {
    page: number,
    title: string,
}

export const Pagination = ({page, lastPage, setPage, path, choosePage}: PaginationProps) => {
    const [open, setOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [pageList, setPageList] = useState<PageListProps[]>([]);

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
        let pages: PageListProps[] = [];
        if (lastPage <= 7) {
            for (let i = 1; i <= lastPage; i++) {
                pages.push({
                    page: i,
                    title: i + '',
                })
            }
        } else {
            if (page < 3) {
                for (let i = 1; i <= 3; i++) {
                    pages.push({
                        page: i,
                        title: i + '',
                    })
                }
                pages.push({
                    page: -1,
                    title: '...'
                });

                for (let j = lastPage - 2; j <= lastPage; j++) {
                    pages.push({
                        page: j,
                        title: j + '',
                    })
                }
            } else if (page === 3) {
                for (let i = 1; i <= 4; i++) {
                    pages.push({
                        page: i,
                        title: i + '',
                    })
                }
                pages.push({
                    page: -1,
                    title: '...'
                });
                pages.push({
                    page: lastPage,
                    title: lastPage + '',
                });
            } else if (page < lastPage - 3) {
                pages.push({
                    page: 1,
                    title: '1',
                });
                pages.push({
                    page: -1,
                    title: '...'
                });
                for (let i = page -1; i <= page + 1; i++) {
                    pages.push({
                        page: i,
                        title: i + '',
                    })
                }
                pages.push({
                    page: -2,
                    title: '...'
                });
                pages.push({
                    page: lastPage,
                    title: lastPage + '',
                });
            } else if (page === lastPage - 3) {
                pages.push({
                    page: 1,
                    title: '1',
                });
                pages.push({
                    page: -1,
                    title: '...'
                });
                for (let i = lastPage - 4; i <= lastPage; i++) {
                    pages.push({
                        page: i,
                        title: i + '',
                    })
                }
            } else if (page === lastPage - 2) {
                pages.push({
                    page: 1,
                    title: '1',
                });
                pages.push({
                    page: -1,
                    title: '...'
                });
                for (let i = lastPage - 3; i <= lastPage; i++) {
                    pages.push({
                        page: i,
                        title: i + '',
                    })
                }
            } else {
                pages.push({
                    page: 1,
                    title: '1',
                });
                pages.push({
                    page: -1,
                    title: '...'
                });
                for (let i = lastPage - 2; i <= lastPage; i++) {
                    pages.push({
                        page: i,
                        title: i + '',
                    })
                }
            }
        }

        setPageList(pages);
    }, [page]);

    const goToPreviousPage = (e: React.MouseEvent) => {
        e.preventDefault();
        if (page === 1) return;
        settingPage(e, page - 1);
    }

    const goToNextPage = (e: React.MouseEvent) => {
        e.preventDefault();
        if (page === lastPage) return;
        settingPage(e, page + 1);
    }

    const settingPage = (e: React.MouseEvent, page: number) => {
        e.preventDefault();
        setPage(page);
    }

    const goToPage = () => {
        setPage(page);
        setOpen(false);
    }

    return (
        <div className="relative" ref={wrapperRef}>
            <nav className="border-t border-gray-200 justify-between items-center flex">
                <div className="flex-1 w-0 flex -mt-[1px]">
                    <a
                        href="#"
                        className={clsx(
                            "font-medium text-sm pt-4 pr-1 border-t-2 border-transparent inline-flex gap-3",
                            page === 1 ?
                                'text-gray-300 cursor-not-allowed hover:text-gray-300 hover:border-transparent' :
                                'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        )}
                        onClick={goToPreviousPage}
                    >
                        <ArrowLongLeftIcon />
                        戻る
                    </a>
                </div>
                <div className="md:flex hidden md:-mt-[1px]">
                    {pageList.map(i => {
                        return page === i.page ? (
                            <span
                                aria-current="page"
                                className={clsx(
                                    "font-medium text-sm pt-4 px-4 border-teal-450 border-t-2 text-teal-650",
                                )}
                                key={`page-${i.page}`}
                            >
                                {i.title}
                            </span>
                        ) : (
                            <a
                                href="#"
                                className={clsx(
                                    "text-gray-500 font-medium text-sm pt-4 px-4 border-teal-450 border-t-2 border-transparent"
                                )}
                                onClick={(e) => settingPage(e, i.page)}
                                key={`page-${i.page}`}
                            >
                                {i.title}
                            </a>
                        )
                    })}
                </div>
                <div className="flex-1 w-0 flex -mt-[1px] justify-end">
                    <a
                        href="#"
                        className={clsx(
                            "text-gray-500 font-medium text-sm pt-4 pr-1 border-t-2 border-transparent inline-flex",
                            'hover:text-gray-700 gap-3 hover:border-gray-300'
                        )}
                        onClick={goToNextPage}
                    >
                        次へ
                        <ArrowLongRightIcon/>
                    </a>
                </div>
            </nav>
        </div>
    )
}

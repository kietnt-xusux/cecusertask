import React from 'react';

const Pagination = ({ className }: { className?: string }) => {
    return (
        <div className={` ` + (className ? className : '')}>
            <nav className='isolate inline-flex rounded-md gap-4' aria-label='Pagination'>
                <a
                    href='#'
                    className='flex items-center justify-center rounded-md max-w-10 px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-teal-550 bg-teal-550 text-white hover:text-white focus:z-20 focus:outline-offset-0'>
                    1
                </a>
                <a
                    href='#'
                    className='flex items-center justify-center rounded-md max-w-10 px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-teal-550 hover:text-white focus:z-20 focus:outline-offset-0 md:inline-flex'>
                    2
                </a>
                <a
                    href='#'
                    className='flex items-center justify-center rounded-md max-w-10 px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-teal-550 hover:text-white focus:z-20 focus:outline-offset-0 md:inline-flex'>
                    3
                </a>
                <a
                    href='#'
                    className='flex items-center justify-center rounded-md max-w-10 px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-teal-550 hover:text-white'>
                    4
                </a>
                <a
                    href='#'
                    className='flex items-center justify-center rounded-md max-w-10 px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-teal-550 hover:text-white '>
                    5
                </a>
            </nav>
        </div>
    );
};

export default Pagination;

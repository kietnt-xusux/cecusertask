'use client';

import React, { useState } from 'react';
import {
    FacebookIcon,
    InstagramIcon,
    Modal,
    WhiteComputerIcon,
    WhiteMailIcon,
    WhiteMapIcon,
    WhitePhoneIcon,
    XIcon
} from '@/components';

const Nav = ({ className }: { className?: string }) => {
    const [showMenu, setShowMenu] = useState(false);
    const [showModal, setShowModal] = useState(false);

    return (
        <div>
            <nav className='max-w-7xl mx-auto flex items-center justify-between gap-2'>
                <a href='/' className='xl:w-[220px] max-lg:w-32'>
                    <img
                        src={className ? '../images/icons/logo-white.png' : 'images/icons/logo.png'}
                        alt='XusuxVN'
                        width={196}
                        height={102}
                        className='object-contain w-full aspect-auto max-w-[196px]'
                    />
                </a>

                <a
                    className='min-w-[40px] w-10 h-10 rounded-[5px] lg:hidden block bg-blue-home-world cursor-pointer'
                    id='hamburger'
                    onClick={() => setShowMenu(!showMenu)}>
                    <div className='relative w-6/12 h-full m-auto'>
                        <span className='top-[40%] w-full h-0.5 absolute transition-all duration-[0.4s] m-auto left-0 bg-white max-md:bg-gray-650'></span>
                        <span className='top-[60%] w-4/5 h-0.5 absolute transition-all duration-[0.4s] m-auto left-0 bg-white max-md:bg-gray-650'></span>
                    </div>
                </a>

                <ul
                    className={
                        `flex-1 justify-end items-center xl:gap-8 gap-5 font-bold text-gray-750 text-[20px] lg:flex hidden ` +
                        (className ?? '')
                    }>
                    <li>
                        <a href='/' className='hover:text-teal-550'>
                            TRANG CHỦ
                        </a>
                    </li>
                    <li>
                        <a href='/company' className='hover:text-teal-550'>
                            GIỚI THIỆU
                        </a>
                    </li>
                    <li>
                        <a href='/service' className='hover:text-teal-550'>
                            DỊCH VỤ
                        </a>
                    </li>
                    <li>
                        <a href='/news' className='hover:text-teal-550'>
                            TIN TỨC
                        </a>
                    </li>
                    <li>
                        <a href='/recruitment' className='hover:text-teal-550'>
                            TUYỂN DỤNG
                        </a>
                    </li>
                    <li
                        className='bg-teal-550 hover:bg-white text-white hover:text-teal-550 cursor-pointer border border-teal-550 rounded-[100px] text-[20px] font-bold py-3 w-[196px] text-center max-w-[196px] max-h-14'
                        onClick={() => setShowModal(true)}>
                        <span className='hover:text-teal-550'>LIÊN HỆ</span>
                    </li>
                </ul>
            </nav>

            <ul
                id='link-box'
                className={
                    `fixed w-full h-screen z-[-1] pt-[150px] px-[11.71875vw] py-[100px] left-0 top-0 bg-white
            flex-1 flex-col justify-start items-center gap-8 font-medium text-night-rider text-[24px] ` +
                    (showMenu ? 'flex' : 'hidden')
                }>
                <li>
                    <a href='/' className='group relative hover:opacity-70'>
                        会社概要
                    </a>
                </li>
                <li>
                    <a href='/company' className='group relative hover:opacity-70'>
                        GIỚI THIỆU
                    </a>
                </li>
                <li>
                    <a href='/service' className='group relative hover:opacity-70'>
                        DỊCH VỤ
                    </a>
                </li>
                <li>
                    <a href='/news' className='group relative hover:opacity-70'>
                        TIN TỨC
                    </a>
                </li>
                <li>
                    <a href='/recruitment' className='group relative hover:opacity-70'>
                        TUYỂN DỤNG
                    </a>
                </li>
            </ul>

            <Modal open={showModal} closeModal={() => setShowModal(false)}>
                <div className='fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10'>
                    <div className='max-h-full w-4/5 max-w-4xl overflow-y-auto sm:rounded-2xl bg-white relative'>
                        <div className='p-8 mx-auto'>
                            <div className='grid grid-cols-2 max-md:grid-cols-1'>
                                <div className='flex flex-col max-sm:text-center'>
                                    <h2 className='text-2xl text-teal-550 font-bold pb-5'>KẾT NỐI NGAY VỚI XUSUX</h2>
                                    <p className='text-md mb-14 w-11/12 max-md:w-full'>
                                        Chúng tôi luôn sẵn sàng lắng nghe và đưa ra giải pháp phù hợp nhất cho vấn đề
                                        của bạn.
                                    </p>
                                    <div className='grid grid-cols-2 max-md:grid-cols-1 gap-16 '>
                                        <div className='flex flex-col max-md:justify-center max-md:items-center'>
                                            <div className='h-[50px] w-[50px] bg-teal-550 rounded-full flex justify-center items-center mb-4'>
                                                <WhiteMailIcon />
                                            </div>
                                            <h4 className='font-bold text-xl mb-3'>Email</h4>
                                            <p className='text-md'>info.xusux@gmail.com</p>
                                        </div>

                                        <div className='flex flex-col max-md:justify-center max-md:items-center'>
                                            <div className='h-[50px] w-[50px] bg-teal-550 rounded-full flex justify-center items-center mb-4'>
                                                <WhitePhoneIcon />
                                            </div>
                                            <h4 className='font-bold text-xl mb-3'>Điện thoại</h4>
                                            <p className='text-sm'>+84-37-443-1461</p>
                                        </div>

                                        <div className='flex flex-col max-md:justify-center max-md:items-center'>
                                            <div className='h-[50px] w-[50px] bg-teal-550 rounded-full flex justify-center items-center mb-4'>
                                                <WhiteMapIcon />
                                            </div>
                                            <h4 className='font-bold text-xl mb-3'>Địa chỉ</h4>
                                            <p className='text-sm'>
                                                Tòa nhà Luxury Office <br />
                                                125A Mỹ Đình, Nam Từ Liêm, Hà Nội, Việt Nam
                                            </p>
                                        </div>
                                        <div className='flex flex-col max-md:justify-center max-md:items-center'>
                                            <div className='h-[50px] w-[50px] bg-teal-550 rounded-full flex justify-center items-center mb-4'>
                                                <WhiteComputerIcon />
                                            </div>
                                            <h4 className='font-bold text-xl mb-3'>Mạng xã hội</h4>
                                            <div className='flex flex-row gap-4'>
                                                <FacebookIcon className='h-14 cursor-pointer' />
                                                <InstagramIcon className='h-14 cursor-pointer' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='max-md:mt-8'>
                                    <div className='flex flex-col bg-[#F7F8F9] p-10 gap-7'>
                                        <input
                                            type='text'
                                            placeholder='Họ và tên'
                                            className='p-4 py-3 block w-full rounded-lg md:max-w-input-md border-0 text-[#979797] shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-[#979797]focus:ring-2 focus:ring-inset focus:ring-gray-300 focus:outline-none sm:text-sm sm:leading-6'
                                        />

                                        <input
                                            type='text'
                                            placeholder='Điện thoại'
                                            className='p-4 py-3 block w-full rounded-lg md:max-w-input-md border-0 text-[#979797] shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-[#979797] focus:ring-2 focus:ring-inset focus:ring-gray-300 focus:outline-none sm:text-sm sm:leading-6'
                                        />

                                        <input
                                            type='text'
                                            placeholder='Email'
                                            className='p-4 py-3 block w-full rounded-lg md:max-w-input-md border-0 text-[#979797] shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-[#979797] focus:ring-2 focus:ring-inset focus:ring-gray-300 focus:outline-none sm:text-sm sm:leading-6'
                                        />

                                        <textarea
                                            placeholder='Nội dung'
                                            rows={5}
                                            className='p-4 py-3 block w-full rounded-lg md:max-w-input-md border-0 text-[#979797] shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-[#979797] focus:ring-2 focus:ring-inset focus:ring-gray-300 focus:outline-none sm:text-sm sm:leading-6'
                                        />

                                        <div className='flex flex-col justify-start'>
                                            <p className='pb-3'>Chọn văn phòng hỗ trợ:</p>
                                            <div className='flex justify-start'>
                                                <div className='flex h-6 items-center'>
                                                    <input
                                                        id='vn'
                                                        name='branch'
                                                        type='radio'
                                                        className='border border-gray-500 rounded-md w-4 h-4 accent-teal-550'
                                                    />
                                                </div>
                                                <label htmlFor='comments' className='ml-2'>
                                                    Việt Nam
                                                </label>

                                                <div className='flex h-6 items-center ml-4'>
                                                    <input
                                                        id='jp'
                                                        name='branch'
                                                        type='radio'
                                                        className='border border-gray-500 rounded-md w-4 h-4 accent-teal-550'
                                                    />
                                                </div>
                                                <label htmlFor='branch' className='ml-2'>
                                                    Nhật Bản
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='w-full mt-9'>
                                        <button
                                            type='submit'
                                            className='py-2 w-full h-16 bg-teal-550 text-white border-2 border-teal-550 hover:bg-white hover:text-teal-550 text-lg rounded flex justify-center items-center focus:outline-none'
                                            role='button'>
                                            GỬI NỘI DUNG
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-start items-start h-full mt-28'>
                        <div
                            className='bg-white rounded-full h-6 w-6 flex justify-center items-center cursor-pointer'
                            onClick={() => setShowModal(false)}>
                            <XIcon className='fill-gray-600 h-4 w-4' />
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Nav;

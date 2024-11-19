import React from 'react';
import { ArrowKiteIcon } from '@/components';

export const Footer = () => {
    return (
        <footer className='w-full relative bg-footer px-8'>
            <div
                className='max-w-[1290px] w-full rounded-xl mx-auto bg-teal-550 text-white flex justify-center items-center py-10 px-20 max-h-[200px] -translate-y-1/3
                max-md:flex-col max-md:max-h-[500px] max-lg:px-8'>
                <div className='basis-1/2 flex flex-col items-start -translate-y-1/4 max-lg:-translate-y-0 max-md:mt-2'>
                    <h2 className='font-bold text-[32px] max-lg:text-2xl max-md:mb-2'>Kết nối ngay với Xusux</h2>
                    <p className='text-[16px]'>
                        Chúng tôi luôn sẵn sàng lắng nghe và đưa ra giải pháp phù hợp nhất cho vấn đề của bạn.
                    </p>
                </div>
                <ArrowKiteIcon className='h-[118px] w-[274px] basis-1/4 -translate-x-1/3 max-lg:translate-x-0 max-md:w-32 max-md:mb-2' />
                <div className='flex flex-col basis-1/4 justify-center items-center'>
                    <img src='/images/icons/light-up.png' alt='light-up' width={73} />
                    <button className='flex justify-center items-center bg-white hover:bg-teal-550 text-teal-550 hover:text-white border border-teal-550 hover:border-white font-bold text-[17px] min-w-[260px] rounded-md min-h-[60px] my-2'>
                        LIÊN HỆ CHÚNG TÔI
                    </button>
                    <img src='/images/icons/light-down.png' alt='light-down' width={73} />
                </div>
            </div>

            <div className='flex flex-col justify-center items-center text-white'>
                <img src='/images/logo.png' alt='logo' className='aspect-auto' width={235} height={120} />
                <div className='flex gap-16 my-20 max-md:gap-4'>
                    <a href='/company' className='hover:text-teal-550'>
                        TRANG CHỦ
                    </a>
                    <a href='/' className='hover:text-teal-550'>
                        GIỚI THIỆU
                    </a>
                    <a href='/' className='hover:text-teal-550'>
                        DỊCH VỤ
                    </a>
                    <a href='/' className='hover:text-teal-550'>
                        TIN TỨC
                    </a>
                    <a href='/' className='hover:text-teal-550'>
                        TUYỂN DỤNG
                    </a>
                    <a href='/' className='hover:text-teal-550'>
                        LIÊN HỆ
                    </a>
                </div>
                <p className='mb-[77px]'>Bản quyền (c) Công ty TNHH Xusux Việt Nam. Mọi quyền được bảo lưu.</p>
            </div>
        </footer>
    );
};

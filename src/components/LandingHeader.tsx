'use client';

import React, { useState } from 'react';
import { MailIcon, MapPinIcon } from '@/components';

const LandingHeader = () => {
    const [openLanguage, setOpenLanguage] = useState(false);

    return (
        <div className='bg-gray-650'>
            <div className='max-w-7xl flex justify-center items-center text-white mx-auto min-h-3'>
                <div className='flex basis-1/2 justify-start items-center max-lg:hidden'>
                    <MapPinIcon className='h-6 w-6 mr-2' />{' '}
                    <span className='mr-6'> 125A Mỹ Đình, Nam Từ Liêm, Hà Nội, Việt Nam</span>
                    <MailIcon className='h-6 w-6 mr-2' /> info.xusux@gmail.com
                </div>
                <div className='flex basis-1/2 max-lg:basis-full justify-between items-center max-lg:mx-4'>
                    Thứ 2 - Thứ 6: 8h00 am - 17h00 pm
                    {/*<Language isOpenLanguage={openLanguage} setOpenLanguage={setOpenLanguage} />*/}
                </div>
            </div>
        </div>
    );
};

export default LandingHeader;

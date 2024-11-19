import {
    ApplicationIcon,
    CloudIcon,
    EditIcon,
    FacebookIcon,
    GroupUserIcon,
    InstagramIcon,
    InternetIcon,
    WhiteComputerIcon,
    WhiteMailIcon,
    WhiteMapIcon,
    WhitePhoneIcon,
    WindowIcon
} from '@/components';
import LandingBanner from "@/components/LandingBanner";

export default async function Home() {
    return (
        <>
            <LandingBanner />

            {/* Business value */}
            <section className='max-w-screen-6xl pt-24 bg-white min-h-screen mx-auto text-center text-gray-750 max-md:p-4 p-8'>
                <h1 className='font-bold text-4xl leading-[56px] max-md:text-2xl'>
                    NÂNG CAO GIÁ TRỊ DOANH NGHIỆP CHO BẠN
                </h1>
                <h6 className='text-[20px] mb-[91px] max-md:mb-8 mt-4 max-md:text-[14px]'>
                    Xusux Vietnam theo đuổi các giải pháp kinh doanh nhằm tạo ra tương lai cho khách hàng và tối đa hóa
                    hiệu quả của chúng.
                </h6>

                <div className='grid grid-cols-3 gap-20 max-md:gap-8 mb-40 max-md:grid-cols-1 max-md:mb-0'>
                    <div className='flex flex-col justify-center items-center mt-4'>
                        <div className='bg-teal-550 h-16 w-16 rounded-md flex justify-center items-center cursor-pointer'>
                            <CloudIcon className='h-7 w-7' />
                        </div>
                        <h2 className='font-bold text-[24px] mt-6 mb-4'>Tiếp thị website/ kỹ thuật số</h2>
                        <p className='text-[16px] max-md:text-[14px]'>
                            Stay connected with your team and make quick decisions wherever you are.{' '}
                        </p>
                    </div>

                    <div className='flex flex-col justify-start items-center mt-4'>
                        <div className='bg-[#7860DC] h-16 w-16 rounded-md flex justify-center items-center cursor-pointer'>
                            <WindowIcon className='h-7 w-7' />
                        </div>
                        <h2 className='font-bold text-[24px] mt-6 mb-4'>Phát triển hệ thống</h2>
                        <p className='text-[16px] max-md:text-[14px]'>
                            Get a complete sales dashboard in the cloud. See activity, revenue and social metrics all in
                            one place.
                        </p>
                    </div>

                    <div className='flex flex-col justify-start items-center mt-4'>
                        <div className='bg-[#3F327A] h-16 w-16 rounded-md flex justify-center items-center cursor-pointer'>
                            <GroupUserIcon className='h-7 w-7' />
                        </div>
                        <h2 className='font-bold text-[24px] mt-6 mb-4'>Thiết kế thương hiệu</h2>
                        <p className='text-[16px] max-md:text-[14px]'>
                            Our calendar lets you know what is happening with customer and projects so you
                        </p>
                    </div>

                    <div className='flex flex-col justify-start items-center mt-4'>
                        <div className='bg-[#DB4A87] h-16 w-16 rounded-md flex justify-center items-center cursor-pointer'>
                            <InternetIcon className='h-7 w-7' />
                        </div>
                        <h2 className='font-bold text-[24px] mt-6 mb-4'>Quản lý & vận hành website</h2>
                        <p className='text-[16px] max-md:text-[14px]'>
                            A tool that lets you build a dream website even if you know nothing about web design or
                            programming.
                        </p>
                    </div>

                    <div className='flex flex-col justify-start items-center mt-4'>
                        <div className='bg-[#FFA42F] h-16 w-16 rounded-md flex justify-center items-center cursor-pointer'>
                            <ApplicationIcon className='h-7 w-7' />
                        </div>
                        <h2 className='font-bold text-[24px] mt-6 mb-4'>Thiết kế App mobile</h2>
                        <p className='text-[16px] max-md:text-[14px]'>
                            The first business platform to bring together all of your products from one place.
                        </p>
                    </div>

                    <div className='flex flex-col justify-start items-center mt-4'>
                        <div className='bg-[#6AB04C] h-16 w-16 rounded-md flex justify-center items-center cursor-pointer'>
                            <EditIcon className='h-7 w-7' />
                        </div>
                        <h2 className='font-bold text-[24px] mt-6 mb-4'>Tư vấn marketing</h2>
                        <p className='text-[16px] max-md:text-[14px]'>
                            End to End Business Platform, Sales Management, Marketing Automation, Help Desk
                        </p>
                    </div>
                </div>
            </section>

            {/* Our Service */}
            <section className='bg-service max-md:p-4 p-8'>
                <div className='max-w-screen-6xl min-h-screen mx-auto text-center text-gray-750 pt-24 pb-12 max-md:pt-32'>
                    <div className='text-center mb-20'>
                        <h1 className='font-bold text-[36px] leading-13 max-md:text-2xl'>
                            DỊCH VỤ & QUẢN LÝ CỦA CHÚNG TÔI
                        </h1>
                        <p className='text-[20px] mt-5 max-md:text-[14px]'>
                            With our integrated CRM, project management, collaboration and invoicing capabilities, you
                            can manage every aspect of your business in one secure platform.
                        </p>
                    </div>

                    <div className='grid grid-cols-3 gap-8 mb-40 max-md:grid-cols-1 max-md:mb-0'>
                        {/* img 01 */}
                        <div className='image-container flex flex-col justify-center items-center overflow-hidden max-w-sm mt-4 w-full relative mx-auto h-auto rounded-xl transition ease-in-out duration-500 hover:shadow-image-after opacity-95 hover:opacity-100 hover:translate-x-5 hover:-translate-y-5'>
                            <img
                                src='/images/homepage/service-01.png'
                                alt='image'
                                className='image w-full max-w-sm mx-auto h-auto relative z-0 rounded-xl'
                            />
                            <a
                                href='#'
                                className='rounded-xl absolute w-full h-full top-0 left-0 bg-gradient-to-b from-[#163146]/45 to-[#152532] ease-in-out z-10 transition-opacity duration-300'></a>
                            <div className='image-overlay rounded-xl w-full h-full bottom-0 left-0 ease-in-out duration-500 z-20'>
                                <div className='image-text text-white flex flex-col justify-start items-start'>
                                    <h2 className='text-left font-bold text-[24px]  px-4'>Logo - Tank</h2>
                                    <p className='text-justify font-normal text-[16px] w-[350px] leading-6 mt-4  px-4'>
                                        Đây là dịch vụ mà bạn có thể mua nhãn hiệu logo được thiết kế ban đầu với giá
                                        7.900 yên. Nó được sử dụng bởi mọi người trong các ngành công nghiệp khác nhau
                                        như công ty, cửa hàng, nhãn hiệu biểu tượng, v.v.
                                    </p>
                                    <div className='w-full flex justify-center items-center mt-4'>
                                        <a
                                            href='#'
                                            className='flex justify-center items-center bg-white text-teal-550 hover:bg-teal-550 hover:text-white border border-teal-550 rounded-full w-full px-2 min-h-[48px] max-w-[172px] font-bold text-[16px] cursor-pointer'>
                                            Truy cập website
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col gap-8'>
                            {/* img 02 */}
                            <div className='image-container flex flex-col justify-center items-center overflow-hidden max-w-sm mt-4 w-full relative mx-auto h-auto rounded-xl transition ease-in-out duration-500 hover:shadow-image-after opacity-95 hover:opacity-100 hover:translate-x-5 hover:-translate-y-5'>
                                <img
                                    src='/images/homepage/service-02.png'
                                    alt='image'
                                    className='image w-full max-w-sm mx-auto h-auto relative z-0 rounded-xl'
                                />
                                <a
                                    href='#'
                                    className='rounded-xl absolute w-full h-full top-0 left-0 bg-gradient-to-b from-[#163146]/45 to-[#152532] ease-in-out z-10 transition-opacity duration-300'></a>
                                <div className='image-overlay rounded-xl w-full h-full bottom-0 left-0 ease-in-out duration-500 z-20'>
                                    <div className='image-text-small text-white flex flex-col justify-start items-start mt-8'>
                                        <h2 className='text-left font-bold text-[24px] px-4'>Ciamiro Envelope</h2>
                                        <p className='text-justify font-normal text-[16px] w-[350px] leading-6 mt-4  px-4'>
                                            Đây là dịch vụ mà bạn có thể mua nhãn hiệu logo được thiết kế ban đầu với
                                            giá 7.900 yên. v.v.
                                        </p>
                                        <div className='w-full flex justify-center items-center mt-4'>
                                            <a
                                                href='#'
                                                className='flex justify-center items-center bg-white hover:bg-teal-550 hover:text-white border border-teal-550 rounded-full w-full px-2 min-h-[48px] max-w-[172px] text-teal-550 font-bold text-[16px] cursor-pointer'>
                                                Truy cập website
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* img 03 */}
                            <div className='image-container flex flex-col justify-center items-center overflow-hidden max-w-sm mt-4 w-full relative mx-auto h-auto rounded-xl transition ease-in-out duration-500 hover:shadow-image-after opacity-95 hover:opacity-100 hover:translate-x-5 hover:-translate-y-5'>
                                <img
                                    src='/images/homepage/service-03.png'
                                    alt='image'
                                    className='image w-full max-w-sm mx-auto h-auto relative z-0 rounded-xl'
                                />
                                <a
                                    href='#'
                                    className='rounded-xl absolute w-full h-full top-0 left-0 bg-gradient-to-b from-[#163146]/45 to-[#152532] ease-in-out z-10 transition-opacity duration-300'></a>
                                <div className='image-overlay rounded-xl w-full h-full bottom-0 left-0 ease-in-out duration-500 z-20'>
                                    <div className='image-text-small text-white flex flex-col justify-start items-start mt-8'>
                                        <h2 className='text-left font-bold text-[24px]  px-4'>Esirus</h2>
                                        <p className='text-justify font-normal text-[16px] w-[350px] leading-6 mt-4  px-4'>
                                            Đây là dịch vụ mà bạn có thể mua nhãn hiệu logo được thiết kế ban đầu với
                                            giá 7.900 yên.v.v.
                                        </p>
                                        <div className='w-full flex justify-center items-center mt-4'>
                                            <a
                                                href='/'
                                                className='flex justify-center items-center bg-white hover:bg-teal-550 hover:text-white border border-teal-550 rounded-full w-full px-2 min-h-[48px] max-w-[172px] text-teal-550 font-bold text-[16px] cursor-pointer'>
                                                Truy cập website
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* img 04 */}
                        <div className='image-container flex flex-col justify-center items-center overflow-hidden max-w-sm mt-4 w-full relative mx-auto h-auto rounded-xl transition ease-in-out duration-500 hover:shadow-image-after opacity-95 hover:opacity-100 hover:translate-x-5 hover:-translate-y-5'>
                            <img
                                src='/images/homepage/service-04.png'
                                alt='image'
                                className='image w-full max-w-sm mx-auto h-auto relative z-0 rounded-xl'
                            />
                            <a
                                href='#'
                                className='rounded-xl absolute w-full h-full top-0 left-0 bg-gradient-to-b from-[#163146]/45 to-[#152532] ease-in-out z-10 transition-opacity duration-300'></a>
                            <div className='image-overlay rounded-xl w-full h-full bottom-0 left-0 ease-in-out duration-500 z-20'>
                                <div className='image-text text-white flex flex-col justify-start items-start'>
                                    <h2 className='text-left font-bold text-[24px]  px-4'>Ospa</h2>
                                    <p className='text-justify font-normal text-[16px] w-[350px] leading-6 mt-4  px-4'>
                                        Đây là dịch vụ mà bạn có thể mua nhãn hiệu logo được thiết kế ban đầu với giá
                                        7.900 yên. Nó được sử dụng bởi mọi người trong các ngành công nghiệp khác nhau
                                        như công ty, cửa hàng, nhãn hiệu biểu tượng, v.v.
                                    </p>
                                    <div className='w-full flex justify-center items-center mt-4'>
                                        <a
                                            href='#'
                                            className='flex justify-center items-center bg-white hover:bg-teal-550 hover:text-white border border-teal-550 rounded-full w-full px-2 min-h-[48px] max-w-[172px] text-teal-550 font-bold text-[16px] cursor-pointer'>
                                            Truy cập website
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Event */}
            <section className='max-w-screen-6xl pt-40 bg-white min-h-screen mx-auto text-center text-gray-750 max-md:p-4 p-8'>
                <h1 className='text-left font-bold text-4xl mb-12 max-md:text-center max-md:mt-12'>
                    SỰ KIỆN & TRUYỀN THÔNG
                </h1>
                {/* For each here 1 */}
                <div className='flex flex-col justify-start items-start border-b border-gray-350 py-9'>
                    <div className='flex flex-row justify-center items-start mb-5'>
                        <div className='bg-teal-550 rounded-full min-h-4 min-w-4 mr-2 mt-2'></div>
                        <span className='font-semibold text-[24px] text-teal-550 text-left'>
                            Thông báo ngày làm việc trong kỳ nghỉ hè [2024]
                        </span>
                        <span className='text-gray-750 text-[20px] ml-6'>15/03/2024</span>
                    </div>
                    <div className='flex flex-row justify-center items-center'>
                        <div className='bg-teal-550 rounded-full min-h-4 min-w-4 mr-2 mt-2 hidden'></div>
                        <p className='text-left text-gray-750 text-[16px]'>
                            Consult with top doctors across various specialties via video or chat communication. It’s
                            totally secure, private, and convenient. Choose the best time for an in-person visit with
                            our easy-to-use scheduling system, or proceed with our online consultation.
                        </p>
                    </div>
                </div>

                {/* 2 */}
                <div className='flex flex-col justify-start items-start border-b border-gray-350 py-9'>
                    <div className='flex flex-row justify-center items-start mb-5'>
                        <div className='bg-teal-550 rounded-full min-h-4 min-w-4 mr-2 mt-2'></div>
                        <span className='font-semibold text-[24px] text-teal-550 text-left'>
                            Thành lập chi nhánh tại Việt Nam của Xusux
                        </span>
                        <span className='text-gray-750 text-[20px] ml-6'>15/03/2024</span>
                    </div>
                    <div className='flex flex-row justify-center items-center'>
                        <div className='bg-teal-550 rounded-full min-h-4 min-w-4 mr-2 mt-2 hidden'></div>
                        <p className='text-left text-gray-750 text-[16px]'>
                            Consult with top doctors across various specialties via video or chat communication. It’s
                            totally secure, private, and convenient. Choose the best time for an in-person visit with
                            our easy-to-use scheduling system, or proceed with our online consultation.
                        </p>
                    </div>
                </div>

                {/* 3 */}
                <div className='flex flex-col justify-start items-start border-b border-gray-350 py-9'>
                    <div className='flex flex-row justify-center items-start mb-5'>
                        <div className='bg-teal-550 rounded-full min-h-4 min-w-4 mr-2 mt-2'></div>
                        <span className='font-semibold text-[24px] text-teal-550 text-left'>
                            Mở chi nhánh công ty Xusux tại Tokyo
                        </span>
                        <span className='text-gray-750 text-[20px] ml-6'>15/03/2024</span>
                    </div>
                    <div className='flex flex-row justify-center items-center'>
                        <div className='bg-teal-550 rounded-full min-h-4 min-w-4 mr-2 mt-2 hidden'></div>
                        <p className='text-left text-gray-750 text-[16px]'>
                            Consult with top doctors across various specialties via video or chat communication. It’s
                            totally secure, private, and convenient. Choose the best time for an in-person visit with
                            our easy-to-use scheduling system, or proceed with our online consultation.
                        </p>
                    </div>
                </div>

                {/* 4 */}
                <div className='flex flex-col justify-start items-start py-9'>
                    <div className='flex flex-row justify-center items-start mb-5'>
                        <span className='bg-teal-550 rounded-full min-h-4 min-w-4 mr-2 mt-2'></span>
                        <span className='font-semibold text-[24px] text-teal-550 text-left'>
                            Thông báo số đăng ký của chúng tôi đối với các doanh nghiệp phát ...
                        </span>
                        <span className='text-gray-750 text-[20px] ml-6'>15/03/2024</span>
                    </div>
                    <div className='flex flex-row justify-center items-center'>
                        <div className='bg-teal-550 rounded-full min-h-4 min-w-4 mr-2 mt-2 hidden'></div>
                        <p className='text-left text-gray-750 text-[16px]'>
                            Consult with top doctors across various specialties via video or chat communication. It’s
                            totally secure, private, and convenient. Choose the best time for an in-person visit with
                            our easy-to-use scheduling system, or proceed with our online consultation.
                        </p>
                    </div>
                </div>

                {/* See more */}
                <div className='w-full flex justify-center items-center mt-9 mb-24'>
                    <a
                        href='/news'
                        className='flex justify-center items-center bg-teal-550 hover:bg-white border border-teal-550 rounded-full w-full px-2 min-h-[48px] max-w-[194px] hover:text-teal-550 text-white font-bold text-[16px] cursor-pointer'>
                        Xem thêm
                    </a>
                </div>
            </section>

            {/* Advise */}
            <section className='w-full text-white'>
                <div className='w-full max-w-screen-6xl relative mx-auto z-10'>
                    <img
                        src='/images/homepage/contact.png'
                        alt='contact'
                        width={1183}
                        height={259}
                        className='aspect-auto max-md:h-[152px] object-cover'
                    />
                    <div className='w-full absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex justify-between items-center max-md:flex-col max-md:items-start'>
                        <div className='basis-2/3 text-left ml-16 max-md:ml-6'>
                            <h2 className='font-bold text-[32px] max-md:text-[18px]'>
                                Tư vấn miễn phí với chất lượng vượt trội
                            </h2>
                            <p className='text-2xl max-md:text-[12px]'>
                                Liên hệ ngay với chúng tôi: <span className='font-bold'>+84-37-443-1461</span>
                            </p>
                        </div>
                        <div className='flex justify-center items-center basis-1/3 max-md:ml-6 max-md:mt-4'>
                            <a
                                href='#'
                                className='flex justify-center items-center bg-teal-550 text-white hover:bg-white hover:text-teal-550 border border-teal-550 rounded-full w-full px-2 max-md:px-4 min-h-[48px] max-w-[282px] max-md:max-w-[200px] max-md:max-h-[10px] max-md:text-[12px] font-bold text-[16px] cursor-pointer'>
                                NHẬN TƯ VẤN CỦA BẠN
                            </a>
                        </div>
                    </div>
                </div>
                <div className='w-full relative z-0 -translate-y-1/2'>
                    <img src='/images/homepage/bg-contact.png' alt='bg-contact' className='aspect-auto' />
                </div>
            </section>

            {/* Contact form */}
            <section className='max-w-screen-6xl w-full mx-auto mb-36 max-md:p-4 p-8'>
                <div className='grid grid-cols-2 max-md:grid-cols-1'>
                    <div className='flex flex-col max-sm:text-center'>
                        <h2 className='text-4xl text-teal-550 font-bold pb-5'>KẾT NỐI NGAY VỚI XUSUX</h2>
                        <p className='text-[20px] mb-14 w-4/5 max-md:w-full'>
                            Chúng tôi luôn sẵn sàng lắng nghe và đưa ra giải pháp phù hợp nhất cho vấn đề của bạn.
                        </p>
                        <div className='grid grid-cols-2 max-md:grid-cols-1 gap-16 '>
                            <div className='flex flex-col max-md:justify-center max-md:items-center'>
                                <div className='h-[50px] w-[50px] bg-teal-550 rounded-full flex justify-center items-center mb-6'>
                                    <WhiteMailIcon />
                                </div>
                                <h4 className='font-bold text-2xl mb-3'>Email</h4>
                                <p className='text-[20px]'>info.xusux@gmail.com</p>
                            </div>

                            <div className='flex flex-col max-md:justify-center max-md:items-center'>
                                <div className='h-[50px] w-[50px] bg-teal-550 rounded-full flex justify-center items-center mb-6'>
                                    <WhitePhoneIcon />
                                </div>
                                <h4 className='font-bold text-2xl mb-3'>Điện thoại</h4>
                                <p className='text-[20px]'>+84-37-443-1461</p>
                            </div>

                            <div className='flex flex-col max-md:justify-center max-md:items-center'>
                                <div className='h-[50px] w-[50px] bg-teal-550 rounded-full flex justify-center items-center mb-6'>
                                    <WhiteMapIcon />
                                </div>
                                <h4 className='font-bold text-2xl mb-3'>Địa chỉ</h4>
                                <p className='text-[20px]'>
                                    Tòa nhà Luxury Office <br />
                                    125A Mỹ Đình, Nam Từ Liêm, Hà Nội, Việt Nam
                                </p>
                            </div>
                            <div className='flex flex-col max-md:justify-center max-md:items-center'>
                                <div className='h-[50px] w-[50px] bg-teal-550 rounded-full flex justify-center items-center mb-6'>
                                    <WhiteComputerIcon />
                                </div>
                                <h4 className='font-bold text-2xl mb-3'>Mạng xã hội</h4>
                                <div className='flex flex-row gap-4'>
                                    <FacebookIcon className='h-15 w-15 cursor-pointer' />
                                    <InstagramIcon className='h-15 w-15 cursor-pointer' />
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
            </section>
        </>
    );
}

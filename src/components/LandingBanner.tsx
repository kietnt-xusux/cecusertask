import Nav from "@/components/Nav";

const LandingBanner = () => {
    return (
        <div className='bg-banner pt-4'>
            <Nav />

            <div className='flex justify-center items-center pt-20 pb-24'>
                <img src="/images/homepage/banner.png" alt="banner"/>
            </div>
        </div>
    );
};

export default LandingBanner;

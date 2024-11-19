import type { Metadata } from 'next';
import './globals.css';
import StoreProvider from '@/stores';
import LandingHeader from '@/components/LandingHeader';
import { Footer } from '@/components';
import { ToastContainer } from 'react-toastify';
import Head from 'next/head';

export const metadata: Metadata = {
    title: 'Xusux Viet Nam',
    description: 'Xusux Viet Nam',
    openGraph: {
        url: 'https://xusux.com.vn',
        type: 'website',
        title: 'Xusux Viet Nam',
        description: 'Xusux Viet Nam',
        siteName: 'Xusux Viet Nam',
        images: [
            {
                url: 'https://xusux.com.vn/images/metadata_image.png'
            }
        ]
    }
};

export default function RootLayout({
                                       children
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='ja' suppressHydrationWarning={true}>
        <Head>
            <link rel='preconnect' href='https://fonts.googleapis.com' />
            <link rel='preconnect' href='https://fonts.gstatic.com' />
            <link
                href='https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Noto+Sans+JP:wght@100..900&display=swap'
                rel='stylesheet'
            />
        </Head>
        <body suppressHydrationWarning={true} className={`antialiased`}>
        <StoreProvider lastUpdate={new Date().getTime()}>
            <ToastContainer hideProgressBar={true} autoClose={5000} />
            <div className='flex flex-col w-full min-h-screen overflow-hidden'>
                <LandingHeader />

                {children}

                <Footer />
            </div>
        </StoreProvider>
        </body>
        </html>
    );
}

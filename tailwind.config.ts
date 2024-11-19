/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/**/*.{jsx,tsx,mdx}",
    ],
    theme: {
        screens: {
            md: '768px',
            // => @media (min-width: 768px)

            lg: '1024px',
            // => @media (min-width: 1024px)

            xl: '1280px',
            // => @media (min-width: 1280px)

            '2xl': '1536px',
            // => @media (min-width: 1536px)

            '3xl': '1730px',
            // => @media (min-width: 1730px)
            sp: '390px',
            sm: '640px',
            ...defaultTheme.screens
        },
        extend: {
            colors: {
                teal: {
                    550: '#00a199'
                },
                gray: {
                    150: '#F2F2F2',
                    350: '#D9D9D9',
                    650: '#37393F',
                    750: '#474747'
                }
            },
            backgroundImage: {
                banner: "url('/images/homepage/bg-banner.png')",
                service: "url('/images/homepage/bg-service-us.png')",
                footer: "url('/images/homepage/bg-footer.png')",
                'company-banner': "url('/images/company/bg-banner.png')",
                project: "url('/images/company/bg-project.png')",
                'news-banner': "url('/images/news/bg-banner.png')",
                'news-detail-banner': "url('/images/news/thumbnail.png')"
            },
            paddingBottom: {
                68: '17rem'
            },
            boxShadow: {
                'image-before': '0px 0px 20px 5px rgba(0, 0, 0, 0.4)',
                'image-after': '-10px 10px 20px 5px rgba(0, 0, 0, 0.4)'
            },
            maxWidth: {
                '104': '26rem',
                'screen-3xl': '1336px',
                'screen-6xl': '1180px'
            }
        }
    },
    plugins: [],
};
export default config;

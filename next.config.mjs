/** @type {import('next').NextConfig} */
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js';

const nextConfig = (phase, {defaultConfig}) => {
    return phase === PHASE_DEVELOPMENT_SERVER ?
        {
            assetPrefix:  'http://localhost:3000',
            headers() {
                return [
                    {
                        source: '/:path*',
                        headers: [
                            { "key": "Access-Control-Allow-Credentials", "value": "true" },
                            { "key": "Access-Control-Allow-Origin", "value": "*" },
                            { "key": "Access-Control-Allow-Headers", "value": "*" },
                            { "key": "Access-Control-Allow-Methods", "value": "*" },
                        ],
                    },
                ]
            },
            experimental: {
                serverActions: {
                    allowedOrigins: ['base.lol'],
                },
            },
        } :
        {
            output: 'export',
            distDir: '../public/build',
            assetPrefix: '/build',
        }
};

export default nextConfig;

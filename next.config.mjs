/** @type {import('next').NextConfig} */
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js';

const nextConfig = (phase, {defaultConfig}) => {
    return {
        output: phase === PHASE_DEVELOPMENT_SERVER ? defaultConfig.output : "export",
        distDir: phase === PHASE_DEVELOPMENT_SERVER ? defaultConfig.distDir : '../public/build',
        assetPrefix: phase === PHASE_DEVELOPMENT_SERVER ? 'http://localhost:3000' : '/build',
        headers() {
            return [
                {
                    source: '/:path*',
                    headers: [
                        { "key": "Access-Control-Allow-Credentials", "value": "true" },
                        { "key": "Access-Control-Allow-Origin", "value": "*" },
                        { "key": "Access-Control-Allow-Headers", "value": "*" },
                    ],
                },
            ]
        }
    }
};

export default nextConfig;

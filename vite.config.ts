import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import * as path from 'path'
import { splitVendorChunkPlugin } from 'vite'
import legacy from '@vitejs/plugin-legacy';
import 'dotenv/config';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        splitVendorChunkPlugin(),
        // uncomment if need support ie 11
        // legacy({
        //     targets: ['ie >= 11'],
        //     additionalLegacyPolyfills: ['regenerator-runtime/runtime']
        // })
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './resources/ts'),
        }
    },
    server: {
        port: parseInt(process.env.VITE_PORT ?? '3000')
    },
    clearScreen: false,
    build: {
        target: 'modules',
        outDir: 'public/dist',
        emptyOutDir: true,
        rollupOptions: {
            output: {
                entryFileNames: `assets/[name].js`,
                chunkFileNames: `assets/[name].js`,
                assetFileNames: `assets/[name].[ext]`
                // manualChunks(id) {
                //     if (id.includes('react') && !id.includes('css')) {
                //         return 'react';
                //     }
                //     if (id.includes('pdf') && !id.includes('css')) {
                //         return 'pdf-vendor';
                //     }
                // }
            },
        }
    }
})

import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/**/*.{jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                teal: {
                    450: '#00A29A',
                    650: '#006f6a',
                }
            },
        },
    },
    plugins: [],
};
export default config;

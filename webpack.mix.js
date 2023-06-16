const mix = require('laravel-mix');
const path = require("path");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.ts('resources/ts/app.tsx', 'public/js')
    .postCss('resources/css/app.css', 'public/css', [
        require("tailwindcss"),
        require("autoprefixer"),
    ]);
// extract react lib to react.vendor
mix.extract({
    to: 'js/react.vendor.js',
    libraries: /react|redux|history|hot/
});
mix.extract();
// alias for root dir
mix.alias({
    '@': path.join(__dirname, 'resources/ts'),
})

// config babel for hot module replacement
mix.babelConfig({
    presets: [
        [
            '@babel/preset-env',
            {
                modules: 'auto',
                targets: { node: 'current' }
            },
            '@babel/preset-react',
        ]
    ],
    plugins: [
        [
            'react-hot-loader/babel',
            '@babel/plugin-proposal-class-properties',
            {
                loose: true
            },
        ],
        '@babel/plugin-syntax-dynamic-import'
    ]
})
mix.disableSuccessNotifications();

// use react-dom instead of @hot-loader/react-dom in production
if (!mix.inProduction()) {
    mix.webpackConfig({
        resolve: {
            alias: {
                'react-dom': '@hot-loader/react-dom'
            }
        }
    })
}
// webpack-bundle-analyzer uncomment when need
mix.webpackConfig({
    plugins: [
        //new BundleAnalyzerPlugin()
    ]
})

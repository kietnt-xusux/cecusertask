# Base project

Laravel 11 + NextJS + Typescript + Zudstand + Tailwindcss

## Installing

You can install this project with composer and yarn

``` bash
$ composer install
$ yarn install
$ cp .env.example .env
$ php artisan key:generate
$ php artisan migrate
$ php artisan db:seed
$ php artisan storage:link
```

## Configuration

``` bash
Edit .env
APP_URL
API_URL
BUILD_DIR

Database config
```

## NextJS Config
```bash
const nextConfig = {
    output: "export",
    basePath: env('BUILD_DIR')
};
```
## Build

``` bash
$ yarn build
```

## Develop
``` bash
$ yarn dev

/node_modules/next/dist/client/components/app-router.js
317
origin: 'http://localhost:3000'
```

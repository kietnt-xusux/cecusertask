<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ env('APP_NAME') }}</title>
    @if(env('APP_ENV') === 'production')
        <link href="{{ asset('assets/index.css?v='.env('APP_VERSION', '1.0')) }}" rel="stylesheet">
    @elseif(env('APP_ENV') === 'site_test')
        <link href="{{ asset('dist/assets/index.css?v='.env('APP_VERSION', '1.0')) }}" rel="stylesheet">
    @endif
    <script>
        let baseUrl = '{{ env('APP_URL') }}',
            appName = '{{ env('APP_NAME') }}',
            appEnv = '{{ env('APP_ENV') }}',
            fontRegular, fontBold, fontGothic;
    </script>
</head>
<body>
    <div id="app">
        <div class="flex h-screen justify-center items-center">
            <div class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
    </div>
</body>
@include('elements.footer')
</html>

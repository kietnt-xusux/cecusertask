@if( env('APP_ENV') === 'local' )
    <script type="module" src="http://localhost:{{env('VITE_PORT')}}/@@vite/client"></script>
    <script type="module">
        import RefreshRuntime from "http://localhost:{{env('VITE_PORT')}}/@react-refresh"
        RefreshRuntime.injectIntoGlobalHook(window)
        window.$RefreshReg$ = () => {}
        window.$RefreshSig$ = () => (type) => type
        window.__vite_plugin_react_preamble_installed__ = true
    </script>
    <script type="module" src="http://localhost:{{env('VITE_PORT')}}/resources/ts/app.tsx"></script>
@elseif(env('APP_ENV') === 'site_test')
    <script type="module" crossorigin src="{{ asset('dist/assets/index.js?v='.env('APP_VERSION', '1.0')) }}"></script>
    <link rel="modulepreload" href="{{ asset('dist/assets/vendor.js?v='.env('APP_VERSION', '1.0')) }}/">
    <link rel="modulepreload" href="{{ asset('dist/assets/react-vendor.js?v='.env('APP_VERSION', '1.0')) }}/">
    <link rel="modulepreload" href="{{ asset('dist/assets/pdf-vendor.js?v='.env('APP_VERSION', '1.0')) }}/">
@else
    <script type="module" crossorigin src="{{ asset('assets/index.js?v='.env('APP_VERSION', '1.0')) }}"></script>
    <link rel="modulepreload" href="{{ asset('assets/vendor.js?v='.env('APP_VERSION', '1.0')) }}/">
    <link rel="modulepreload" href="{{ asset('assets/react-vendor.js?v='.env('APP_VERSION', '1.0')) }}/">
    <link rel="modulepreload" href="{{ asset('assets/pdf-vendor.js?v='.env('APP_VERSION', '1.0')) }}/">
@endif

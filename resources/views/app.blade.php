<script>
    let baseUrl = '{{ env('APP_URL') }}', loadedFont,
        appName = '{{ env('APP_NAME') }}',
        env = '{{ env('APP_ENV') }}';

    const windowHeight = () => {
        const doc = document.documentElement
        doc.style.setProperty('--window-height', `${window.innerHeight}px`)
    }
    window.addEventListener('resize', windowHeight);
    windowHeight();
</script>

{!!
    file_get_contents('http://localhost:3000/' . $any, false , stream_context_create([
        'http' => array('ignore_errors' => true),
    ]));
!!}

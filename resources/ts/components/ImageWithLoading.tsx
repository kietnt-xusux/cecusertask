import React, {useEffect, useRef, useState} from "react";

export const ImageWithLoading = (props: {width?: number, height?: number, src: string, className?: string, alt?: string}) => {
    const [loaded, setLoaded] = useState(false);
    const [src, setSrc] = useState('');
    const _isMounted = useRef(true);

    useEffect(() => {
        return () => {
            _isMounted.current = false;
        }
    }, []);

    useEffect(() => {
        const image = new Image();
        image.onload = () => {
            if (!_isMounted.current) return;
            setLoaded(true);
        }
        image.src = props.src;
        image.onerror = () => {
            setSrc('/img/default.png');
            setLoaded(true);
        }
        setSrc(props.src);

    }, [props.src]);

    const onError = () => {
        setSrc('/img/default.png');
    }

    return loaded ? <img src={src} alt={props.alt ?? ''} onError={onError} className={props.className ?? ''} /> :
        <div className={`aspect-w-${props.width ?? 1} aspect-h-${props.height ?? 1} animate-pulse bg-gray-200`} />
}

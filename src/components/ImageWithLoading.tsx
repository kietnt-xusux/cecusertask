import {useEffect, useState} from "react";
import {UserCircleSolidIcon} from "@/components/Icon";

interface ImageWithLoadingProps {
    src: string,
    className?: string,
    alt?: string,
    width?: number,
    height?: number,
}

export const ImageWithLoading = ({src, className, alt}: ImageWithLoadingProps) => {
    const [loaded, setLoaded] = useState(false);
    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
        const image = new Image();
        image.onload = () => {
            setLoaded(true);
        }
        image.src = src;
        setImageSrc(src);
    }, [src]);

    return <>
        { loaded ?
            <img src={imageSrc} alt={alt ?? ''} className={className ?? ''} /> :
            <div className={`${className ?? ''} animate-pulse bg-gray-200 w-full h-full`} />
        }
    </>
}

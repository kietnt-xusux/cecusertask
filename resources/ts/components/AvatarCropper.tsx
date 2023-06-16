import React, {Fragment, useRef, useState} from 'react';
import Cropper from 'cropperjs';
import {Dialog, Transition} from "@headlessui/react";
import {toast} from "react-toastify";
import "cropperjs/dist/cropper.css";

interface ReactCropperElement extends HTMLImageElement {
    cropper: Cropper;
}

type ReactCropperRef =
    | ((instance: HTMLImageElement | ReactCropperElement | null) => void)
    | React.MutableRefObject<HTMLImageElement | ReactCropperElement | null>
    | null;

interface ReactCropperDefaultOptions {
    scaleX?: number;
    scaleY?: number;
    enable?: boolean;
    zoomTo?: number;
    rotateTo?: number;
}

interface ReactCropperProps
    extends ReactCropperDefaultOptions,
        Cropper.Options<HTMLImageElement>,
        Omit<React.HTMLProps<HTMLImageElement>, 'data' | 'ref' | 'crossOrigin'> {
    crossOrigin?: '' | 'anonymous' | 'use-credentials' | undefined;
    on?: (eventName: string, callback: () => void | Promise<void>) => void | Promise<void>;
    onInitialized?: (instance: Cropper) => void | Promise<void>;
    inputRef: React.MutableRefObject<HTMLInputElement | null>;
    resultImage: any;
}

const applyDefaultOptions = (cropper: Cropper, options: ReactCropperDefaultOptions = {}): void => {
    const {enable = true, scaleX = 1, scaleY = 1, zoomTo = 0, rotateTo} = options;
    enable ? cropper.enable() : cropper.disable();
    cropper.scaleX(scaleX);
    cropper.scaleY(scaleY);
    rotateTo !== undefined && cropper.rotateTo(rotateTo);
    zoomTo > 0 && cropper.zoomTo(zoomTo);
};

const useCombinedRefs = (...refs: ReactCropperRef[]): React.RefObject<ReactCropperElement> => {
    const targetRef = useRef<ReactCropperElement>(null);

    React.useEffect(() => {
        refs.forEach((ref) => {
            if (!ref) return;

            if (typeof ref === 'function') {
                ref(targetRef.current);
            } else {
                ref.current = targetRef.current;
            }
        });
    }, [refs]);

    return targetRef;
};

export const AvatarCropper = React.forwardRef<ReactCropperElement | HTMLImageElement, ReactCropperProps>(({...props}, ref) => {
    const {
        dragMode = 'crop',
        crossOrigin,
        scaleX,
        scaleY,
        enable,
        zoomTo,
        rotateTo,
        alt = 'picture',
        ready,
        onInitialized,
    } = props;
    const defaultOptions: ReactCropperDefaultOptions = {scaleY, scaleX, enable, zoomTo, rotateTo};
    const innerRef = useRef<HTMLImageElement>(null);
    const combinedRef = useCombinedRefs(ref, innerRef);
    const [open, setOpen] = useState(false);
    const [src, setSrc] = useState('');

    const imageProps = React.useMemo(() => ({crossOrigin, src, alt}), [crossOrigin, src, alt]);

    const cleanedMimes = () => {
        return 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon';
    }

    const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            onFileChange(e.target.files[0]);
        } else {
            return
        }
    }

    const onFileChange = (file: File) => {
        const correctType = cleanedMimes()
            .split(', ')
            .find(mime => mime === file.type)

        if (!correctType) {
            toast.error('画像ファイルを選択してください。');
            return
        }
        const reader = new FileReader()
        reader.onload = e => {
            setSrc(e.target?.result as string);
            setOpen(true);
        }
        reader.readAsDataURL(file)
    }

    const closeModal = () => {
        setOpen(false);
        if (props.inputRef.current) {
            props.inputRef.current.value = '';
        }
    }

    const initCropper = () => {
        if (combinedRef.current !== null) {
            const cropper = new Cropper(combinedRef.current, {
                dragMode,
                aspectRatio: 1,
                autoCropArea: 1,
                viewMode: 1,
                movable: false,
                zoomable: false,
                ready: (e) => {
                    if (e.currentTarget !== null) {
                        applyDefaultOptions(e.currentTarget.cropper, defaultOptions);
                    }
                    ready && ready(e);
                },
            });
            onInitialized && onInitialized(cropper);
        }
    }

    const cropImage = () => {
        combinedRef.current?.cropper?.getCroppedCanvas({
            width: 300,
            height: 300
        }).toBlob(blob => {
            props.resultImage(blob);
            closeModal();
        }, );
    }

    return (
        <>
            <Transition show={open} as={Fragment}>
                <Dialog as="div" className="fixed inset-0 z-1000 overflow-y-auto" onClose={() => closeModal()}>
                    <div className="min-h-screen px-4 text-center opa">
                        <Dialog.Overlay className="fixed inset-0 bg-gray-100 opacity-80" />
                        <span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                            afterEnter={initCropper}
                        >
                            <div className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <p className="font-bold text-2xl">作物のアバター</p>
                                <div className="mt-2">
                                    <img {...imageProps} ref={combinedRef} alt=""/>
                                </div>

                                <div className="flex justify-end mt-4">
                                    <button className="w-32 inline-flex justify-center py-2 px-4 border shadow-sm text-sm font-medium rounded-md bg-white hover:bg-gray-100 focus:outline-none"
                                        onClick={closeModal}>
                                        キャンセル
                                    </button>
                                    <button className="w-32 ml-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                                        onClick={cropImage}>
                                        確定
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
            <input className="hidden" ref={props.inputRef} type="file" accept={cleanedMimes()} onInput={onFileInputChange} />
        </>
    );
});

import React, { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Upload, X, RotateCw, ZoomIn, ZoomOut, Crop } from 'lucide-react';

// Import Cropper
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';

interface AvatarUploadProps {
    value?: string;
    onChange: (value: string) => void;
    label?: string;
}

export default function AvatarUpload({ value, onChange, label = "Avatar" }: AvatarUploadProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [imageSrc, setImageSrc] = useState<string>('');
    const [cropperInstance, setCropperInstance] = useState<Cropper | null>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result as string;
                setImageSrc(result);
                setIsOpen(true);
            };
            reader.readAsDataURL(file);
        }
    };

    // Initialize cropper when dialog opens
    useEffect(() => {
        if (isOpen && imageSrc) {
            // Small delay to ensure DOM is ready
            const timer = setTimeout(() => {
                if (imageRef.current) {
                    console.log('Initializing cropper...');

                    // Destroy existing cropper
                    if (cropperInstance) {
                        cropperInstance.destroy();
                    }

                    // Create new cropper
                    const cropper = new Cropper(imageRef.current, {
                        aspectRatio: 1,
                        viewMode: 1,
                        dragMode: 'move',
                        autoCropArea: 1,
                        restore: false,
                        guides: true,
                        center: true,
                        highlight: false,
                        cropBoxMovable: true,
                        cropBoxResizable: true,
                        toggleDragModeOnDblclick: false,
                    });

                    setCropperInstance(cropper);
                    console.log('Cropper initialized:', cropper);
                }
            }, 200);

            return () => clearTimeout(timer);
        }
    }, [isOpen, imageSrc]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (cropperInstance) {
                cropperInstance.destroy();
            }
        };
    }, [cropperInstance]);

    const handleCrop = () => {
        if (!cropperInstance) {
            console.error('No cropper instance');
            return;
        }

        try {
            const canvas = cropperInstance.getCroppedCanvas({
                width: 200,
                height: 200,
            });

            if (canvas) {
                const croppedImageUrl = canvas.toDataURL('image/jpeg', 0.9);
                onChange(croppedImageUrl);
                handleClose();
            }
        } catch (error) {
            console.error('Error cropping:', error);
        }
    };

    const handleClose = () => {
        if (cropperInstance) {
            cropperInstance.destroy();
            setCropperInstance(null);
        }
        setIsOpen(false);
        setImageSrc('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const rotateLeft = () => {
        if (cropperInstance) {
            cropperInstance.rotate(-90);
        }
    };

    const rotateRight = () => {
        if (cropperInstance) {
            cropperInstance.rotate(90);
        }
    };

    const zoomIn = () => {
        if (cropperInstance) {
            cropperInstance.zoom(0.1);
        }
    };

    const zoomOut = () => {
        if (cropperInstance) {
            cropperInstance.zoom(-0.1);
        }
    };

    const resetCrop = () => {
        if (cropperInstance) {
            cropperInstance.reset();
        }
    };

    return (
        <div className="space-y-4">
            <div>
                <Label htmlFor="avatar">{label}</Label>
                <div className="mt-2 flex items-center space-x-4">
                    {/* Current Avatar Preview */}
                    <div className="relative">
                        <img
                            src={value || 'https://via.placeholder.com/100x100.png/005555?text=user'}
                            alt="Avatar"
                            className="h-20 w-20 rounded-full object-cover border-2 border-gray-200"
                        />
                        {value && (
                            <button
                                type="button"
                                onClick={() => onChange('')}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                            >
                                <X className="h-3 w-3" />
                            </button>
                        )}
                    </div>

                    {/* Upload Button */}
                    <div>
                        <Input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileSelect}
                            className="hidden"
                            id="avatar-upload"
                        />
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <Upload className="h-4 w-4 mr-2" />
                            Upload Image
                        </Button>
                    </div>
                </div>
            </div>

            {/* Crop Dialog */}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
                    <DialogHeader>
                        <DialogTitle>Crop Avatar</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4">
                        {/* Debug Info */}
                        <div className="text-sm text-gray-500 bg-gray-100 p-2 rounded">
                            Cropper Status: {cropperInstance ? 'Active' : 'Not initialized'} |
                            Image Src: {imageSrc ? 'Loaded' : 'Not loaded'}
                        </div>

                        {/* Crop Controls */}
                        <div className="flex items-center justify-center space-x-2 flex-wrap">
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={rotateLeft}
                                disabled={!cropperInstance}
                            >
                                <RotateCw className="h-4 w-4 mr-1" />
                                Rotate Left
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={rotateRight}
                                disabled={!cropperInstance}
                            >
                                <RotateCw className="h-4 w-4 mr-1 rotate-180" />
                                Rotate Right
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={zoomIn}
                                disabled={!cropperInstance}
                            >
                                <ZoomIn className="h-4 w-4 mr-1" />
                                Zoom In
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={zoomOut}
                                disabled={!cropperInstance}
                            >
                                <ZoomOut className="h-4 w-4 mr-1" />
                                Zoom Out
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={resetCrop}
                                disabled={!cropperInstance}
                            >
                                <Crop className="h-4 w-4 mr-1" />
                                Reset
                            </Button>
                        </div>

                        {/* Crop Area */}
                        <div className="max-h-96 overflow-hidden border border-gray-200 rounded-lg">
                            <img
                                ref={imageRef}
                                src={imageSrc}
                                alt="Crop preview"
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '100%',
                                    display: 'block'
                                }}
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            onClick={handleCrop}
                            disabled={!cropperInstance}
                        >
                            Crop & Save
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
} 
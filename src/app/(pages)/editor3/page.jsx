'use client';

import React, { useState, useRef } from 'react';
import { X, Download, RotateCw } from 'lucide-react';

export default function PhotoFrameEditor() {
    const [image, setImage] = useState(null);
    const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
    const [imageScale, setImageScale] = useState(1);
    const [frameThickness, setFrameThickness] = useState(20);
    const [frameShape, setFrameShape] = useState('square');
    const [frameColor] = useState('#000000');
    const [matColor] = useState('#FFFFFF');
    const [hasFrame, setHasFrame] = useState(true);
    const [isPortrait, setIsPortrait] = useState(true);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const fileInputRef = useRef(null);

    const frameShapes = [
        { id: 'square', label: 'Square' },
        { id: 'rounded', label: 'Rounded Rectangle' },
        { id: 'extra-rounded', label: 'Extra Rounded' },
        { id: 'circle', label: 'Circle' },
        { id: 'dual-square', label: 'Dual Border Square' },
        { id: 'dual-rounded', label: 'Dual Border Rounded' },
        { id: 'dual-circle', label: 'Dual Border Circle' }
    ];

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    setImage(img);
                    setImagePosition({ x: 0, y: 0 });
                    setImageScale(1);
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    };

    const handleMouseDown = (e) => {
        if (!image) return;
        setIsDragging(true);
        setDragStart({
            x: e.clientX - imagePosition.x,
            y: e.clientY - imagePosition.y
        });
    };

    const handleMouseMove = (e) => {
        if (!isDragging || !image) return;
        setImagePosition({
            x: e.clientX - dragStart.x,
            y: e.clientY - dragStart.y
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleWheel = (e) => {
        if (!image) return;
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        setImageScale(prev => Math.max(0.1, Math.min(3, prev + delta)));
    };

    const toggleOrientation = () => {
        setIsPortrait(!isPortrait);
    };

    const getBorderRadius = () => {
        const isCircle = frameShape === 'circle' || frameShape === 'dual-circle';
        
        if (isCircle) {
            return '50%';
        }

        switch (frameShape) {
            case 'rounded':
            case 'dual-rounded':
                return '20px';
            case 'extra-rounded':
                return '40px';
            default:
                return '0';
        }
    };

    const isDualBorder = frameShape.startsWith('dual-');

    const handleSave = () => {
        if (!image) return;

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const isCircle = frameShape === 'circle' || frameShape === 'dual-circle';
        const baseFrameWidth = isPortrait ? 400 : 600;
        const baseFrameHeight = isPortrait ? 600 : 400;
        
        const frameWidth = isCircle ? (isPortrait ? 400 : 600) : baseFrameWidth;
        const frameHeight = isCircle ? (isPortrait ? 400 : 600) : baseFrameHeight;
        
        const actualFrameThickness = hasFrame ? frameThickness : 0;
        const matWidth = frameWidth - actualFrameThickness * 2;
        const matHeight = frameHeight - actualFrameThickness * 2;

        canvas.width = frameWidth;
        canvas.height = frameHeight;

        // Apply clipping for rounded shapes
        ctx.save();
        ctx.beginPath();
        if (isCircle) {
            ctx.arc(frameWidth / 2, frameHeight / 2, frameWidth / 2, 0, Math.PI * 2);
        } else if (frameShape === 'rounded' || frameShape === 'dual-rounded') {
            const radius = 20;
            ctx.roundRect(0, 0, frameWidth, frameHeight, radius);
        } else if (frameShape === 'extra-rounded') {
            const radius = 40;
            ctx.roundRect(0, 0, frameWidth, frameHeight, radius);
        } else {
            ctx.rect(0, 0, frameWidth, frameHeight);
        }
        ctx.clip();

        if (hasFrame) {
            ctx.fillStyle = frameColor;
            ctx.fillRect(0, 0, frameWidth, frameHeight);
        }

        ctx.fillStyle = matColor;
        ctx.fillRect(actualFrameThickness, actualFrameThickness, matWidth, matHeight);

        ctx.fillStyle = '#E5E7EB';
        const imageAreaPadding = 30;
        ctx.fillRect(
            actualFrameThickness + imageAreaPadding,
            actualFrameThickness + imageAreaPadding,
            matWidth - imageAreaPadding * 2,
            matHeight - imageAreaPadding * 2
        );

        ctx.save();
        ctx.beginPath();
        ctx.rect(
            actualFrameThickness + imageAreaPadding,
            actualFrameThickness + imageAreaPadding,
            matWidth - imageAreaPadding * 2,
            matHeight - imageAreaPadding * 2
        );
        ctx.clip();

        const scaledWidth = image.width * imageScale;
        const scaledHeight = image.height * imageScale;

        ctx.drawImage(
            image,
            actualFrameThickness + imageAreaPadding + imagePosition.x,
            actualFrameThickness + imageAreaPadding + imagePosition.y,
            scaledWidth,
            scaledHeight
        );

        ctx.restore();
        ctx.restore();

        canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'framed-photo.png';
            a.click();
            URL.revokeObjectURL(url);
        });
    };

    const isCircle = frameShape === 'circle' || frameShape === 'dual-circle';
    const baseFrameWidth = isPortrait ? 400 : 600;
    const baseFrameHeight = isPortrait ? 600 : 400;
    const frameWidth = isCircle ? (isPortrait ? 400 : 600) : baseFrameWidth;
    const frameHeight = isCircle ? (isPortrait ? 400 : 600) : baseFrameHeight;
    
    const actualFrameThickness = hasFrame ? frameThickness : 0;
    const borderRadius = getBorderRadius();

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">OMGS® Editor</h1>
                        <p className="text-sm text-gray-600">Home / Acrylic Wall Photo</p>
                    </div>
                    <button className="w-10 h-10 flex items-center justify-center border-2 border-red-600 text-red-600 rounded hover:bg-red-50">
                        <X size={20} />
                    </button>
                </div>

                {/* Toolbar */}
                <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex items-center gap-4 flex-wrap">
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                        Select Photo
                    </button>

                    <button
                        onClick={toggleOrientation}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
                    >
                        <RotateCw size={18} />
                        {isPortrait ? 'Portrait' : 'Landscape'}
                    </button>

                    <div className="flex items-center gap-2">
                        <label className="text-sm text-gray-700">Frame Shape:</label>
                        <select
                            value={frameShape}
                            onChange={(e) => setFrameShape(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {frameShapes.map((shape) => (
                                <option key={shape.id} value={shape.id}>
                                    {shape.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center gap-2">
                        <label className="text-sm text-gray-700">Frame:</label>
                        <button
                            onClick={() => setHasFrame(true)}
                            className={`px-3 py-1 rounded-l border ${hasFrame
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'bg-white text-gray-700 border-gray-300'
                                }`}
                        >
                            Yes
                        </button>
                        <button
                            onClick={() => setHasFrame(false)}
                            className={`px-3 py-1 rounded-r border ${!hasFrame
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'bg-white text-gray-700 border-gray-300'
                                }`}
                        >
                            No
                        </button>
                    </div>

                    {hasFrame && (
                        <div className="flex items-center gap-2">
                            <label className="text-sm text-gray-700">Thickness:</label>
                            <input
                                type="range"
                                min="10"
                                max="50"
                                value={frameThickness}
                                onChange={(e) => setFrameThickness(Number(e.target.value))}
                                className="w-32"
                            />
                            <span className="text-sm text-gray-600 w-12">{frameThickness}px</span>
                        </div>
                    )}

                    {image && (
                        <div className="flex items-center gap-2">
                            <label className="text-sm text-gray-700">Zoom:</label>
                            <input
                                type="range"
                                min="0.1"
                                max="3"
                                step="0.1"
                                value={imageScale}
                                onChange={(e) => setImageScale(Number(e.target.value))}
                                className="w-32"
                            />
                            <span className="text-sm text-gray-600 w-12">{imageScale.toFixed(1)}x</span>
                        </div>
                    )}
                </div>

                {/* Canvas Area */}
                <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
                    <div className="flex items-center justify-center">
                        <div
                            style={{
                                width: `${frameWidth}px`,
                                height: `${frameHeight}px`,
                                backgroundColor: hasFrame ? frameColor : 'transparent',
                                position: 'relative',
                                overflow: 'hidden',
                                borderRadius: borderRadius
                            }}
                        >
                            {/* Frame layer (outer) */}
                            <div
                                style={{
                                    position: 'absolute',
                                    inset: hasFrame ? `${actualFrameThickness}px` : '0',
                                    backgroundColor: matColor,
                                    overflow: 'hidden',
                                    borderRadius: borderRadius
                                }}
                            >
                                {/* Mat border layer */}
                                <div
                                    style={{
                                        position: 'absolute',
                                        inset: '30px',
                                        backgroundColor: '#E5E7EB',
                                        overflow: 'hidden',
                                        cursor: image ? (isDragging ? 'grabbing' : 'grab') : 'default',
                                        borderRadius: borderRadius
                                    }}
                                    onMouseDown={handleMouseDown}
                                    onMouseMove={handleMouseMove}
                                    onMouseUp={handleMouseUp}
                                    onMouseLeave={handleMouseUp}
                                    onWheel={handleWheel}
                                >
                                    {!image ? (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <button
                                                onClick={() => fileInputRef.current?.click()}
                                                className="bg-red-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-700 transition"
                                            >
                                                SELECT<br />PHOTO
                                            </button>
                                        </div>
                                    ) : (
                                        <img
                                            src={image.src}
                                            alt="Uploaded"
                                            style={{
                                                position: 'absolute',
                                                left: `${imagePosition.x}px`,
                                                top: `${imagePosition.y}px`,
                                                width: `${image.width * imageScale}px`,
                                                height: `${image.height * imageScale}px`,
                                                userSelect: 'none',
                                                pointerEvents: 'none'
                                            }}
                                            draggable={false}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Save Button */}
                <button
                    onClick={handleSave}
                    disabled={!image}
                    className={`w-full py-4 rounded-lg font-bold text-white text-lg flex items-center justify-center gap-2 transition ${image
                        ? 'bg-red-600 hover:bg-red-700'
                        : 'bg-gray-400 cursor-not-allowed'
                        }`}
                >
                    <Download size={24} />
                    Save & Download
                </button>

                {/* Instructions */}
                {image && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800">
                            <strong>Tips:</strong> Drag the image to reposition • Use mouse wheel or zoom slider to scale •
                            Choose different frame shapes • Adjust frame thickness
                        </p>
                    </div>
                )}

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                />
            </div>
        </div>
    );
}
'use client';

import React, { useState, useRef } from 'react';
import { X, Download, RotateCw } from 'lucide-react';

export default function PhotoFrameEditor() {
  const [image, setImage] = useState(null);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [imageScale, setImageScale] = useState(1);
  const [frameThickness, setFrameThickness] = useState(20);
  const [acrylicThickness, setAcrylicThickness] = useState('8mm');
  const [selectedSize, setSelectedSize] = useState('48x36');
  const [hasFrame, setHasFrame] = useState(true);
  const [isPortrait, setIsPortrait] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [backgroundColor, setBackgroundColor] = useState('#D1D5DB');
  const fileInputRef = useRef(null);

  const backgroundColors = [
    { name: 'Gray', color: '#D1D5DB' },
    { name: 'Cream', color: '#F5F5DC' },
    { name: 'Light Blue', color: '#ADD8E6' },
    { name: 'Beige', color: '#F5E6D3' },
    { name: 'Mint', color: '#E0F2E9' },
    { name: 'Peach', color: '#FFE5D9' },
    { name: 'Lavender', color: '#E6E6FA' },
    { name: 'White', color: '#FFFFFF' }
  ];

  const sizes = [
    { label: '12x9', width: 200, height: 150 },
    { label: '16x12', width: 250, height: 188 },
    { label: '18x12', width: 280, height: 187 },
    { label: '21x15', width: 320, height: 228 },
    { label: '30x20', width: 400, height: 267 },
    { label: '35x23', width: 450, height: 296 },
    { label: '48x36', width: 550, height: 413 }
  ];

  const thicknessOptions = ['3mm', '5mm', '8mm'];

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

  const getCurrentSize = () => {
    const size = sizes.find(s => s.label === selectedSize);
    if (!size) return { width: 550, height: 413 };
    return isPortrait ? { width: size.height, height: size.width } : size;
  };

  const getThicknessValue = () => {
    return parseInt(acrylicThickness);
  };

  const adjustBrightness = (color, percent) => {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return '#' + (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    ).toString(16).slice(1);
  };

  const handleSave = () => {
    if (!image) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    const currentSize = getCurrentSize();
    const actualFrameThickness = hasFrame ? frameThickness : 0;
    const canvasWidth = currentSize.width + actualFrameThickness * 2;
    const canvasHeight = currentSize.height + actualFrameThickness * 2;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    if (hasFrame) {
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    }

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(actualFrameThickness, actualFrameThickness, currentSize.width, currentSize.height);

    ctx.fillStyle = '#E5E7EB';
    const imageAreaPadding = 20;
    ctx.fillRect(
      actualFrameThickness + imageAreaPadding,
      actualFrameThickness + imageAreaPadding,
      currentSize.width - imageAreaPadding * 2,
      currentSize.height - imageAreaPadding * 2
    );

    ctx.save();
    ctx.beginPath();
    ctx.rect(
      actualFrameThickness + imageAreaPadding,
      actualFrameThickness + imageAreaPadding,
      currentSize.width - imageAreaPadding * 2,
      currentSize.height - imageAreaPadding * 2
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

    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'framed-photo.png';
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  const currentSize = getCurrentSize();
  const actualFrameThickness = hasFrame ? frameThickness : 0;
  const thickness = getThicknessValue();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-white border-b">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">OMGS® Editor</h1>
            <p className="text-sm text-gray-600">Home / Acrylic Wall Photo</p>
          </div>
          <button className="w-10 h-10 flex items-center justify-center border-2 border-red-600 text-red-600 rounded-full hover:bg-red-50">
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Left Side - Preview */}
          <div className="flex-1 p-8 bg-gray-50">
            {/* Background Color Selector */}
            <div className="mb-4 bg-white rounded-lg shadow-sm p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Wall Color:</h3>
              <div className="flex flex-wrap gap-2 items-center">
                {backgroundColors.map((bg) => (
                  <button
                    key={bg.color}
                    onClick={() => setBackgroundColor(bg.color)}
                    className={`w-10 h-10 rounded border-2 transition ${
                      backgroundColor === bg.color
                        ? 'border-black scale-110'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    style={{ backgroundColor: bg.color }}
                    title={bg.name}
                  />
                ))}
                <div className="flex items-center gap-2 ml-2">
                  <label className="text-xs text-gray-600">Custom:</label>
                  <input
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="w-10 h-10 rounded border-2 border-gray-300 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Room Preview */}
            <div 
              className="rounded-lg p-8 relative transition-colors duration-300" 
              style={{ 
                minHeight: '600px',
                backgroundColor: backgroundColor,
                backgroundImage: `linear-gradient(to bottom, ${backgroundColor}, ${adjustBrightness(backgroundColor, -15)})`
              }}
            >
              {/* Wall decoration - Bird cage */}
              <div className="absolute left-8 top-12">
                <div className="w-16 h-20 border-2 border-gray-700 rounded-full relative">
                  <div className="absolute inset-0 flex flex-col justify-around p-2">
                    <div className="border-t border-gray-700"></div>
                    <div className="border-t border-gray-700"></div>
                    <div className="border-t border-gray-700"></div>
                  </div>
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-1 h-10 bg-gray-700"></div>
                </div>
              </div>

              {/* Main Frame Display */}
              <div className="flex items-center justify-center" style={{ marginTop: '80px' }}>
                <div className="relative">
                  <div
                    style={{
                      width: `${currentSize.width + actualFrameThickness * 2}px`,
                      height: `${currentSize.height + actualFrameThickness * 2}px`,
                      backgroundColor: hasFrame ? '#000000' : 'transparent',
                      padding: `${actualFrameThickness}px`,
                      position: 'relative',
                      boxShadow: thickness >= 5 ? `0 ${thickness}px ${thickness * 2}px rgba(0,0,0,0.3)` : '0 2px 4px rgba(0,0,0,0.2)',
                      transform: `translateY(-${thickness / 2}px)`
                    }}
                  >
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#FFFFFF',
                        padding: '20px',
                        position: 'relative'
                      }}
                    >
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          backgroundColor: '#E5E7EB',
                          position: 'relative',
                          overflow: 'hidden',
                          cursor: image ? (isDragging ? 'grabbing' : 'grab') : 'default'
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
                              className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition"
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
                  
                  {/* Thickness indicator */}
                  <div className="text-center mt-2 text-sm text-gray-700">
                    Thickness: {acrylicThickness}
                  </div>
                </div>
              </div>

              {/* Plant decoration */}
              <div className="absolute left-8 bottom-8">
                <div className="w-16 h-24 bg-gray-600 rounded-sm flex items-end justify-center p-2">
                  <div className="space-y-1">
                    <div className="w-2 h-16 bg-green-700 rounded-full"></div>
                    <div className="w-2 h-12 bg-green-700 rounded-full ml-2"></div>
                  </div>
                </div>
              </div>

              {/* Shelf */}
              <div className="absolute left-8 bottom-0">
                <div className="w-32 h-3 bg-gray-700 rounded-t"></div>
                <div className="w-32 h-16 bg-gray-600 border-l-4 border-r-4 border-gray-700"></div>
              </div>

              {/* Mounting text */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-sm text-gray-700">
                Mounting with Premium Steel Studs (Included)
              </div>
            </div>

            {/* Editor Controls */}
            <div className="mt-6 bg-white rounded-lg shadow-sm p-4 flex items-center gap-4 flex-wrap">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition text-sm font-medium"
              >
                Edit
              </button>
              
              <button
                onClick={toggleOrientation}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 transition text-sm"
              >
                <RotateCw size={16} />
                {isPortrait ? 'Portrait' : 'Landscape'}
              </button>

              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-700">Frame:</label>
                <button
                  onClick={() => setHasFrame(true)}
                  className={`px-3 py-1 rounded-l border text-sm ${
                    hasFrame
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-gray-700 border-gray-300'
                  }`}
                >
                  Yes
                </button>
                <button
                  onClick={() => setHasFrame(false)}
                  className={`px-3 py-1 rounded-r border text-sm ${
                    !hasFrame
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-gray-700 border-gray-300'
                  }`}
                >
                  No
                </button>
              </div>

              {hasFrame && (
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-700">Frame Thickness:</label>
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
          </div>

          {/* Right Side - Options */}
          <div className="w-full lg:w-96 bg-white p-6 border-l">
            <div className="mb-6">
              <div className="text-3xl font-bold text-gray-800 mb-2">₹ 24999</div>
              <div className="text-gray-500 line-through">₹ 39999</div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Acrylic Size (Inch):</h3>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size.label}
                    onClick={() => setSelectedSize(size.label)}
                    className={`px-4 py-2 rounded border text-sm font-medium transition ${
                      selectedSize === size.label
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {size.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Thickness Selection */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Acrylic Thickness:</h3>
              <div className="flex gap-2">
                {thicknessOptions.map((thickness) => (
                  <button
                    key={thickness}
                    onClick={() => setAcrylicThickness(thickness)}
                    className={`px-4 py-2 rounded border text-sm font-medium transition ${
                      acrylicThickness === thickness
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {thickness}
                  </button>
                ))}
              </div>
            </div>

            {/* Buy Button */}
            <button className="w-full py-3 bg-red-600 text-white rounded font-bold text-lg hover:bg-red-700 transition mb-4">
              Buy it now
            </button>

            {/* Delivery Check */}
            <div className="mb-4">
              <label className="text-sm text-gray-700 mb-2 block">Check Estimated Delivery Date</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter Pincode"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
                />
                <button className="px-4 py-2 bg-black text-white rounded text-sm font-medium hover:bg-gray-800 transition">
                  Check
                </button>
              </div>
            </div>

            {/* Save Option */}
            <button
              onClick={handleSave}
              disabled={!image}
              className={`w-full py-3 rounded font-medium text-sm flex items-center justify-center gap-2 transition ${
                image
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Download size={18} />
              Save & Download Design
            </button>

            {/* Instructions */}
            {image && (
              <div className="mt-4 p-3 bg-blue-50 rounded text-xs text-blue-800">
                <strong>Tips:</strong> Drag image to reposition • Scroll to zoom • Adjust sizes and thickness
              </div>
            )}
          </div>
        </div>

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
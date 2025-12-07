'use client';

import React, { useState, useRef } from 'react';
import { X, Download, RotateCw } from 'lucide-react';

export default function PhotoFrameEditor() {
  const [image, setImage] = useState(null);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [imageScale, setImageScale] = useState(1);
  const [frameThickness, setFrameThickness] = useState(20);
  const [hasFrame, setHasFrame] = useState(true);
  const [isPortrait, setIsPortrait] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);

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

  const handleSave = () => {
    if (!image) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    const frameWidth = isPortrait ? 400 : 600;
    const frameHeight = isPortrait ? 600 : 400;
    const actualFrameThickness = hasFrame ? frameThickness : 0;
    const matWidth = frameWidth - actualFrameThickness * 2;
    const matHeight = frameHeight - actualFrameThickness * 2;

    canvas.width = frameWidth;
    canvas.height = frameHeight;

    // Draw frame (only if hasFrame is true)
    if (hasFrame) {
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, frameWidth, frameHeight);
    }

    // Draw white mat
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(actualFrameThickness, actualFrameThickness, matWidth, matHeight);

    // Draw image area
    ctx.fillStyle = '#E5E7EB';
    const imageAreaPadding = 30;
    ctx.fillRect(
      actualFrameThickness + imageAreaPadding,
      actualFrameThickness + imageAreaPadding,
      matWidth - imageAreaPadding * 2,
      matHeight - imageAreaPadding * 2
    );

    // Save and clip image
    ctx.save();
    ctx.beginPath();
    ctx.rect(
      actualFrameThickness + imageAreaPadding,
      actualFrameThickness + imageAreaPadding,
      matWidth - imageAreaPadding * 2,
      matHeight - imageAreaPadding * 2
    );
    ctx.clip();

    // Calculate image dimensions and position
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

    // Download
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'framed-photo.png';
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  const frameWidth = isPortrait ? 400 : 600;
  const frameHeight = isPortrait ? 600 : 400;
  const actualFrameThickness = hasFrame ? frameThickness : 0;
  const matWidth = frameWidth - actualFrameThickness * 2;
  const matHeight = frameHeight - actualFrameThickness * 2;

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
            <label className="text-sm text-gray-700">Frame:</label>
            <button
              onClick={() => setHasFrame(true)}
              className={`px-3 py-1 rounded-l border ${
                hasFrame
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300'
              }`}
            >
              Yes
            </button>
            <button
              onClick={() => setHasFrame(false)}
              className={`px-3 py-1 rounded-r border ${
                !hasFrame
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
                backgroundColor: hasFrame ? '#000000' : 'transparent',
                padding: `${actualFrameThickness}px`,
                position: 'relative'
              }}
            >
              {/* White Mat */}
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#FFFFFF',
                  padding: '30px',
                  position: 'relative'
                }}
              >
                {/* Image Area */}
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
          className={`w-full py-4 rounded-lg font-bold text-white text-lg flex items-center justify-center gap-2 transition ${
            image
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
              Adjust frame thickness with the slider • Switch between portrait and landscape modes
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

'use client';
import React, { useState, useRef, useCallback } from 'react';
import { X, Download, RotateCw, Upload, ZoomIn, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type FrameShape = 
  | 'square' 
  | 'rounded' 
  | 'extra-rounded' 
  | 'circle' 
  | 'dual-square' 
  | 'dual-rounded' 
  | 'dual-circle';

interface ImagePosition {
  x: number;
  y: number;
}

const frameShapes: { id: FrameShape; label: string }[] = [
  { id: 'square', label: 'Square' },
  { id: 'rounded', label: 'Rounded Rectangle' },
  { id: 'extra-rounded', label: 'Extra Rounded' },
  { id: 'circle', label: 'Circle' },
  { id: 'dual-square', label: 'Dual Border Square' },
  { id: 'dual-rounded', label: 'Dual Border Rounded' },
  { id: 'dual-circle', label: 'Dual Border Circle' },
];

export default function PhotoFrameEditor() {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [imagePosition, setImagePosition] = useState<ImagePosition>({ x: 0, y: 0 });
  const [imageScale, setImageScale] = useState(1);
  const [frameThickness, setFrameThickness] = useState(20);
  const [frameShape, setFrameShape] = useState<FrameShape>('square');
  const [hasFrame, setHasFrame] = useState(true);
  const [isPortrait, setIsPortrait] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<ImagePosition>({ x: 0, y: 0 });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isCircle = frameShape === 'circle' || frameShape === 'dual-circle';
  const isDualBorder = frameShape.startsWith('dual-');

  const getFrameDimensions = useCallback(() => {
    if (isCircle) {
      const size = isPortrait ? 400 : 500;
      return { width: size, height: size };
    }
    return {
      width: isPortrait ? 400 : 550,
      height: isPortrait ? 550 : 400,
    };
  }, [isCircle, isPortrait]);

  const getBorderRadius = useCallback((): string => {
    if (isCircle) return '50%';
    switch (frameShape) {
      case 'rounded':
      case 'dual-rounded':
        return '20px';
      case 'extra-rounded':
        return '40px';
      default:
        return '0px';
    }
  }, [frameShape, isCircle]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          setImage(img);
          setImagePosition({ x: 0, y: 0 });
          setImageScale(1);
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!image) return;
    setIsDragging(true);
    setDragStart({
      x: e.clientX - imagePosition.x,
      y: e.clientY - imagePosition.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !image) return;
    setImagePosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (!image) return;
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setImageScale((prev) => Math.max(0.1, Math.min(3, prev + delta)));
  };

  const handleSave = () => {
    if (!image) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width: frameWidth, height: frameHeight } = getFrameDimensions();
    const actualFrameThickness = hasFrame ? frameThickness : 0;
    const matPadding = 30;

    canvas.width = frameWidth;
    canvas.height = frameHeight;

    ctx.save();
    ctx.beginPath();

    const borderRadius = getBorderRadius();
    if (isCircle) {
      ctx.arc(frameWidth / 2, frameHeight / 2, frameWidth / 2, 0, Math.PI * 2);
    } else if (borderRadius !== '0px') {
      const radius = parseInt(borderRadius);
      ctx.roundRect(0, 0, frameWidth, frameHeight, radius);
    } else {
      ctx.rect(0, 0, frameWidth, frameHeight);
    }
    ctx.clip();

    // Draw frame (black)
    if (hasFrame) {
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, frameWidth, frameHeight);
    }

    // Draw mat (white)
    const matX = actualFrameThickness;
    const matY = actualFrameThickness;
    const matWidth = frameWidth - actualFrameThickness * 2;
    const matHeight = frameHeight - actualFrameThickness * 2;
    
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(matX, matY, matWidth, matHeight);

    // Draw image area background
    const imageAreaX = matX + matPadding;
    const imageAreaY = matY + matPadding;
    const imageAreaWidth = matWidth - matPadding * 2;
    const imageAreaHeight = matHeight - matPadding * 2;

    ctx.fillStyle = '#E5E7EB';
    ctx.fillRect(imageAreaX, imageAreaY, imageAreaWidth, imageAreaHeight);

    // Clip to image area and draw image
    ctx.save();
    ctx.beginPath();
    ctx.rect(imageAreaX, imageAreaY, imageAreaWidth, imageAreaHeight);
    ctx.clip();

    const scaledWidth = image.width * imageScale;
    const scaledHeight = image.height * imageScale;

    ctx.drawImage(
      image,
      imageAreaX + imagePosition.x,
      imageAreaY + imagePosition.y,
      scaledWidth,
      scaledHeight
    );

    ctx.restore();
    ctx.restore();

    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'framed-photo.png';
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  const { width: frameWidth, height: frameHeight } = getFrameDimensions();
  const borderRadius = getBorderRadius();
  const actualFrameThickness = hasFrame ? frameThickness : 0;
  const matPadding = hasFrame ? 30 : 20;

  const renderImageArea = () => (
    <div
      className="w-full h-full bg-frame-area relative overflow-hidden transition-all duration-300"
      style={{ borderRadius }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
    >
      {!image ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <Button
            onClick={() => fileInputRef.current?.click()}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 rounded-xl font-bold text-lg shadow-lg transition-all hover:scale-105"
          >
            <Upload className="w-5 h-5 mr-2" />
            SELECT PHOTO
          </Button>
        </div>
      ) : (
        <img
          src={image.src}
          alt="Uploaded"
          className="absolute select-none pointer-events-none"
          style={{
            left: `${imagePosition.x}px`,
            top: `${imagePosition.y}px`,
            width: `${image.width * imageScale}px`,
            height: `${image.height * imageScale}px`,
            cursor: isDragging ? 'grabbing' : 'grab',
          }}
          draggable={false}
        />
      )}
    </div>
  );

  const renderDualFrame = () => (
    <div
      className="w-full h-full bg-frame-white overflow-hidden transition-all duration-300"
      style={{
        padding: `${actualFrameThickness / 2}px`,
        borderRadius,
      }}
    >
      <div
        className="w-full h-full bg-frame-black overflow-hidden transition-all duration-300"
        style={{
          padding: `${matPadding}px`,
          borderRadius,
        }}
      >
        {renderImageArea()}
      </div>
    </div>
  );

  const renderSingleFrame = () => (
    <div
      className="w-full h-full bg-frame-white overflow-hidden transition-all duration-300"
      style={{
        padding: `${matPadding}px`,
        borderRadius,
      }}
    >
      {renderImageArea()}
    </div>
  );

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
              OMGS® Editor
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Home / Acrylic Wall Photo
            </p>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="border-destructive text-destructive hover:bg-destructive/10"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Toolbar */}
        <div className="bg-card rounded-xl toolbar-shadow p-4 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Upload className="w-4 h-4 mr-2" />
              Select Photo
            </Button>

            <Button
              onClick={() => setIsPortrait(!isPortrait)}
              variant="secondary"
              className="gap-2"
            >
              <RotateCw className="w-4 h-4" />
              {isPortrait ? 'Portrait' : 'Landscape'}
            </Button>

            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-foreground whitespace-nowrap">
                Shape:
              </label>
              <Select
                value={frameShape}
                onValueChange={(value) => setFrameShape(value as FrameShape)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {frameShapes.map((shape) => (
                    <SelectItem key={shape.id} value={shape.id}>
                      {shape.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-foreground">Frame:</label>
              <div className="flex rounded-lg overflow-hidden border border-border">
                <button
                  onClick={() => setHasFrame(true)}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    hasFrame
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card text-foreground hover:bg-muted'
                  }`}
                >
                  Yes
                </button>
                <button
                  onClick={() => setHasFrame(false)}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    !hasFrame
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card text-foreground hover:bg-muted'
                  }`}
                >
                  No
                </button>
              </div>
            </div>

            {hasFrame && (
              <div className="flex items-center gap-3">
                <Maximize2 className="w-4 h-4 text-muted-foreground" />
                <Slider
                  value={[frameThickness]}
                  onValueChange={(value) => setFrameThickness(value[0])}
                  min={10}
                  max={50}
                  step={1}
                  className="w-32"
                />
                <span className="text-sm text-muted-foreground w-12">
                  {frameThickness}px
                </span>
              </div>
            )}

            {image && (
              <div className="flex items-center gap-3">
                <ZoomIn className="w-4 h-4 text-muted-foreground" />
                <Slider
                  value={[imageScale]}
                  onValueChange={(value) => setImageScale(value[0])}
                  min={0.1}
                  max={3}
                  step={0.1}
                  className="w-32"
                />
                <span className="text-sm text-muted-foreground w-12">
                  {imageScale.toFixed(1)}x
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Canvas Area */}
        <div className="bg-card rounded-xl toolbar-shadow p-8 mb-6">
          <div className="flex items-center justify-center">
            <div
              className="frame-shadow transition-all duration-300 overflow-hidden"
              style={{
                width: `${frameWidth}px`,
                height: `${frameHeight}px`,
                backgroundColor: hasFrame ? '#000000' : '#FFFFFF',
                padding: hasFrame ? `${actualFrameThickness}px` : '0px',
                borderRadius,
              }}
            >
              {isDualBorder && hasFrame ? renderDualFrame() : renderSingleFrame()}
            </div>
          </div>
        </div>

        {/* Save Button */}
        <Button
          onClick={handleSave}
          disabled={!image}
          className="w-full py-6 text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground disabled:bg-muted disabled:text-muted-foreground transition-all"
          size="lg"
        >
          <Download className="w-5 h-5 mr-2" />
          Save & Download
        </Button>

        {/* Instructions */}
        {image && (
          <div className="mt-4 p-4 bg-primary/10 rounded-xl border border-primary/20">
            <p className="text-sm text-foreground">
              <strong>Tips:</strong> Drag the image to reposition • Use mouse
              wheel or zoom slider to scale • Choose different frame shapes •
              Adjust frame thickness
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
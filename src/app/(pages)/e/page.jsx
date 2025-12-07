'use client';

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Stage, Layer, Image as KonvaImage, Rect, Shape, Group } from "react-konva";

const MIN_CM = 5;
const MAX_CM = 100;
const MIN_PX = 250;
const MAX_PX = 650;

const FRAME_SHAPES = {
  SQUARE: {
    id: 'square',
    name: 'Square',
    cornerRadius: 0,
    hasDualBorder: false,
  },
  ROUNDED_RECT: {
    id: 'rounded-rect',
    name: 'Rounded Rectangle',
    cornerRadius: 20,
    hasDualBorder: false,
  },
  EXTRA_ROUNDED: {
    id: 'extra-rounded',
    name: 'Extra Rounded',
    cornerRadius: 50,
    hasDualBorder: false,
  },
  CIRCLE: {
    id: 'circle',
    name: 'Circle',
    isCircle: true,
    hasDualBorder: false,
  },
  DUAL_BORDER_SQUARE: {
    id: 'dual-square',
    name: 'Dual Border Square',
    cornerRadius: 0,
    hasDualBorder: true,
    innerBorderGap: 12,
  },
  DUAL_BORDER_ROUNDED: {
    id: 'dual-rounded',
    name: 'Dual Border Rounded',
    cornerRadius: 20,
    hasDualBorder: true,
    innerBorderGap: 12,
  },
  DUAL_BORDER_CIRCLE: {
    id: 'dual-circle',
    name: 'Dual Border Circle',
    isCircle: true,
    hasDualBorder: true,
    innerBorderGap: 12,
  },
};

const cmToPx = (cm) => {
  const t = (cm - MIN_CM) / (MAX_CM - MIN_CM);
  return MIN_PX + t * (MAX_PX - MIN_PX);
};

export default function FrameEditor() {
  const [photoSrc, setPhotoSrc] = useState(null);
  const [photoImg, setPhotoImg] = useState(null);
  const [selectedShape, setSelectedShape] = useState(FRAME_SHAPES.ROUNDED_RECT);

  const [widthCm, setWidthCm] = useState(20);
  const [heightCm, setHeightCm] = useState(30);
  const [thicknessMm, setThicknessMm] = useState(20);

  const [photoScale, setPhotoScale] = useState(1);
  const [photoPos, setPhotoPos] = useState({ x: 0, y: 0 });

  const [frameColor, setFrameColor] = useState("#000000");
  const [matColor, setMatColor] = useState("#ffffff");

  const stageRef = useRef(null);
  const fileInputRef = useRef(null);
  const router = useRouter();

  const PREVIEW_WIDTH = cmToPx(widthCm);
  const PREVIEW_HEIGHT = cmToPx(heightCm);

  const framePx = 8 + (thicknessMm - 10) * (20 / 40);

  const innerWidth = PREVIEW_WIDTH - framePx * 2;
  const innerHeight = PREVIEW_HEIGHT - framePx * 2;

  const dualBorderGap = selectedShape.hasDualBorder ? selectedShape.innerBorderGap : 0;
  const matInnerWidth = innerWidth - dualBorderGap * 2;
  const matInnerHeight = innerHeight - dualBorderGap * 2;

  useEffect(() => {
    if (!photoSrc) return;

    const img = new window.Image();
    img.src = photoSrc;
    img.onload = () => {
      setPhotoImg(img);

      const targetWidth = selectedShape.hasDualBorder ? matInnerWidth : innerWidth;
      const targetHeight = selectedShape.hasDualBorder ? matInnerHeight : innerHeight;

      const imgAspect = img.width / img.height;
      const frameAspect = targetWidth / targetHeight;

      let scale;
      if (imgAspect > frameAspect) {
        scale = targetHeight / img.height;
      } else {
        scale = targetWidth / img.width;
      }
      setPhotoScale(scale);

      const displayWidth = img.width * scale;
      const displayHeight = img.height * scale;
      const offsetX = (targetWidth - displayWidth) / 2;
      const offsetY = (targetHeight - displayHeight) / 2;
      setPhotoPos({ x: offsetX, y: offsetY });
    };
  }, [
    photoSrc,
    selectedShape.id,
    selectedShape.hasDualBorder,
    PREVIEW_WIDTH,
    PREVIEW_HEIGHT,
    framePx,
    matInnerWidth,
    matInnerHeight,
  ]);

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhotoSrc(reader.result);
    reader.readAsDataURL(file);
  };

  // Download image to device
  const handleDownload = () => {
    if (!stageRef.current || !photoImg) return;

    const uri = stageRef.current.toDataURL({ 
      pixelRatio: 3,
      mimeType: 'image/png'
    });
    
    const link = document.createElement("a");
    link.download = `framed-photo-${selectedShape.id}-${widthCm}x${heightCm}cm.png`;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Save to localStorage and navigate to next page
  const handleSaveAndNext = () => {
    if (!stageRef.current || !photoImg) return;

    // Generate high-quality image
    const uri = stageRef.current.toDataURL({ 
      pixelRatio: 3,
      mimeType: 'image/png'
    });

    // Prepare design data
    const designData = {
      imageUri: uri,
      frameShape: selectedShape.name,
      frameShapeId: selectedShape.id,
      frameColor: frameColor,
      matColor: matColor,
      widthCm: widthCm,
      heightCm: heightCm,
      thicknessMm: thicknessMm,
      timestamp: new Date().toISOString()
    };

    // Save to localStorage
    localStorage.setItem('customFrameDesign', JSON.stringify(designData));

    // Also save as query params for shareable URL
    const params = new URLSearchParams({
      shape: selectedShape.id,
      frameColor: frameColor.replace('#', ''),
      matColor: matColor.replace('#', ''),
      width: widthCm.toString(),
      height: heightCm.toString(),
      thickness: thicknessMm.toString()
    });

    // Navigate to size selection page
    router.push(`/pp?${params.toString()}`);
  };

  const resetPhotoFit = () => {
    if (!photoImg) return;

    const targetWidth = selectedShape.hasDualBorder ? matInnerWidth : innerWidth;
    const targetHeight = selectedShape.hasDualBorder ? matInnerHeight : innerHeight;

    const imgAspect = photoImg.width / photoImg.height;
    const frameAspect = targetWidth / targetHeight;

    let scale;
    if (imgAspect > frameAspect) {
      scale = targetHeight / photoImg.height;
    } else {
      scale = targetWidth / photoImg.width;
    }
    setPhotoScale(scale);

    const displayWidth = photoImg.width * scale;
    const displayHeight = photoImg.height * scale;
    const offsetX = (targetWidth - displayWidth) / 2;
    const offsetY = (targetHeight - displayHeight) / 2;
    setPhotoPos({ x: offsetX, y: offsetY });
  };

  const circleClipFunc = (ctx, width, height) => {
    const radius = Math.min(width, height) / 2;
    const centerX = width / 2;
    const centerY = height / 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, false);
    ctx.closePath();
  };

  const renderFrame = () => {
    if (selectedShape.isCircle) {
      const size = Math.min(PREVIEW_WIDTH, PREVIEW_HEIGHT);
      const offsetX = (PREVIEW_WIDTH - size) / 2;
      const offsetY = (PREVIEW_HEIGHT - size) / 2;

      return (
        <Group>
          <Shape
            x={offsetX}
            y={offsetY}
            sceneFunc={(ctx, shape) => {
              const radius = size / 2;
              ctx.beginPath();
              ctx.arc(radius, radius, radius, 0, Math.PI * 2);
              ctx.fillStrokeShape(shape);
            }}
            fill={frameColor}
            shadowColor="rgba(0,0,0,0.35)"
            shadowBlur={24}
            shadowOffsetY={10}
          />

          <Shape
            x={offsetX + framePx}
            y={offsetY + framePx}
            sceneFunc={(ctx, shape) => {
              const radius = (size - framePx * 2) / 2;
              ctx.beginPath();
              ctx.arc(radius, radius, radius, 0, Math.PI * 2);
              ctx.fillStrokeShape(shape);
            }}
            fill={matColor}
          />

          {selectedShape.hasDualBorder && (
            <Shape
              x={offsetX + framePx + dualBorderGap}
              y={offsetY + framePx + dualBorderGap}
              sceneFunc={(ctx, shape) => {
                const radius = (size - framePx * 2 - dualBorderGap * 2) / 2;
                ctx.beginPath();
                ctx.arc(radius, radius, radius, 0, Math.PI * 2);
                ctx.fillStrokeShape(shape);
              }}
              stroke={frameColor}
              strokeWidth={2}
            />
          )}

          {photoImg ? (
            <Group
              x={offsetX + framePx + (selectedShape.hasDualBorder ? dualBorderGap : 0)}
              y={offsetY + framePx + (selectedShape.hasDualBorder ? dualBorderGap : 0)}
              clipFunc={(ctx) => {
                const targetSize = selectedShape.hasDualBorder
                  ? size - framePx * 2 - dualBorderGap * 2
                  : size - framePx * 2;
                circleClipFunc(ctx, targetSize, targetSize);
              }}
            >
              <KonvaImage
                image={photoImg}
                x={photoPos.x}
                y={photoPos.y}
                width={photoImg.width * photoScale}
                height={photoImg.height * photoScale}
                draggable
                onDragMove={(e) => {
                  const node = e.target;
                  setPhotoPos({ x: node.x(), y: node.y() });
                }}
              />
            </Group>
          ) : (
            <Shape
              x={offsetX + framePx + (selectedShape.hasDualBorder ? dualBorderGap : 0)}
              y={offsetY + framePx + (selectedShape.hasDualBorder ? dualBorderGap : 0)}
              sceneFunc={(ctx, shape) => {
                const targetSize = selectedShape.hasDualBorder
                  ? size - framePx * 2 - dualBorderGap * 2
                  : size - framePx * 2;
                const radius = targetSize / 2;
                ctx.beginPath();
                ctx.arc(radius, radius, radius, 0, Math.PI * 2);
                ctx.fillStrokeShape(shape);
              }}
              fill="#e5e7eb"
            />
          )}
        </Group>
      );
    }

    return (
      <Group>
        <Rect
          x={0}
          y={0}
          width={PREVIEW_WIDTH}
          height={PREVIEW_HEIGHT}
          fill={frameColor}
          cornerRadius={selectedShape.cornerRadius}
          shadowColor="rgba(0,0,0,0.35)"
          shadowBlur={24}
          shadowOffsetY={10}
        />

        <Rect
          x={framePx}
          y={framePx}
          width={innerWidth}
          height={innerHeight}
          fill={matColor}
          cornerRadius={Math.max(0, selectedShape.cornerRadius - framePx / 2)}
        />

        {selectedShape.hasDualBorder && (
          <Rect
            x={framePx + dualBorderGap}
            y={framePx + dualBorderGap}
            width={matInnerWidth}
            height={matInnerHeight}
            stroke={frameColor}
            strokeWidth={2}
            cornerRadius={Math.max(0, selectedShape.cornerRadius - framePx / 2 - dualBorderGap)}
          />
        )}

        {photoImg ? (
          <Group
            x={framePx + (selectedShape.hasDualBorder ? dualBorderGap : 0)}
            y={framePx + (selectedShape.hasDualBorder ? dualBorderGap : 0)}
            clipFunc={(ctx) => {
              const w = selectedShape.hasDualBorder ? matInnerWidth : innerWidth;
              const h = selectedShape.hasDualBorder ? matInnerHeight : innerHeight;
              const r = Math.max(
                0,
                selectedShape.cornerRadius - framePx / 2 - (selectedShape.hasDualBorder ? dualBorderGap : 0)
              );

              ctx.beginPath();
              ctx.moveTo(r, 0);
              ctx.lineTo(w - r, 0);
              ctx.quadraticCurveTo(w, 0, w, r);
              ctx.lineTo(w, h - r);
              ctx.quadraticCurveTo(w, h, w - r, h);
              ctx.lineTo(r, h);
              ctx.quadraticCurveTo(0, h, 0, h - r);
              ctx.lineTo(0, r);
              ctx.quadraticCurveTo(0, 0, r, 0);
              ctx.closePath();
            }}
          >
            <KonvaImage
              image={photoImg}
              x={photoPos.x}
              y={photoPos.y}
              width={photoImg.width * photoScale}
              height={photoImg.height * photoScale}
              draggable
              onDragMove={(e) => {
                const node = e.target;
                setPhotoPos({ x: node.x(), y: node.y() });
              }}
            />
          </Group>
        ) : (
          <Rect
            x={framePx + (selectedShape.hasDualBorder ? dualBorderGap : 0)}
            y={framePx + (selectedShape.hasDualBorder ? dualBorderGap : 0)}
            width={selectedShape.hasDualBorder ? matInnerWidth : innerWidth}
            height={selectedShape.hasDualBorder ? matInnerHeight : innerHeight}
            fill="#e5e7eb"
            cornerRadius={Math.max(
              0,
              selectedShape.cornerRadius - framePx / 2 - (selectedShape.hasDualBorder ? dualBorderGap : 0)
            )}
          />
        )}
      </Group>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 py-30">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-medium text-center text-gray-900 mb-6">
          Acrylic Wall Photo Editor ({widthCm}×{heightCm}cm)
        </h1>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Canvas */}
          <div className="flex-1 flex items-center justify-center">
            <div className="bg-white rounded-md shadow-md p-6 relative">
              <Stage
                ref={stageRef}
                width={PREVIEW_WIDTH}
                height={PREVIEW_HEIGHT}
              >
                <Layer>
                  <Rect
                    x={0}
                    y={0}
                    width={PREVIEW_WIDTH}
                    height={PREVIEW_HEIGHT}
                    fill="#f9fafb"
                  />
                  {renderFrame()}
                  {!photoImg && (
                    <>
                      <Rect
                        x={PREVIEW_WIDTH / 2 - 110}
                        y={PREVIEW_HEIGHT / 2 - 35}
                        width={220}
                        height={70}
                        fill="#dc2626"
                        cornerRadius={12}
                      />
                      <Shape
                        sceneFunc={(ctx, shape) => {
                          ctx.font = "bold 22px sans-serif";
                          ctx.fillStyle = "#ffffff";
                          ctx.textAlign = "center";
                          ctx.textBaseline = "middle";
                          ctx.fillText("SELECT PHOTO", PREVIEW_WIDTH / 2, PREVIEW_HEIGHT / 2);
                        }}
                      />
                    </>
                  )}
                </Layer>
              </Stage>
            </div>
          </div>

          {/* Controls */}
          <div className="lg:w-80 bg-white rounded-md shadow-md p-6 space-y-6">
            {/* Frame Shape Dropdown */}
            <div>
              <label className="block text-md font-medium text-black  mb-2">Frame Shape</label>
              <select
                value={selectedShape.id}
                onChange={(e) => {
                  const shape = Object.values(FRAME_SHAPES).find(s => s.id === e.target.value);
                  setSelectedShape(shape);
                }}
                className="w-full border-2 border-gray-300 text-black rounded-lg px-4 py-2.5 text-md font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white hover:border-gray-400 transition-colors"
              >
                {Object.values(FRAME_SHAPES).map((shape) => (
                  <option key={shape.id} value={shape.id}>
                    {shape.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-md flex items-center justify-center gap-2 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {photoSrc ? "Change Photo" : "Select Photo"}
              </button>
            </div>

            {/* Frame Color */}
            <div>
              <label className="block text-md text-black font-medium  mb-2">Outer Frame Color</label>
              <div className="flex gap-2 flex-wrap">
                {["#000000", "#8B4513", "#ffffff"].map((c) => (
                  <button
                    key={c}
                    onClick={() => setFrameColor(c)}
                    className={
                      "w-9 h-9 rounded border-2 transition-all " +
                      (frameColor === c ? "border-blue-500 scale-110" : "border-gray-300")
                    }
                    style={{ backgroundColor: c }}
                  />
                ))}
                <input
                  type="color"
                  value={frameColor}
                  onChange={(e) => setFrameColor(e.target.value)}
                  className="w-9 h-9 rounded border-2 border-gray-300 cursor-pointer"
                />
              </div>
            </div>

            {/* Mat Color */}
            <div>
              <label className="block text-md text-black font-medium mb-2">Inner Frame Color</label>
              <div className="flex gap-2 flex-wrap">
                {["#ffffff", "#f5f5dc", "#000000"].map((c) => (
                  <button
                    key={c}
                    onClick={() => setMatColor(c)}
                    className={
                      "w-9 h-9 rounded border-2 transition-all " +
                      (matColor === c ? "border-blue-500 scale-110" : "border-gray-300")
                    }
                    style={{ backgroundColor: c }}
                  />
                ))}
                <input
                  type="color"
                  value={matColor}
                  onChange={(e) => setMatColor(e.target.value)}
                  className="w-9 h-9 rounded border-2 border-gray-300 cursor-pointer"
                />
              </div>
            </div>

            {/* Frame Thickness */}
            <div>
              <label className="block text-md font-medium text-black mb-1">
                Frame Thickness: {thicknessMm}mm
              </label>
              <input
                type="range"
                min="10"
                max="50"
                step="1"
                value={thicknessMm}
                onChange={(e) => setThicknessMm(Number(e.target.value))}
                className="w-full accent-red-600 h-2"
              />
            </div>

            {/* Photo Tools */}
            {photoImg && (
              <div className="space-y-3 pt-3 border-t">
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Photo Zoom: {photoScale.toFixed(2)}x
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="3"
                    step="0.1"
                    value={photoScale}
                    onChange={(e) => setPhotoScale(Number(e.target.value))}
                    className="w-full accent-red-600 h-2"
                  />
                </div>

                <button
                  onClick={resetPhotoFit}
                  className="w-full border border-gray-300 hover:bg-gray-50 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Reset Position & Fit
                </button>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3 pt-3 border-t">
              {/* Download Button */}
              <button
                onClick={handleDownload}
                disabled={!photoImg}
                className={
                  "w-full font-semibold py-3 px-4 rounded-md text-base transition-colors flex items-center justify-center gap-2 " +
                  (photoImg
                    ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed")
                }
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download to Device
              </button>

              {/* Save & Continue Button */}
              <button
                onClick={handleSaveAndNext}
                disabled={!photoImg}
                className={
                  "w-full font-semibold py-3 px-4 rounded-md text-lg transition-colors " +
                  (photoImg
                    ? "bg-red-600 hover:bg-red-700 text-white shadow-lg"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed")
                }
              >
                Save & Select Size →
              </button>
            </div>

            {photoImg && (
              <p className="text-xs text-gray-500 text-center pt-2">
                💡 Download saves to your device. Select Size continues to ordering.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

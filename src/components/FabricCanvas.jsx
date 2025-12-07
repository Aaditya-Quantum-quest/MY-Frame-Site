"use client";
import { useEffect, useRef, useState, useCallback } from 'react';

export default function FabricCanvas({ frameId }) {
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [fabric, setFabric] = useState(null);

  // Load Fabric FIRST
  const loadFabric = useCallback(async () => {
    try {
      const { fabric } = await import('fabric');
      setFabric(fabric);
    } catch (error) {
      console.error('Fabric load failed:', error);
    }
  }, []);

  // Initialize canvas when fabric + ref ready
  useEffect(() => {
    if (!fabric || !canvasRef.current) return;

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: '#f8fafc'
    });

    fabricCanvasRef.current = canvas;

    // Frame border
    const border = new fabric.Rect({
      left: 50, top: 50, width: 700, height: 500,
      fill: 'transparent', stroke: '#e2e8f0', strokeWidth: 4,
      selectable: false, evented: false
    });
    canvas.add(border);
    canvas.renderAll();

    // Save function
    window.saveCanvas = () => JSON.stringify(canvas.toJSON());

    // Image handler
    const handleImage = (e) => {
      if (!canvas) return;
      fabric.Image.fromURL(e.detail, (img) => {
        img.set({
          left: 150 + Math.random() * 200,
          top: 150 + Math.random() * 200,
          scaleX: 0.35,
          scaleY: 0.35,
          cornerColor: '#3b82f6',
          cornerSize: 12
        });
        canvas.add(img);
        canvas.setActiveObject(img);
        canvas.renderAll();
      });
    };
    window.addEventListener('addImage', handleImage);

    setIsLoaded(true);

    return () => {
      window.removeEventListener('addImage', handleImage);
      canvas.dispose();
    };
  }, [fabric]);

  // Load fabric on mount
  useEffect(() => {
    loadFabric();
  }, [loadFabric]);

  if (!fabricCanvasRef.current && !isLoaded) {
    return (
      <div className="w-[800px] h-[600px] mx-auto flex items-center justify-center border-4 border-gray-300 rounded-2xl shadow-xl bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-xl text-gray-600 animate-pulse">
          Initializing canvas <span className="ml-2">●</span>
        </div>
      </div>
    );
  }

  return (
    <canvas 
      ref={canvasRef} 
      width="800" 
      height="600"
      className="mx-auto block border-4 border-gray-300 rounded-2xl shadow-xl bg-gradient-to-br from-slate-50 to-blue-50"
    />
  );
}

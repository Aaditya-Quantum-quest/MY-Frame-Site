"use client";
import { useEffect, useRef, useCallback } from 'react';
import { fabric } from 'fabric';
import { useEditorStore } from '@/stores/editorStore'; // Zustand store

const Editor = ({ frameTemplates }) => {
  const canvasRef = useRef(null);
  const canvas = useRef(null);
  const { designData, setDesignData, selectedFrame } = useEditorStore();

  useEffect(() => {
    canvas.current = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: 'transparent'
    });

    // Load frame template
    if (frameTemplates[selectedFrame]) {
      canvas.current.loadFromJSON(frameTemplates[selectedFrame], () => {
        canvas.current.renderAll();
      });
    }

    // Drag-drop image handler
    canvas.current.on('drop', (e) => handleImageDrop(e));

    return () => canvas.current.dispose();
  }, [selectedFrame]);

  const handleImageDrop = useCallback((e) => {
    const img = new Image();
    img.onload = () => {
      const fabricImg = new fabric.Image(img, {
        left: e.pointer.x,
        top: e.pointer.y,
        scaleX: 0.5,
        scaleY: 0.5
      });
      canvas.current.add(fabricImg);
      canvas.current.setActiveObject(fabricImg);
    };
    img.src = e.dataTransfer.getData('text/image-url'); // From file input
  }, []);

  const saveDesign = () => {
    const json = JSON.stringify(canvas.current.toJSON(['id', 'frameType']));
    setDesignData({ frameId: selectedFrame, canvasJson: json });
    router.push('/preview'); // Navigate with state preserved
  };

  return (
    <div className="p-8">
      <canvas ref={canvasRef} className="border shadow-lg" />
      <div className="mt-4">
        <input type="file" onChange={handleFileUpload} multiple />
        <button onClick={saveDesign} className="bg-blue-500 text-white px-6 py-2 ml-4">
          Next: Preview
        </button>
      </div>
    </div>
  );
};

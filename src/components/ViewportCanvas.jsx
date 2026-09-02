import React, { useRef, useEffect, useState } from 'react';
import { EffectRenderer } from '../engine/EffectRenderer';
import { Eye, Columns, Maximize2, ZoomIn, ZoomOut, Image as ImageIcon } from 'lucide-react';

export function ViewportCanvas({
  activePresetId,
  paramValues,
  sourceMedia,
  presetSampleUrl,
  isWebcamActive,
  webcamStream,
  onCanvasReady
}) {
  const canvasRef = useRef(null);
  const rendererRef = useRef(null);

  const [splitPos, setSplitPos] = useState(100); // 100 = full effect, 50 = split
  const [isSplitting, setIsSplitting] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [loadedImage, setLoadedImage] = useState(null);

  // Initialize renderer engine
  useEffect(() => {
    if (canvasRef.current && !rendererRef.current) {
      rendererRef.current = new EffectRenderer(canvasRef.current);
      if (onCanvasReady) onCanvasReady(rendererRef.current);
    }
  }, [onCanvasReady]);

  // Handle webcam video feed or source image changes
  useEffect(() => {
    let activeMedia = null;

    if (isWebcamActive && webcamStream) {
      const video = document.createElement('video');
      video.srcObject = webcamStream;
      video.autoplay = true;
      video.playsInline = true;
      video.onloadedmetadata = () => {
        video.play();
        setLoadedImage(video);
        if (rendererRef.current) {
          rendererRef.current.setSource(video);
        }
      };
    } else if (sourceMedia) {
      setLoadedImage(sourceMedia);
      if (rendererRef.current) {
        rendererRef.current.setSource(sourceMedia);
      }
    } else if (presetSampleUrl) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = presetSampleUrl;
      img.onload = () => {
        setLoadedImage(img);
        if (rendererRef.current) {
          rendererRef.current.setSource(img);
        }
      };
    }
  }, [sourceMedia, presetSampleUrl, isWebcamActive, webcamStream]);

  // Animation Loop for real-time rendering
  useEffect(() => {
    let animId;
    const renderLoop = () => {
      if (rendererRef.current && loadedImage) {
        rendererRef.current.render(activePresetId, paramValues);
      }
      animId = requestAnimationFrame(renderLoop);
    };

    renderLoop();
    return () => cancelAnimationFrame(animId);
  }, [activePresetId, paramValues, loadedImage]);

  return (
    <main className="flex-1 bg-slate-950/90 relative flex flex-col items-center justify-center overflow-hidden select-none">
      {/* Top Floating Viewport Control Toolbar */}
      <div className="absolute top-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-xl glass-panel shadow-2xl border border-slate-700/60">
        <button
          onClick={() => setSplitPos(splitPos === 100 ? 50 : 100)}
          className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
            splitPos < 100
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'text-slate-300 hover:text-white'
          }`}
          title="Toggle Before/After Split Comparison View"
        >
          <Columns className="w-3.5 h-3.5" />
          <span>Before / After</span>
        </button>

        <div className="w-px h-4 bg-slate-800" />

        <button
          onClick={() => setZoom((z) => Math.max(0.5, z - 0.15))}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 transition-colors"
          title="Zoom Out"
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>

        <span className="text-[11px] font-mono text-cyan-400 font-semibold px-1">
          {Math.round(zoom * 100)}%
        </span>

        <button
          onClick={() => setZoom((z) => Math.min(2.5, z + 0.15))}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 transition-colors"
          title="Zoom In"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>

        <div className="w-px h-4 bg-slate-800" />

        <button
          onClick={() => {
            if (canvasRef.current) {
              if (document.fullscreenElement) {
                document.exitFullscreen();
              } else {
                canvasRef.current.requestFullscreen();
              }
            }
          }}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 transition-colors"
          title="Toggle Fullscreen"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Canvas Viewport Container */}
      <div
        className="relative flex items-center justify-center p-4 transition-transform duration-150"
        style={{ transform: `scale(${zoom})` }}
      >
        <canvas
          ref={canvasRef}
          className="max-w-[70vw] max-h-[75vh] object-contain rounded-xl shadow-2xl border border-slate-800"
          style={{
            clipPath: splitPos < 100 ? `inset(0 ${100 - splitPos}% 0 0)` : 'none'
          }}
        />

        {/* Original Image comparison overlay when splitPos < 100 */}
        {splitPos < 100 && loadedImage && (
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{
              clipPath: `inset(0 0 0 ${splitPos}%)`
            }}
          >
            {loadedImage.tagName === 'VIDEO' ? (
              <video
                src={loadedImage.src}
                className="max-w-[70vw] max-h-[75vh] object-contain rounded-xl"
                autoPlay
                muted
                loop
              />
            ) : (
              <img
                src={loadedImage.src}
                alt="Original"
                className="max-w-[70vw] max-h-[75vh] object-contain rounded-xl"
              />
            )}
          </div>
        )}

        {/* Split Divider Slider Line */}
        {splitPos < 100 && (
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-cyan-400 cursor-ew-resize z-30 shadow-[0_0_12px_rgba(56,189,248,0.8)] flex items-center justify-center"
            style={{ left: `${splitPos}%` }}
          >
            <div className="w-6 h-6 rounded-full bg-slate-900 border-2 border-cyan-400 flex items-center justify-center shadow-lg">
              <Columns className="w-3 h-3 text-cyan-300" />
            </div>
          </div>
        )}
      </div>

      {/* Canvas Floating Metadata Badge */}
      <div className="absolute bottom-4 left-6 z-20 flex items-center gap-3 px-3 py-1.5 rounded-lg glass-panel text-[11px] font-mono text-slate-400 border border-slate-800/80">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>60 FPS</span>
        </span>
        <span className="text-slate-600">|</span>
        <span>Resolution: {canvasRef.current?.width || 800}x{canvasRef.current?.height || 600}</span>
      </div>
    </main>
  );
}

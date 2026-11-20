/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect, useCallback } from 'react';
import { ZoomIn, ZoomOut, Maximize2, RotateCcw } from 'lucide-react';
import Masterpiece from '../art/Masterpiece';

interface GalleryCanvasProps {
  visibleLayers: string[];
  framingMode: 'matting' | 'darkroom';
  onToggleFraming: (mode: 'matting' | 'darkroom') => void;
  onOpenLayers: () => void;
  onOpenExport: () => void;
}

// Compute initial fit scale synchronously before mount
function getInitialFitScale(): number {
  if (typeof window === 'undefined') return 0.22;
  const paddingX = 48;
  const paddingY = 120; // Accounts for header (58px) and floating utility bar (52px)
  const availW = Math.max(100, window.innerWidth - paddingX);
  const availH = Math.max(100, window.innerHeight - paddingY);
  const scaleW = availW / 2400;
  const scaleH = availH / 3200;
  return Math.min(scaleW, scaleH, 1.0);
}

export default function GalleryCanvas({
  visibleLayers,
  framingMode,
  onToggleFraming,
  onOpenLayers,
}: GalleryCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Zoom & Pan transform state
  const [scale, setScale] = useState<number>(getInitialFitScale);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isWheeling, setIsWheeling] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Persistent reference to latest transform values to prevent stale closures during rapid wheel events
  const transformRef = useRef({ scale: getInitialFitScale(), pan: { x: 0, y: 0 } });
  const wheelTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Keep transformRef in sync with React state
  useEffect(() => {
    transformRef.current = { scale, pan };
  }, [scale, pan]);

  // Calculate fit-to-container scale based on exact container dimensions
  const resetToFit = useCallback(() => {
    if (!containerRef.current) return;
    const { clientWidth, clientHeight } = containerRef.current;
    if (!clientWidth || !clientHeight) return;

    // Available space accounting for margins and floating utility toolbar
    const paddingX = 48;
    const paddingY = 88;
    const availableW = Math.max(100, clientWidth - paddingX);
    const availableH = Math.max(100, clientHeight - paddingY);

    const scaleW = availableW / 2400;
    const scaleH = availableH / 3200;
    const fitScale = Math.min(scaleW, scaleH);

    const newScale = Math.max(0.1, fitScale);
    const newPan = { x: 0, y: 0 };

    transformRef.current = { scale: newScale, pan: newPan };
    setScale(newScale);
    setPan(newPan);
  }, []);

  // Use ResizeObserver for instant, responsive fit calculations
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    resetToFit();

    const ro = new ResizeObserver(() => {
      resetToFit();
    });
    ro.observe(container);

    return () => {
      ro.disconnect();
    };
  }, [resetToFit]);

  // Handle native wheel zoom strictly relative to pointer position
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheelNative = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const rect = container.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Smooth geometric zoom multiplier
      const zoomFactor = e.deltaY < 0 ? 1.14 : 0.88;
      const oldScale = transformRef.current.scale;
      const newScale = Math.min(3.5, Math.max(0.08, oldScale * zoomFactor));

      if (newScale === oldScale) return;

      const ratio = newScale / oldScale;
      const oldPan = transformRef.current.pan;

      // Geometric derivation: keep the exact canvas point under the cursor invariant
      const newPanX = mouseX - centerX - (mouseX - centerX - oldPan.x) * ratio;
      const newPanY = mouseY - centerY - (mouseY - centerY - oldPan.y) * ratio;
      const newPan = { x: newPanX, y: newPanY };

      // Update ref immediately for subsequent rapid wheel events
      transformRef.current = { scale: newScale, pan: newPan };

      // Set wheeling flag to remove CSS transition during active wheel for zero-latency tracking
      setIsWheeling(true);
      if (wheelTimerRef.current) clearTimeout(wheelTimerRef.current);
      wheelTimerRef.current = setTimeout(() => {
        setIsWheeling(false);
      }, 140);

      setScale(newScale);
      setPan(newPan);
    };

    container.addEventListener('wheel', handleWheelNative, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheelNative);
      if (wheelTimerRef.current) clearTimeout(wheelTimerRef.current);
    };
  }, []);

  // Handle Drag Panning
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Left click only
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const newPan = {
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    };
    transformRef.current.pan = newPan;
    setPan(newPan);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Double click to zoom in to pointer location or reset if already zoomed
  const handleDoubleClick = (e: React.MouseEvent) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const oldScale = transformRef.current.scale;
    const oldPan = transformRef.current.pan;

    if (oldScale >= 1.35) {
      resetToFit();
      return;
    }

    const newScale = Math.min(3.5, Math.max(0.8, oldScale * 1.85));
    const ratio = newScale / oldScale;
    const newPanX = mouseX - centerX - (mouseX - centerX - oldPan.x) * ratio;
    const newPanY = mouseY - centerY - (mouseY - centerY - oldPan.y) * ratio;
    const newPan = { x: newPanX, y: newPanY };

    transformRef.current = { scale: newScale, pan: newPan };
    setScale(newScale);
    setPan(newPan);
  };

  // Toolbar Zoom In (centered at viewport center)
  const handleZoomIn = () => {
    const oldScale = transformRef.current.scale;
    const newScale = Math.min(3.5, oldScale * 1.25);
    const ratio = newScale / oldScale;
    const newPan = {
      x: transformRef.current.pan.x * ratio,
      y: transformRef.current.pan.y * ratio,
    };
    transformRef.current = { scale: newScale, pan: newPan };
    setScale(newScale);
    setPan(newPan);
  };

  // Toolbar Zoom Out (centered at viewport center)
  const handleZoomOut = () => {
    const oldScale = transformRef.current.scale;
    const newScale = Math.max(0.08, oldScale * 0.8);
    const ratio = newScale / oldScale;
    const newPan = {
      x: transformRef.current.pan.x * ratio,
      y: transformRef.current.pan.y * ratio,
    };
    transformRef.current = { scale: newScale, pan: newPan };
    setScale(newScale);
    setPan(newPan);
  };

  // Preset Scale Selection (centered at viewport center)
  const handleSetScale = (targetScale: number) => {
    const oldScale = transformRef.current.scale;
    const ratio = targetScale / oldScale;
    const newPan = {
      x: transformRef.current.pan.x * ratio,
      y: transformRef.current.pan.y * ratio,
    };
    transformRef.current = { scale: targetScale, pan: newPan };
    setScale(targetScale);
    setPan(newPan);
  };

  return (
    <div className="relative w-full h-full flex-1 min-h-0 overflow-hidden flex flex-col bg-[#06070b]">
      {/* Interactive Gallery Canvas Viewport */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onDoubleClick={handleDoubleClick}
        className={`relative w-full h-full flex-1 min-h-0 overflow-hidden select-none ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        } ${
          framingMode === 'matting'
            ? 'bg-[radial-gradient(ellipse_at_center,_#121522_0%,_#07080f_100%)]'
            : 'bg-[#030407]'
        }`}
      >
        {/* Transform Container: Absolutely centered so it never stretches parent layout */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: 2400,
            height: 3200,
            marginLeft: -1200,
            marginTop: -1600,
            transform: `translate3d(${pan.x}px, ${pan.y}px, 0px) scale(${scale})`,
            transformOrigin: 'center center',
            transition: isDragging || isWheeling ? 'none' : 'transform 180ms cubic-bezier(0.16, 1, 0.3, 1)',
            willChange: 'transform',
          }}
          className="pointer-events-auto"
        >
          {/* Artwork Frame Wrapper */}
          <div
            className={`w-full h-full transition-shadow duration-300 ${
              framingMode === 'matting'
                ? 'p-4 bg-[#0d0f18] rounded-xs shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),_0_0_80px_rgba(245,158,11,0.06)] border border-[#2a233c]/60'
                : 'p-0 shadow-2xl'
            }`}
          >
            {/* The Masterpiece SVG Component */}
            <Masterpiece
              id="masterpiece-svg"
              visibleLayers={visibleLayers}
            />
          </div>
        </div>
      </div>

      {/* Floating Curatorial Bottom Utility Bar */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 p-1.5 bg-[#0b0d18]/90 backdrop-blur-md rounded-xl border border-[#22283d] shadow-2xl z-30">
        {/* Zoom Controls */}
        <button
          onClick={handleZoomOut}
          title="Zoom Out (Center)"
          className="p-2 text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors cursor-pointer"
        >
          <ZoomOut className="w-4 h-4" />
        </button>

        <span className="text-xs font-mono-data text-amber-200/90 min-w-[50px] text-center font-medium">
          {Math.round(scale * 100)}%
        </span>

        <button
          onClick={handleZoomIn}
          title="Zoom In (Center)"
          className="p-2 text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors cursor-pointer"
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        <div className="w-[1px] h-4 bg-slate-700/60 mx-1" />

        {/* Preset Scale Options */}
        <button
          onClick={resetToFit}
          title="Fit Artwork to Viewport"
          className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors cursor-pointer"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Fit</span>
        </button>

        <button
          onClick={() => handleSetScale(0.5)}
          title="View at 50% Scale"
          className={`px-2.5 py-1.5 text-xs rounded-lg transition-colors cursor-pointer font-mono-data ${
            Math.abs(scale - 0.5) < 0.03
              ? 'bg-amber-400/20 text-amber-300 font-semibold'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          50%
        </button>

        <button
          onClick={() => handleSetScale(1)}
          title="View at Native 100% Vector Scale"
          className={`px-2.5 py-1.5 text-xs rounded-lg transition-colors cursor-pointer font-mono-data ${
            Math.abs(scale - 1) < 0.05
              ? 'bg-amber-400/20 text-amber-300 font-semibold'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          100%
        </button>

        <button
          onClick={() => handleSetScale(2)}
          title="Deep 200% Detail Zoom"
          className={`px-2.5 py-1.5 text-xs rounded-lg transition-colors cursor-pointer font-mono-data ${
            Math.abs(scale - 2) < 0.05
              ? 'bg-amber-400/20 text-amber-300 font-semibold'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          200%
        </button>

        <div className="w-[1px] h-4 bg-slate-700/60 mx-1" />

        {/* Framing Mode Toggle */}
        <button
          onClick={() => onToggleFraming(framingMode === 'matting' ? 'darkroom' : 'matting')}
          title="Toggle Museum Matting / Darkroom"
          className="px-2.5 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
        >
          {framingMode === 'matting' ? 'Darkroom' : 'Matting'}
        </button>

        {/* Layers Inspector Shortcut */}
        <button
          onClick={onOpenLayers}
          title="Inspect SVG Layers"
          className="px-2.5 py-1.5 text-xs text-amber-300/90 hover:text-amber-200 hover:bg-amber-400/10 rounded-lg transition-colors cursor-pointer whitespace-nowrap font-medium"
        >
          Layers ({visibleLayers.length}/7)
        </button>

        <div className="w-[1px] h-4 bg-slate-700/60 mx-1" />

        {/* Quick Reset Pan */}
        <button
          onClick={() => {
            const newPan = { x: 0, y: 0 };
            transformRef.current.pan = newPan;
            setPan(newPan);
          }}
          title="Center Canvas"
          className="p-2 text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

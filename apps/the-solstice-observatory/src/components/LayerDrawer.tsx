/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { X, Eye, EyeOff, Layers, RotateCcw } from 'lucide-react';
import { ARTWORK_LAYERS, LayerInfo } from '../art/Masterpiece';

interface LayerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  visibleLayers: string[];
  onToggleLayer: (layerId: string) => void;
  onSoloLayer: (layerId: string) => void;
  onResetLayers: () => void;
}

export default function LayerDrawer({
  isOpen,
  onClose,
  visibleLayers,
  onToggleLayer,
  onSoloLayer,
  onResetLayers,
}: LayerDrawerProps) {
  if (!isOpen) return null;

  const allLayerIds = ARTWORK_LAYERS.map((l) => l.id);
  const isAllVisible = visibleLayers.length === allLayerIds.length;

  return (
    <div className="fixed inset-y-0 right-0 w-full max-w-md bg-[#0a0c16] border-l border-[#1f253d] shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#1b2034]">
        <div className="flex items-center gap-2.5">
          <Layers className="w-5 h-5 text-amber-400" />
          <h2 className="text-base font-semibold text-slate-100 font-serif-display">
            Vector Layer Stack
          </h2>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Utility Actions */}
      <div className="flex items-center justify-between px-6 py-3 bg-[#07080f] border-b border-[#181c2d] text-xs">
        <span className="text-slate-400">
          Showing <span className="font-mono-data text-amber-300 font-medium">{visibleLayers.length}</span> of {ARTWORK_LAYERS.length} layers
        </span>
        <button
          onClick={onResetLayers}
          disabled={isAllVisible}
          className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 disabled:opacity-40 disabled:hover:text-amber-400 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Show All</span>
        </button>
      </div>

      {/* Layer List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {ARTWORK_LAYERS.map((layer: LayerInfo, idx: number) => {
          const isVisible = visibleLayers.includes(layer.id);
          const isSolo = visibleLayers.length === 1 && visibleLayers[0] === layer.id;

          return (
            <div
              key={layer.id}
              className={`p-3.5 rounded-xl border transition-all ${
                isVisible
                  ? 'bg-[#0f1322] border-[#252c48]'
                  : 'bg-[#070912]/60 border-[#141829] opacity-60'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                {/* Visibility Toggle Button */}
                <button
                  onClick={() => onToggleLayer(layer.id)}
                  className="flex items-center gap-3 text-left flex-1 cursor-pointer group"
                >
                  <div
                    className={`p-1.5 rounded-lg transition-colors ${
                      isVisible
                        ? 'text-amber-400 bg-amber-400/10 group-hover:bg-amber-400/20'
                        : 'text-slate-500 bg-slate-800/40'
                    }`}
                  >
                    {isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">
                      {layer.name}
                    </div>
                    <div className="text-xs text-amber-500/80 font-mono-data">
                      {layer.category} · Z-Index {idx * 10}
                    </div>
                  </div>
                </button>

                {/* Solo Button */}
                <button
                  onClick={() => onSoloLayer(layer.id)}
                  className={`px-2 py-1 text-xs rounded-md transition-colors cursor-pointer font-medium ${
                    isSolo
                      ? 'bg-amber-400 text-slate-950 font-semibold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                  }`}
                  title="Isolate this layer only"
                >
                  Solo
                </button>
              </div>

              {/* Layer Description */}
              <p className="mt-2 text-xs text-slate-400 leading-relaxed pl-10">
                {layer.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Footer Instructions */}
      <div className="p-4 bg-[#080911] border-t border-[#181c2d] text-xs text-slate-400 leading-relaxed">
        <p>
          Each layer is modularly encapsulated in SVG vector components, ensuring crisp vector fidelity at all scales.
        </p>
      </div>
    </div>
  );
}

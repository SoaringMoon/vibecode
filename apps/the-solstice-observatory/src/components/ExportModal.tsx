/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { X, Download, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';
import {
  EXPORT_RESOLUTIONS,
  ExportResolution,
  ExportProgress,
  exportArtworkToPng,
} from '../utils/exportPng';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  svgElementId: string;
}

export default function ExportModal({
  isOpen,
  onClose,
  svgElementId,
}: ExportModalProps) {
  const [selectedResolution, setSelectedResolution] = useState<ExportResolution>(
    EXPORT_RESOLUTIONS[0],
  );
  const [progress, setProgress] = useState<ExportProgress>({
    status: 'idle',
    progressPercent: 0,
  });

  if (!isOpen) return null;

  const handleStartExport = async () => {
    try {
      await exportArtworkToPng(svgElementId, selectedResolution, (p) => {
        setProgress(p);
      });
    } catch (err) {
      console.error('Export failed:', err);
    }
  };

  const isBusy = progress.status === 'rendering' || progress.status === 'encoding' || progress.status === 'downloading';

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-hidden">
      <div className="relative w-full max-w-xl max-h-[calc(100dvh-1.5rem)] flex flex-col bg-[#0b0d18] border border-[#242b44] rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1b2136] bg-[#070912] shrink-0">
          <div className="flex items-center gap-3">
            <Download className="w-5 h-5 text-amber-400" />
            <div>
              <span className="text-xs tracking-widest uppercase font-mono-data text-amber-500/90 block">
                EXPORT PIPELINE
              </span>
              <h2 className="text-lg font-bold text-slate-100 font-serif-display">
                Export Artwork to Lossless PNG
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isBusy}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer disabled:opacity-40"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-5 min-h-0">
          {/* Specification Notice */}
          <div className="p-3.5 rounded-xl bg-[#0e1324] border border-[#232b49] flex items-start gap-3 text-xs">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-slate-300">
              <span className="text-amber-300 font-semibold">Specification Compliant: </span>
              Every export resolution guarantees that the smallest side of the aspect ratio is at least{' '}
              <span className="font-mono-data text-white font-medium">2000px</span>. Native standard resolution outputs at{' '}
              <span className="font-mono-data text-amber-300 font-medium">2400 × 3200 px</span>.
            </div>
          </div>

          {/* Resolution Options */}
          <div className="space-y-3">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono-data block">
              Select Output Resolution
            </label>
            <div className="grid grid-cols-1 gap-2.5">
              {EXPORT_RESOLUTIONS.map((res) => {
                const isSelected = selectedResolution.id === res.id;
                return (
                  <button
                    key={res.id}
                    disabled={isBusy}
                    onClick={() => {
                      setSelectedResolution(res);
                      if (progress.status === 'completed') {
                        setProgress({ status: 'idle', progressPercent: 0 });
                      }
                    }}
                    className={`flex items-center justify-between p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#13192f] border-amber-400/80 shadow-sm shadow-amber-400/10'
                        : 'bg-[#090b16] border-[#1b2238] hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                        <span>{res.label}</span>
                        {res.multiplier === 1 && (
                          <span className="text-[10px] font-mono-data text-amber-300 bg-amber-400/15 px-1.5 py-0.5 rounded">
                            Master Native
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5 font-mono-data">
                        {res.recommendedFor}
                      </div>
                    </div>
                    <div className="text-right shrink-0 ml-3">
                      <div className="text-xs font-mono-data text-amber-300 font-medium">
                        {res.megapixels}
                      </div>
                      <div className="text-[11px] font-mono-data text-slate-500">
                        {res.multiplier}x scale
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Export Progress / Completed Feedback */}
          {progress.status !== 'idle' && (
            <div className="p-4 rounded-xl bg-[#090b16] border border-[#1b2238] space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-medium flex items-center gap-2">
                  {progress.status === 'completed' ? (
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                  ) : progress.status === 'error' ? (
                    <AlertCircle className="w-4 h-4 text-red-400" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  )}
                  <span>{progress.message || 'Processing...'}</span>
                </span>
                <span className="font-mono-data text-amber-300 font-medium">
                  {progress.progressPercent}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-[#14192b] rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    progress.status === 'completed'
                      ? 'bg-emerald-400'
                      : progress.status === 'error'
                      ? 'bg-red-500'
                      : 'bg-gradient-to-r from-amber-400 to-amber-300'
                  }`}
                  style={{ width: `${progress.progressPercent}%` }}
                />
              </div>

              {/* Error Message */}
              {progress.error && (
                <div className="text-xs text-red-400 font-mono-data mt-1">
                  Error: {progress.error}
                </div>
              )}

              {/* Success Result Details */}
              {progress.outputDetails && (
                <div className="pt-2 border-t border-[#1a2034] text-xs font-mono-data text-slate-400 space-y-1">
                  <div>
                    <span className="text-slate-500">Output File: </span>
                    <span className="text-amber-200">{progress.outputDetails.filename}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Dimensions: </span>
                    <span className="text-slate-200">
                      {progress.outputDetails.width} × {progress.outputDetails.height} px
                    </span>
                    <span className="text-slate-500 ml-3">File Size: </span>
                    <span className="text-slate-200">
                      {(progress.outputDetails.fileSizeBytes / (1024 * 1024)).toFixed(2)} MB
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-3.5 border-t border-[#1b2136] bg-[#070912] shrink-0">
          <button
            onClick={onClose}
            disabled={isBusy}
            className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white rounded-lg transition-colors cursor-pointer disabled:opacity-40"
          >
            Cancel
          </button>

          <button
            onClick={handleStartExport}
            disabled={isBusy}
            className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-950 bg-gradient-to-r from-amber-300 to-amber-400 hover:from-amber-200 hover:to-amber-300 rounded-lg transition-all shadow-md shadow-amber-500/20 cursor-pointer disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>
              {isBusy
                ? 'Rasterizing...'
                : progress.status === 'completed'
                ? 'Export Again'
                : `Export (${selectedResolution.width} × ${selectedResolution.height} PNG)`}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

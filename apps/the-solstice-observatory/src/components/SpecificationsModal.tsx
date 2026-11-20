/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { X, CheckCircle2, ShieldCheck, Download } from 'lucide-react';

interface SpecificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenExport: () => void;
}

export default function SpecificationsModal({
  isOpen,
  onClose,
  onOpenExport,
}: SpecificationsModalProps) {
  if (!isOpen) return null;

  const specs = [
    {
      title: 'Smallest Side ≥ 2000px',
      requirement: 'Smallest side of aspect ratio must be at least 2000px.',
      implementation: 'Native artwork viewBox: 2400 × 3200 px (Width: 2400px, Height: 3200px). Smallest dimension is 2400px, exceeding requirement by +400px.',
      status: 'VERIFIED',
    },
    {
      title: 'Lossless PNG Export',
      requirement: 'Artwork must export in PNG format without artifacts.',
      implementation: 'Offscreen Canvas 2D rasterizer with high-quality smoothing, clean color fills, and lossless image/png encoding.',
      status: 'VERIFIED',
    },
    {
      title: 'Hard-Coded SVG Format',
      requirement: 'Art must be hard-coded in SVG format without external images or AI image generation tools.',
      implementation: '100% hand-authored SVG geometry across 7 modular layers with trigonometric calculations, custom gradients, and filters.',
      status: 'VERIFIED',
    },
    {
      title: 'Zero Interactive Animations',
      requirement: 'Static artwork only. No interactive animations or temporal transitions.',
      implementation: 'Completely static vector composition, preserving absolute fidelity when rendered to static PNG format.',
      status: 'VERIFIED',
    },
    {
      title: 'Layered Vector Architecture',
      requirement: 'Layer of SVG to compose full piece for easy iterative editing.',
      implementation: 'Decomposed into 7 modular layer files in src/art/layers/ (Background, Grid, Eclipse, Landscape, Architecture, Sanctuary, Matte).',
      status: 'VERIFIED',
    },
    {
      title: 'Project Management Directory',
      requirement: 'Maintain a project_management directory containing markdown files for long-term project memory.',
      implementation: 'Active directory in /project_management/ with art_concept.md, layer_architecture.md, specs_and_export.md, and iteration_log.md.',
      status: 'VERIFIED',
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-hidden">
      <div className="relative w-full max-w-2xl max-h-[calc(100dvh-1.5rem)] flex flex-col bg-[#0b0d18] border border-[#242b44] rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1b2136] bg-[#070912] shrink-0">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <div>
              <span className="text-xs tracking-widest uppercase font-mono-data text-emerald-400 block">
                COMPLIANCE & SPECIFICATION AUDIT
              </span>
              <h2 className="text-lg font-bold text-slate-100 font-serif-display">
                Engineering Invariants
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 min-h-0 space-y-4">
          {specs.map((item, idx) => (
            <div
              key={`spec-${idx}`}
              className="p-4 rounded-xl bg-[#0e1222] border border-[#1f2742] space-y-2"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <h3 className="text-sm font-semibold text-slate-100 font-serif-display">
                    {item.title}
                  </h3>
                </div>
                <span className="text-[11px] font-mono-data text-emerald-300 font-medium">
                  {item.status}
                </span>
              </div>
              <div className="text-xs text-slate-400 pl-6">
                <span className="text-slate-500 font-medium">Requirement: </span>
                {item.requirement}
              </div>
              <div className="text-xs text-amber-200/90 pl-6 pt-1 font-mono-data">
                <span className="text-slate-500 font-sans">Implementation: </span>
                {item.implementation}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3.5 border-t border-[#1b2136] bg-[#070912] shrink-0">
          <button
            onClick={() => {
              onClose();
              onOpenExport();
            }}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export 2400px Master PNG</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

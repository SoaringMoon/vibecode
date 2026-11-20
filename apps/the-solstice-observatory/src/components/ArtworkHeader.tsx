/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Download } from 'lucide-react';

interface ArtworkHeaderProps {
  activeView: 'masterpiece' | 'layers' | 'notes' | 'specs';
  onSelectView: (view: 'masterpiece' | 'layers' | 'notes' | 'specs') => void;
  onOpenExport: () => void;
  isExporting: boolean;
}

export default function ArtworkHeader({
  activeView,
  onSelectView,
  onOpenExport,
  isExporting,
}: ArtworkHeaderProps) {
  return (
    <header className="flex items-center justify-between gap-8 px-6 py-3.5 bg-[#080911]/90 backdrop-blur-md border-b border-[#1f2438] sticky top-0 z-40 select-none">
      {/* Zone 1: Single text element wordmark */}
      <div className="flex items-center gap-3 shrink-0">
        <a
          href="#masterpiece"
          onClick={(e) => {
            e.preventDefault();
            onSelectView('masterpiece');
          }}
          className="text-lg md:text-xl font-semibold tracking-wider text-amber-100 font-serif-display whitespace-nowrap shrink-0 hover:text-amber-200 transition-colors"
        >
          The Solstice Observatory
        </a>
      </div>

      {/* Zone 2: 4 clean single-line text navigation links */}
      <nav className="hidden md:flex items-center gap-7 text-xs tracking-wider uppercase font-medium text-slate-400">
        <button
          onClick={() => onSelectView('masterpiece')}
          className={`hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeView === 'masterpiece' ? 'text-amber-400 font-semibold border-b border-amber-400 pb-0.5' : ''
          }`}
        >
          Masterpiece
        </button>
        <button
          onClick={() => onSelectView('layers')}
          className={`hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeView === 'layers' ? 'text-amber-400 font-semibold border-b border-amber-400 pb-0.5' : ''
          }`}
        >
          Layer Stack
        </button>
        <button
          onClick={() => onSelectView('notes')}
          className={`hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeView === 'notes' ? 'text-amber-400 font-semibold border-b border-amber-400 pb-0.5' : ''
          }`}
        >
          Curatorial Essay
        </button>
        <button
          onClick={() => onSelectView('specs')}
          className={`hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeView === 'specs' ? 'text-amber-400 font-semibold border-b border-amber-400 pb-0.5' : ''
          }`}
        >
          Specifications
        </button>
      </nav>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onOpenExport}
          disabled={isExporting}
          className="flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wide text-slate-950 bg-gradient-to-r from-amber-300 to-amber-400 rounded-lg hover:from-amber-200 hover:to-amber-300 active:scale-[0.98] transition-all whitespace-nowrap shrink-0 shadow-sm shadow-amber-500/20 cursor-pointer disabled:opacity-50"
        >
          <Download className="w-3.5 h-3.5" />
          <span>{isExporting ? 'Exporting...' : 'Export 2400px PNG'}</span>
        </button>
      </div>
    </header>
  );
}

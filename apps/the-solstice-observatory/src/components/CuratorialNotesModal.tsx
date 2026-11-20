/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { X, BookOpen, Layers } from 'lucide-react';

interface CuratorialNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInspectLayers: () => void;
}

export default function CuratorialNotesModal({
  isOpen,
  onClose,
  onInspectLayers,
}: CuratorialNotesModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-hidden">
      <div className="relative w-full max-w-3xl max-h-[calc(100dvh-1.5rem)] flex flex-col bg-[#0b0d18] border border-[#242b44] rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1b2136] bg-[#070912] shrink-0">
          <div className="flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <div>
              <span className="text-xs tracking-widest uppercase font-mono-data text-amber-500/90 block">
                CATALOGUE RAISONNÉ · VOL. I
              </span>
              <h2 className="text-lg font-bold text-slate-100 font-serif-display">
                Curatorial Essay & Accession Notes
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
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 min-h-0 space-y-6 text-slate-300">
          {/* Accession Metadata Grid */}
          <div className="p-5 rounded-xl bg-[#0e1222] border border-[#222a46]">
            <dl className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6 text-xs">
              <div>
                <dt className="text-slate-500 uppercase tracking-wider font-mono-data">Accession No.</dt>
                <dd className="font-mono-data text-amber-300 font-medium mt-1">ACC.2026.10.13-SVG</dd>
              </div>
              <div>
                <dt className="text-slate-500 uppercase tracking-wider font-mono-data">Object Title</dt>
                <dd className="font-serif-display text-slate-100 font-semibold mt-1">The Solstice Observatory</dd>
              </div>
              <div>
                <dt className="text-slate-500 uppercase tracking-wider font-mono-data">Medium & Technique</dt>
                <dd className="text-slate-200 mt-1">Hard-Coded Scalable Vector Graphics (SVG)</dd>
              </div>
              <div>
                <dt className="text-slate-500 uppercase tracking-wider font-mono-data">Native Aspect Ratio</dt>
                <dd className="font-mono-data text-slate-200 mt-1">3:4 (2400 × 3200 px)</dd>
              </div>
              <div>
                <dt className="text-slate-500 uppercase tracking-wider font-mono-data">Export Constraint</dt>
                <dd className="font-mono-data text-emerald-400 font-medium mt-1">Smallest side: 2400px (≥ 2000px)</dd>
              </div>
              <div>
                <dt className="text-slate-500 uppercase tracking-wider font-mono-data">Coordinate Epoch</dt>
                <dd className="font-mono-data text-slate-200 mt-1">Epoch 2026.85 · 36°42'N</dd>
              </div>
            </dl>
          </div>

          {/* Curatorial Narrative Essay */}
          <div className="space-y-6 text-sm leading-relaxed max-w-prose">
            <div className="border-b border-[#1c2238] pb-4">
              <h3 className="text-xl font-semibold text-amber-200 font-serif-display">
                The Architecture of Light and Void
              </h3>
              <p className="text-xs uppercase tracking-wider font-mono-data text-slate-500 mt-1">
                A Treatise on Harmonic Alignment in the Obsidian Reaches
              </p>
            </div>

            <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-amber-400 text-slate-300">
              In an age where algorithmic approximations frequently supplant deliberate composition, <em>The Solstice Observatory</em> stands as an homage to exactitude. Built entirely from hand-authored SVG coordinates, geometric bezier splines, and trigonometric ray distributions, the work explores the tension between monumental permanence and celestial ephemerality.
            </p>

            <p>
              At the zenith sits the total solar eclipse, crowned by the sweeping arch of the Milky Way Galactic Core with its dark interstellar Great Rift dust lanes and the sapphire reflection shroud of the Pleiades (M45). Across the sky cuts the Ecliptic Great Circle (Via Solis) at an angle of 23.4°, charting the solar path across seven celestial nodes and astrolabe Almucantar altitude curves. Rather than relying on soft post-render blurs, the solar corona is computed across 48 distinct polygonal spires, twin colossal equatorial helmet streamers extending 1100px east and west, polar magnetic ray plumes, and 160 fine ruby-and-carmine chromosphere spicules. Erupting from the lunar limb are dynamic coronal mass loops counterbalanced by Baily's Beads and a 32-point diamond ring burst surrounded by four concentric Newton's refraction diffraction rings.
            </p>

            <p>
              Anchoring the celestial upheaval is the monolithic sanctuary below. Twin stepped pylons of dark volcanic basalt flank a grand perspective stairway of thirty stone tiers, crowned at the apex by a monumental bronze armillary sphere monument set atop a stepped pediment. At the structure’s heart lies a circular aperture ring—a monumental astrolabe calibrated to the horizon, channeling volumetric crepuscular God rays down onto the staircase and into the mirrored obsidian reflecting pool, which casts inverted reflections of the corona and aperture spokes through shimmering surface caustics.
            </p>

            <p>
              In the foreground sanctuary, a solitary robed astronomer stands upon the basalt overlook beside an ancient reading plinth with an unrolled vellum star chart scroll and brass quadrant, their ceremonial armillary staff crowned with concentric rings and planetary beads. Beside them, the monumental gnomon obelisk casts an elongated shadow across the flagstone terrace, while dual astronomical ephemeris plaques and the observatory foundation seal anchor the lower museum cartouche in classical precision.
            </p>
          </div>

          {/* Technical Specifications Summary */}
          <div className="pt-4 border-t border-[#1b2136]">
            <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wider font-mono-data mb-3">
              Vector Invariants & Rendering Pipeline
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-[#080a14] rounded-lg border border-[#1a1f33]">
                <div className="font-semibold text-slate-200">Zero AI / Zero External Assets</div>
                <div className="text-slate-400 mt-1">
                  100% vector mathematics, native SVG elements, gradients, and trigonometry.
                </div>
              </div>
              <div className="p-3 bg-[#080a14] rounded-lg border border-[#1a1f33]">
                <div className="font-semibold text-slate-200">Lossless 2400px+ PNG Rasterizer</div>
                <div className="text-slate-400 mt-1">
                  Offscreen canvas renderer with high-quality smoothing and crisp vector anti-aliasing.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-3.5 border-t border-[#1b2136] bg-[#070912] shrink-0">
          <button
            onClick={() => {
              onClose();
              onInspectLayers();
            }}
            className="flex items-center gap-2 text-xs font-medium text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
          >
            <Layers className="w-4 h-4" />
            <span>Open Layer Inspector</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            Close Notes
          </button>
        </div>
      </div>
    </div>
  );
}

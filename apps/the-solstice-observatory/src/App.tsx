/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import ArtworkHeader from './components/ArtworkHeader';
import GalleryCanvas from './components/GalleryCanvas';
import LayerDrawer from './components/LayerDrawer';
import CuratorialNotesModal from './components/CuratorialNotesModal';
import SpecificationsModal from './components/SpecificationsModal';
import ExportModal from './components/ExportModal';
import { ARTWORK_LAYERS } from './art/Masterpiece';

export default function App() {
  const allLayerIds = ARTWORK_LAYERS.map((l) => l.id);

  // Active view and visibility states
  const [activeView, setActiveView] = useState<'masterpiece' | 'layers' | 'notes' | 'specs'>('masterpiece');
  const [visibleLayers, setVisibleLayers] = useState<string[]>(allLayerIds);
  const [framingMode, setFramingMode] = useState<'matting' | 'darkroom'>('matting');

  // Modal open states
  const [isLayerDrawerOpen, setIsLayerDrawerOpen] = useState<boolean>(false);
  const [isNotesOpen, setIsNotesOpen] = useState<boolean>(false);
  const [isSpecsOpen, setIsSpecsOpen] = useState<boolean>(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  // Handle top navigation
  const handleSelectView = (view: 'masterpiece' | 'layers' | 'notes' | 'specs') => {
    setActiveView(view);
    if (view === 'masterpiece') {
      setIsLayerDrawerOpen(false);
      setIsNotesOpen(false);
      setIsSpecsOpen(false);
    } else if (view === 'layers') {
      setIsLayerDrawerOpen(true);
      setIsNotesOpen(false);
      setIsSpecsOpen(false);
    } else if (view === 'notes') {
      setIsNotesOpen(true);
      setIsLayerDrawerOpen(false);
      setIsSpecsOpen(false);
    } else if (view === 'specs') {
      setIsSpecsOpen(true);
      setIsLayerDrawerOpen(false);
      setIsNotesOpen(false);
    }
  };

  // Layer toggling
  const handleToggleLayer = (layerId: string) => {
    setVisibleLayers((prev) =>
      prev.includes(layerId)
        ? prev.filter((id) => id !== layerId)
        : [...prev, layerId],
    );
  };

  // Solo layer
  const handleSoloLayer = (layerId: string) => {
    if (visibleLayers.length === 1 && visibleLayers[0] === layerId) {
      // Toggle back to all
      setVisibleLayers(allLayerIds);
    } else {
      setVisibleLayers([layerId]);
    }
  };

  // Reset layers to all visible
  const handleResetLayers = () => {
    setVisibleLayers(allLayerIds);
  };

  return (
    <div className="flex flex-col h-screen h-[100dvh] w-full overflow-hidden bg-[#07080f] text-slate-100 selection:bg-amber-400 selection:text-slate-950 font-sans">
      {/* 3-Zone Top Bar Navigation */}
      <ArtworkHeader
        activeView={activeView}
        onSelectView={handleSelectView}
        onOpenExport={() => setIsExportModalOpen(true)}
        isExporting={isExporting}
      />

      {/* Main Museum Canvas Viewport */}
      <main className="relative flex-1 min-h-0 w-full overflow-hidden flex flex-col">
        <GalleryCanvas
          visibleLayers={visibleLayers}
          framingMode={framingMode}
          onToggleFraming={(mode) => setFramingMode(mode)}
          onOpenLayers={() => {
            setIsLayerDrawerOpen(true);
            setActiveView('layers');
          }}
          onOpenExport={() => setIsExportModalOpen(true)}
        />

        {/* Vector Layer Stack Drawer */}
        <LayerDrawer
          isOpen={isLayerDrawerOpen}
          onClose={() => {
            setIsLayerDrawerOpen(false);
            if (activeView === 'layers') setActiveView('masterpiece');
          }}
          visibleLayers={visibleLayers}
          onToggleLayer={handleToggleLayer}
          onSoloLayer={handleSoloLayer}
          onResetLayers={handleResetLayers}
        />
      </main>

      {/* Curatorial Notes & Catalogue Raisonné Modal */}
      <CuratorialNotesModal
        isOpen={isNotesOpen}
        onClose={() => {
          setIsNotesOpen(false);
          if (activeView === 'notes') setActiveView('masterpiece');
        }}
        onInspectLayers={() => {
          setIsNotesOpen(false);
          setIsLayerDrawerOpen(true);
          setActiveView('layers');
        }}
      />

      {/* Compliance & Engineering Specifications Modal */}
      <SpecificationsModal
        isOpen={isSpecsOpen}
        onClose={() => {
          setIsSpecsOpen(false);
          if (activeView === 'specs') setActiveView('masterpiece');
        }}
        onOpenExport={() => {
          setIsSpecsOpen(false);
          setIsExportModalOpen(true);
        }}
      />

      {/* High-Resolution PNG Export Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        svgElementId="masterpiece-svg"
      />
    </div>
  );
}

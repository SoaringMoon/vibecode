/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import MasterDefs from './MasterDefs';
import Layer0_Background from './layers/Layer0_Background';
import Layer1_CelestialGrid from './layers/Layer1_CelestialGrid';
import Layer2_TheEclipse from './layers/Layer2_TheEclipse';
import Layer3_DistantLandscape from './layers/Layer3_DistantLandscape';
import Layer4_ObservatoryArchitecture from './layers/Layer4_ObservatoryArchitecture';
import Layer5_ForegroundSanctuary from './layers/Layer5_ForegroundSanctuary';
import Layer6_VignetteAndMatte from './layers/Layer6_VignetteAndMatte';

export interface LayerInfo {
  id: string;
  name: string;
  category: string;
  description: string;
}

export const ARTWORK_LAYERS: LayerInfo[] = [
  {
    id: 'layer0',
    name: '00. Celestial Background & Deep Sky',
    category: 'Cosmos',
    description: 'Milky Way galactic core arch, Great Rift dust lanes, Pleiades (M45) shroud, Andromeda Galaxy, Orion Nebula, and Zodiacal light.',
  },
  {
    id: 'layer1',
    name: '01. Celestial Mechanics & Grid',
    category: 'Astrolabe',
    description: 'Ecliptic Great Circle (Via Solis), Almucantar altitude arcs, 12 Zodiac houses, Ursa Major with Polaris pointer ray, and 420+ stars.',
  },
  {
    id: 'layer2',
    name: '02. The Eclipse & Solar Dynamics',
    category: 'Focal Center',
    description: '160 solar chromosphere spicules, equatorial helmet streamers, polar plumes, 48 corona beams, prominences, and Newton’s rings.',
  },
  {
    id: 'layer3',
    name: '03. Distant Mountains & Geology',
    category: 'Geology',
    description: 'Sedimentary strata peaks, talus scree boulder fields, horizon megalithic trilithons, and wind-rippled desert dunes.',
  },
  {
    id: 'layer4',
    name: '04. Monumental Architecture & Pool',
    category: 'Sanctuary',
    description: 'Apex bronze armillary monument, volumetric crepuscular God rays, stepped pylons, 30-tier staircase, and reflecting pool caustics.',
  },
  {
    id: 'layer5',
    name: '05. Foreground Sanctuary & Observer',
    category: 'Foreground',
    description: 'Astronomer with celestial staff, reading plinth with star chart scroll, brass quadrant, obelisk solar shadow, and compass rose.',
  },
  {
    id: 'layer6',
    name: '06. Archival Matte & Ephemeris',
    category: 'Curation',
    description: 'Dual astronomical ephemeris plaques, engraved observatory seal medallion, astrolabe quadrants, and master typography cartouche.',
  },
];

interface MasterpieceProps {
  id?: string;
  visibleLayers?: string[];
  className?: string;
  style?: React.CSSProperties;
}

export default function Masterpiece({
  id = 'masterpiece-svg',
  visibleLayers = ['layer0', 'layer1', 'layer2', 'layer3', 'layer4', 'layer5', 'layer6'],
  className = '',
  style,
}: MasterpieceProps) {
  const isVisible = (layerId: string) => visibleLayers.includes(layerId);

  return (
    <svg
      id={id}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 2400 3200"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
      className={className}
      style={{
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
        ...style,
      }}
    >
      {/* Master Shared Definitions: Gradients, Filters, ClipPaths */}
      <MasterDefs />

      {/* Layer 0: Deep Celestial Sky & Cosmic Nebulae */}
      {isVisible('layer0') && <Layer0_Background />}

      {/* Layer 1: Astrolabe Grid, Golden Spiral & 420+ Star Constellations */}
      {isVisible('layer1') && <Layer1_CelestialGrid />}

      {/* Layer 2: The Focal Total Solar Eclipse, Coronal Beams & Diamond Ring */}
      {isVisible('layer2') && <Layer2_TheEclipse />}

      {/* Layer 3: Geological Mountain Ranges & Basalt Sand Dunes */}
      {isVisible('layer3') && <Layer3_DistantLandscape />}

      {/* Layer 4: Stepped Megalithic Observatory, Aperture & Mirrored Pool */}
      {isVisible('layer4') && <Layer4_ObservatoryArchitecture />}

      {/* Layer 5: Foreground Overlook, Solitary Astronomer & Gnomon */}
      {isVisible('layer5') && <Layer5_ForegroundSanctuary />}

      {/* Layer 6: Archival Museum Matte, Coordinate Ticks & Curatorial Cartouche */}
      {isVisible('layer6') && <Layer6_VignetteAndMatte />}
    </svg>
  );
}

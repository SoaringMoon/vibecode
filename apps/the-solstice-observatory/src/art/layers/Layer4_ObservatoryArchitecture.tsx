/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Generate 32 perspective-projected stone steps
function generateStairs() {
  const steps = [];
  const count = 30;
  const startY = 2260;
  const endY = 2660;
  const startWidth = 460;
  const endWidth = 1120;

  for (let i = 0; i < count; i++) {
    const t = i / (count - 1);
    const tCurved = Math.pow(t, 1.45);
    const y = startY + tCurved * (endY - startY);
    const nextTCurved = Math.pow((i + 1) / (count - 1), 1.45);
    const nextY = i < count - 1 ? startY + nextTCurved * (endY - startY) : endY + 14;
    const riserHeight = Math.max(3, (nextY - y) * 0.38);
    const width = startWidth + t * (endWidth - startWidth);

    steps.push({
      index: i,
      y,
      nextY,
      riserHeight,
      x1: 1200 - width / 2,
      x2: 1200 + width / 2,
      width,
    });
  }
  return steps;
}

const STAIRS = generateStairs();

// Generate 24 radial spokes for the central aperture astrolabe
function generateApertureSpokes() {
  const spokes = [];
  const cx = 1200;
  const cy = 2160;
  const rInner = 140;
  const rOuter = 330;
  const count = 24;

  for (let i = 0; i < count; i++) {
    const angle = (i * 2 * Math.PI) / count;
    const x1 = cx + Math.cos(angle) * rInner;
    const y1 = cy + Math.sin(angle) * rInner;
    const x2 = cx + Math.cos(angle) * rOuter;
    const y2 = cy + Math.sin(angle) * rOuter;
    spokes.push({ x1, y1, x2, y2, angle: (i * 360) / count });
  }
  return spokes;
}

const APERTURE_SPOKES = generateApertureSpokes();

export default function Layer4_ObservatoryArchitecture() {
  return (
    <g id="layer4-observatory-architecture" shapeRendering="geometricPrecision">
      {/* ========================================================
          MONUMENTAL BASALT TEMPLE PYLONS & PORTAL
          ======================================================== */}
      {/* Left Stepped Megalithic Pylon */}
      <g id="pylon-left">
        {/* Tier 1 (Outermost Base) */}
        <polygon
          points="540,2680 540,2240 640,2200 640,2680"
          fill="url(#monolithBasalt)"
        />
        <polygon
          points="540,2680 540,2240 640,2200 640,2680"
          fill="url(#masonryBlocks)"
          opacity="0.35"
        />
        <line x1="540" y1="2240" x2="640" y2="2200" stroke="#fde047" strokeWidth="1.8" opacity="0.6" />

        {/* Tier 2 */}
        <polygon
          points="620,2680 620,2080 740,2020 740,2680"
          fill="url(#monolithBasalt)"
        />
        <polygon
          points="620,2680 620,2080 740,2020 740,2680"
          fill="url(#masonryBlocks)"
          opacity="0.35"
        />
        <line x1="620" y1="2080" x2="740" y2="2020" stroke="#fde047" strokeWidth="2.0" opacity="0.75" />

        {/* Tier 3 (Main Tower) */}
        <polygon
          points="720,2680 720,1920 860,1860 860,2680"
          fill="url(#monolithBasalt)"
        />
        <polygon
          points="720,2680 720,1920 860,1860 860,2680"
          fill="url(#masonryBlocks)"
          opacity="0.4"
        />
        {/* Sunlit Crown & Bevel */}
        <line x1="720" y1="1920" x2="860" y2="1860" stroke="#fef08a" strokeWidth="2.8" opacity="0.95" />
        <line x1="860" y1="1860" x2="860" y2="2680" stroke="#facc15" strokeWidth="2.0" opacity="0.8" />

        {/* Inscribed Architectural Masonry Joint Lines & Staggered Ashlar Blocks */}
        {[1980, 2060, 2140, 2220, 2300, 2380, 2460, 2540, 2620].map((y, idx) => (
          <g key={`pylon-l-joint-${idx}`}>
            <line
              x1="720"
              y1={y}
              x2="860"
              y2={y - 10}
              stroke="#0a0a14"
              strokeWidth="1.5"
              opacity="0.9"
            />
            {/* Subtle Sunlit Upper Chamfer */}
            <line
              x1="720"
              y1={y - 1}
              x2="860"
              y2={y - 11}
              stroke="#334155"
              strokeWidth="0.7"
              opacity="0.6"
            />
            {/* Staggered Vertical Ashlar Head Joint */}
            {idx < 8 && (
              <line
                x1={idx % 2 === 0 ? 765 : 815}
                y1={y - (idx % 2 === 0 ? 3 : 7)}
                x2={idx % 2 === 0 ? 765 : 815}
                y2={y + 77 - (idx % 2 === 0 ? 3 : 7)}
                stroke="#080911"
                strokeWidth="1.3"
                opacity="0.8"
              />
            )}
          </g>
        ))}

        {/* Vertical Shadow Flutes */}
        <rect x="760" y="1960" width="18" height="660" fill="url(#monolithShadow)" />
        <rect x="800" y="1960" width="18" height="660" fill="url(#monolithShadow)" />
      </g>

      {/* Right Stepped Megalithic Pylon */}
      <g id="pylon-right">
        {/* Tier 3 (Main Tower) */}
        <polygon
          points="1540,2680 1540,1860 1680,1920 1680,2680"
          fill="url(#monolithBasalt)"
        />
        <polygon
          points="1540,2680 1540,1860 1680,1920 1680,2680"
          fill="url(#masonryBlocks)"
          opacity="0.4"
        />
        <line x1="1540" y1="1860" x2="1680" y2="1920" stroke="#fef08a" strokeWidth="2.8" opacity="0.95" />
        <line x1="1540" y1="1860" x2="1540" y2="2680" stroke="#facc15" strokeWidth="2.0" opacity="0.8" />

        {/* Tier 2 */}
        <polygon
          points="1660,2680 1660,2020 1780,2080 1780,2680"
          fill="url(#monolithBasalt)"
        />
        <polygon
          points="1660,2680 1660,2020 1780,2080 1780,2680"
          fill="url(#masonryBlocks)"
          opacity="0.35"
        />
        <line x1="1660" y1="2020" x2="1780" y2="2080" stroke="#fde047" strokeWidth="2.0" opacity="0.75" />

        {/* Tier 1 (Outermost Base) */}
        <polygon
          points="1760,2680 1760,2200 1860,2240 1860,2680"
          fill="url(#monolithBasalt)"
        />
        <polygon
          points="1760,2680 1760,2200 1860,2240 1860,2680"
          fill="url(#masonryBlocks)"
          opacity="0.35"
        />
        <line x1="1760" y1="2200" x2="1860" y2="2240" stroke="#fde047" strokeWidth="1.8" opacity="0.6" />

        {/* Inscribed Architectural Masonry Joint Lines & Staggered Ashlar Blocks */}
        {[1980, 2060, 2140, 2220, 2300, 2380, 2460, 2540, 2620].map((y, idx) => (
          <g key={`pylon-r-joint-${idx}`}>
            <line
              x1="1540"
              y1={y - 10}
              x2="1680"
              y2={y}
              stroke="#0a0a14"
              strokeWidth="1.5"
              opacity="0.9"
            />
            {/* Subtle Sunlit Upper Chamfer */}
            <line
              x1="1540"
              y1={y - 11}
              x2="1680"
              y2={y - 1}
              stroke="#334155"
              strokeWidth="0.7"
              opacity="0.6"
            />
            {/* Staggered Vertical Ashlar Head Joint */}
            {idx < 8 && (
              <line
                x1={idx % 2 === 0 ? 1605 : 1655}
                y1={y - 10 + (idx % 2 === 0 ? 4 : 8)}
                x2={idx % 2 === 0 ? 1605 : 1655}
                y2={y + 70 + (idx % 2 === 0 ? 4 : 8)}
                stroke="#080911"
                strokeWidth="1.3"
                opacity="0.8"
              />
            )}
          </g>
        ))}

        {/* Vertical Shadow Flutes */}
        <rect x="1580" y="1960" width="18" height="660" fill="url(#monolithShadow)" />
        <rect x="1620" y="1960" width="18" height="660" fill="url(#monolithShadow)" />
      </g>

      {/* ========================================================
          MONUMENTAL APEX ARMILLARY SPHERE & GIMBAL PEDESTAL
          ======================================================== */}
      <g id="apex-armillary-monument" transform="translate(1200, 1870)">
        {/* Stepped Basalt Pedestal */}
        <polygon points="-70,50 70,50 55,30 -55,30" fill="url(#monolithBasalt)" />
        <polygon points="-55,30 55,30 42,12 -42,12" fill="url(#monolithBasalt)" />
        <polygon points="-42,12 42,12 30,-2 -30,-2" fill="url(#monolithBasalt)" />
        <line x1="-70" y1="50" x2="70" y2="50" stroke="#fde047" strokeWidth="1.6" opacity="0.85" />
        <line x1="-55" y1="30" x2="55" y2="30" stroke="#fde047" strokeWidth="1.4" opacity="0.8" />
        <line x1="-42" y1="12" x2="42" y2="12" stroke="#fde047" strokeWidth="1.2" opacity="0.8" />
        {/* Bronze Armillary Sphere */}
        <circle cx="0" cy="-42" r="38" fill="none" stroke="url(#goldFoil)" strokeWidth="2.4" />
        <circle cx="0" cy="-42" r="32" fill="none" stroke="#fde047" strokeWidth="1.2" strokeDasharray="3 3" />
        {/* Astrolabe Colure & Tropic Graduations */}
        {[-30, -15, 0, 15, 30].map((deg, idx) => (
          <line
            key={`arm-tick-${idx}`}
            x1={Math.sin((deg * Math.PI) / 180) * 36}
            y1={-42 - Math.cos((deg * Math.PI) / 180) * 36}
            x2={Math.sin((deg * Math.PI) / 180) * 39}
            y2={-42 - Math.cos((deg * Math.PI) / 180) * 39}
            stroke="#fef08a"
            strokeWidth="1.0"
          />
        ))}
        <ellipse cx="0" cy="-42" rx="36" ry="12" fill="none" stroke="#eab308" strokeWidth="1.6" transform="rotate(-23.4 0 -42)" />
        <ellipse cx="0" cy="-42" rx="36" ry="12" fill="none" stroke="#ca8a04" strokeWidth="1.4" transform="rotate(23.4 0 -42)" />
        <line x1="-16" y1="-78" x2="16" y2="-6" stroke="#fef08a" strokeWidth="2.0" />
        <circle cx="-16" cy="-78" r="3.5" fill="#fef08a" />
        <circle cx="16" cy="-6" r="3.5" fill="#fef08a" />
        <circle cx="0" cy="-42" r="9" fill="url(#goldFoil)" />
        <circle cx="0" cy="-42" r="4.5" fill="#ffffff" />
      </g>

      {/* Monumental Lintel Arch Connecting the Towers */}
      <polygon
        points="860,1920 1540,1920 1540,1980 860,1980"
        fill="url(#monolithBasalt)"
      />
      <line x1="860" y1="1920" x2="1540" y2="1920" stroke="#fef08a" strokeWidth="2.6" opacity="0.9" />
      <line x1="860" y1="1980" x2="1540" y2="1980" stroke="#05060a" strokeWidth="3" />

      {/* Inscribed Relief Frieze of Lunar Phases along the Architrave Lintel */}
      {[-280, -200, -120, -40, 40, 120, 200, 280].map((xOffset, idx) => (
        <g key={`lunar-frieze-${idx}`} transform={`translate(${1200 + xOffset}, 1950)`}>
          {/* Outer Intaglio Medallion Rim */}
          <circle cx="0" cy="0" r="13" fill="#06070d" stroke="#ca8a04" strokeWidth="1.2" />
          <circle cx="0" cy="0" r="10.8" fill="none" stroke="#fde047" strokeWidth="0.6" strokeDasharray="1.5 2" opacity="0.6" />
          {/* Cardinal Calibrated Ticks */}
          <line x1="-12" y1="0" x2="-9.5" y2="0" stroke="#fef08a" strokeWidth="0.8" />
          <line x1="9.5" y1="0" x2="12" y2="0" stroke="#fef08a" strokeWidth="0.8" />
          <line x1="0" y1="-12" x2="0" y2="-9.5" stroke="#fef08a" strokeWidth="0.8" />
          <line x1="0" y1="9.5" x2="0" y2="12" stroke="#fef08a" strokeWidth="0.8" />
          {/* Lunar Phase Bas-Relief Silhouette */}
          {idx === 0 && <circle cx="0" cy="0" r="7.5" fill="#1e182e" stroke="#2a1e3d" strokeWidth="0.5" />}
          {idx === 1 && <path d="M 0,-7.5 A 7.5,7.5 0 0,1 0,7.5 A 3.8,7.5 0 0,1 0,-7.5" fill="#fde047" />}
          {idx === 2 && <path d="M 0,-7.5 A 7.5,7.5 0 0,1 0,7.5 Z" fill="#fde047" />}
          {idx === 3 && <path d="M 0,-7.5 A 7.5,7.5 0 0,1 0,7.5 A 3.8,7.5 0 0,0 0,-7.5" fill="#fde047" />}
          {idx === 4 && <circle cx="0" cy="0" r="7.5" fill="#fde047" />}
          {idx === 5 && <path d="M 0,-7.5 A 7.5,7.5 0 0,0 0,7.5 A 3.8,7.5 0 0,0 0,-7.5" fill="#fde047" />}
          {idx === 6 && <path d="M 0,-7.5 A 7.5,7.5 0 0,0 0,7.5 Z" fill="#fde047" />}
          {idx === 7 && <path d="M 0,-7.5 A 7.5,7.5 0 0,0 0,7.5 A 3.8,7.5 0 0,1 0,-7.5" fill="#fde047" />}
        </g>
      ))}

      {/* ========================================================
          THE GREAT CELESTIAL APERTURE (ASTROLABE RING)
          ======================================================== */}
      <g id="celestial-aperture-portal">
        {/* Massive Outer Arch Ring Frame */}
        <circle
          cx="1200"
          cy="2160"
          r="340"
          fill="none"
          stroke="#161826"
          strokeWidth="38"
        />
        {/* Beveled Outer Gold Rim */}
        <circle
          cx="1200"
          cy="2160"
          r="359"
          fill="none"
          stroke="#fde047"
          strokeWidth="2.5"
          opacity="0.9"
        />
        <circle
          cx="1200"
          cy="2160"
          r="321"
          fill="none"
          stroke="#ca8a04"
          strokeWidth="2.0"
          opacity="0.8"
        />

        {/* 24 Radial Astrolabe Bezel Spokes */}
        {APERTURE_SPOKES.map((spoke, idx) => (
          <line
            key={`aspoke-${idx}`}
            x1={spoke.x1}
            y1={spoke.y1}
            x2={spoke.x2}
            y2={spoke.y2}
            stroke="#facc15"
            strokeWidth={idx % 6 === 0 ? '2.4' : '1.0'}
            opacity={idx % 6 === 0 ? '0.9' : '0.55'}
          />
        ))}

        {/* Inner Horizon Sight Ring */}
        <circle
          cx="1200"
          cy="2160"
          r="140"
          fill="none"
          stroke="#fef08a"
          strokeWidth="2.0"
          strokeDasharray="4 6"
          opacity="0.85"
        />
        <circle
          cx="1200"
          cy="2160"
          r="48"
          fill="none"
          stroke="#fde047"
          strokeWidth="1.5"
          opacity="0.75"
        />
      </g>

      {/* Volumetric Crepuscular God Rays Beaming from Eclipse through Central Aperture */}
      <polygon
        points="1060,2160 1340,2160 1680,2660 720,2660"
        fill="url(#volumetricRayGrad)"
        opacity="0.65"
        style={{ mixBlendMode: 'screen' }}
      />
      <polygon
        points="1140,2160 1260,2160 1480,2660 920,2660"
        fill="url(#volumetricRayGrad)"
        opacity="0.5"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* ========================================================
          THE GRAND CEREMONIAL STAIRWAY (30 TIERS)
          ======================================================== */}
      <g id="grand-stairway">
        {/* Base Stair Foundation Slope */}
        <polygon
          points="960,2260 1440,2260 1780,2660 620,2660"
          fill="#0c0d16"
        />

        {/* Individual Perspective-Projected Step Treads & Risers */}
        {STAIRS.map((step) => (
          <g key={`step-${step.index}`}>
            {/* Step Tread (Flat illuminated horizontal surface) */}
            <polygon
              points={`
                ${step.x1},${step.y} 
                ${step.x2},${step.y} 
                ${step.x2 + 3},${step.y + step.riserHeight} 
                ${step.x1 - 3},${step.y + step.riserHeight}
              `}
              fill="url(#stairTread)"
            />
            {/* Front Lip Highlight with Perspective Distance Weight */}
            <line
              x1={step.x1 - 3}
              y1={step.y + step.riserHeight}
              x2={step.x2 + 3}
              y2={step.y + step.riserHeight}
              stroke="#94a3b8"
              strokeWidth={(0.75 + (step.index / 29) * 1.15).toFixed(2)}
              opacity={0.75 + (step.index / 29) * 0.2}
            />
            {/* Step Riser (Vertical face in deep shadow) */}
            <polygon
              points={`
                ${step.x1 - 3},${step.y + step.riserHeight} 
                ${step.x2 + 3},${step.y + step.riserHeight} 
                ${step.x2 + 4},${step.nextY} 
                ${step.x1 - 4},${step.nextY}
              `}
              fill="url(#stairRiser)"
            />
          </g>
        ))}

        {/* Central Golden Axial Meridian Channel down the Staircase */}
        <polygon
          points="1192,2260 1208,2260 1214,2660 1186,2660"
          fill="url(#goldFoil)"
          opacity="0.8"
        />
        <line x1="1200" y1="2260" x2="1200" y2="2660" stroke="#ffffff" strokeWidth="1.4" opacity="0.9" />

        {/* Inscribed Meridian Calendar Stations (Solar Month Ticks) */}
        {[2290, 2325, 2360, 2395, 2430, 2465, 2500, 2535, 2570, 2605, 2640].map((yTick, idx) => {
          const tW = 8 + (idx / 10) * 8;
          return (
            <line
              key={`merid-cal-${idx}`}
              x1={1200 - tW}
              y1={yTick}
              x2={1200 + tW}
              y2={yTick}
              stroke="#ffffff"
              strokeWidth="0.9"
              opacity="0.85"
            />
          );
        })}

        {/* Flanking Stepped Stone Balustrade Stringers */}
        {/* Left Balustrade Parapet */}
        <polygon points="940,2260 962,2260 622,2660 598,2660" fill="url(#monolithBasalt)" />
        <line x1="940" y1="2260" x2="598" y2="2660" stroke="#fde047" strokeWidth="2.2" opacity="0.85" />
        <line x1="962" y1="2260" x2="622" y2="2660" stroke="#ca8a04" strokeWidth="1.4" opacity="0.75" />

        {/* Right Balustrade Parapet */}
        <polygon points="1438,2260 1460,2260 1802,2660 1778,2660" fill="url(#monolithBasalt)" />
        <line x1="1460" y1="2260" x2="1802" y2="2660" stroke="#fde047" strokeWidth="2.2" opacity="0.85" />
        <line x1="1438" y1="2260" x2="1778" y2="2660" stroke="#ca8a04" strokeWidth="1.4" opacity="0.75" />
      </g>

      {/* ========================================================
          CEREMONIAL BRAZIERS (FOUR FLANKING PLINTHS)
          ======================================================== */}
      {/* Upper Left Brazier Plinth */}
      <g id="brazier-upper-left" transform="translate(680, 2460)">
        <polygon points="-30,0 30,0 24,40 -24,40" fill="url(#monolithBasalt)" />
        <line x1="-30" y1="0" x2="30" y2="0" stroke="#fde047" strokeWidth="1.5" />
        <circle cx="0" cy="-6" r="34" fill="url(#brazierFire)" style={{ mixBlendMode: 'screen' }} />
        <circle cx="0" cy="-6" r="16" fill="#fef08a" />
        <circle cx="0" cy="-6" r="6" fill="#ffffff" />
        <path d="M 0,-14 Q -12,-36 0,-56 Q 8,-74 2,-90" fill="none" stroke="#fdba74" strokeWidth="1.2" strokeDasharray="3 4" opacity="0.45" />
        <path d="M -4,-18 Q 6,-42 -2,-66 Q -6,-82 0,-98" fill="none" stroke="#fed7aa" strokeWidth="0.8" opacity="0.35" />
        {/* Rising Embers */}
        <circle cx="-3" cy="-42" r="1.2" fill="#fed7aa" opacity="0.85" />
        <circle cx="5" cy="-68" r="1.0" fill="#fef08a" opacity="0.8" />
      </g>

      {/* Upper Right Brazier Plinth */}
      <g id="brazier-upper-right" transform="translate(1720, 2460)">
        <polygon points="-30,0 30,0 24,40 -24,40" fill="url(#monolithBasalt)" />
        <line x1="-30" y1="0" x2="30" y2="0" stroke="#fde047" strokeWidth="1.5" />
        <circle cx="0" cy="-6" r="34" fill="url(#brazierFire)" style={{ mixBlendMode: 'screen' }} />
        <circle cx="0" cy="-6" r="16" fill="#fef08a" />
        <circle cx="0" cy="-6" r="6" fill="#ffffff" />
        <path d="M 0,-14 Q 12,-36 0,-56 Q -8,-74 -2,-90" fill="none" stroke="#fdba74" strokeWidth="1.2" strokeDasharray="3 4" opacity="0.45" />
        <path d="M 4,-18 Q -6,-42 2,-66 Q 6,-82 0,-98" fill="none" stroke="#fed7aa" strokeWidth="0.8" opacity="0.35" />
        {/* Rising Embers */}
        <circle cx="3" cy="-42" r="1.2" fill="#fed7aa" opacity="0.85" />
        <circle cx="-5" cy="-68" r="1.0" fill="#fef08a" opacity="0.8" />
      </g>

      {/* Lower Left Brazier Plinth */}
      <g id="brazier-lower-left" transform="translate(560, 2680)">
        <polygon points="-38,0 38,0 30,55 -30,55" fill="url(#monolithBasalt)" />
        <line x1="-38" y1="0" x2="38" y2="0" stroke="#fde047" strokeWidth="1.8" />
        <circle cx="0" cy="-8" r="44" fill="url(#brazierFire)" style={{ mixBlendMode: 'screen' }} />
        <circle cx="0" cy="-8" r="20" fill="#fef08a" />
        <circle cx="0" cy="-8" r="8" fill="#ffffff" />
        <path d="M 0,-18 Q -16,-46 2,-72 Q 14,-94 4,-116" fill="none" stroke="#fdba74" strokeWidth="1.4" strokeDasharray="4 5" opacity="0.5" />
        <path d="M -5,-22 Q 8,-54 -3,-84 Q -8,-106 2,-124" fill="none" stroke="#fed7aa" strokeWidth="0.9" opacity="0.4" />
        {/* Rising Embers */}
        <circle cx="-4" cy="-52" r="1.4" fill="#fed7aa" opacity="0.85" />
        <circle cx="6" cy="-88" r="1.2" fill="#fef08a" opacity="0.8" />
      </g>

      {/* Lower Right Brazier Plinth */}
      <g id="brazier-lower-right" transform="translate(1840, 2680)">
        <polygon points="-38,0 38,0 30,55 -30,55" fill="url(#monolithBasalt)" />
        <line x1="-38" y1="0" x2="38" y2="0" stroke="#fde047" strokeWidth="1.8" />
        <circle cx="0" cy="-8" r="44" fill="url(#brazierFire)" style={{ mixBlendMode: 'screen' }} />
        <circle cx="0" cy="-8" r="20" fill="#fef08a" />
        <circle cx="0" cy="-8" r="8" fill="#ffffff" />
        <path d="M 0,-18 Q 16,-46 -2,-72 Q -14,-94 -4,-116" fill="none" stroke="#fdba74" strokeWidth="1.4" strokeDasharray="4 5" opacity="0.5" />
        <path d="M 5,-22 Q -8,-54 3,-84 Q 8,-106 -2,-124" fill="none" stroke="#fed7aa" strokeWidth="0.9" opacity="0.4" />
        {/* Rising Embers */}
        <circle cx="4" cy="-52" r="1.4" fill="#fed7aa" opacity="0.85" />
        <circle cx="-6" cy="-88" r="1.2" fill="#fef08a" opacity="0.8" />
      </g>

      {/* ========================================================
          THE MIRRORED OBSIDIAN REFLECTING POOL
          ======================================================== */}
      <g id="reflecting-pool">
        {/* Carved Stone Pool Curb / Coping Stones */}
        <polygon
          points="730,2650 1670,2650 1820,2890 580,2890"
          fill="#1c2030"
        />
        {/* Curb Outer Highlight */}
        <polygon
          points="730,2650 1670,2650 1674,2654 726,2654"
          fill="#94a3b8"
        />
        {/* Basin Inner Waterline Recessed Shadow */}
        <polygon
          points="756,2658 1644,2658 1784,2882 616,2882"
          fill="#05070e"
        />
        <line x1="580" y1="2890" x2="1820" y2="2890" stroke="#64748b" strokeWidth="2.5" />

        {/* Polished Mirrored Pool Water Basin */}
        <polygon
          points="760,2660 1640,2660 1780,2880 620,2880"
          fill="url(#poolReflect)"
        />
        {/* Upper Mirror Waterline Specular Gilded Glint */}
        <line x1="760" y1="2660" x2="1640" y2="2660" stroke="#fde047" strokeWidth="0.9" opacity="0.55" />

        {/* Mirrored Reflection of the Total Eclipse in the Water */}
        <g id="eclipse-water-reflection" clipPath="url(#clipPool)">
          {/* Mirrored Corona Glow */}
          <ellipse
            cx="1200"
            cy="2760"
            rx="420"
            ry="105"
            fill="url(#coronaGrandHalo)"
            opacity="0.88"
            style={{ mixBlendMode: 'screen' }}
          />
          {/* Mirrored Corona Beams (Soft feathered aquatic dispersion) */}
          <ellipse
            cx="1200"
            cy="2760"
            rx="340"
            ry="75"
            fill="url(#waterCoronaGlow)"
            opacity="0.85"
            style={{ mixBlendMode: 'screen' }}
          />
          {/* Mirrored Black Lunar Core */}
          <ellipse
            cx="1200"
            cy="2760"
            rx="118"
            ry="31"
            fill="#020306"
          />
          {/* Mirrored Lunar Rim Highlight */}
          <ellipse
            cx="1200"
            cy="2760"
            rx="119"
            ry="32"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2.0"
            opacity="0.95"
          />
          {/* Mirrored Capillary Wavelet Slices across the Lunar Reflection */}
          {[-16, -8, 0, 8, 16].map((dy, idx) => (
            <line
              key={`refl-wave-${idx}`}
              x1={1200 - Math.sqrt(Math.max(0, 1 - (dy / 31) ** 2)) * 115}
              y1={2760 + dy}
              x2={1200 + Math.sqrt(Math.max(0, 1 - (dy / 31) ** 2)) * 115}
              y2={2760 + dy}
              stroke="#fef08a"
              strokeWidth="0.75"
              strokeDasharray="18 12 6 12"
              opacity="0.4"
            />
          ))}

          {/* Mirrored Diamond Flare Sparkle (Elongated Aquatic Specular Path) */}
          <polygon
            points="1160,2748 1285,2746 1410,2748 1285,2750"
            fill="#ffffff"
            opacity="0.95"
            style={{ mixBlendMode: 'screen' }}
          />
          <polygon
            points="1120,2748 1285,2744 1450,2748 1285,2752"
            fill="#fef08a"
            opacity="0.75"
            style={{ mixBlendMode: 'screen' }}
          />
          {/* Diamond Ring Flare Core on Water */}
          <ellipse
            cx="1285"
            cy="2748"
            rx="22"
            ry="6"
            fill="url(#diamondRingCore)"
            style={{ mixBlendMode: 'screen' }}
          />
          <ellipse
            cx="1285"
            cy="2748"
            rx="10"
            ry="3.5"
            fill="#ffffff"
          />
          <circle cx="1285" cy="2748" r="2.2" fill="#ffffff" />
          {/* Micro-Diffraction Glint Cross in Water Mirror */}
          <line x1="1285" y1="2736" x2="1285" y2="2760" stroke="#ffffff" strokeWidth="1.2" opacity="0.9" style={{ mixBlendMode: 'screen' }} />
          <line x1="1245" y1="2748" x2="1325" y2="2748" stroke="#ffffff" strokeWidth="1.2" opacity="0.9" style={{ mixBlendMode: 'screen' }} />
          {/* Specular Capillary Glint Beads along Adjacent Wavelets */}
          <circle cx="1268" cy="2743" r="1.8" fill="#ffffff" opacity="0.9" />
          <circle cx="1302" cy="2753" r="1.8" fill="#ffffff" opacity="0.9" />
          <circle cx="1322" cy="2749" r="1.4" fill="#fef08a" opacity="0.85" />

          {/* Mirrored Inverted Astrolabe Aperture Spokes in Water */}
          {APERTURE_SPOKES.map((spoke, idx) => {
            const y1Ref = 2760 - (spoke.y1 - 2160) * 0.28;
            const y2Ref = 2760 - (spoke.y2 - 2160) * 0.28;
            return (
              <line
                key={`ref-spoke-${idx}`}
                x1={spoke.x1}
                y1={y1Ref}
                x2={spoke.x2}
                y2={y2Ref}
                stroke="#ca8a04"
                strokeWidth={idx % 6 === 0 ? '1.8' : '0.8'}
                opacity={idx % 6 === 0 ? '0.65' : '0.35'}
              />
            );
          })}

          {/* Reflected Basalt Pylon Shadows Framing the Pool */}
          <polygon points="760,2660 840,2660 810,2880 620,2880" fill="#06070e" opacity="0.55" />
          <polygon points="1560,2660 1640,2660 1780,2880 1590,2880" fill="#06070e" opacity="0.55" />

          {/* ========================================================
              BRAZIER FLAME WATER SURFACE SHIMMER REFLECTIONS
              ======================================================== */}
          {/* Upper Left Brazier Reflection */}
          <ellipse
            cx="780"
            cy="2695"
            rx="46"
            ry="12"
            fill="url(#brazierReflect)"
            opacity="0.82"
            style={{ mixBlendMode: 'screen' }}
          />
          <ellipse cx="780" cy="2695" rx="22" ry="5" fill="#fef08a" opacity="0.75" style={{ mixBlendMode: 'screen' }} />

          {/* Upper Right Brazier Reflection */}
          <ellipse
            cx="1620"
            cy="2695"
            rx="46"
            ry="12"
            fill="url(#brazierReflect)"
            opacity="0.82"
            style={{ mixBlendMode: 'screen' }}
          />
          <ellipse cx="1620" cy="2695" rx="22" ry="5" fill="#fef08a" opacity="0.75" style={{ mixBlendMode: 'screen' }} />

          {/* Lower Left Brazier Reflection */}
          <ellipse
            cx="710"
            cy="2805"
            rx="62"
            ry="16"
            fill="url(#brazierReflect)"
            opacity="0.85"
            style={{ mixBlendMode: 'screen' }}
          />
          <ellipse cx="710" cy="2805" rx="30" ry="7" fill="#fef08a" opacity="0.8" style={{ mixBlendMode: 'screen' }} />

          {/* Lower Right Brazier Reflection */}
          <ellipse
            cx="1690"
            cy="2805"
            rx="62"
            ry="16"
            fill="url(#brazierReflect)"
            opacity="0.85"
            style={{ mixBlendMode: 'screen' }}
          />
          <ellipse cx="1690" cy="2805" rx="30" ry="7" fill="#fef08a" opacity="0.8" style={{ mixBlendMode: 'screen' }} />

          {/* Water Surface Caustics Shimmer Highlights */}
          {[2680, 2715, 2740, 2775, 2805, 2835, 2865].map((y, idx) => (
            <path
              key={`caustic-${idx}`}
              d={`M ${850 + idx * 20},${y} Q ${1050 + (idx % 2 ? 30 : -30)},${y - 4} 1200,${y} T ${1550 - idx * 20},${y + 2}`}
              fill="none"
              stroke="url(#waterRippleGrad)"
              strokeWidth="1.2"
              opacity={0.65 - idx * 0.06}
              style={{ mixBlendMode: 'screen' }}
            />
          ))}

          {/* Water Surface Disturbance Ripples (Concentric Ellipses) */}
          {[2690, 2720, 2750, 2780, 2810, 2840, 2870].map((y, idx) => (
            <ellipse
              key={`ripple-${idx}`}
              cx="1200"
              cy={y}
              rx={160 + idx * 80}
              ry={10 + idx * 7.5}
              fill="none"
              stroke="#fde047"
              strokeWidth="0.85"
              strokeDasharray="22 14 6 14"
              opacity={0.48 - idx * 0.05}
            />
          ))}
        </g>
      </g>
    </g>
  );
}

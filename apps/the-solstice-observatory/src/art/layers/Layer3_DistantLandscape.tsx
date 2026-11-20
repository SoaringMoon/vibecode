/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Generate 24 organic dune surface wind ripples across the lit face with realistic aeolian drift
function generateDuneRipples() {
  const ripples = [];
  for (let i = 0; i < 22; i++) {
    const yBase = 2435 + i * 9.5;
    const xStart = 60 + i * 32 + (i % 3) * 12;
    const xEnd = 940 + i * 48 - (i % 2) * 18;
    const span = xEnd - xStart;
    const cpX1 = xStart + span * 0.32;
    const cpY1 = yBase - 7 - Math.sin(i * 0.45) * 4;
    const cpX2 = xStart + span * 0.68;
    const cpY2 = yBase + 8 + Math.cos(i * 0.45) * 3;
    const path = `M ${xStart},${yBase} C ${cpX1},${cpY1} ${cpX2},${cpY2} ${xEnd},${yBase + 4}`;
    const op = 0.22 + Math.sin((i / 21) * Math.PI) * 0.22;
    ripples.push({ path, op });
  }
  return ripples;
}

const DUNE_RIPPLES = generateDuneRipples();

export default function Layer3_DistantLandscape() {
  return (
    <g id="layer3-distant-landscape" shapeRendering="geometricPrecision">
      {/* ========================================================
          FAR DISTANT SERRATED MOUNTAIN RANGE
          ======================================================== */}
      {/* Tier 1: Far Distant Sawtooth Peak Massif with High Alpine Arêtes */}
      <path
        d="M 0,2240 
           L 45,2210 L 90,2180 L 135,2195 L 180,2210 L 235,2175 L 290,2140 L 350,2165 L 410,2190 
           L 465,2140 L 520,2090 L 580,2125 L 640,2160 L 700,2100 L 760,2040 L 825,2080 L 890,2120 
           L 955,2050 L 1020,1980 L 1085,2035 L 1150,2090 L 1215,2055 L 1280,2020 L 1345,2065 L 1410,2110 
           L 1470,2055 L 1530,2000 L 1595,2040 L 1660,2080 L 1720,2025 L 1780,1970 L 1845,2020 L 1910,2070 
           L 1975,2040 L 2040,2010 L 2100,2065 L 2160,2120 L 2220,2090 L 2280,2060 L 2340,2100 L 2400,2140 
           L 2400,2500 L 0,2500 Z"
        fill="url(#mountainDistant)"
        opacity="0.95"
      />

      {/* Far Distant Mountain Crest Razor Rim Lighting */}
      <path
        d="M 0,2240 
           L 45,2210 L 90,2180 L 135,2195 L 180,2210 L 235,2175 L 290,2140 L 350,2165 L 410,2190 
           L 465,2140 L 520,2090 L 580,2125 L 640,2160 L 700,2100 L 760,2040 L 825,2080 L 890,2120 
           L 955,2050 L 1020,1980 L 1085,2035 L 1150,2090 L 1215,2055 L 1280,2020 L 1345,2065 L 1410,2110 
           L 1470,2055 L 1530,2000 L 1595,2040 L 1660,2080 L 1720,2025 L 1780,1970 L 1845,2020 L 1910,2070 
           L 1975,2040 L 2040,2010 L 2100,2065 L 2160,2120 L 2220,2090 L 2280,2060 L 2340,2100 L 2400,2140"
        fill="none"
        stroke="#fef08a"
        strokeWidth="1.5"
        opacity="0.88"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Tier 2: Intermediate Sub-Ridge & Escarpment Foothills */}
      <path
        d="M 0,2300 
           L 70,2270 L 140,2285 L 220,2240 L 310,2265 L 400,2220 L 480,2250 L 560,2195 L 650,2225 
           L 740,2165 L 830,2200 L 920,2140 L 1010,2175 L 1100,2120 L 1190,2155 L 1280,2105 L 1370,2145 
           L 1460,2090 L 1550,2130 L 1640,2075 L 1730,2115 L 1820,2065 L 1910,2100 L 2000,2055 L 2090,2090 
           L 2180,2145 L 2270,2115 L 2350,2150 L 2400,2180 
           L 2400,2500 L 0,2500 Z"
        fill="url(#mountainMid)"
        opacity="0.92"
      />
      {/* Intermediate Sub-Ridge Amber Sunlight Crest */}
      <path
        d="M 0,2300 
           L 70,2270 L 140,2285 L 220,2240 L 310,2265 L 400,2220 L 480,2250 L 560,2195 L 650,2225 
           L 740,2165 L 830,2200 L 920,2140 L 1010,2175 L 1100,2120 L 1190,2155 L 1280,2105 L 1370,2145 
           L 1460,2090 L 1550,2130 L 1640,2075 L 1730,2115 L 1820,2065 L 1910,2100 L 2000,2055 L 2090,2090 
           L 2180,2145 L 2270,2115 L 2350,2150 L 2400,2180"
        fill="none"
        stroke="#f59e0b"
        strokeWidth="2.0"
        opacity="0.82"
      />

      {/* Horizontal Geological Sedimentary Strata Lines */}
      {[2080, 2120, 2160, 2200, 2240].map((y, idx) => (
        <path
          key={`strata-${idx}`}
          d={`M 0,${y} Q 600,${y - 15} 1200,${y} T 2400,${y - 8}`}
          fill="none"
          stroke="#4c1d95"
          strokeWidth="1.2"
          strokeDasharray="18 14 6 14"
          opacity="0.35"
        />
      ))}

      {/* Dendritic Mountain Peak Couloir Ravines & Glacial Cirque Fractures */}
      {[
        'M 290,2140 L 298,2175 L 292,2210 L 310,2245 M 298,2175 L 316,2215',
        'M 520,2090 L 532,2130 L 526,2170 L 545,2215 M 532,2130 L 550,2175',
        'M 760,2040 L 775,2085 L 768,2135 L 790,2185 M 775,2085 L 795,2130',
        'M 1020,1980 L 1038,2035 L 1030,2095 L 1055,2155 M 1038,2035 L 1062,2085',
        'M 1280,2020 L 1292,2065 L 1286,2115 L 1300,2165 M 1292,2065 L 1312,2110',
        'M 1530,2000 L 1548,2045 L 1540,2095 L 1565,2145 M 1548,2045 L 1570,2090',
        'M 1780,1970 L 1796,2025 L 1788,2080 L 1810,2135 M 1796,2025 L 1822,2075',
        'M 2040,2010 L 2056,2065 L 2048,2120 L 2070,2175 M 2056,2065 L 2082,2115',
      ].map((dPath, idx) => (
        <path
          key={`couloir-${idx}`}
          d={dPath}
          fill="none"
          stroke="#090514"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.78"
        />
      ))}

      {/* Atmospheric Aerial Perspective Mist Layer */}
      <rect
        x="0"
        y="2180"
        width="2400"
        height="180"
        fill="url(#horizonGlowGrad)"
        opacity="0.38"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* ========================================================
          MIDGROUND VOLCANIC MESAS & COLUMNAR BASALT NEEDLE SPIRES
          ======================================================== */}
      {/* Left Volcanic Spire Formation */}
      <path
        d="M 120,2420 
           L 180,2260 L 230,2130 L 250,2135 L 290,2280 L 340,2350 
           L 420,2220 L 440,2225 L 480,2380 L 560,2440 
           L 120,2440 Z"
        fill="url(#mountainMid)"
      />
      {/* Left Columnar Basalt Vertical Joint Lines */}
      {[190, 205, 220, 235, 260, 275, 430, 445, 460].map((x, idx) => (
        <line
          key={`l-col-${idx}`}
          x1={x}
          y1={2240}
          x2={x}
          y2={2420}
          stroke="#07080f"
          strokeWidth="1.8"
          opacity="0.75"
        />
      ))}
      {/* Spire 1 Rim Highlight */}
      <path
        d="M 120,2420 L 180,2260 L 230,2130 L 250,2135 L 290,2280 L 340,2350 L 420,2220 L 440,2225 L 480,2380"
        fill="none"
        stroke="#f59e0b"
        strokeWidth="2.4"
        opacity="0.9"
      />

      {/* Right Volcanic Mesa & Escarpment */}
      <path
        d="M 1840,2440 
           L 1920,2320 L 1980,2190 L 2080,2185 L 2140,2260 L 2220,2150 L 2260,2155 L 2320,2280 L 2400,2350 
           L 2400,2440 Z"
        fill="url(#mountainMid)"
      />
      {/* Right Columnar Basalt Vertical Joint Lines */}
      {[1940, 1960, 2000, 2020, 2050, 2160, 2180, 2240, 2280].map((x, idx) => (
        <line
          key={`r-col-${idx}`}
          x1={x}
          y1={2240}
          x2={x}
          y2={2420}
          stroke="#07080f"
          strokeWidth="1.8"
          opacity="0.75"
        />
      ))}
      {/* Spire 2 Rim Highlight */}
      <path
        d="M 1840,2440 L 1920,2320 L 1980,2190 L 2080,2185 L 2140,2260 L 2220,2150 L 2260,2155 L 2320,2280 L 2400,2350"
        fill="none"
        stroke="#f59e0b"
        strokeWidth="2.4"
        opacity="0.9"
      />

      {/* ========================================================
          TALUS SCREE SLOPES & HORIZON PETROGLYPHIC CAIRNS
          ======================================================== */}
      {/* Left Talus Boulder Field (Erosion Scree Cone) */}
      <polygon
        points="140,2440 260,2330 380,2440"
        fill="#141724"
        opacity="0.85"
      />
      {/* Polygonal Basalt Boulders on Scree Slope */}
      {[
        { x: 180, y: 2410, w: 18, h: 12 },
        { x: 230, y: 2380, w: 24, h: 16 },
        { x: 280, y: 2420, w: 22, h: 14 },
        { x: 320, y: 2395, w: 16, h: 10 },
        { x: 350, y: 2430, w: 28, h: 18 },
      ].map((b, idx) => (
        <polygon
          key={`l-boulder-${idx}`}
          points={`${b.x},${b.y + b.h} ${b.x + b.w * 0.3},${b.y} ${b.x + b.w},${b.y + b.h * 0.4} ${b.x + b.w * 0.8},${b.y + b.h}`}
          fill="#1c2033"
          stroke="#f59e0b"
          strokeWidth="0.8"
          opacity="0.9"
        />
      ))}

      {/* Right Talus Boulder Field */}
      <polygon
        points="1980,2440 2120,2310 2300,2440"
        fill="#141724"
        opacity="0.85"
      />
      {[
        { x: 2020, y: 2415, w: 20, h: 14 },
        { x: 2080, y: 2370, w: 26, h: 18 },
        { x: 2150, y: 2410, w: 24, h: 15 },
        { x: 2220, y: 2425, w: 18, h: 12 },
      ].map((b, idx) => (
        <polygon
          key={`r-boulder-${idx}`}
          points={`${b.x},${b.y + b.h} ${b.x + b.w * 0.3},${b.y} ${b.x + b.w},${b.y + b.h * 0.4} ${b.x + b.w * 0.8},${b.y + b.h}`}
          fill="#1c2033"
          stroke="#f59e0b"
          strokeWidth="0.8"
          opacity="0.9"
        />
      ))}

      {/* Horizon Megalithic Trilithons (Ancient Astronomical Sightline Markers) */}
      {/* Cairn 1 on Left Ridge (X: 340, Y: 2350) */}
      <g id="horizon-cairn-1" transform="translate(340, 2332)">
        <rect x="-6" y="0" width="3.5" height="18" fill="#0c0d16" stroke="#fde047" strokeWidth="0.6" />
        <rect x="2.5" y="0" width="3.5" height="18" fill="#0c0d16" stroke="#fde047" strokeWidth="0.6" />
        <rect x="-8" y="-4" width="16" height="4.5" fill="#151726" stroke="#fde047" strokeWidth="0.6" />
      </g>
      {/* Cairn 2 on Right Escarpment (X: 2080, Y: 2185) */}
      <g id="horizon-cairn-2" transform="translate(2080, 2167)">
        <rect x="-5" y="0" width="3.2" height="18" fill="#0c0d16" stroke="#fde047" strokeWidth="0.6" />
        <rect x="2" y="0" width="3.2" height="18" fill="#0c0d16" stroke="#fde047" strokeWidth="0.6" />
        <rect x="-7" y="-4" width="14" height="4.5" fill="#151726" stroke="#fde047" strokeWidth="0.6" />
      </g>

      {/* ========================================================
          SWEEPING BASALT DESERT DUNES & SURFACE RIPPLES
          ======================================================== */}
      {/* Dune Layer 1 (Far Dune across horizon) */}
      <path
        d="M 0,2360 
           C 400,2310 750,2380 1100,2330 
           C 1450,2280 1800,2360 2150,2310 
           L 2400,2340 L 2400,2600 L 0,2600 Z"
        fill="url(#duneShadow)"
      />
      {/* Lit side of far dune */}
      <path
        d="M 0,2360 
           C 350,2330 650,2420 1000,2380 
           C 1350,2340 1700,2430 2050,2370 
           L 2400,2400 L 2400,2470 
           C 1950,2440 1550,2390 1200,2420 
           C 850,2450 450,2400 0,2440 Z"
        fill="url(#duneLit)"
        opacity="0.68"
      />

      {/* Dune Layer 2 (Grand Diagonal Dune Ridge Left-to-Center) */}
      {/* Lit slope facing the eclipse light */}
      <path
        d="M 0,2420 
           C 300,2400 580,2480 880,2460 
           C 1180,2440 1480,2520 1780,2490 
           C 2080,2460 2280,2540 2400,2510 
           L 2400,2650 
           C 2100,2600 1750,2660 1400,2610 
           C 1050,2560 650,2620 0,2550 Z"
        fill="url(#duneLit)"
      />

      {/* Procedural Wind Surface Ripples across the Sunlit Dune Slope */}
      {DUNE_RIPPLES.map((r, idx) => (
        <path
          key={`d-rip-${idx}`}
          d={r.path}
          fill="none"
          stroke="#fef08a"
          strokeWidth="0.85"
          opacity={r.op}
          style={{ mixBlendMode: 'screen' }}
        />
      ))}

      {/* Shadow slope of Grand Dune */}
      <path
        d="M 0,2420 
           C 280,2450 560,2530 840,2560 
           C 1120,2590 1440,2560 1750,2630 
           C 2050,2700 2300,2640 2400,2680 
           L 2400,2780 L 0,2780 Z"
        fill="url(#duneShadow)"
      />

      {/* Glowing Golden Dune Ridge Line */}
      <path
        d="M 0,2420 
           C 300,2400 580,2480 880,2460 
           C 1180,2440 1480,2520 1780,2490 
           C 2080,2460 2280,2540 2400,2510"
        fill="none"
        stroke="url(#ridgeGlow)"
        strokeWidth="3.2"
        opacity="0.95"
      />
      {/* Knife-Edge Specular Crest Highlight */}
      <path
        d="M 0,2420 
           C 300,2400 580,2480 880,2460 
           C 1180,2440 1480,2520 1780,2490 
           C 2080,2460 2280,2540 2400,2510"
        fill="none"
        stroke="#ffffff"
        strokeWidth="1.0"
        opacity="0.85"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Dune Layer 3 (Foreground Rolling Dunes flanking observatory grounds) */}
      <path
        d="M 0,2540 
           C 240,2510 480,2600 720,2580 
           C 960,2560 1100,2640 1200,2630 
           L 1200,2750 L 0,2750 Z"
        fill="url(#duneLit)"
        opacity="0.85"
      />
      <path
        d="M 0,2540 C 240,2510 480,2600 720,2580 C 960,2560 1100,2640 1200,2630"
        fill="none"
        stroke="url(#ridgeGlow)"
        strokeWidth="2.5"
      />

      {/* Right Foreground Dune */}
      <path
        d="M 1200,2630 
           C 1340,2610 1540,2670 1780,2640 
           C 2020,2610 2240,2690 2400,2660 
           L 2400,2780 L 1200,2780 Z"
        fill="url(#duneShadow)"
      />
      <path
        d="M 1200,2630 C 1340,2610 1540,2670 1780,2640 C 2020,2610 2240,2690 2400,2660"
        fill="none"
        stroke="url(#ridgeGlow)"
        strokeWidth="2.5"
        opacity="0.8"
      />

      {/* Windblown Sand Streamers (Golden Filament Trails) */}
      <path
        d="M 280,2440 Q 420,2410 580,2430"
        fill="none"
        stroke="#fde047"
        strokeWidth="1.2"
        strokeDasharray="16 20"
        opacity="0.65"
      />
      <path
        d="M 1480,2510 Q 1640,2480 1820,2500"
        fill="none"
        stroke="#fde047"
        strokeWidth="1.2"
        strokeDasharray="20 24"
        opacity="0.6"
      />
      <path
        d="M 820,2570 Q 980,2550 1140,2580"
        fill="none"
        stroke="#fde047"
        strokeWidth="1"
        strokeDasharray="12 16"
        opacity="0.55"
      />
    </g>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Center of astronomical alignment
const CX = 1200;
const CY = 1150;

// Deterministic Pseudo-Random Generator (seeded LCG) for fixed star coordinates
function generateFixedStars() {
  const stars: Array<{
    x: number;
    y: number;
    r: number;
    opacity: number;
    color: string;
  }> = [];

  let seed = 42819;
  const lcg = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };

  // Generate 420 deterministic field stars across the upper 75% of the canvas
  for (let i = 0; i < 420; i++) {
    const x = Math.round(lcg() * 2360 + 20);
    const y = Math.round(lcg() * 2150 + 40);

    // Skip stars that fall inside the lunar core (radius 270)
    const distSq = (x - CX) ** 2 + (y - CY) ** 2;
    if (distSq < 270 ** 2) continue;

    const rRand = lcg();
    let r = 0.8;
    let opacity = 0.4 + lcg() * 0.55;
    let color = '#ffffff';

    if (rRand > 0.94) {
      r = 2.4 + lcg() * 1.4;
      opacity = 0.95;
      color = lcg() > 0.4 ? '#fef08a' : '#cffafe';
    } else if (rRand > 0.8) {
      r = 1.6 + lcg() * 0.8;
      opacity = 0.85;
      color = lcg() > 0.5 ? '#fef9c3' : '#e0e7ff';
    } else if (rRand > 0.5) {
      r = 1.1 + lcg() * 0.4;
      opacity = 0.65;
    }

    stars.push({ x, y, r, opacity, color });
  }

  return stars;
}

const FIELD_STARS = generateFixedStars();

// Major Constellation Star Coordinates & Lines
const CONSTELLATIONS = {
  orion: {
    points: [
      { name: 'Betelgeuse', x: 420, y: 520, r: 4.2, color: '#f97316', label: 'α Ori · Betelgeuse' },
      { name: 'Bellatrix', x: 680, y: 480, r: 3.2, color: '#e0e7ff' },
      { name: 'Alnitak', x: 500, y: 700, r: 2.8, color: '#cffafe' },
      { name: 'Alnilam', x: 550, y: 720, r: 3.0, color: '#fef08a' },
      { name: 'Mintaka', x: 600, y: 740, r: 2.8, color: '#cffafe' },
      { name: 'Saiph', x: 440, y: 920, r: 3.1, color: '#e0e7ff' },
      { name: 'Rigel', x: 720, y: 940, r: 4.4, color: '#93c5fd', label: 'β Ori · Rigel' },
    ],
    lines: [
      [0, 1],
      [0, 2],
      [1, 4],
      [2, 3],
      [3, 4],
      [2, 5],
      [4, 6],
      [5, 6],
    ],
  },
  cassiopeia: {
    points: [
      { name: 'Schedar', x: 1720, y: 280, r: 3.6, color: '#fde047', label: 'α Cas · Schedar' },
      { name: 'Caph', x: 1880, y: 220, r: 3.2, color: '#fef9c3' },
      { name: 'Gamma Cas', x: 1980, y: 340, r: 3.8, color: '#cffafe' },
      { name: 'Ruchbah', x: 2120, y: 290, r: 3.0, color: '#e0e7ff' },
      { name: 'Segin', x: 2240, y: 380, r: 2.6, color: '#e0e7ff' },
    ],
    lines: [
      [0, 1],
      [0, 2],
      [2, 3],
      [3, 4],
    ],
  },
  cygnus: {
    points: [
      { name: 'Deneb', x: 1540, y: 640, r: 4.5, color: '#e0e7ff', label: 'α Cyg · Deneb' },
      { name: 'Sadr', x: 1680, y: 820, r: 3.5, color: '#fef08a' },
      { name: 'Albireo A', x: 1820, y: 1040, r: 3.4, color: '#f59e0b', label: 'β Cyg · Albireo' },
      { name: 'Albireo B', x: 1828, y: 1046, r: 2.2, color: '#38bdf8' },
      { name: 'Gienah', x: 1510, y: 900, r: 3.0, color: '#cffafe' },
      { name: 'Rukh', x: 1860, y: 740, r: 2.8, color: '#cffafe' },
    ],
    lines: [
      [0, 1],
      [1, 2],
      [4, 1],
      [1, 5],
    ],
  },
  ursaMinor: {
    points: [
      { name: 'Polaris', x: 1200, y: 240, r: 4.6, color: '#ffffff', label: 'α UMi · Polaris' },
      { name: 'Yildun', x: 1255, y: 310, r: 2.5, color: '#cffafe' },
      { name: 'Urodelus', x: 1300, y: 360, r: 2.4, color: '#e0e7ff' },
      { name: 'Kochab', x: 1365, y: 410, r: 3.8, color: '#f59e0b', label: 'β UMi · Kochab' },
      { name: 'Pherkad', x: 1420, y: 375, r: 3.2, color: '#ffffff' },
      { name: 'Ahfa', x: 1390, y: 445, r: 2.2, color: '#cffafe' },
      { name: 'Anwar', x: 1335, y: 430, r: 2.0, color: '#e0e7ff' },
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 3],
    ],
  },
  crown: {
    points: [
      { name: 'Alphecca', x: 880, y: 340, r: 3.8, color: '#fef08a', label: 'α CrB · Alphecca' },
      { name: 'Nusakan', x: 820, y: 380, r: 2.6, color: '#e0e7ff' },
      { name: 'Gamma CrB', x: 790, y: 440, r: 2.4, color: '#e0e7ff' },
      { name: 'Theta CrB', x: 950, y: 360, r: 2.5, color: '#cffafe' },
      { name: 'Iota CrB', x: 1010, y: 410, r: 2.3, color: '#cffafe' },
    ],
    lines: [
      [2, 1],
      [1, 0],
      [0, 3],
      [3, 4],
    ],
  },
  ursaMajor: {
    points: [
      { name: 'Dubhe', x: 1060, y: 380, r: 4.2, color: '#f59e0b', label: 'α UMa · Dubhe' },
      { name: 'Merak', x: 1040, y: 460, r: 3.8, color: '#ffffff', label: 'β UMa · Merak' },
      { name: 'Phecda', x: 920, y: 520, r: 3.4, color: '#cffafe', label: 'γ UMa' },
      { name: 'Megrez', x: 910, y: 420, r: 3.0, color: '#e0e7ff', label: 'δ UMa' },
      { name: 'Alioth', x: 790, y: 390, r: 4.0, color: '#ffffff', label: 'ε UMa · Alioth' },
      { name: 'Mizar', x: 680, y: 340, r: 3.7, color: '#cffafe', label: 'ζ UMa · Mizar' },
      { name: 'Alkaid', x: 570, y: 320, r: 4.1, color: '#93c5fd', label: 'η UMa · Alkaid' },
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 0],
      [3, 4],
      [4, 5],
      [5, 6],
    ],
  },
  aquila: {
    points: [
      { name: 'Altair', x: 1980, y: 920, r: 4.8, color: '#bae6fd', label: 'α Aql · Altair' },
      { name: 'Tarazed', x: 1955, y: 875, r: 3.4, color: '#f59e0b', label: 'γ Aql' },
      { name: 'Alshain', x: 2005, y: 965, r: 3.1, color: '#fde047', label: 'β Aql' },
      { name: 'Deneb el Okab', x: 2070, y: 860, r: 2.7, color: '#e0e7ff' },
    ],
    lines: [
      [1, 0],
      [0, 2],
      [1, 3],
    ],
  },
};

// 12 Zodiac Constellation Houses for Astrolabe Ring R=760
const ZODIAC_HOUSES = [
  { sign: '♈', name: 'ARIES', angle: 0 },
  { sign: '♉', name: 'TAURUS', angle: 30 },
  { sign: '♊', name: 'GEMINI', angle: 60 },
  { sign: '♋', name: 'CANCER', angle: 90 },
  { sign: '♌', name: 'LEO', angle: 120 },
  { sign: '♍', name: 'VIRGO', angle: 150 },
  { sign: '♎', name: 'LIBRA', angle: 180 },
  { sign: '♏', name: 'SCORPIO', angle: 210 },
  { sign: '♐', name: 'SAGITTARIUS', angle: 240 },
  { sign: '♑', name: 'CAPRICORN', angle: 270 },
  { sign: '♒', name: 'AQUARIUS', angle: 300 },
  { sign: '♓', name: 'PISCES', angle: 330 },
];

// Declination coordinate rings
const DECLINATION_CIRCLES = [
  { r: 440, label: 'DEC +15°' },
  { r: 620, label: 'DEC +30°' },
  { r: 880, label: 'DEC +45°' },
  { r: 1200, label: 'DEC +60°' },
];

// Right Ascension radial hour axes
const RA_HOURS = [
  { hour: '0H', angle: 0 },
  { hour: '3H', angle: 45 },
  { hour: '6H', angle: 90 },
  { hour: '9H', angle: 135 },
  { hour: '12H', angle: 180 },
  { hour: '15H', angle: 225 },
  { hour: '18H', angle: 270 },
  { hour: '21H', angle: 315 },
];

function generateAstrolabeTicks(radius: number, count: number, length: number) {
  const ticks = [];
  for (let i = 0; i < count; i++) {
    const angle = (i * 2 * Math.PI) / count;
    const x1 = CX + Math.cos(angle) * radius;
    const y1 = CY + Math.sin(angle) * radius;
    const x2 = CX + Math.cos(angle) * (radius + length);
    const y2 = CY + Math.sin(angle) * (radius + length);
    ticks.push({ x1, y1, x2, y2, angle: (i * 360) / count });
  }
  return ticks;
}

const INNER_TICKS = generateAstrolabeTicks(520, 72, 14);
const MID_TICKS = generateAstrolabeTicks(760, 48, 22);
const OUTER_TICKS = generateAstrolabeTicks(1080, 96, 28);

// Almucantar circles of constant altitude above astronomical horizon
const ALMUCANTARS = [
  { alt: '15°', r: 1680, cy: 320 },
  { alt: '30°', r: 1380, cy: 460 },
  { alt: '45°', r: 1080, cy: 620 },
  { alt: '60°', r: 780, cy: 820 },
  { alt: '75°', r: 480, cy: 1000 },
];

// Ecliptic celestial stations along the solar path
const ECLIPTIC_STATIONS = [
  { label: '0° ♈ VERNAL NODE', x: 210, y: 1555 },
  { label: '30° ♉', x: 525, y: 1420 },
  { label: '60° ♊', x: 860, y: 1285 },
  { label: '90° ♋ SOLSTICE SUMMIT', x: 1200, y: 1150 },
  { label: '120° ♌', x: 1540, y: 1015 },
  { label: '150° ♍', x: 1875, y: 880 },
  { label: '180° ♎ AUTUMNAL NODE', x: 2190, y: 745 },
];

export default function Layer1_CelestialGrid() {
  return (
    <g id="layer1-celestial-grid" shapeRendering="geometricPrecision" textRendering="geometricPrecision">
      {/* ========================================================
          ASTRONOMICAL COORDINATE ARCS & ARMILLARY SPHERES
          ======================================================== */}
      {/* Concentric Astrolabe Coordinate Rings */}
      <circle
        cx={CX}
        cy={CY}
        r={380}
        fill="none"
        stroke="#ca8a04"
        strokeWidth="1.2"
        strokeDasharray="4 8"
        opacity="0.5"
      />
      <circle
        cx={CX}
        cy={CY}
        r={520}
        fill="none"
        stroke="#fde047"
        strokeWidth="1.5"
        opacity="0.65"
      />
      <circle
        cx={CX}
        cy={CY}
        r={534}
        fill="none"
        stroke="#eab308"
        strokeWidth="0.8"
        strokeDasharray="1 3"
        opacity="0.45"
      />

      {/* Declination Circles & Labels */}
      {DECLINATION_CIRCLES.map((d, idx) => (
        <g key={`dec-${idx}`}>
          <circle
            cx={CX}
            cy={CY}
            r={d.r}
            fill="none"
            stroke="#eab308"
            strokeWidth="0.85"
            strokeDasharray="6 8"
            opacity="0.4"
          />
          <text
            x={CX + d.r - 8}
            y={CY - 10}
            textAnchor="end"
            fill="#facc15"
            fontSize="9"
            fontFamily="'JetBrains Mono', monospace"
            letterSpacing="2"
            opacity="0.65"
          >
            {d.label}
          </text>
        </g>
      ))}

      {/* Almucantar Altitude Arcs (Local Celestial Horizon Coordinates) */}
      {ALMUCANTARS.map((al, idx) => (
        <g key={`almu-${idx}`}>
          <path
            d={`M -200,${al.cy + al.r * 0.9} A ${al.r},${al.r * 0.65} 0 0,0 2600,${al.cy + al.r * 0.9}`}
            fill="none"
            stroke="#d97706"
            strokeWidth="0.75"
            strokeDasharray="2 6"
            opacity="0.32"
          />
          <text
            x="140"
            y={al.cy + al.r * 0.58}
            fill="#f59e0b"
            fontSize="8"
            fontFamily="'JetBrains Mono', monospace"
            letterSpacing="1"
            opacity="0.5"
          >
            {`ALT +${al.alt}`}
          </text>
        </g>
      ))}

      {/* The Ecliptic Great Circle (Via Solis · Sun's Apparent Orbital Path) */}
      <g id="ecliptic-orbit">
        <path
          d="M -100,1690 C 500,1430 1900,870 2500,610"
          fill="none"
          stroke="#fde047"
          strokeWidth="1.6"
          strokeDasharray="8 6"
          opacity="0.65"
        />
        <text
          x="380"
          y="1510"
          fill="#fef08a"
          fontSize="11"
          fontFamily="'Cinzel', Georgia, serif"
          letterSpacing="4"
          transform="rotate(-15 380 1510)"
          opacity="0.7"
        >
          ECLIPTICA · VIA SOLIS
        </text>
        {/* Ecliptic Stations and Nodes */}
        {ECLIPTIC_STATIONS.map((st, idx) => (
          <g key={`ecl-st-${idx}`}>
            <circle cx={st.x} cy={st.y} r="3" fill="#ffffff" stroke="#eab308" strokeWidth="1" />
            <text
              x={st.x}
              y={st.y - 10}
              textAnchor="middle"
              fill="#fef9c3"
              fontSize="8.5"
              fontFamily="'JetBrains Mono', monospace"
              letterSpacing="1"
              opacity="0.75"
            >
              {st.label}
            </text>
          </g>
        ))}
      </g>

      {/* Right Ascension Radial Hour Lines */}
      {RA_HOURS.map((ra, idx) => {
        const rad = (ra.angle * Math.PI) / 180;
        const x1 = CX + Math.cos(rad) * 380;
        const y1 = CY + Math.sin(rad) * 380;
        const x2 = CX + Math.cos(rad) * 1360;
        const y2 = CY + Math.sin(rad) * 1360;
        return (
          <g key={`ra-${idx}`}>
            <line
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#facc15"
              strokeWidth="0.75"
              strokeDasharray="4 12"
              opacity="0.38"
            />
            <text
              x={x2 + Math.cos(rad) * 16}
              y={y2 + Math.sin(rad) * 16 + 4}
              textAnchor="middle"
              fill="#fde047"
              fontSize="9"
              fontFamily="'JetBrains Mono', monospace"
              letterSpacing="1"
              opacity="0.6"
            >
              {ra.hour}
            </text>
          </g>
        );
      })}

      {/* The Zodiac Astrolabe Band at R=760 */}
      <circle
        cx={CX}
        cy={CY}
        r={760}
        fill="none"
        stroke="#facc15"
        strokeWidth="2.2"
        opacity="0.8"
      />
      <circle
        cx={CX}
        cy={CY}
        r={780}
        fill="none"
        stroke="#ca8a04"
        strokeWidth="1.0"
        strokeDasharray="8 6 2 6"
        opacity="0.55"
      />

      {/* 12 Zodiac Symbols, Decan Subdivisions & Intaglio Medallions */}
      {ZODIAC_HOUSES.map((z, idx) => {
        const rad = (z.angle * Math.PI) / 180;
        const radDecan1 = ((z.angle + 10) * Math.PI) / 180;
        const radDecan2 = ((z.angle + 20) * Math.PI) / 180;

        const xSign = CX + Math.cos(rad) * 760;
        const ySign = CY + Math.sin(rad) * 760;
        const xRadInner = CX + Math.cos(rad) * 735;
        const yRadInner = CY + Math.sin(rad) * 735;
        const xRadOuter = CX + Math.cos(rad) * 795;
        const yRadOuter = CY + Math.sin(rad) * 795;

        return (
          <g key={`zodiac-${idx}`}>
            {/* Major Cuspidal Division Line between Signs */}
            <line
              x1={xRadInner}
              y1={yRadInner}
              x2={xRadOuter}
              y2={yRadOuter}
              stroke="#fde047"
              strokeWidth="1.8"
              opacity="0.85"
            />
            {/* 10° Decan Subdivision Cross-Ticks */}
            <line
              x1={CX + Math.cos(radDecan1) * 750}
              y1={CY + Math.sin(radDecan1) * 750}
              x2={CX + Math.cos(radDecan1) * 770}
              y2={CY + Math.sin(radDecan1) * 770}
              stroke="#ca8a04"
              strokeWidth="1.0"
              opacity="0.65"
            />
            <line
              x1={CX + Math.cos(radDecan2) * 750}
              y1={CY + Math.sin(radDecan2) * 750}
              x2={CX + Math.cos(radDecan2) * 770}
              y2={CY + Math.sin(radDecan2) * 770}
              stroke="#ca8a04"
              strokeWidth="1.0"
              opacity="0.65"
            />
            {/* Medallion Intaglio Double Bezel */}
            <circle cx={xSign} cy={ySign} r="15.5" fill="#06070e" stroke="#ca8a04" strokeWidth="1.2" />
            <circle cx={xSign} cy={ySign} r="12" fill="none" stroke="#fde047" strokeWidth="0.6" strokeDasharray="2 2" opacity="0.65" />
            <text
              x={xSign}
              y={ySign + 5}
              textAnchor="middle"
              fill="#fef08a"
              fontSize="13"
              fontFamily="'Plus Jakarta Sans', sans-serif"
              fontWeight="600"
              opacity="0.95"
            >
              {z.sign}
            </text>
          </g>
        );
      })}

      {/* Outer Astrolabe Ring R=1080 */}
      <circle
        cx={CX}
        cy={CY}
        r={1080}
        fill="none"
        stroke="#fde047"
        strokeWidth="2.4"
        opacity="0.8"
      />
      <circle
        cx={CX}
        cy={CY}
        r={1108}
        fill="none"
        stroke="#ca8a04"
        strokeWidth="1.2"
        strokeDasharray="2 4"
        opacity="0.5"
      />
      <circle
        cx={CX}
        cy={CY}
        r={1360}
        fill="none"
        stroke="#eab308"
        strokeWidth="1.6"
        strokeDasharray="16 12 4 12"
        opacity="0.4"
      />

      {/* Tick Marks on Astrolabe Rings */}
      {INNER_TICKS.map((t, idx) => (
        <line
          key={`it-${idx}`}
          x1={t.x1}
          y1={t.y1}
          x2={t.x2}
          y2={t.y2}
          stroke="#fde047"
          strokeWidth={idx % 6 === 0 ? '2' : '0.8'}
          opacity={idx % 6 === 0 ? '0.8' : '0.45'}
        />
      ))}

      {MID_TICKS.map((t, idx) => (
        <line
          key={`mt-${idx}`}
          x1={t.x1}
          y1={t.y1}
          x2={t.x2}
          y2={t.y2}
          stroke="#facc15"
          strokeWidth={idx % 4 === 0 ? '2.5' : '1.2'}
          opacity="0.75"
        />
      ))}

      {OUTER_TICKS.map((t, idx) => (
        <line
          key={`ot-${idx}`}
          x1={t.x1}
          y1={t.y1}
          x2={t.x2}
          y2={t.y2}
          stroke="#fde047"
          strokeWidth={idx % 8 === 0 ? '3' : '1'}
          opacity={idx % 8 === 0 ? '0.85' : '0.45'}
        />
      ))}

      {/* Celestial Meridian & Equinoctial Coordinate Rays */}
      <line
        x1={CX}
        y1={60}
        x2={CX}
        y2={2200}
        stroke="#facc15"
        strokeWidth="1.2"
        strokeDasharray="12 8 3 8"
        opacity="0.65"
      />
      <line
        x1={60}
        y1={CY}
        x2={2340}
        y2={CY}
        stroke="#facc15"
        strokeWidth="1.2"
        strokeDasharray="12 8 3 8"
        opacity="0.65"
      />

      {/* Classical Latin Cardinal Directional Inscriptions */}
      <text
        x={CX}
        y={140}
        textAnchor="middle"
        fill="#fde047"
        fontSize="12"
        fontFamily="'JetBrains Mono', monospace"
        letterSpacing="6"
        opacity="0.8"
      >
        SEPTENTRIO · POLUS ARCTICUS
      </text>
      <text
        x={2280}
        y={CY - 16}
        textAnchor="end"
        fill="#fde047"
        fontSize="12"
        fontFamily="'JetBrains Mono', monospace"
        letterSpacing="4"
        opacity="0.8"
      >
        ORIENS (E)
      </text>
      <text
        x={120}
        y={CY - 16}
        textAnchor="start"
        fill="#fde047"
        fontSize="12"
        fontFamily="'JetBrains Mono', monospace"
        letterSpacing="4"
        opacity="0.8"
      >
        OCCIDENS (W)
      </text>

      {/* Diagonal Solstice Alignment Axes (45° and 135°) */}
      <line
        x1={CX - 1200}
        y1={CY - 1200}
        x2={CX + 1200}
        y2={CY + 1200}
        stroke="#eab308"
        strokeWidth="0.9"
        strokeDasharray="6 10"
        opacity="0.45"
      />
      <line
        x1={CX - 1200}
        y1={CY + 1200}
        x2={CX + 1200}
        y2={CY - 1200}
        stroke="#eab308"
        strokeWidth="0.9"
        strokeDasharray="6 10"
        opacity="0.45"
      />

      {/* Eccentric Planetary Orbital Ellipses */}
      <ellipse
        cx={CX + 80}
        cy={CY - 40}
        rx={980}
        ry={620}
        fill="none"
        stroke="#38bdf8"
        strokeWidth="1.2"
        strokeDasharray="10 8"
        opacity="0.38"
        transform={`rotate(-22 ${CX} ${CY})`}
      />
      <ellipse
        cx={CX - 60}
        cy={CY + 30}
        rx={1240}
        ry={820}
        fill="none"
        stroke="#c084fc"
        strokeWidth="1.4"
        strokeDasharray="14 10 2 10"
        opacity="0.32"
        transform={`rotate(18 ${CX} ${CY})`}
      />

      {/* The Golden Spiral / Logarithmic Curvature Arc */}
      <path
        d="M 1200,1150 
           A 40,40 0 0,1 1240,1190 
           A 65,65 0 0,1 1175,1255 
           A 105,105 0 0,1 1070,1150 
           A 170,170 0 0,1 1240,980 
           A 275,275 0 0,1 1515,1255 
           A 445,445 0 0,1 1070,1700 
           A 720,720 0 0,1 350,980 
           A 1165,1165 0 0,1 1515,-185"
        fill="none"
        stroke="#fde047"
        strokeWidth="1.8"
        strokeDasharray="8 6"
        opacity="0.45"
      />

      {/* ========================================================
          PRECISION STARFIELD (420+ DETERMINISTIC STARS)
          ======================================================== */}
      {FIELD_STARS.map((star, idx) => (
        <circle
          key={`star-${idx}`}
          cx={star.x}
          cy={star.y}
          r={star.r}
          fill={star.color}
          opacity={star.opacity}
        />
      ))}

      {/* Pleiades Cluster (The Seven Sisters) */}
      <g id="pleiades-cluster" transform="translate(1960, 520)">
        <ellipse cx="40" cy="30" rx="60" ry="40" fill="#38bdf8" opacity="0.2" />
        <circle cx="15" cy="18" r="3.2" fill="#e0f2fe" opacity="0.95" />
        <circle cx="28" cy="12" r="3.6" fill="#ffffff" opacity="1" />
        <circle cx="44" cy="24" r="3.0" fill="#bae6fd" opacity="0.9" />
        <circle cx="58" cy="35" r="2.8" fill="#e0f2fe" opacity="0.9" />
        <circle cx="70" cy="22" r="2.4" fill="#ffffff" opacity="0.85" />
        <circle cx="34" cy="42" r="2.6" fill="#e0f2fe" opacity="0.9" />
        <circle cx="10" cy="36" r="2.2" fill="#bae6fd" opacity="0.8" />
      </g>

      {/* ========================================================
          CONSTELLATIONS & CONNECTING VECTOR PATHS
          ======================================================== */}
      {/* Orion Constellation */}
      <g id="constellation-orion">
        {CONSTELLATIONS.orion.lines.map(([from, to], idx) => {
          const p1 = CONSTELLATIONS.orion.points[from];
          const p2 = CONSTELLATIONS.orion.points[to];
          return (
            <line
              key={`orion-line-${idx}`}
              x1={p1.x}
              y1={p1.y}
              x2={p2.x}
              y2={p2.y}
              stroke="#facc15"
              strokeWidth="1.0"
              opacity="0.55"
              strokeDasharray="4 4"
            />
          );
        })}
        {CONSTELLATIONS.orion.points.map((pt, idx) => (
          <g key={`orion-pt-${idx}`}>
            {pt.r >= 4 && (
              <>
                <line
                  x1={pt.x - 22}
                  y1={pt.y}
                  x2={pt.x + 22}
                  y2={pt.y}
                  stroke="#ffffff"
                  strokeWidth="0.8"
                  opacity="0.85"
                />
                <line
                  x1={pt.x}
                  y1={pt.y - 22}
                  x2={pt.x}
                  y2={pt.y + 22}
                  stroke="#ffffff"
                  strokeWidth="0.8"
                  opacity="0.85"
                />
              </>
            )}
            <circle cx={pt.x} cy={pt.y} r={pt.r + 3} fill={pt.color} opacity="0.25" />
            <circle cx={pt.x} cy={pt.y} r={pt.r} fill={pt.color} opacity="1" />
            <circle cx={pt.x} cy={pt.y} r={pt.r * 0.45} fill="#ffffff" opacity="0.95" />
            {pt.label && (
              <text
                x={pt.x + 12}
                y={pt.y - 8}
                fill="#fde047"
                fontSize="10"
                fontFamily="'JetBrains Mono', monospace"
                letterSpacing="1.5"
                opacity="0.75"
              >
                {pt.label}
              </text>
            )}
          </g>
        ))}
      </g>

      {/* Cassiopeia */}
      <g id="constellation-cassiopeia">
        {CONSTELLATIONS.cassiopeia.lines.map(([from, to], idx) => {
          const p1 = CONSTELLATIONS.cassiopeia.points[from];
          const p2 = CONSTELLATIONS.cassiopeia.points[to];
          return (
            <line
              key={`cas-line-${idx}`}
              x1={p1.x}
              y1={p1.y}
              x2={p2.x}
              y2={p2.y}
              stroke="#fde047"
              strokeWidth="0.9"
              opacity="0.5"
              strokeDasharray="3 3"
            />
          );
        })}
        {CONSTELLATIONS.cassiopeia.points.map((pt, idx) => (
          <g key={`cas-pt-${idx}`}>
            <circle cx={pt.x} cy={pt.y} r={pt.r + 2} fill={pt.color} opacity="0.2" />
            <circle cx={pt.x} cy={pt.y} r={pt.r} fill={pt.color} opacity="0.95" />
            {pt.label && (
              <text
                x={pt.x + 10}
                y={pt.y - 8}
                fill="#fde047"
                fontSize="10"
                fontFamily="'JetBrains Mono', monospace"
                letterSpacing="1.5"
                opacity="0.75"
              >
                {pt.label}
              </text>
            )}
          </g>
        ))}
      </g>

      {/* Cygnus (The Northern Cross) with Albireo Binary */}
      <g id="constellation-cygnus">
        {CONSTELLATIONS.cygnus.lines.map(([from, to], idx) => {
          const p1 = CONSTELLATIONS.cygnus.points[from];
          const p2 = CONSTELLATIONS.cygnus.points[to];
          return (
            <line
              key={`cyg-line-${idx}`}
              x1={p1.x}
              y1={p1.y}
              x2={p2.x}
              y2={p2.y}
              stroke="#facc15"
              strokeWidth="1.0"
              opacity="0.55"
              strokeDasharray="4 4"
            />
          );
        })}
        {CONSTELLATIONS.cygnus.points.map((pt, idx) => (
          <g key={`cyg-pt-${idx}`}>
            {pt.r >= 4 && (
              <>
                <line
                  x1={pt.x - 20}
                  y1={pt.y}
                  x2={pt.x + 20}
                  y2={pt.y}
                  stroke="#ffffff"
                  strokeWidth="0.8"
                  opacity="0.8"
                />
                <line
                  x1={pt.x}
                  y1={pt.y - 20}
                  x2={pt.x}
                  y2={pt.y + 20}
                  stroke="#ffffff"
                  strokeWidth="0.8"
                  opacity="0.8"
                />
              </>
            )}
            <circle cx={pt.x} cy={pt.y} r={pt.r + 2.5} fill={pt.color} opacity="0.25" />
            <circle cx={pt.x} cy={pt.y} r={pt.r} fill={pt.color} opacity="1" />
            {pt.label && (
              <text
                x={pt.x + 12}
                y={pt.y - 6}
                fill="#fde047"
                fontSize="10"
                fontFamily="'JetBrains Mono', monospace"
                letterSpacing="1.5"
                opacity="0.75"
              >
                {pt.label}
              </text>
            )}
          </g>
        ))}
      </g>

      {/* Ursa Minor (The Little Dipper & North Celestial Pole) */}
      <g id="constellation-ursaminor">
        {CONSTELLATIONS.ursaMinor.lines.map(([from, to], idx) => {
          const p1 = CONSTELLATIONS.ursaMinor.points[from];
          const p2 = CONSTELLATIONS.ursaMinor.points[to];
          return (
            <line
              key={`umi-line-${idx}`}
              x1={p1.x}
              y1={p1.y}
              x2={p2.x}
              y2={p2.y}
              stroke="#fde047"
              strokeWidth="1.0"
              opacity="0.6"
              strokeDasharray="4 4"
            />
          );
        })}
        {CONSTELLATIONS.ursaMinor.points.map((pt, idx) => (
          <g key={`umi-pt-${idx}`}>
            {pt.name === 'Polaris' && (
              <>
                <circle cx={pt.x} cy={pt.y} r="18" fill="none" stroke="#fef08a" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6" />
                <line x1={pt.x - 28} y1={pt.y} x2={pt.x + 28} y2={pt.y} stroke="#ffffff" strokeWidth="1" opacity="0.9" />
                <line x1={pt.x} y1={pt.y - 28} x2={pt.x} y2={pt.y + 28} stroke="#ffffff" strokeWidth="1" opacity="0.9" />
                <line x1={pt.x - 18} y1={pt.y - 18} x2={pt.x + 18} y2={pt.y + 18} stroke="#fde047" strokeWidth="0.8" opacity="0.75" />
                <line x1={pt.x - 18} y1={pt.y + 18} x2={pt.x + 18} y2={pt.y - 18} stroke="#fde047" strokeWidth="0.8" opacity="0.75" />
              </>
            )}
            <circle cx={pt.x} cy={pt.y} r={pt.r + 2.5} fill={pt.color} opacity="0.25" />
            <circle cx={pt.x} cy={pt.y} r={pt.r} fill={pt.color} opacity="1" />
            {pt.label && (
              <text
                x={pt.x + 14}
                y={pt.y + 4}
                fill="#ffffff"
                fontSize="10"
                fontFamily="'JetBrains Mono', monospace"
                letterSpacing="1.5"
                opacity="0.85"
              >
                {pt.label}
              </text>
            )}
          </g>
        ))}
      </g>

      {/* Corona Borealis */}
      <g id="constellation-crown">
        {CONSTELLATIONS.crown.lines.map(([from, to], idx) => {
          const p1 = CONSTELLATIONS.crown.points[from];
          const p2 = CONSTELLATIONS.crown.points[to];
          return (
            <line
              key={`crown-line-${idx}`}
              x1={p1.x}
              y1={p1.y}
              x2={p2.x}
              y2={p2.y}
              stroke="#eab308"
              strokeWidth="0.8"
              opacity="0.45"
            />
          );
        })}
        {CONSTELLATIONS.crown.points.map((pt, idx) => (
          <g key={`crown-pt-${idx}`}>
            <circle cx={pt.x} cy={pt.y} r={pt.r} fill={pt.color} opacity="0.9" />
            {pt.label && (
              <text
                x={pt.x + 10}
                y={pt.y - 8}
                fill="#fde047"
                fontSize="10"
                fontFamily="'JetBrains Mono', monospace"
                letterSpacing="1.5"
                opacity="0.75"
              >
                {pt.label}
              </text>
            )}
          </g>
        ))}
      </g>

      {/* Ursa Major (The Great Bear / Big Dipper) */}
      <g id="constellation-ursamajor">
        {/* Pointer Ray: Merak (1040, 460) through Dubhe (1060, 380) to Polaris (1200, 240) */}
        <line
          x1={1040}
          y1={460}
          x2={1200}
          y2={240}
          stroke="#fde047"
          strokeWidth="1.2"
          strokeDasharray="4 6"
          opacity="0.65"
        />
        <text
          x={1130}
          y={330}
          fill="#fef08a"
          fontSize="8"
          fontFamily="'JetBrains Mono', monospace"
          letterSpacing="1"
          transform="rotate(-54 1130 330)"
          opacity="0.65"
        >
          INDEX POLARIS · 5× SPAN
        </text>

        {CONSTELLATIONS.ursaMajor.lines.map(([from, to], idx) => {
          const p1 = CONSTELLATIONS.ursaMajor.points[from];
          const p2 = CONSTELLATIONS.ursaMajor.points[to];
          return (
            <line
              key={`uma-line-${idx}`}
              x1={p1.x}
              y1={p1.y}
              x2={p2.x}
              y2={p2.y}
              stroke="#93c5fd"
              strokeWidth="1.1"
              opacity="0.6"
              strokeDasharray="5 3"
            />
          );
        })}
        {CONSTELLATIONS.ursaMajor.points.map((pt, idx) => (
          <g key={`uma-pt-${idx}`}>
            <circle cx={pt.x} cy={pt.y} r={pt.r + 2.5} fill={pt.color} opacity="0.25" />
            <circle cx={pt.x} cy={pt.y} r={pt.r} fill={pt.color} opacity="0.95" />
            {pt.label && (
              <text
                x={pt.x - 8}
                y={pt.y - 10}
                fill="#ffffff"
                fontSize="9.5"
                fontFamily="'JetBrains Mono', monospace"
                letterSpacing="1"
                opacity="0.85"
              >
                {pt.label}
              </text>
            )}
          </g>
        ))}
      </g>

      {/* Aquila (The Celestial Eagle) */}
      <g id="constellation-aquila">
        {CONSTELLATIONS.aquila.lines.map(([from, to], idx) => {
          const p1 = CONSTELLATIONS.aquila.points[from];
          const p2 = CONSTELLATIONS.aquila.points[to];
          return (
            <line
              key={`aql-line-${idx}`}
              x1={p1.x}
              y1={p1.y}
              x2={p2.x}
              y2={p2.y}
              stroke="#67e8f9"
              strokeWidth="1.0"
              opacity="0.55"
              strokeDasharray="4 4"
            />
          );
        })}
        {CONSTELLATIONS.aquila.points.map((pt, idx) => (
          <g key={`aql-pt-${idx}`}>
            {pt.name === 'Altair' && (
              <>
                <circle cx={pt.x} cy={pt.y} r="14" fill="none" stroke="#bae6fd" strokeWidth="0.8" opacity="0.5" />
                <line x1={pt.x - 20} y1={pt.y} x2={pt.x + 20} y2={pt.y} stroke="#ffffff" strokeWidth="1" opacity="0.85" />
                <line x1={pt.x} y1={pt.y - 20} x2={pt.x} y2={pt.y + 20} stroke="#ffffff" strokeWidth="1" opacity="0.85" />
              </>
            )}
            <circle cx={pt.x} cy={pt.y} r={pt.r + 2} fill={pt.color} opacity="0.3" />
            <circle cx={pt.x} cy={pt.y} r={pt.r} fill={pt.color} opacity="0.95" />
            {pt.label && (
              <text
                x={pt.x + 12}
                y={pt.y + 4}
                fill="#cffafe"
                fontSize="9.5"
                fontFamily="'JetBrains Mono', monospace"
                letterSpacing="1"
                opacity="0.85"
              >
                {pt.label}
              </text>
            )}
          </g>
        ))}
      </g>
    </g>
  );
}

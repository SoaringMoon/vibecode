/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

const CX = 1200;
const CY = 1150;
const LUNAR_R = 278;

// Generate 48 major coronal ray beams
function generateCoronaBeams() {
  const beams = [];
  const count = 48;

  for (let i = 0; i < count; i++) {
    const angle = (i * 2 * Math.PI) / count;
    // Harmonic modulation for natural solar coronal streamers
    const harmonic1 = Math.sin(i * 3) * 160;
    const harmonic2 = Math.cos(i * 5) * 90;
    const harmonic3 = Math.sin(i * 7 + 1.2) * 60;
    const baseLength = 480 + harmonic1 + harmonic2 + harmonic3;
    const length = Math.max(340, Math.min(940, baseLength));

    // Base width on circumference
    const halfWidth = 0.055;
    const a1 = angle - halfWidth;
    const a2 = angle + halfWidth;

    const xBase1 = CX + Math.cos(a1) * (LUNAR_R - 5);
    const yBase1 = CY + Math.sin(a1) * (LUNAR_R - 5);
    const xBase2 = CX + Math.cos(a2) * (LUNAR_R - 5);
    const yBase2 = CY + Math.sin(a2) * (LUNAR_R - 5);

    const xTip = CX + Math.cos(angle) * (LUNAR_R + length);
    const yTip = CY + Math.sin(angle) * (LUNAR_R + length);

    // Control points for organic curved flare
    const cDist = LUNAR_R + length * 0.45;
    const cx1 = CX + Math.cos(angle - 0.02) * cDist;
    const cy1 = CY + Math.sin(angle - 0.02) * cDist;
    const cx2 = CX + Math.cos(angle + 0.02) * cDist;
    const cy2 = CY + Math.sin(angle + 0.02) * cDist;

    const pathData = `M ${xBase1},${yBase1} Q ${cx1},${cy1} ${xTip},${yTip} Q ${cx2},${cy2} ${xBase2},${yBase2} Z`;

    beams.push({
      id: `beam-${i}`,
      pathData,
      length,
      angle: (i * 360) / count,
      isPrimary: i % 2 === 0,
    });
  }

  return beams;
}

// Generate 72 fine coronal hairline filaments
function generateCoronalFilaments() {
  const filaments = [];
  const count = 72;
  for (let i = 0; i < count; i++) {
    const angle = (i * 2 * Math.PI) / count + 0.04;
    const length = 260 + (i % 7) * 45 + (i % 3) * 35;
    const x1 = CX + Math.cos(angle) * LUNAR_R;
    const y1 = CY + Math.sin(angle) * LUNAR_R;
    const x2 = CX + Math.cos(angle) * (LUNAR_R + length);
    const y2 = CY + Math.sin(angle) * (LUNAR_R + length);
    filaments.push({ x1, y1, x2, y2 });
  }
  return filaments;
}

// Generate 60 gear teeth for the sacred astrolabe aura ring
function generateAstrolabeGearTeeth() {
  const teeth = [];
  const count = 60;
  const rInner = 308;
  const rOuter = 322;
  for (let i = 0; i < count; i++) {
    const angle = (i * 2 * Math.PI) / count;
    const x1 = CX + Math.cos(angle) * rInner;
    const y1 = CY + Math.sin(angle) * rInner;
    const x2 = CX + Math.cos(angle) * rOuter;
    const y2 = CY + Math.sin(angle) * rOuter;
    teeth.push({ x1, y1, x2, y2 });
  }
  return teeth;
}

// Generate Dipole Magnetic Field Lines curving across the corona
function generateDipoleFieldLines() {
  const lines = [];
  const loopOffsets = [-220, -160, -100, -50, 50, 100, 160, 220];
  for (const offset of loopOffsets) {
    const sign = offset > 0 ? 1 : -1;
    const span = Math.abs(offset);
    // Arc from North Pole (CY - LUNAR_R) curving out to South Pole (CY + LUNAR_R)
    const p1x = CX;
    const p1y = CY - LUNAR_R + 10;
    const p2x = CX;
    const p2y = CY + LUNAR_R - 10;
    const cx1 = CX + sign * (LUNAR_R + span * 1.8);
    const cy1 = CY - LUNAR_R * 0.4;
    const cx2 = CX + sign * (LUNAR_R + span * 1.8);
    const cy2 = CY + LUNAR_R * 0.4;
    lines.push(`M ${p1x},${p1y} C ${cx1},${cy1} ${cx2},${cy2} ${p2x},${p2y}`);
  }
  return lines;
}

// Generate 160 fine chromosphere spicules along the solar limb
function generateSolarSpicules() {
  const spicules = [];
  const count = 160;
  for (let i = 0; i < count; i++) {
    const angle = (i * 2 * Math.PI) / count;
    const len = 3 + Math.sin(i * 9) * 4 + Math.cos(i * 15) * 3 + (i % 5 === 0 ? 5 : 0);
    const x1 = CX + Math.cos(angle) * (LUNAR_R - 1);
    const y1 = CY + Math.sin(angle) * (LUNAR_R - 1);
    const x2 = CX + Math.cos(angle) * (LUNAR_R + len);
    const y2 = CY + Math.sin(angle) * (LUNAR_R + len);
    spicules.push({ x1, y1, x2, y2, color: i % 3 === 0 ? '#ff0055' : i % 2 === 0 ? '#fb7185' : '#e11d48' });
  }
  return spicules;
}

// Generate Polar Plume Coronal Brushes (Solar North & South Poles)
function generatePolarPlumes() {
  const plumes = [];
  const poleAngles = [-Math.PI / 2, Math.PI / 2];
  for (const pAngle of poleAngles) {
    for (let i = -14; i <= 14; i++) {
      const angle = pAngle + i * 0.038;
      const len = 110 + Math.cos(i * 0.18) * 90;
      const x1 = CX + Math.cos(angle) * LUNAR_R;
      const y1 = CY + Math.sin(angle) * LUNAR_R;
      const x2 = CX + Math.cos(angle) * (LUNAR_R + len);
      const y2 = CY + Math.sin(angle) * (LUNAR_R + len);
      plumes.push({ x1, y1, x2, y2 });
    }
  }
  return plumes;
}

const CORONA_BEAMS = generateCoronaBeams();
const CORONA_FILAMENTS = generateCoronalFilaments();
const GEAR_TEETH = generateAstrolabeGearTeeth();
const DIPOLE_LINES = generateDipoleFieldLines();
const SOLAR_SPICULES = generateSolarSpicules();
const POLAR_PLUMES = generatePolarPlumes();

// Diamond Ring Angle (radians)
const DIAMOND_ANGLE = (44 * Math.PI) / 180;
const DIAMOND_X = CX + Math.cos(DIAMOND_ANGLE) * LUNAR_R;
const DIAMOND_Y = CY + Math.sin(DIAMOND_ANGLE) * LUNAR_R;

// Precision Baily's Beads along the exact lunar mountain limb profile
const BAILYS_BEADS = [
  { dAngle: -0.076, rOffset: -0.8, r: 2.4, color: '#f59e0b', glint: 6 },
  { dAngle: -0.052, rOffset: -0.3, r: 3.2, color: '#fde047', glint: 9 },
  { dAngle: -0.032, rOffset: 0.2, r: 4.4, color: '#ffffff', glint: 15 },
  { dAngle: -0.014, rOffset: 0.5, r: 5.6, color: '#ffffff', glint: 20 },
  { dAngle: 0.015, rOffset: 0.4, r: 5.0, color: '#ffffff', glint: 18 },
  { dAngle: 0.034, rOffset: 0.1, r: 4.0, color: '#ffffff', glint: 13 },
  { dAngle: 0.056, rOffset: -0.4, r: 2.8, color: '#fde047', glint: 8 },
  { dAngle: 0.080, rOffset: -0.8, r: 1.8, color: '#f59e0b', glint: 5 },
].map((b) => {
  const ang = DIAMOND_ANGLE + b.dAngle;
  const radius = LUNAR_R + b.rOffset;
  const x = CX + Math.cos(ang) * radius;
  const y = CY + Math.sin(ang) * radius;
  return { ...b, x, y };
});

export default function Layer2_TheEclipse() {
  return (
    <g id="layer2-the-eclipse" shapeRendering="geometricPrecision">
      {/* ========================================================
          GRAND CORONA RADIAL LIGHT HALO
          ======================================================== */}
      <circle
        cx={CX}
        cy={CY}
        r={960}
        fill="url(#coronaGrandHalo)"
        opacity="0.85"
        style={{ mixBlendMode: 'screen' }}
      />
      <circle
        cx={CX}
        cy={CY}
        r={640}
        fill="url(#coronaGrandHalo)"
        opacity="0.92"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Dipole Magnetic Field Flux Lines */}
      {DIPOLE_LINES.map((d, idx) => (
        <path
          key={`dipole-${idx}`}
          d={d}
          fill="none"
          stroke="url(#solarMagneticGrad)"
          strokeWidth="1.2"
          strokeDasharray="12 8"
          opacity="0.5"
          style={{ mixBlendMode: 'screen' }}
        />
      ))}

      {/* ========================================================
          GRAND EQUATORIAL HELMET STREAMERS & POLAR PLUMES
          ======================================================== */}
      {/* East Equatorial Helmet Streamer */}
      <path
        d={`M ${CX + 240},${CY - 140} 
           C ${CX + 540},${CY - 160} ${CX + 860},${CY - 60} ${CX + 1120},${CY - 30} 
           C ${CX + 860},${CY + 60} ${CX + 540},${CY + 160} ${CX + 240},${CY + 140} 
           Z`}
        fill="url(#streamerHelmet)"
        opacity="0.82"
        style={{ mixBlendMode: 'screen' }}
      />
      {/* East Streamer Magnetic Core Spine & Cusp */}
      <path
        d={`M ${CX + 260},${CY - 40} C ${CX + 560},${CY - 50} ${CX + 860},${CY - 20} ${CX + 1120},${CY - 30}`}
        fill="none"
        stroke="#ffffff"
        strokeWidth="1.4"
        opacity="0.75"
        style={{ mixBlendMode: 'screen' }}
      />
      <path
        d={`M ${CX + 260},${CY + 40} C ${CX + 560},${CY + 50} ${CX + 860},${CY - 10} ${CX + 1120},${CY - 30}`}
        fill="none"
        stroke="#fef08a"
        strokeWidth="1.2"
        opacity="0.65"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* West Equatorial Helmet Streamer */}
      <path
        d={`M ${CX - 240},${CY - 140} 
           C ${CX - 540},${CY - 160} ${CX - 860},${CY - 60} ${CX - 1120},${CY - 30} 
           C ${CX - 860},${CY + 60} ${CX - 540},${CY + 160} ${CX - 240},${CY + 140} 
           Z`}
        fill="url(#streamerHelmet)"
        opacity="0.82"
        style={{ mixBlendMode: 'screen' }}
      />
      {/* West Streamer Magnetic Core Spine & Cusp */}
      <path
        d={`M ${CX - 260},${CY - 40} C ${CX - 560},${CY - 50} ${CX - 860},${CY - 20} ${CX - 1120},${CY - 30}`}
        fill="none"
        stroke="#ffffff"
        strokeWidth="1.4"
        opacity="0.75"
        style={{ mixBlendMode: 'screen' }}
      />
      <path
        d={`M ${CX - 260},${CY + 40} C ${CX - 560},${CY + 50} ${CX - 860},${CY - 10} ${CX - 1120},${CY - 30}`}
        fill="none"
        stroke="#fef08a"
        strokeWidth="1.2"
        opacity="0.65"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Polar Coronal Ray Plumes (Solar Magnetic Poles) */}
      {POLAR_PLUMES.map((p, idx) => (
        <line
          key={`pole-p-${idx}`}
          x1={p.x1}
          y1={p.y1}
          x2={p.x2}
          y2={p.y2}
          stroke="#fef08a"
          strokeWidth="0.85"
          opacity="0.45"
          style={{ mixBlendMode: 'screen' }}
        />
      ))}

      {/* ========================================================
          MATHEMATICAL CORONA RAY SPIRES (48 BEAMS)
          ======================================================== */}
      {CORONA_BEAMS.map((beam) => (
        <path
          key={beam.id}
          d={beam.pathData}
          fill={beam.isPrimary ? 'url(#coronaBeamGold)' : 'url(#coronaBeamAmber)'}
          opacity={beam.isPrimary ? 0.9 : 0.68}
          style={{ mixBlendMode: 'screen' }}
        />
      ))}

      {/* Hairline Coronal Filaments */}
      {CORONA_FILAMENTS.map((f, idx) => (
        <line
          key={`fil-${idx}`}
          x1={f.x1}
          y1={f.y1}
          x2={f.x2}
          y2={f.y2}
          stroke="#fde047"
          strokeWidth="0.8"
          opacity="0.5"
          style={{ mixBlendMode: 'screen' }}
        />
      ))}

      {/* ========================================================
          SOLAR PROMINENCE PLASMA LOOPS (ERUPTIVE FLARES)
          ======================================================== */}
      {/* Prominence Loop 1: ~105° (Southeast) */}
      <path
        d={`M ${CX + Math.cos(1.8) * LUNAR_R},${CY + Math.sin(1.8) * LUNAR_R} 
           C ${CX + Math.cos(1.8) * (LUNAR_R + 115)},${CY + Math.sin(1.8) * (LUNAR_R + 115)} 
             ${CX + Math.cos(1.95) * (LUNAR_R + 135)},${CY + Math.sin(1.95) * (LUNAR_R + 135)} 
             ${CX + Math.cos(2.05) * LUNAR_R},${CY + Math.sin(2.05) * LUNAR_R} 
           Z`}
        fill="url(#prominenceGrad)"
        opacity="0.94"
        style={{ mixBlendMode: 'screen' }}
      />
      {/* Prominence 1 Hot Core Strand & Limb Footpoints */}
      <path
        d={`M ${CX + Math.cos(1.82) * LUNAR_R},${CY + Math.sin(1.82) * LUNAR_R} 
           C ${CX + Math.cos(1.84) * (LUNAR_R + 95)},${CY + Math.sin(1.84) * (LUNAR_R + 95)} 
             ${CX + Math.cos(1.96) * (LUNAR_R + 115)},${CY + Math.sin(1.96) * (LUNAR_R + 115)} 
             ${CX + Math.cos(2.03) * LUNAR_R},${CY + Math.sin(2.03) * LUNAR_R}`}
        fill="none"
        stroke="url(#prominenceCore)"
        strokeWidth="2.8"
        style={{ mixBlendMode: 'screen' }}
      />
      {/* Prominence 1 Helical Twisted Magnetic Flux Strand */}
      <path
        d={`M ${CX + Math.cos(1.85) * LUNAR_R},${CY + Math.sin(1.85) * LUNAR_R} 
           C ${CX + Math.cos(1.89) * (LUNAR_R + 105)},${CY + Math.sin(1.89) * (LUNAR_R + 105)} 
             ${CX + Math.cos(1.93) * (LUNAR_R + 110)},${CY + Math.sin(1.93) * (LUNAR_R + 110)} 
             ${CX + Math.cos(2.01) * LUNAR_R},${CY + Math.sin(2.01) * LUNAR_R}`}
        fill="none"
        stroke="#fef08a"
        strokeWidth="1.2"
        strokeDasharray="5 3"
        opacity="0.8"
        style={{ mixBlendMode: 'screen' }}
      />
      <circle cx={CX + Math.cos(1.8) * LUNAR_R} cy={CY + Math.sin(1.8) * LUNAR_R} r="3.2" fill="#ffffff" />
      <circle cx={CX + Math.cos(2.05) * LUNAR_R} cy={CY + Math.sin(2.05) * LUNAR_R} r="3.2" fill="#ffffff" />

      {/* Prominence Loop 2: ~195° (Southwest) */}
      <path
        d={`M ${CX + Math.cos(3.35) * LUNAR_R},${CY + Math.sin(3.35) * LUNAR_R} 
           C ${CX + Math.cos(3.4) * (LUNAR_R + 100)},${CY + Math.sin(3.4) * (LUNAR_R + 100)} 
             ${CX + Math.cos(3.55) * (LUNAR_R + 120)},${CY + Math.sin(3.55) * (LUNAR_R + 120)} 
             ${CX + Math.cos(3.62) * LUNAR_R},${CY + Math.sin(3.62) * LUNAR_R} 
           Z`}
        fill="url(#prominenceGrad)"
        opacity="0.9"
        style={{ mixBlendMode: 'screen' }}
      />
      <path
        d={`M ${CX + Math.cos(3.37) * LUNAR_R},${CY + Math.sin(3.37) * LUNAR_R} 
           C ${CX + Math.cos(3.42) * (LUNAR_R + 82)},${CY + Math.sin(3.42) * (LUNAR_R + 82)} 
             ${CX + Math.cos(3.53) * (LUNAR_R + 98)},${CY + Math.sin(3.53) * (LUNAR_R + 98)} 
             ${CX + Math.cos(3.6) * LUNAR_R},${CY + Math.sin(3.6) * LUNAR_R}`}
        fill="none"
        stroke="url(#prominenceCore)"
        strokeWidth="2.4"
        style={{ mixBlendMode: 'screen' }}
      />
      {/* Prominence 2 Helical Twisted Magnetic Flux Strand */}
      <path
        d={`M ${CX + Math.cos(3.39) * LUNAR_R},${CY + Math.sin(3.39) * LUNAR_R} 
           C ${CX + Math.cos(3.46) * (LUNAR_R + 88)},${CY + Math.sin(3.46) * (LUNAR_R + 88)} 
             ${CX + Math.cos(3.51) * (LUNAR_R + 94)},${CY + Math.sin(3.51) * (LUNAR_R + 94)} 
             ${CX + Math.cos(3.58) * LUNAR_R},${CY + Math.sin(3.58) * LUNAR_R}`}
        fill="none"
        stroke="#fef08a"
        strokeWidth="1.1"
        strokeDasharray="4 3"
        opacity="0.75"
        style={{ mixBlendMode: 'screen' }}
      />
      <circle cx={CX + Math.cos(3.35) * LUNAR_R} cy={CY + Math.sin(3.35) * LUNAR_R} r="3.0" fill="#ffffff" />
      <circle cx={CX + Math.cos(3.62) * LUNAR_R} cy={CY + Math.sin(3.62) * LUNAR_R} r="3.0" fill="#ffffff" />

      {/* Prominence Flare 3: ~275° (West-Northwest) */}
      <path
        d={`M ${CX + Math.cos(4.75) * LUNAR_R},${CY + Math.sin(4.75) * LUNAR_R} 
           C ${CX + Math.cos(4.8) * (LUNAR_R + 85)},${CY + Math.sin(4.8) * (LUNAR_R + 85)} 
             ${CX + Math.cos(4.9) * (LUNAR_R + 105)},${CY + Math.sin(4.9) * (LUNAR_R + 105)} 
             ${CX + Math.cos(4.98) * LUNAR_R},${CY + Math.sin(4.98) * LUNAR_R} 
           Z`}
        fill="url(#prominenceGrad)"
        opacity="0.92"
        style={{ mixBlendMode: 'screen' }}
      />
      <path
        d={`M ${CX + Math.cos(4.77) * LUNAR_R},${CY + Math.sin(4.77) * LUNAR_R} 
           C ${CX + Math.cos(4.82) * (LUNAR_R + 70)},${CY + Math.sin(4.82) * (LUNAR_R + 70)} 
             ${CX + Math.cos(4.91) * (LUNAR_R + 85)},${CY + Math.sin(4.91) * (LUNAR_R + 85)} 
             ${CX + Math.cos(4.96) * LUNAR_R},${CY + Math.sin(4.96) * LUNAR_R}`}
        fill="none"
        stroke="url(#prominenceCore)"
        strokeWidth="2.2"
        style={{ mixBlendMode: 'screen' }}
      />
      {/* Prominence 3 Helical Core Strand */}
      <path
        d={`M ${CX + Math.cos(4.79) * LUNAR_R},${CY + Math.sin(4.79) * LUNAR_R} 
           C ${CX + Math.cos(4.85) * (LUNAR_R + 75)},${CY + Math.sin(4.85) * (LUNAR_R + 75)} 
             ${CX + Math.cos(4.88) * (LUNAR_R + 80)},${CY + Math.sin(4.88) * (LUNAR_R + 80)} 
             ${CX + Math.cos(4.94) * LUNAR_R},${CY + Math.sin(4.94) * LUNAR_R}`}
        fill="none"
        stroke="#fef08a"
        strokeWidth="1.0"
        strokeDasharray="4 3"
        opacity="0.75"
        style={{ mixBlendMode: 'screen' }}
      />
      <circle cx={CX + Math.cos(4.75) * LUNAR_R} cy={CY + Math.sin(4.75) * LUNAR_R} r="2.8" fill="#ffffff" />
      <circle cx={CX + Math.cos(4.98) * LUNAR_R} cy={CY + Math.sin(4.98) * LUNAR_R} r="2.8" fill="#ffffff" />

      {/* Prominence Flare 4: ~325° (Northwest) */}
      <path
        d={`M ${CX + Math.cos(5.6) * LUNAR_R},${CY + Math.sin(5.6) * LUNAR_R} 
           C ${CX + Math.cos(5.65) * (LUNAR_R + 135)},${CY + Math.sin(5.65) * (LUNAR_R + 135)} 
             ${CX + Math.cos(5.75) * (LUNAR_R + 145)},${CY + Math.sin(5.75) * (LUNAR_R + 145)} 
             ${CX + Math.cos(5.82) * LUNAR_R},${CY + Math.sin(5.82) * LUNAR_R} 
           Z`}
        fill="url(#prominenceGrad)"
        opacity="0.96"
        style={{ mixBlendMode: 'screen' }}
      />
      <path
        d={`M ${CX + Math.cos(5.62) * LUNAR_R},${CY + Math.sin(5.62) * LUNAR_R} 
           C ${CX + Math.cos(5.67) * (LUNAR_R + 115)},${CY + Math.sin(5.67) * (LUNAR_R + 115)} 
             ${CX + Math.cos(5.74) * (LUNAR_R + 125)},${CY + Math.sin(5.74) * (LUNAR_R + 125)} 
             ${CX + Math.cos(5.8) * LUNAR_R},${CY + Math.sin(5.8) * LUNAR_R}`}
        fill="none"
        stroke="url(#prominenceCore)"
        strokeWidth="2.8"
        style={{ mixBlendMode: 'screen' }}
      />
      {/* Prominence 4 Helical Magnetic Flux Strand */}
      <path
        d={`M ${CX + Math.cos(5.64) * LUNAR_R},${CY + Math.sin(5.64) * LUNAR_R} 
           C ${CX + Math.cos(5.69) * (LUNAR_R + 120)},${CY + Math.sin(5.69) * (LUNAR_R + 120)} 
             ${CX + Math.cos(5.72) * (LUNAR_R + 125)},${CY + Math.sin(5.72) * (LUNAR_R + 125)} 
             ${CX + Math.cos(5.78) * LUNAR_R},${CY + Math.sin(5.78) * LUNAR_R}`}
        fill="none"
        stroke="#fef08a"
        strokeWidth="1.2"
        strokeDasharray="5 3"
        opacity="0.8"
        style={{ mixBlendMode: 'screen' }}
      />
      <circle cx={CX + Math.cos(5.6) * LUNAR_R} cy={CY + Math.sin(5.6) * LUNAR_R} r="3.2" fill="#ffffff" />
      <circle cx={CX + Math.cos(5.82) * LUNAR_R} cy={CY + Math.sin(5.82) * LUNAR_R} r="3.2" fill="#ffffff" />

      {/* ========================================================
          SACRED ASTROLABE GEAR AURA RING
          ======================================================== */}
      <g id="astrolabe-gear-ring">
        <circle cx={CX} cy={CY} r="308" fill="none" stroke="#ca8a04" strokeWidth="1.2" opacity="0.75" />
        <circle cx={CX} cy={CY} r="322" fill="none" stroke="#fde047" strokeWidth="1.5" opacity="0.85" />
        {GEAR_TEETH.map((t, idx) => (
          <line
            key={`gear-${idx}`}
            x1={t.x1}
            y1={t.y1}
            x2={t.x2}
            y2={t.y2}
            stroke="#fde047"
            strokeWidth="1.8"
            opacity="0.85"
          />
        ))}
      </g>

      {/* ========================================================
          THE OBSIDIAN LUNAR DISC & DETAILED MARIA
          ======================================================== */}
      {/* Lunar Rim Radiant Corona Backlight Ring */}
      <circle
        cx={CX}
        cy={CY}
        r={LUNAR_R + 1.5}
        fill="none"
        stroke="#ffffff"
        strokeWidth="3.2"
        opacity="0.98"
      />
      <circle
        cx={CX}
        cy={CY}
        r={LUNAR_R + 4.5}
        fill="none"
        stroke="#fde047"
        strokeWidth="2.0"
        opacity="0.85"
      />

      {/* Solar Chromosphere Micro-Spicules (160 Solar Atmospheric Jets) */}
      <g id="chromosphere-spicules">
        {SOLAR_SPICULES.map((sp, idx) => (
          <line
            key={`spicule-${idx}`}
            x1={sp.x1}
            y1={sp.y1}
            x2={sp.x2}
            y2={sp.y2}
            stroke={sp.color}
            strokeWidth="1.2"
            opacity="0.85"
          />
        ))}
      </g>

      {/* Solid Black Obsidian Lunar Body */}
      <circle
        cx={CX}
        cy={CY}
        r={LUNAR_R}
        fill="url(#lunarBody)"
      />

      {/* Gentle Celestial Earthshine Illuminating Night-Side Basalt Plains */}
      <circle
        cx={CX}
        cy={CY}
        r={LUNAR_R - 1}
        fill="url(#lunarEarthshine)"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Lunar Mountain Limb Topography Profile (Montes Apenninus & Leibnitz) */}
      <circle
        cx={CX}
        cy={CY}
        r={LUNAR_R - 0.5}
        fill="none"
        stroke="#ffffff"
        strokeWidth="1.2"
        strokeDasharray="28 4 48 3 18 2 64 5 32 3 72 4"
        opacity="0.85"
      />

      {/* Deepened Lunar Maria (Basalt Plains) Silhouettes */}
      {/* Oceanus Procellarum (Ocean of Storms) */}
      <path
        d={`M ${CX - 120},${CY - 80} 
           C ${CX - 180},${CY - 40} ${CX - 210},${CY + 40} ${CX - 160},${CY + 110} 
           C ${CX - 110},${CY + 180} ${CX - 50},${CY + 150} ${CX - 40},${CY + 90} 
           C ${CX - 30},${CY + 20} ${CX - 70},${CY - 60} ${CX - 120},${CY - 80} Z`}
        fill="url(#lunarMare)"
      />

      {/* Mare Tranquillitatis & Mare Serenitatis */}
      <path
        d={`M ${CX + 40},${CY - 110} 
           C ${CX + 110},${CY - 130} ${CX + 170},${CY - 80} ${CX + 180},${CY - 10} 
           C ${CX + 190},${CY + 50} ${CX + 140},${CY + 80} ${CX + 70},${CY + 60} 
           C ${CX + 10},${CY + 40} ${CX - 10},${CY - 40} ${CX + 40},${CY - 110} Z`}
        fill="url(#lunarMare)"
      />

      {/* Mare Imbrium (Sea of Rains) */}
      <circle
        cx={CX - 45}
        cy={CY - 120}
        r={70}
        fill="url(#lunarMare)"
      />

      {/* Mare Crisium (Crisium Basin) */}
      <ellipse
        cx={CX + 185}
        cy={CY - 50}
        rx={40}
        ry={32}
        fill="url(#lunarMare)"
      />

      {/* Copernicus Crater & Prominent Terraced Ejecta Rays */}
      <g id="copernicus-crater-system">
        <circle cx={CX - 90} cy={CY - 20} r="14" fill="url(#craterRayGrad)" />
        <circle cx={CX - 90} cy={CY - 20} r="6.5" fill="#20223b" />
        <circle cx={CX - 90} cy={CY - 20} r="2.2" fill="#cffafe" opacity="0.85" />
        {/* Central Peak Specular Pinpoint */}
        <circle cx={CX - 90} cy={CY - 20} r="0.9" fill="#ffffff" />
        {/* Feathered Ejecta Rays & Stadius Craterlet Alignments */}
        <line x1={CX - 90} y1={CY - 20} x2={CX - 175} y2={CY - 72} stroke="#272a4a" strokeWidth="1.2" opacity="0.45" />
        <line x1={CX - 120} y1={CY - 40} x2={CX - 180} y2={CY - 30} stroke="#222542" strokeWidth="0.8" opacity="0.35" />
        <line x1={CX - 90} y1={CY - 20} x2={CX - 165} y2={CY + 35} stroke="#272a4a" strokeWidth="1.2" opacity="0.45" />
        <line x1={CX - 90} y1={CY - 20} x2={CX - 25} y2={CY - 65} stroke="#272a4a" strokeWidth="1.1" opacity="0.45" />
        <line x1={CX - 90} y1={CY - 20} x2={CX - 35} y2={CY + 35} stroke="#272a4a" strokeWidth="1.1" opacity="0.45" />
        <line x1={CX - 60} y1={CY + 10} x2={CX - 10} y2={CY + 55} stroke="#222542" strokeWidth="0.8" opacity="0.35" />
      </g>

      {/* Tycho Crater & Expansive Southern Highlands Ray System */}
      <g id="tycho-crater">
        <circle cx={CX - 30} cy={CY + 180} r={12} fill="url(#craterRayGrad)" />
        <circle cx={CX - 30} cy={CY + 180} r={5} fill="#271c3d" opacity="0.9" />
        <circle cx={CX - 30} cy={CY + 180} r={1.8} fill="#fef08a" opacity="0.9" />
        {/* Long Linear Ejecta Ray Splines reaching toward Maria */}
        <line x1={CX - 30} y1={CY + 180} x2={CX - 155} y2={CY + 85} stroke="#2c2242" strokeWidth="1.1" opacity="0.45" />
        <line x1={CX - 30} y1={CY + 180} x2={CX + 115} y2={CY + 75} stroke="#2c2242" strokeWidth="1.1" opacity="0.45" />
        <line x1={CX - 30} y1={CY + 180} x2={CX - 85} y2={CY + 22} stroke="#2c2242" strokeWidth="1.0" opacity="0.45" />
        <line x1={CX - 30} y1={CY + 180} x2={CX + 75} y2={CY + 125} stroke="#2c2242" strokeWidth="1.0" opacity="0.45" />
        <line x1={CX - 30} y1={CY + 180} x2={CX + 40} y2={CY + 235} stroke="#221b36" strokeWidth="0.8" opacity="0.35" />
        <line x1={CX - 30} y1={CY + 180} x2={CX - 90} y2={CY + 220} stroke="#221b36" strokeWidth="0.8" opacity="0.35" />
      </g>

      {/* ========================================================
          BAILY'S BEADS & 16-POINT PRISMATIC DIAMOND RING
          ======================================================== */}
      <g id="diamond-ring-burst">
        {/* Large Soft Glow Flare */}
        <circle
          cx={DIAMOND_X}
          cy={DIAMOND_Y}
          r={200}
          fill="url(#diamondRingCore)"
          style={{ mixBlendMode: 'screen' }}
        />
        <circle
          cx={DIAMOND_X}
          cy={DIAMOND_Y}
          r={105}
          fill="url(#diamondRingCore)"
          style={{ mixBlendMode: 'screen' }}
        />

        {/* Newton's Refraction Diffraction Rings (Chromatic Airy Disc Rings) */}
        <circle cx={DIAMOND_X} cy={DIAMOND_Y} r={32} fill="none" stroke="#ffffff" strokeWidth="0.9" opacity="0.8" />
        <circle cx={DIAMOND_X} cy={DIAMOND_Y} r={52} fill="none" stroke="#fef08a" strokeWidth="0.75" strokeDasharray="6 3" opacity="0.65" />
        <circle cx={DIAMOND_X} cy={DIAMOND_Y} r={78} fill="none" stroke="#67e8f9" strokeWidth="0.6" strokeDasharray="3 4" opacity="0.55" />
        <circle cx={DIAMOND_X} cy={DIAMOND_Y} r={110} fill="none" stroke="#f472b6" strokeWidth="0.5" strokeDasharray="2 5" opacity="0.45" />
        <circle cx={DIAMOND_X} cy={DIAMOND_Y} r={148} fill="none" stroke="#fde047" strokeWidth="0.4" strokeDasharray="1 6" opacity="0.32" />

        {/* Chromatic Dispersion Diffraction Prismatic Envelope (Horizontal) */}
        <polygon
          points={`${DIAMOND_X - 380},${DIAMOND_Y} ${DIAMOND_X},${DIAMOND_Y - 9} ${DIAMOND_X + 380},${DIAMOND_Y} ${DIAMOND_X},${DIAMOND_Y + 9}`}
          fill="url(#prismaticSpike)"
          opacity="0.8"
          style={{ mixBlendMode: 'screen' }}
        />
        {/* Chromatic Dispersion Diffraction Prismatic Envelope (Vertical) */}
        <polygon
          points={`${DIAMOND_X},${DIAMOND_Y - 280} ${DIAMOND_X + 9},${DIAMOND_Y} ${DIAMOND_X},${DIAMOND_Y + 280} ${DIAMOND_X - 9},${DIAMOND_Y}`}
          fill="url(#prismaticSpikeVertical)"
          opacity="0.8"
          style={{ mixBlendMode: 'screen' }}
        />

        {/* Horizontal Specular Spike (Luminous White Needle Core) */}
        <polygon
          points={`${DIAMOND_X - 360},${DIAMOND_Y} ${DIAMOND_X},${DIAMOND_Y - 4.5} ${DIAMOND_X + 360},${DIAMOND_Y} ${DIAMOND_X},${DIAMOND_Y + 4.5}`}
          fill="#ffffff"
          opacity="0.98"
          style={{ mixBlendMode: 'screen' }}
        />

        {/* Vertical Specular Spike (Luminous White Needle Core) */}
        <polygon
          points={`${DIAMOND_X},${DIAMOND_Y - 260} ${DIAMOND_X + 4.5},${DIAMOND_Y} ${DIAMOND_X},${DIAMOND_Y + 260} ${DIAMOND_X - 4.5},${DIAMOND_Y}`}
          fill="#ffffff"
          opacity="0.98"
          style={{ mixBlendMode: 'screen' }}
        />

        {/* 45° Diagonal Secondary Spikes */}
        <polygon
          points={`${DIAMOND_X - 180},${DIAMOND_Y - 180} ${DIAMOND_X + 2.8},${DIAMOND_Y - 2.8} ${DIAMOND_X + 180},${DIAMOND_Y + 180} ${DIAMOND_X - 2.8},${DIAMOND_Y + 2.8}`}
          fill="#fef08a"
          opacity="0.88"
          style={{ mixBlendMode: 'screen' }}
        />
        <polygon
          points={`${DIAMOND_X - 180},${DIAMOND_Y + 180} ${DIAMOND_X - 2.8},${DIAMOND_Y - 2.8} ${DIAMOND_X + 180},${DIAMOND_Y - 180} ${DIAMOND_X + 2.8},${DIAMOND_Y + 2.8}`}
          fill="#fef08a"
          opacity="0.88"
          style={{ mixBlendMode: 'screen' }}
        />

        {/* Additional 22.5° & 67.5° Micro-Faceted Glint Spikes */}
        <polygon
          points={`${DIAMOND_X - 90},${DIAMOND_Y - 40} ${DIAMOND_X + 1.5},${DIAMOND_Y - 1.5} ${DIAMOND_X + 90},${DIAMOND_Y + 40} ${DIAMOND_X - 1.5},${DIAMOND_Y + 1.5}`}
          fill="#bae6fd"
          opacity="0.75"
          style={{ mixBlendMode: 'screen' }}
        />
        <polygon
          points={`${DIAMOND_X - 40},${DIAMOND_Y - 90} ${DIAMOND_X + 1.5},${DIAMOND_Y - 1.5} ${DIAMOND_X + 40},${DIAMOND_Y + 90} ${DIAMOND_X - 1.5},${DIAMOND_Y + 1.5}`}
          fill="#bae6fd"
          opacity="0.75"
          style={{ mixBlendMode: 'screen' }}
        />

        {/* Radial Micro-Diffraction Star Flare Needles */}
        {[15, 30, 60, 75, 105, 120, 150, 165].map((deg, idx) => {
          const rRad = (deg * Math.PI) / 180;
          const len = 48 + (idx % 3) * 16;
          return (
            <line
              key={`micro-needle-${idx}`}
              x1={DIAMOND_X - Math.cos(rRad) * len}
              y1={DIAMOND_Y - Math.sin(rRad) * len}
              x2={DIAMOND_X + Math.cos(rRad) * len}
              y2={DIAMOND_Y + Math.sin(rRad) * len}
              stroke="#ffffff"
              strokeWidth="0.7"
              opacity="0.65"
              style={{ mixBlendMode: 'screen' }}
            />
          );
        })}

        {/* Baily's Beads (Photospheric Sunlight Glistening through Lunar Valleys) */}
        {BAILYS_BEADS.map((bead, idx) => (
          <g key={`bb-${idx}`}>
            {/* Soft Ambient Bead Glow */}
            <circle
              cx={bead.x}
              cy={bead.y}
              r={bead.r * 2.6}
              fill="url(#diamondRingCore)"
              opacity="0.8"
              style={{ mixBlendMode: 'screen' }}
            />
            {/* Luminous Bead Body */}
            <circle
              cx={bead.x}
              cy={bead.y}
              r={bead.r}
              fill={bead.color}
              opacity="0.95"
            />
            {/* Incandescent Pure White Core */}
            <circle
              cx={bead.x}
              cy={bead.y}
              r={bead.r * 0.45}
              fill="#ffffff"
            />
            {/* Specular Micro-Diffraction Glint Cross */}
            {bead.glint >= 12 && (
              <>
                <line
                  x1={bead.x - bead.glint}
                  y1={bead.y}
                  x2={bead.x + bead.glint}
                  y2={bead.y}
                  stroke="#ffffff"
                  strokeWidth="0.85"
                  opacity="0.85"
                  style={{ mixBlendMode: 'screen' }}
                />
                <line
                  x1={bead.x}
                  y1={bead.y - bead.glint}
                  x2={bead.x}
                  y2={bead.y + bead.glint}
                  stroke="#ffffff"
                  strokeWidth="0.85"
                  opacity="0.85"
                  style={{ mixBlendMode: 'screen' }}
                />
              </>
            )}
          </g>
        ))}

        {/* Photospheric Emergence Arc Sliver along Lunar Limb */}
        <path
          d={`M ${DIAMOND_X - 18 * Math.sin(DIAMOND_ANGLE)},${DIAMOND_Y + 18 * Math.cos(DIAMOND_ANGLE)} 
             Q ${DIAMOND_X + 2.5 * Math.cos(DIAMOND_ANGLE)},${DIAMOND_Y + 2.5 * Math.sin(DIAMOND_ANGLE)} 
               ${DIAMOND_X + 18 * Math.sin(DIAMOND_ANGLE)},${DIAMOND_Y - 18 * Math.cos(DIAMOND_ANGLE)}`}
          fill="none"
          stroke="#ffffff"
          strokeWidth="3.2"
          opacity="0.98"
          strokeLinecap="round"
        />

        {/* Radiant Incandescent Diamond Ring Core & Photospheric Flash */}
        <circle cx={DIAMOND_X} cy={DIAMOND_Y} r={36} fill="url(#diamondPhotosphereSliver)" opacity="0.95" style={{ mixBlendMode: 'screen' }} />
        <circle cx={DIAMOND_X} cy={DIAMOND_Y} r={18} fill="#ffffff" />
        <circle cx={DIAMOND_X} cy={DIAMOND_Y} r={9} fill="#ffffff" />
        <circle cx={DIAMOND_X} cy={DIAMOND_Y} r={4} fill="#ffffff" />
      </g>

      {/* ========================================================
          SACRED GEOMETRIC ECLIPSE HALOS
          ======================================================== */}
      {/* Hexagram / Star of Astrometry in Golden Hairline */}
      <g id="sacred-eclipse-geometry" stroke="#facc15" strokeWidth="0.9" opacity="0.45" fill="none">
        <polygon
          points={`
            ${CX},${CY - 340} 
            ${CX + 294.4},${CY + 170} 
            ${CX - 294.4},${CY + 170}
          `}
        />
        <polygon
          points={`
            ${CX},${CY + 340} 
            ${CX + 294.4},${CY - 170} 
            ${CX - 294.4},${CY - 170}
          `}
        />
        {/* Surrounding Golden Octagram Ring */}
        <circle cx={CX} cy={CY} r={340} stroke="#fde047" strokeWidth="1.2" strokeDasharray="6 6" />
      </g>
    </g>
  );
}

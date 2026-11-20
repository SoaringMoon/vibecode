/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Generate 60 deterministic foreground illuminated dust motes
function generateDustMotes() {
  const motes = [];
  let seed = 91823;
  const lcg = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };

  for (let i = 0; i < 60; i++) {
    const x = Math.round(lcg() * 2100 + 150);
    const y = Math.round(lcg() * 450 + 2700);
    const r = 0.8 + lcg() * 1.8;
    const opacity = 0.35 + lcg() * 0.55;
    motes.push({ x, y, r, opacity });
  }
  return motes;
}

const DUST_MOTES = generateDustMotes();

export default function Layer5_ForegroundSanctuary() {
  return (
    <g id="layer5-foreground-sanctuary" shapeRendering="geometricPrecision">
      {/* ========================================================
          FOREGROUND BASALT PLATFORM & GEOMETRIC TERRACES
          ======================================================== */}
      {/* Lower Platform Fill */}
      <polygon
        points="0,2920 620,2880 1780,2880 2400,2920 2400,3200 0,3200"
        fill="#07080e"
      />

      {/* Flagstone Masonry Joints in Perspective with Staggered Ashlar Coursing */}
      {[2920, 2980, 3050, 3130].map((y, idx) => (
        <g key={`flag-course-${idx}`}>
          <line
            x1="0"
            y1={y}
            x2="2400"
            y2={y}
            stroke="#161a29"
            strokeWidth="2.0"
          />
          {/* Subtle Sunlit Flagstone Lip Chamfer */}
          <line
            x1="0"
            y1={y - 1}
            x2="2400"
            y2={y - 1}
            stroke="#262c44"
            strokeWidth="0.8"
            opacity="0.65"
          />
        </g>
      ))}

      {/* Radial Perspective Joint Rays */}
      {[240, 560, 920, 1480, 1840, 2160].map((xBase, idx) => {
        const xTop = 1200 + (xBase - 1200) * 0.45;
        return (
          <line
            key={`flag-v-${idx}`}
            x1={xTop}
            y1={2880}
            x2={xBase}
            y2={3200}
            stroke="#131622"
            strokeWidth="1.6"
          />
        );
      })}

      {/* Staggered Intermediate Ashlar Stone Joint Segments */}
      {[
        { x: 380, y1: 2920, y2: 2980 },
        { x: 740, y1: 2920, y2: 2980 },
        { x: 1660, y1: 2920, y2: 2980 },
        { x: 2020, y1: 2920, y2: 2980 },
        { x: 420, y1: 2980, y2: 3050 },
        { x: 800, y1: 2980, y2: 3050 },
        { x: 1600, y1: 2980, y2: 3050 },
        { x: 1980, y1: 2980, y2: 3050 },
        { x: 460, y1: 3050, y2: 3130 },
        { x: 860, y1: 3050, y2: 3130 },
        { x: 1540, y1: 3050, y2: 3130 },
        { x: 1940, y1: 3050, y2: 3130 },
      ].map((seg, idx) => (
        <line
          key={`flag-ashlar-${idx}`}
          x1={seg.x}
          y1={seg.y1}
          x2={seg.x + (seg.x > 1200 ? 12 : -12)}
          y2={seg.y2}
          stroke="#131622"
          strokeWidth="1.2"
          opacity="0.85"
        />
      ))}

      {/* ========================================================
          INLAID BRONZE COMPASS ROSE MEDALLION (CENTER TERRACE)
          ======================================================== */}
      <g id="compass-rose-medallion" transform="translate(1200, 2935) scale(0.48)">
        {/* Outer Inlaid Bronze Ring */}
        <circle cx="0" cy="0" r="110" fill="none" stroke="#78350f" strokeWidth="6" />
        <circle cx="0" cy="0" r="113" fill="none" stroke="#fde047" strokeWidth="1.5" />
        <circle cx="0" cy="0" r="107" fill="none" stroke="#ca8a04" strokeWidth="1.2" strokeDasharray="4 4" />
        <circle cx="0" cy="0" r="70" fill="url(#compassBronze)" opacity="0.85" />
        <circle cx="0" cy="0" r="70" fill="none" stroke="#fef08a" strokeWidth="1.2" />

        {/* Compass Dial Degree Divisions (36 Astrolabe Ray Marks) */}
        {Array.from({ length: 36 }).map((_, i) => {
          const ang = (i * 10 * Math.PI) / 180;
          const r1 = 104;
          const r2 = i % 9 === 0 ? 92 : i % 3 === 0 ? 96 : 99;
          return (
            <line
              key={`cmp-tick-${i}`}
              x1={Math.sin(ang) * r1}
              y1={-Math.cos(ang) * r1}
              x2={Math.sin(ang) * r2}
              y2={-Math.cos(ang) * r2}
              stroke="#fde047"
              strokeWidth={i % 9 === 0 ? '1.5' : '0.8'}
              opacity={i % 9 === 0 ? 0.95 : 0.6}
            />
          );
        })}

        {/* 16-Point Compass Star Points */}
        {/* Major North-South-East-West Points */}
        <polygon points="0,-95 12,0 0,95 -12,0" fill="url(#goldFoil)" />
        <polygon points="-95,0 0,12 95,0 0,-12" fill="url(#goldFoil)" />
        {/* Ordinal Points (NE, NW, SE, SW) */}
        <polygon points="-65,-65 6,-6 65,65 -6,6" fill="#eab308" opacity="0.9" />
        <polygon points="65,-65 6,6 -65,65 -6,-6" fill="#ca8a04" opacity="0.9" />
        {/* Cardinal Letter Inscriptions */}
        <text x="0" y="-74" textAnchor="middle" fill="#ffffff" fontSize="14" fontFamily="'Cinzel', Georgia, serif" fontWeight="700">N</text>
        <text x="0" y="86" textAnchor="middle" fill="#fde047" fontSize="14" fontFamily="'Cinzel', Georgia, serif" fontWeight="700">S</text>
        <text x="80" y="5" textAnchor="middle" fill="#fde047" fontSize="14" fontFamily="'Cinzel', Georgia, serif" fontWeight="700">E</text>
        <text x="-80" y="5" textAnchor="middle" fill="#fde047" fontSize="14" fontFamily="'Cinzel', Georgia, serif" fontWeight="700">W</text>
        {/* Inner Intaglio Concentric Dial Rings */}
        <circle cx="0" cy="0" r="46" fill="none" stroke="#ca8a04" strokeWidth="0.9" opacity="0.75" />
        <circle cx="0" cy="0" r="32" fill="none" stroke="#fde047" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.65" />
        {/* Central Inlaid Navel Orb */}
        <circle cx="0" cy="0" r="16" fill="#0c0d16" stroke="#fde047" strokeWidth="1.5" />
        <circle cx="0" cy="0" r="7" fill="url(#goldFoil)" />
        <circle cx="0" cy="0" r="2.5" fill="#ffffff" />
      </g>

      {/* Left Promontory Ledge Overlook */}
      <polygon
        points="0,2850 480,2840 760,2870 780,2960 0,2990"
        fill="url(#monolithBasalt)"
      />
      {/* Ledge Sunlit Edge */}
      <path
        d="M 0,2850 L 480,2840 L 760,2870 L 780,2960"
        fill="none"
        stroke="#fde047"
        strokeWidth="2.2"
        opacity="0.85"
      />

      {/* Right Stepped Overlook Terrace */}
      <polygon
        points="2400,2850 1920,2840 1640,2870 1620,2960 2400,2990"
        fill="url(#monolithBasalt)"
      />
      {/* Right Ledge Sunlit Edge */}
      <path
        d="M 2400,2850 L 1920,2840 L 1640,2870 L 1620,2960"
        fill="none"
        stroke="#fde047"
        strokeWidth="2.2"
        opacity="0.85"
      />

      {/* ========================================================
          THE SOLITARY ASTRONOMER (LEFT PROMONTORY)
          ======================================================== */}
      <g id="solitary-astronomer" transform="translate(620, 2710)">
        {/* Shadow cast on the stone projecting forward-left */}
        <ellipse cx="-16" cy="162" rx="42" ry="7" fill="#020306" opacity="0.88" />

        {/* Long Robed Silhouette */}
        {/* Flowing Mantle / Cloak */}
        <path
          d="M 0,42 
             C -8,55 -18,85 -24,125 
             C -28,145 -34,158 -28,162 
             C -20,165 4,162 14,162 
             C 24,162 38,164 42,158 
             C 44,152 38,125 32,85 
             C 26,55 18,45 0,42 
             Z"
          fill="#06070e"
        />

        {/* Classical Sculptural Mantle Drapery Folds */}
        <path d="M -8,75 Q -14,110 -16,145" fill="none" stroke="#0e1022" strokeWidth="2.2" opacity="0.85" />
        <path d="M 6,75 Q 14,110 20,145" fill="none" stroke="#0e1022" strokeWidth="2.2" opacity="0.85" />
        <path d="M -2,65 Q 0,105 2,152" fill="none" stroke="#020306" strokeWidth="2.4" opacity="0.9" />
        <path d="M -8,75 Q -14,110 -16,145" fill="none" stroke="#fde047" strokeWidth="0.8" opacity="0.3" />
        <path d="M 6,75 Q 14,110 20,145" fill="none" stroke="#f59e0b" strokeWidth="0.8" opacity="0.3" />

        {/* Cloak Golden Rim Light Edge */}
        {/* Left/Back Rim facing Ambient Desert */}
        <path
          d="M 0,42 C -8,55 -18,85 -24,125 C -28,145 -34,158 -28,162"
          fill="none"
          stroke="#f59e0b"
          strokeWidth="1.2"
          opacity="0.75"
        />
        {/* Right/Front Rim facing the Direct Eclipse Core */}
        <path
          d="M 0,42 C 18,45 26,55 32,85 C 38,125 44,152 42,158"
          fill="none"
          stroke="#fef08a"
          strokeWidth="2.0"
          opacity="0.95"
          style={{ mixBlendMode: 'screen' }}
        />

        {/* Girdle Astrolabe Sighting Pendant at Waist */}
        <g transform="translate(14, 98)">
          <circle cx="0" cy="0" r="7" fill="#080914" stroke="#facc15" strokeWidth="1.2" />
          <circle cx="0" cy="0" r="4.5" fill="none" stroke="#eab308" strokeWidth="0.8" strokeDasharray="1 2" />
          <line x1="-5" y1="0" x2="5" y2="0" stroke="#fde047" strokeWidth="0.8" />
          <line x1="0" y1="-5" x2="0" y2="5" stroke="#fde047" strokeWidth="0.8" />
          <circle cx="0" cy="-8.5" r="1.8" fill="none" stroke="#fde047" strokeWidth="0.9" />
        </g>

        {/* Cowl / Hooded Head Profile facing toward the Eclipse */}
        <path
          d="M 0,16 
             C -10,16 -14,24 -14,32 
             C -14,40 -6,44 0,44 
             C 8,44 14,40 16,30 
             C 17,22 10,16 0,16 
             Z"
          fill="#070810"
        />
        <circle cx="2" cy="24" r="3" fill="#fde047" opacity="0.6" />

        {/* Extended Left Arm holding the Armillary Staff */}
        <path
          d="M 12,50 Q 28,65 38,72"
          fill="none"
          stroke="#070810"
          strokeWidth="7"
          strokeLinecap="round"
        />

        {/* Astronomer's Hand Clasping the Staff */}
        <ellipse cx="38" cy="71" rx="4.5" ry="3.5" fill="#ca8a04" />
        <path d="M 35,68 Q 38,66 42,68" fill="none" stroke="#fef08a" strokeWidth="1.0" />
        <path d="M 35,71 Q 38,69 42,71" fill="none" stroke="#fef08a" strokeWidth="1.0" />
        <path d="M 35,74 Q 38,72 42,74" fill="none" stroke="#fef08a" strokeWidth="1.0" />

        {/* THE CELESTIAL ARMILLARY STAFF */}
        {/* Slender Golden Shaft */}
        <line
          x1="38"
          y1="-30"
          x2="38"
          y2="162"
          stroke="#facc15"
          strokeWidth="2.8"
        />
        <line
          x1="39"
          y1="-30"
          x2="39"
          y2="162"
          stroke="#ffffff"
          strokeWidth="0.8"
          opacity="0.85"
        />

        {/* Armillary Rings at the Crown of Staff */}
        <circle
          cx="38"
          cy="-30"
          r="26"
          fill="none"
          stroke="#fde047"
          strokeWidth="1.8"
        />
        <circle
          cx="38"
          cy="-30"
          r="23"
          fill="none"
          stroke="#ca8a04"
          strokeWidth="0.8"
          strokeDasharray="2 3"
          opacity="0.7"
        />
        <ellipse
          cx="38"
          cy="-30"
          rx="26"
          ry="9"
          fill="none"
          stroke="#facc15"
          strokeWidth="1.4"
          transform="rotate(30 38 -30)"
        />
        <ellipse
          cx="38"
          cy="-30"
          rx="26"
          ry="9"
          fill="none"
          stroke="#facc15"
          strokeWidth="1.4"
          transform="rotate(-40 38 -30)"
        />
        {/* Gimbal Ring Pivot Rivet Studs */}
        <circle cx="12" cy="-30" r="1.8" fill="#fef08a" stroke="#ca8a04" strokeWidth="0.5" />
        <circle cx="64" cy="-30" r="1.8" fill="#fef08a" stroke="#ca8a04" strokeWidth="0.5" />
        {/* Planetary Beads on the Armillary Ring */}
        <circle cx="58" cy="-22" r="2.8" fill="#fef08a" />
        <circle cx="18" cy="-38" r="2.2" fill="#38bdf8" />
        {/* Luminous Core Orb at Staff Apex */}
        <circle cx="38" cy="-30" r="14" fill="url(#diamondRingCore)" style={{ mixBlendMode: 'screen' }} />
        <circle cx="38" cy="-30" r="5" fill="#ffffff" />
        {/* Prismatic Crystal Tip at Apex of Staff */}
        <polygon points="38,-44 41,-34 38,-30 35,-34" fill="#ffffff" opacity="0.95" />
        <line x1="38" y1="-50" x2="38" y2="-24" stroke="#fef08a" strokeWidth="0.8" opacity="0.75" />
      </g>

      {/* ========================================================
          ASTRONOMER'S READING PLINTH & STAR CHART SCROLL
          ======================================================== */}
      <g id="astronomer-reading-plinth" transform="translate(520, 2835)">
        {/* Basalt Pedestal Block */}
        <polygon points="-48,0 48,0 40,35 -40,35" fill="url(#monolithBasalt)" />
        <line x1="-48" y1="0" x2="48" y2="0" stroke="#fde047" strokeWidth="1.6" opacity="0.85" />
        {/* Unrolled Antique Parchment Scroll with Curled Edge Cylinders */}
        <polygon points="-46,-14 46,-14 42,0 -42,0" fill="url(#parchmentAntique)" />
        <ellipse cx="-44" cy="-7" rx="3.5" ry="7" fill="url(#vellumPaper)" stroke="#ca8a04" strokeWidth="0.6" />
        <ellipse cx="44" cy="-7" rx="3.5" ry="7" fill="url(#vellumPaper)" stroke="#ca8a04" strokeWidth="0.6" />
        {/* Geometric Eclipse Transit Ray Cone Inscribed on Scroll */}
        <polygon points="-32,-11 -32,-3 0,-7" fill="#ca8a04" opacity="0.25" />
        <line x1="-32" y1="-11" x2="0" y2="-7" stroke="#991b1b" strokeWidth="0.8" />
        <line x1="-32" y1="-3" x2="0" y2="-7" stroke="#991b1b" strokeWidth="0.8" />
        <line x1="0" y1="-7" x2="32" y2="-11" stroke="#ca8a04" strokeWidth="0.6" strokeDasharray="2 2" />
        <line x1="0" y1="-7" x2="32" y2="-3" stroke="#ca8a04" strokeWidth="0.6" strokeDasharray="2 2" />
        <circle cx="0" cy="-7" r="2.2" fill="#090a14" stroke="#fde047" strokeWidth="0.7" />
        {/* Latin Ephemeris Inscribed Manuscript Script Lines */}
        <line x1="8" y1="-10" x2="30" y2="-10" stroke="#78350f" strokeWidth="0.6" strokeDasharray="3 1 2 1" opacity="0.55" />
        <line x1="8" y1="-7" x2="34" y2="-7" stroke="#78350f" strokeWidth="0.6" strokeDasharray="2 1 3 1" opacity="0.55" />
        <line x1="8" y1="-4" x2="26" y2="-4" stroke="#78350f" strokeWidth="0.6" strokeDasharray="1 1 2 1" opacity="0.55" />
        {/* Brass Scroll Paperweights at Both Flanks */}
        <circle cx="-42" cy="-7" r="3.2" fill="url(#goldFoil)" />
        <circle cx="42" cy="-7" r="3.2" fill="url(#goldFoil)" />
        {/* Antique Brass Celestial Quadrant Mounted on Plinth */}
        <path d="M -20,-12 L -20,-32 A 20,20 0 0,1 0,-12 Z" fill="none" stroke="#facc15" strokeWidth="1.2" />
        <line x1="-20" y1="-32" x2="-20" y2="-12" stroke="#fef08a" strokeWidth="1.4" />
        <line x1="-20" y1="-12" x2="0" y2="-12" stroke="#fef08a" strokeWidth="1.4" />
        <line x1="-20" y1="-12" x2="-6" y2="-26" stroke="#ca8a04" strokeWidth="0.9" />
        {/* Quadrant Degree Arc Calibrations */}
        {[-30, -45, -60].map((deg, idx) => (
          <line
            key={`quad-tick-${idx}`}
            x1={-20 + Math.cos((deg * Math.PI) / 180) * 18}
            y1={-12 + Math.sin((deg * Math.PI) / 180) * 18}
            x2={-20 + Math.cos((deg * Math.PI) / 180) * 20}
            y2={-12 + Math.sin((deg * Math.PI) / 180) * 20}
            stroke="#fef08a"
            strokeWidth="0.8"
          />
        ))}
        {/* Sighting Plumb-Line & Teardrop Lead Bob */}
        <line x1="-20" y1="-32" x2="-20" y2="-7" stroke="#ca8a04" strokeWidth="0.7" />
        <circle cx="-20" cy="-6" r="1.4" fill="#fde047" stroke="#ca8a04" strokeWidth="0.5" />
        <polygon points="-21,-6 -19,-6 -20,-3" fill="#fde047" />
      </g>

      {/* ========================================================
          ASTRONOMICAL ARMILLARY TRIPOD STAND (BESIDE OBSERVER)
          ======================================================== */}
      <g id="astrolabe-tripod" transform="translate(740, 2830)">
        {/* Shadow */}
        <ellipse cx="0" cy="65" rx="28" ry="6" fill="#020306" opacity="0.85" />
        {/* Tripod Stone Pedestal Legs */}
        <line x1="0" y1="20" x2="-22" y2="65" stroke="#facc15" strokeWidth="2.2" />
        <line x1="0" y1="20" x2="22" y2="65" stroke="#facc15" strokeWidth="2.2" />
        <line x1="0" y1="20" x2="0" y2="65" stroke="#ca8a04" strokeWidth="2.0" />
        {/* Tripod Head Mount */}
        <rect x="-14" y="16" width="28" height="6" fill="url(#goldFoil)" rx="2" />
        {/* Brass Armillary Sphere on Plinth */}
        <circle cx="0" cy="0" r="20" fill="none" stroke="#fde047" strokeWidth="1.6" />
        <ellipse cx="0" cy="0" rx="20" ry="7" fill="none" stroke="#facc15" strokeWidth="1.2" transform="rotate(25)" />
        <ellipse cx="0" cy="0" rx="20" ry="7" fill="none" stroke="#facc15" strokeWidth="1.2" transform="rotate(-35)" />
        <circle cx="0" cy="0" r="4" fill="#ffffff" />
      </g>

      {/* ========================================================
          THE GREAT GNOMON OBELISK (RIGHT PLATFORM)
          ======================================================== */}
      <g id="gnomon-obelisk" transform="translate(1740, 2750)">
        {/* Long Shadow: Soft Penumbra Gradient Flare (Projecting Forward-Right) */}
        <polygon
          points="-24,140 24,140 190,460 30,460"
          fill="url(#obeliskPenumbra)"
        />
        {/* Deep Umbra Shadow Core */}
        <polygon
          points="-16,140 16,140 155,450 60,450"
          fill="#010204"
          opacity="0.92"
        />

        {/* Stepped Pedestal Base */}
        <polygon points="-40,140 40,140 48,155 -48,155" fill="url(#monolithBasalt)" />
        <line x1="-40" y1="140" x2="40" y2="140" stroke="#fde047" strokeWidth="2" opacity="0.8" />

        {/* Main Obelisk Shaft */}
        {/* Sunlit Left Face */}
        <polygon
          points="0,-160 -18,140 0,140"
          fill="#1c1f2e"
        />
        <line x1="0" y1="-160" x2="-18" y2="140" stroke="#fde047" strokeWidth="2.2" opacity="0.9" />

        {/* Shadowed Right Face */}
        <polygon
          points="0,-160 0,140 18,140"
          fill="#0c0d14"
        />

        {/* Center Ridge Line */}
        <line x1="0" y1="-160" x2="0" y2="140" stroke="#94a3b8" strokeWidth="1.2" opacity="0.8" />

        {/* Golden Pyramidion Capstone */}
        <polygon
          points="0,-190 -12,-160 0,-160"
          fill="url(#goldFoil)"
        />
        <polygon
          points="0,-190 0,-160 12,-160"
          fill="#ca8a04"
        />
        {/* Specular Glint at Apex */}
        <circle cx="0" cy="-190" r="4" fill="#ffffff" />

        {/* Inscribed Astrometry Calibrations on Face */}
        {[-120, -90, -60, -30, 0, 30, 60, 90, 120].map((y, idx) => (
          <line
            key={`obelisk-cal-${idx}`}
            x1="-8"
            y1={y}
            x2="0"
            y2={y}
            stroke="#facc15"
            strokeWidth="1.0"
            opacity="0.75"
          />
        ))}
      </g>

      {/* ========================================================
          CRYSTALLINE MINERAL VEINS & SPECULAR ACCENTS
          ======================================================== */}
      {/* Crystal Cluster 1 (Left Ledge) */}
      <g id="crystals-left" transform="translate(420, 2835)">
        <polygon points="-8,0 0,-24 8,0" fill="#fef08a" opacity="0.9" />
        <polygon points="6,0 12,-18 18,0" fill="#facc15" opacity="0.8" />
        <polygon points="-16,0 -10,-15 -4,0" fill="#fde047" opacity="0.8" />
        <circle cx="0" cy="-24" r="3" fill="#ffffff" />
      </g>

      {/* Crystal Cluster 2 (Right Ledge) */}
      <g id="crystals-right" transform="translate(1980, 2835)">
        <polygon points="-8,0 0,-28 8,0" fill="#fef08a" opacity="0.9" />
        <polygon points="5,0 14,-20 20,0" fill="#facc15" opacity="0.8" />
        <circle cx="0" cy="-28" r="3" fill="#ffffff" />
      </g>

      {/* ========================================================
          SUSPENDED GOLDEN ATMOSPHERIC DUST MOTES
          ======================================================== */}
      {DUST_MOTES.map((mote, idx) => (
        <circle
          key={`mote-${idx}`}
          cx={mote.x}
          cy={mote.y}
          r={mote.r}
          fill="#fef08a"
          opacity={mote.opacity}
          style={{ mixBlendMode: 'screen' }}
        />
      ))}
    </g>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export default function Layer0_Background() {
  return (
    <g id="layer0-background">
      {/* Absolute Master Sky Rect */}
      <rect
        x="0"
        y="0"
        width="2400"
        height="3200"
        fill="url(#skyZenithGrad)"
        shapeRendering="geometricPrecision"
      />

      {/* ========================================================
          THE GREAT MILKY WAY GALACTIC CORE & DUST ARCH
          ======================================================== */}
      {/* Sweeping Luminous Galactic Belt */}
      <path
        d="M -120,-60 
           C 250,80 580,240 840,480 
           C 1120,740 1480,1100 1740,1480 
           C 1980,1820 2240,2100 2520,2280 
           L 2420,2440 
           C 2140,2240 1860,1920 1620,1580 
           C 1340,1180 980,820 720,540 
           C 440,260 120,60 -180,60 
           Z"
        fill="url(#milkyWayBand)"
        opacity="0.82"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Galactic Core Secondary Stellar Cloud */}
      <path
        d="M 60,120 
           C 380,260 720,520 980,820 
           C 1220,1120 1520,1460 1780,1780 
           L 1640,1880 
           C 1380,1540 1080,1200 840,900 
           C 580,580 260,340 -40,180 
           Z"
        fill="url(#nebulaViolet)"
        opacity="0.55"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Interstellar Great Rift Dust Lanes (Dark Absorption Béziers) */}
      <path
        d="M 180,140 
           Q 460,320 720,580 
           Q 960,820 1240,1140 
           Q 1460,1420 1720,1720 
           L 1680,1740 
           Q 1420,1440 1200,1160 
           Q 920,840 680,600 
           Q 420,340 140,160 
           Z"
        fill="#04050d"
        opacity="0.6"
      />
      <path
        d="M 420,380 
           Q 620,560 840,780 
           Q 1040,1020 1340,1320 
           L 1300,1350 
           Q 1000,1050 800,810 
           Q 580,590 380,410 
           Z"
        fill="#03040a"
        opacity="0.5"
      />

      {/* Primary Cosmic Emission Nebulae (Volumetric Vector Clouds) */}
      {/* 1. Deep Violet / Lapis Void Nebula (Upper Left to Zenith) */}
      <path
        d="M -100,200 
           C 400,100 800,250 1100,150 
           C 1400,50 1700,200 1900,100 
           C 2100,0 2300,150 2500,80 
           L 2500,900 
           C 2200,950 1900,850 1600,1000 
           C 1300,1150 900,900 600,1100 
           C 300,1300 0,950 -100,1050 
           Z"
        fill="url(#nebulaViolet)"
        opacity="0.88"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* 2. Cyan / Aquamarine Interstellar Filament */}
      <path
        d="M 1200,-50 
           C 1500,100 1850,50 2100,220 
           C 2350,390 2450,700 2450,1100 
           C 2250,1250 1950,1050 1700,1200 
           C 1450,1350 1350,950 1100,850 
           C 850,750 950,200 1200,-50 
           Z"
        fill="url(#nebulaCyan)"
        opacity="0.82"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* 3. Deep Crimson / Magenta Solar Halo Filament */}
      <path
        d="M 300,700 
           C 650,600 1000,800 1200,750 
           C 1400,700 1750,850 2000,780 
           C 2250,710 2400,950 2450,1250 
           C 2250,1450 1900,1350 1650,1500 
           C 1400,1650 1000,1550 750,1650 
           C 500,1750 200,1500 -50,1600 
           L -50,1000 
           C 100,850 150,750 300,700 
           Z"
        fill="url(#nebulaCrimson)"
        opacity="0.78"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Secondary Soft Nebula Accents */}
      <ellipse
        cx="720"
        cy="920"
        rx="680"
        ry="380"
        fill="url(#nebulaViolet)"
        opacity="0.72"
        transform="rotate(-15 720 920)"
        style={{ mixBlendMode: 'screen' }}
      />

      <ellipse
        cx="1680"
        cy="780"
        rx="580"
        ry="320"
        fill="url(#nebulaCyan)"
        opacity="0.62"
        transform="rotate(22 1680 780)"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* ========================================================
          DEEP SKY OBJECTS: ANDROMEDA, ORION & PLEIADES
          ======================================================== */}
      {/* The Great Andromeda Galaxy (M31) Complex */}
      <g id="andromeda-galaxy" transform="translate(1860, 460) rotate(34)">
        {/* Outer Galactic Disc Halo */}
        <ellipse cx="0" cy="0" rx="145" ry="48" fill="url(#andromedaCore)" opacity="0.6" style={{ mixBlendMode: 'screen' }} />
        {/* Mid Disc */}
        <ellipse cx="0" cy="0" rx="92" ry="29" fill="url(#andromedaCore)" opacity="0.8" style={{ mixBlendMode: 'screen' }} />
        {/* Dense Spiral Core */}
        <ellipse cx="0" cy="0" rx="42" ry="14" fill="#ffffff" opacity="0.95" />
        <ellipse cx="0" cy="0" rx="16" ry="6" fill="#fef08a" opacity="1" />
        {/* Interstellar Dust Lane Splines */}
        <path d="M -90,-6 Q 0,-18 90,-6" fill="none" stroke="#050713" strokeWidth="2.5" opacity="0.5" />
        <path d="M -75,8 Q 0,-2 75,8" fill="none" stroke="#050713" strokeWidth="2" opacity="0.45" />
        {/* Satellite Galaxy M32 (Compact Elliptical) */}
        <circle cx="28" cy="38" r="4.5" fill="#fef08a" opacity="0.85" />
        <circle cx="28" cy="38" r="2.0" fill="#ffffff" opacity="0.95" />
        {/* Satellite Galaxy M110 / NGC 205 (Dwarf Elliptical Companion) */}
        <ellipse cx="-48" cy="-36" rx="10" ry="6" fill="#cffafe" opacity="0.55" transform="rotate(-18 -48 -36)" style={{ mixBlendMode: 'screen' }} />
        <circle cx="-48" cy="-36" r="2.2" fill="#ffffff" opacity="0.85" />
      </g>

      {/* The Great Orion Nebula (M42) Complex */}
      <g id="orion-nebula-m42" transform="translate(540, 810)">
        {/* Faint Running Man Reflection Shroud (NGC 1977) */}
        <ellipse cx="10" cy="-55" rx="35" ry="24" fill="#38bdf8" opacity="0.25" style={{ mixBlendMode: 'screen' }} />
        {/* Main Orion Gas Shell */}
        <ellipse cx="0" cy="0" rx="88" ry="66" fill="url(#orionNebula)" opacity="0.75" style={{ mixBlendMode: 'screen' }} />
        <ellipse cx="10" cy="-12" rx="46" ry="36" fill="url(#orionNebula)" opacity="0.85" style={{ mixBlendMode: 'screen' }} />
        {/* Huygens Core Dark Absorption Gulf (Sinus Magnus) */}
        <path d="M -8,-15 Q 4,-4 16,-12" fill="none" stroke="#060914" strokeWidth="3" opacity="0.6" />
        {/* Trapezium Star Cluster (θ1 Orionis A, B, C, D) */}
        <circle cx="-3" cy="-4" r="2.4" fill="#ffffff" opacity="0.98" />
        <circle cx="4" cy="-2" r="2.1" fill="#bae6fd" opacity="0.95" />
        <circle cx="1" cy="4" r="1.9" fill="#ffffff" opacity="0.9" />
        <circle cx="-5" cy="3" r="1.7" fill="#fef08a" opacity="0.88" />
      </g>

      {/* The Pleiades Open Cluster (M45 · Seven Sisters) */}
      <g id="pleiades-cluster-m45" transform="translate(920, 290)">
        {/* Reflection Nebulosity Shroud */}
        <circle cx="0" cy="0" r="75" fill="url(#pleiadesNebula)" opacity="0.85" style={{ mixBlendMode: 'screen' }} />
        <ellipse cx="12" cy="-8" rx="48" ry="38" fill="url(#pleiadesNebula)" opacity="0.75" style={{ mixBlendMode: 'screen' }} />
        {/* Principal Stars */}
        {/* Alcyone (Eta Tauri) */}
        <circle cx="0" cy="0" r="3.2" fill="#ffffff" />
        <circle cx="0" cy="0" r="6.5" fill="none" stroke="#60a5fa" strokeWidth="0.8" opacity="0.8" />
        {/* Maia */}
        <circle cx="-16" cy="-18" r="2.6" fill="#cffafe" />
        {/* Electra */}
        <circle cx="-32" cy="-4" r="2.7" fill="#ffffff" />
        {/* Taygeta */}
        <circle cx="-28" cy="-26" r="2.2" fill="#bae6fd" />
        {/* Celaeno */}
        <circle cx="-36" cy="-18" r="1.8" fill="#e0e7ff" />
        {/* Sterope */}
        <circle cx="-20" cy="-34" r="1.7" fill="#cffafe" />
        {/* Merope */}
        <circle cx="-10" cy="18" r="2.5" fill="#bae6fd" />
        {/* Atlas */}
        <circle cx="28" cy="10" r="2.8" fill="#ffffff" />
        {/* Pleione */}
        <circle cx="30" cy="4" r="2.0" fill="#cffafe" />
      </g>

      {/* ========================================================
          ZODIACAL LIGHT PYRAMID (FALSE DAWN SCATTERING)
          ======================================================== */}
      {/* Organic Hyperbolic Parabolic Dust Cone */}
      <path
        d="M 420,2280 
           C 680,1860 960,1380 1200,1050 
           C 1440,1380 1720,1860 1980,2280 
           Z"
        fill="url(#zodiacalCone)"
        opacity="0.68"
        style={{ mixBlendMode: 'screen' }}
      />
      {/* Inner High-Density Zodiacal Core */}
      <path
        d="M 640,2280 
           C 840,1920 1040,1460 1200,1100 
           C 1360,1460 1560,1920 1760,2280 
           Z"
        fill="url(#zodiacalCone)"
        opacity="0.45"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Atmospheric Horizon Light Inversion Layers (Pre-Eclipse Solar Twilight Glow) */}
      <path
        d="M 0,1950 
           Q 600,1900 1200,1920 
           Q 1800,1940 2400,1890 
           L 2400,2400 
           L 0,2400 
           Z"
        fill="url(#horizonGlowGrad)"
        opacity="0.8"
        style={{ mixBlendMode: 'screen' }}
      />

      <path
        d="M 0,2080 
           Q 600,2050 1200,2070 
           Q 1800,2090 2400,2040 
           L 2400,2380 
           L 0,2380 
           Z"
        fill="url(#horizonGlowGrad)"
        opacity="0.35"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Luminous Stratum Dust Ribbon at Twilight Boundary */}
      <rect
        x="0"
        y="2180"
        width="2400"
        height="120"
        fill="url(#stratumGlow)"
        opacity="0.28"
        style={{ mixBlendMode: 'screen' }}
      />
    </g>
  );
}

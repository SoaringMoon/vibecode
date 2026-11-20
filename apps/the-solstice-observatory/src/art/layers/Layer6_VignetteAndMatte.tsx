/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export default function Layer6_VignetteAndMatte() {
  return (
    <g id="layer6-vignette-and-matte" shapeRendering="geometricPrecision" textRendering="geometricPrecision">
      {/* ========================================================
          OPTICAL PERIMETER VIGNETTE (FOCUSING EYE TO ECLIPSE)
          ======================================================== */}
      <rect
        x="0"
        y="0"
        width="2400"
        height="3200"
        fill="url(#vignetteEdge)"
        style={{ pointerEvents: 'none' }}
      />

      {/* ========================================================
          ARCHIVAL MUSEUM MATTE & DUAL HAIRLINE BORDERS
          ======================================================== */}
      {/* Outermost Perimeter Border */}
      <rect
        x="60"
        y="60"
        width="2280"
        height="3080"
        fill="none"
        stroke="#ca8a04"
        strokeWidth="2.2"
        opacity="0.85"
      />

      {/* Primary Hairline Border */}
      <rect
        x="80"
        y="80"
        width="2240"
        height="3040"
        fill="none"
        stroke="#fef08a"
        strokeWidth="1.0"
        opacity="0.9"
      />

      {/* Innermost Astronomical Tick Margin */}
      <rect
        x="100"
        y="100"
        width="2200"
        height="3000"
        fill="none"
        stroke="#eab308"
        strokeWidth="0.8"
        strokeDasharray="6 8"
        opacity="0.55"
      />

      {/* ========================================================
          CLASSICAL CORNER ORNAMENTATION & ASTROLABE QUADRANTS
          ======================================================== */}
      {/* Corner 1: Top-Left (80, 80) */}
      <g id="corner-top-left" transform="translate(80, 80)">
        <path d="M 0,80 L 0,0 L 80,0" fill="none" stroke="#facc15" strokeWidth="2.8" />
        <path d="M 0,60 A 60,60 0 0,0 60,0" fill="none" stroke="#fde047" strokeWidth="1.4" />
        <path d="M 0,40 A 40,40 0 0,0 40,0" fill="none" stroke="#ca8a04" strokeWidth="0.9" strokeDasharray="3 3" />
        <circle cx="28" cy="28" r="14" fill="none" stroke="#eab308" strokeWidth="1" />
        <polygon points="28,20 36,28 28,36 20,28" fill="#fef08a" opacity="0.9" />
        <line x1="-15" y1="0" x2="60" y2="0" stroke="#facc15" strokeWidth="0.8" />
        <line x1="0" y1="-15" x2="0" y2="60" stroke="#facc15" strokeWidth="0.8" />
      </g>

      {/* Corner 2: Top-Right (2320, 80) */}
      <g id="corner-top-right" transform="translate(2320, 80)">
        <path d="M 0,80 L 0,0 L -80,0" fill="none" stroke="#facc15" strokeWidth="2.8" />
        <path d="M 0,60 A 60,60 0 0,1 -60,0" fill="none" stroke="#fde047" strokeWidth="1.4" />
        <path d="M 0,40 A 40,40 0 0,1 -40,0" fill="none" stroke="#ca8a04" strokeWidth="0.9" strokeDasharray="3 3" />
        <circle cx="-28" cy="28" r="14" fill="none" stroke="#eab308" strokeWidth="1" />
        <polygon points="-28,20 -20,28 -28,36 -36,28" fill="#fef08a" opacity="0.9" />
        <line x1="15" y1="0" x2="-60" y2="0" stroke="#facc15" strokeWidth="0.8" />
        <line x1="0" y1="-15" x2="0" y2="60" stroke="#facc15" strokeWidth="0.8" />
      </g>

      {/* Corner 3: Bottom-Left (80, 3120) */}
      <g id="corner-bottom-left" transform="translate(80, 3120)">
        <path d="M 0,-80 L 0,0 L 80,0" fill="none" stroke="#facc15" strokeWidth="2.8" />
        <path d="M 0,-60 A 60,60 0 0,1 60,0" fill="none" stroke="#fde047" strokeWidth="1.4" />
        <path d="M 0,-40 A 40,40 0 0,1 40,0" fill="none" stroke="#ca8a04" strokeWidth="0.9" strokeDasharray="3 3" />
        <circle cx="28" cy="-28" r="14" fill="none" stroke="#eab308" strokeWidth="1" />
        <polygon points="28,-36 36,-28 28,-20 20,-28" fill="#fef08a" opacity="0.9" />
        <line x1="-15" y1="0" x2="60" y2="0" stroke="#facc15" strokeWidth="0.8" />
        <line x1="0" y1="15" x2="0" y2="-60" stroke="#facc15" strokeWidth="0.8" />
      </g>

      {/* Corner 4: Bottom-Right (2320, 3120) */}
      <g id="corner-bottom-right" transform="translate(2320, 3120)">
        <path d="M 0,-80 L 0,0 L -80,0" fill="none" stroke="#facc15" strokeWidth="2.8" />
        <path d="M 0,-60 A 60,60 0 0,0 -60,0" fill="none" stroke="#fde047" strokeWidth="1.4" />
        <path d="M 0,-40 A 40,40 0 0,0 -40,0" fill="none" stroke="#ca8a04" strokeWidth="0.9" strokeDasharray="3 3" />
        <circle cx="-28" cy="-28" r="14" fill="none" stroke="#eab308" strokeWidth="1" />
        <polygon points="-28,-36 -20,-28 -28,-20 -36,-28" fill="#fef08a" opacity="0.9" />
        <line x1="15" y1="0" x2="-60" y2="0" stroke="#facc15" strokeWidth="0.8" />
        <line x1="0" y1="15" x2="0" y2="-60" stroke="#facc15" strokeWidth="0.8" />
      </g>

      {/* ========================================================
          ASTRONOMICAL COORDINATE NOTATIONS (PERIMETER)
          ======================================================== */}
      {/* Top Header Inscription */}
      <text
        x="1200"
        y="75"
        textAnchor="middle"
        fill="#ca8a04"
        fontSize="13"
        fontFamily="'JetBrains Mono', monospace"
        letterSpacing="8"
        opacity="0.85"
      >
        EPHEMERIS CELESTIS · EPOCH 2026.85 · LAT 36°42'18" N · LON 118°14'06" W
      </text>

      {/* Left Margin Coordinate */}
      <text
        x="72"
        y="1600"
        textAnchor="middle"
        fill="#ca8a04"
        fontSize="12"
        fontFamily="'JetBrains Mono', monospace"
        letterSpacing="4"
        transform="rotate(-90 72 1600)"
        opacity="0.75"
      >
        SOLSTICE MERIDIAN · ALTITUDE 52.4°
      </text>

      {/* Right Margin Coordinate */}
      <text
        x="2328"
        y="1600"
        textAnchor="middle"
        fill="#ca8a04"
        fontSize="12"
        fontFamily="'JetBrains Mono', monospace"
        letterSpacing="4"
        transform="rotate(90 2328 1600)"
        opacity="0.75"
      >
        ASCENSION 18H 44M 22S · DECLINATION +23°26'
      </text>

      {/* ========================================================
          MASTER CURATORIAL TYPOGRAPHY CARTOUCHE
          ======================================================== */}
      <g id="curatorial-cartouche" transform="translate(1200, 3056)">
        {/* Cartouche Background Plaque with Beveled Edge */}
        <polygon
          points="-540,-44 540,-44 515,44 -515,44"
          fill="#06070d"
          stroke="#ca8a04"
          strokeWidth="1.6"
          opacity="0.96"
        />
        <polygon
          points="-530,-38 530,-38 507,38 -507,38"
          fill="none"
          stroke="#fde047"
          strokeWidth="0.8"
          opacity="0.75"
        />

        {/* Flanking Decorative Hairline Wings */}
        <line x1="-540" y1="0" x2="-860" y2="0" stroke="#ca8a04" strokeWidth="1.2" />
        <circle cx="-860" cy="0" r="4.5" fill="#fde047" />
        <line x1="540" y1="0" x2="860" y2="0" stroke="#ca8a04" strokeWidth="1.2" />
        <circle cx="860" cy="0" r="4.5" fill="#fde047" />

        {/* Left Astronomical Ephemeris Plaque */}
        <g id="ephemeris-left" transform="translate(-700, 0)">
          <rect x="-110" y="-28" width="220" height="56" fill="#04050b" stroke="#ca8a04" strokeWidth="0.9" opacity="0.95" />
          <rect x="-105" y="-23" width="210" height="46" fill="none" stroke="#fde047" strokeWidth="0.5" strokeDasharray="2 3" opacity="0.5" />
          <text x="0" y="-11" textAnchor="middle" fill="#facc15" fontSize="9.5" fontFamily="'JetBrains Mono', monospace" letterSpacing="2">HORA · 11:42:19 UT</text>
          <text x="0" y="4" textAnchor="middle" fill="#fef9c3" fontSize="9.5" fontFamily="'JetBrains Mono', monospace" letterSpacing="2">MAGNITUDO · 1.048</text>
          <text x="0" y="19" textAnchor="middle" fill="#ca8a04" fontSize="9.5" fontFamily="'JetBrains Mono', monospace" letterSpacing="2">SAROS CYCLUS · 145</text>
        </g>

        {/* Right Astronomical Ephemeris Plaque */}
        <g id="ephemeris-right" transform="translate(700, 0)">
          <rect x="-110" y="-28" width="220" height="56" fill="#04050b" stroke="#ca8a04" strokeWidth="0.9" opacity="0.95" />
          <rect x="-105" y="-23" width="210" height="46" fill="none" stroke="#fde047" strokeWidth="0.5" strokeDasharray="2 3" opacity="0.5" />
          <text x="0" y="-11" textAnchor="middle" fill="#facc15" fontSize="9.5" fontFamily="'JetBrains Mono', monospace" letterSpacing="2">SOLSTITIUM AESTIVUM</text>
          <text x="0" y="4" textAnchor="middle" fill="#fef9c3" fontSize="9.5" fontFamily="'JetBrains Mono', monospace" letterSpacing="2">DURATIO · 04M 12S</text>
          <text x="0" y="19" textAnchor="middle" fill="#ca8a04" fontSize="9.5" fontFamily="'JetBrains Mono', monospace" letterSpacing="2">ALTITUDO · 52.4°</text>
        </g>

        {/* Engraved Observatory Foundation Seal Medallion (Crowning Top Pediment) */}
        <g id="observatory-seal" transform="translate(0, -44)">
          <circle cx="0" cy="0" r="16" fill="#05060c" stroke="#facc15" strokeWidth="1.2" />
          <circle cx="0" cy="0" r="12" fill="none" stroke="#ca8a04" strokeWidth="0.8" strokeDasharray="2 2" />
          <polygon points="0,-8 2,-2 8,0 2,2 0,8 -2,2 -8,0 -2,-2" fill="url(#goldFoil)" />
          <circle cx="0" cy="0" r="2" fill="#ffffff" />
        </g>

        {/* Cartouche Top Kicker */}
        <text
          x="0"
          y="-18"
          textAnchor="middle"
          fill="#ca8a04"
          fontSize="12"
          fontFamily="'Cinzel', Georgia, serif"
          fontWeight="600"
          letterSpacing="10"
        >
          EX ARCHIVO OBSERVATORII · DIE SOLSTITII · OPUS I
        </text>

        {/* Main Masterpiece Title with Classical Intaglio Inscribed Depth */}
        <text
          x="1"
          y="13"
          textAnchor="middle"
          fill="#000000"
          fontSize="28"
          fontFamily="'Cinzel', Georgia, serif"
          fontWeight="700"
          letterSpacing="12"
          opacity="0.95"
        >
          THE SOLSTICE OBSERVATORY
        </text>
        <text
          x="0"
          y="12"
          textAnchor="middle"
          fill="#fef08a"
          fontSize="28"
          fontFamily="'Cinzel', Georgia, serif"
          fontWeight="700"
          letterSpacing="12"
        >
          THE SOLSTICE OBSERVATORY
        </text>

        {/* Subtitle & Specs */}
        <text
          x="0"
          y="31"
          textAnchor="middle"
          fill="#ca8a04"
          fontSize="11"
          fontFamily="'JetBrains Mono', monospace"
          letterSpacing="4.5"
          opacity="0.95"
        >
          TOTALITY OVER THE OBSIDIAN REACHES
        </text>
      </g>
    </g>
  );
}

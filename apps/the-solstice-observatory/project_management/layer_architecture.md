# Layer Architecture Specification

To facilitate iterative refinement, maintenance, and visual clarity, the artwork is partitioned into 7 distinct SVG vector layers managed by a unified coordinate system (`viewBox="0 0 2400 3200"`).

## Z-Depth & Layer Hierarchy (Back to Front)

### 0. `Layer0_Background` (Z-Index: 0)
- Deep cosmic radial & linear atmospheric gradients (`skyZenithGrad`, `nebulaViolet`, `nebulaCyan`, `nebulaCrimson`).
- Sweeping **Milky Way Galactic Core Arch** (`milkyWayBand`) with absorbing Great Rift dust lanes and dark Bok globules.
- Deep sky objects:
  - **The Great Andromeda Galaxy (M31)**: inclined spiral disk, dust lanes, core, and companion dwarf galaxy M32.
  - **The Great Orion Nebula (M42)**: multi-lobed ionized hydrogen emission complex and Trapezium cluster.
  - **The Pleiades Open Cluster (M45 · Seven Sisters)**: sapphire reflection nebulosity shroud (`pleiadesNebula`) with 9 individual named stars.
- **Zodiacal Light False Dawn Pyramid** (`zodiacalCone`) rising along the ecliptic plane toward the eclipse center.
- Twilight horizon airglow and luminous stratum dust ribbon.

### 1. `Layer1_CelestialGrid` (Z-Index: 10)
- Astrolabe coordinate system centered at `(1200, 1150)`.
- **The Ecliptic Great Circle (Via Solis)** inclined at 22.3°/23.44° passing through the eclipse point, with 7 astrological graduation stations (Vernal Node, Solstice Summit, Autumnal Node).
- **Astrolabe Almucantar Altitude Arcs** (+15° to +75°) for spherical local horizon coordinates.
- Concentric declination rings (DEC +15° to +60°) and 8 Right Ascension radial hour axes.
- Astrolabe degree ticks at radii 520, 760, and 1080.
- Full 12 Zodiac Constellation houses inscribed with classical Unicode glyphs and degree boundaries.
- Classical Latin cardinal markers (`SEPTENTRIO`, `MERIDIES`, `ORIENS`, `OCCIDENS`).
- Starfield of 420+ deterministic stars with magnitude variations.
- Major constellations:
  - **Ursa Major (The Big Dipper)** with calculated pointer ray (Merak -> Dubhe -> Polaris).
  - **Ursa Minor (The Little Dipper & Polaris)**.
  - **Orion** (Betelgeuse, Rigel, Belt).
  - **Cassiopeia** (Schedar, Caph).
  - **Cygnus** (Deneb, Albireo A & B binary).
  - **Corona Borealis** (Alphecca).
  - **Aquila** (Altair in blue brilliance).

### 2. `Layer2_TheEclipse` (Z-Index: 20)
- Central celestial focus at `(1200, 1150)` with primary radius $R=278$.
- Colossal radial coronal halo extending to $R=960$.
- **Equatorial Coronal Helmet Streamers** extending over 1100px east and west along the solar magnetic equator with interior magnetic flux axis spines and reconnection cusps.
- **Polar Coronal Plumes** at the solar north and south magnetic poles.
- 48 mathematically calculated Bézier coronal beams and 72 fine filaments.
- 160 fine **Solar Chromosphere Micro-Spicules** along the lunar limb.
- Solar prominences with ionized hydrogen-alpha plasma cores (`prominenceCore`) and footpoint limb anchors.
- Baily's Beads & 32-point faceted Diamond Ring burst with 4 concentric **Newton's Refraction Diffraction Rings** and chromatic dispersion prismatic diffraction spikes (`prismaticSpike`).
- Spherical **Earthshine** night-side illumination (`lunarEarthshine`) and silhouetted lunar mountain topography along the limb.
- Detailed lunar maria (Oceanus Procellarum, Mare Tranquillitatis, Mare Imbrium) and Copernicus / Tycho crater ray systems with central peaks.
- Sacred geometric hexagram and octagram astrolabe gear ring.

### 3. `Layer3_DistantLandscape` (Z-Index: 30)
- Far serrated mountain range with golden rim lighting, couloir ravines, and sedimentary strata lines ($Y \approx 1980 - 2240$).
- Midground volcanic needle spires and escarpments with columnar basalt vertical joint lines.
- **Talus Scree Cones & Polygonal Basalt Boulders** at the base of needle spires.
- **Horizon Megalithic Trilithons & Cairns** along ridge crests marking solstitial sightlines.
- Sweeping desert sand dunes with flowing spline curves separating lit and shadowed facets ($Y \approx 2360 - 2680$).
- Razor-sharp knife-edge specular crest highlight (`#ffffff`) and procedural wind ripples across sunlit dune slopes.

### 4. `Layer4_ObservatoryArchitecture` (Z-Index: 40)
- Monumental basalt stepped pylons flanking the central axis ($X \in [540, 1860]$, $Y \in [1860, 2680]$) with ancient masonry block joint patterns.
- **Monumental Bronze Armillary Sphere Monument** atop a stepped basalt pediment at the observatory apex ($Y=1870$) with colure and tropic graduations.
- Monumental lintel arch with inscribed 8-stage lunar phase frieze.
- Gigantic circular celestial aperture ring ($R=320$) with 24 radial astrolabe spokes.
- **Volumetric Crepuscular God Rays** streaming downward through the aperture onto the stairway.
- The Grand Ceremonial Staircase: 30 stepped stone tiers with perspective convergence, stepped stone balustrade stringers, and central golden axial channel.
- Ceremonial braziers with curling flames, embers, and rising smoke plumes.
- **The Mirrored Obsidian Reflecting Pool**:
  - Inverted reflection of the total eclipse, corona, aperture spokes, and flanking basalt pylons.
  - Shimmering surface reflections of all four ceremonial brazier firelights (`brazierReflect`).
  - Water surface caustics shimmer highlights and concentric disturbance ripples.

### 5. `Layer5_ForegroundSanctuary` (Z-Index: 50)
- Foreground basalt platform and geometric flagstone paving with radial perspective joint rays ($Y \in [2850, 3200]$).
- Inlaid 16-point bronze and gold **Compass Rose Medallion** positioned on the central terrace at `(1200, 2935) scale(0.48)` with 36 degree divisions and classical Roman cardinal letters (`N`, `S`, `E`, `W`), de-conflicted from the bottom cartouche.
- **Astronomer's Reading Plinth with Unrolled Antique Parchment Scroll** showing curled 3D vellum cylinders, inscribed eclipse umbral cone ray diagram, and brass stone weights.
- **Antique Brass Celestial Quadrant** mounted on the stone plinth with degree arc graduations.
- **Solitary Astronomer Silhouette**: flowing ceremonial mantle with classical sculptural fold fissures, golden rim light, cowl profile, grasping hand anatomy, girdle astrolabe sighting pendant, and celestial armillary staff with planetary beads and faceted crystal tip.
- Astronomical armillary tripod stand beside the observer.
- **The Great Gnomon Obelisk**: pyramidion capstone with specular glint, dual-stage umbra core and soft distance penumbra shadow (`obeliskPenumbra`), and face calibration markings.
- Specular golden crystal clusters and suspended atmospheric dust motes.

### 6. `Layer6_VignetteAndMatte` (Z-Index: 60)
- Museum-grade archival matte frame: dual hairline perimeter borders with classical corner ornamentation and astrolabe quadrants.
- Perimeter astronomical ephemeris notations (`EPHEMERIS CELESTIS · EPOCH 2026.85`).
- **Dual Ephemeris Data Plaques** flanking the cartouche (`HORA 11:42:19 UT`, `MAGNITUDO 1.048`, `SAROS CYCLUS 145`, `DURATIO 04M 12S`).
- **Engraved Foundation Seal Medallion** with 8-pointed solar star.
- Integrated vector typography cartouche with title "THE SOLSTICE OBSERVATORY".
- Outer optical vignette gradient.

# Masterpiece Iteration Log

## Iteration 1: Genesis & Structural Foundation
- **Date**: 2026-10-13
- **Focus**: Core architectural setup, SVG canvas geometry (2400 × 3200), layer separation into 7 distinct modules, shared `<defs>` with rich gradients and atmospheric textures, and lossless high-resolution canvas-to-PNG export pipeline.
- **Layers Established**:
  - `Layer0_Background`: Multi-stop celestial twilight gradient with atmospheric horizon bands.
  - `Layer1_CelestialGrid`: Precise astronomical rings, equinoctial arcs, and 380+ star points with constellation overlays.
  - `Layer2_TheEclipse`: Total solar eclipse with 48 golden coronal beams, solar prominences, and Baily's Beads diamond flare.
  - `Layer3_DistantLandscape`: Sinuous basalt desert dunes and jagged mountain ridges with rim lighting.
  - `Layer4_ObservatoryArchitecture`: Monumental stepped stone observatory, circular celestial aperture, grand stairway, braziers, and reflecting pool.
  - `Layer5_ForegroundSanctuary`: Silhouetted astronomer with armillary staff, gnomon obelisk, foreground stone terraces, and floating dust motes.
  - `Layer6_VignetteAndMatte`: Archival museum border, corner flourishes, and vector typography cartouche.
- **Export Verification**:
  - Validated native canvas export at 2400 × 3200 px (smallest dimension 2400px $\ge 2000$ px).
  - High-precision rendering with zero artifacts.

## Iteration 2: Viewport Alignment, Canvas Scaling & Modal Screen Containment
- **Date**: 2026-10-13
- **Issues Resolved**:
  - **Launch Positioning**: Fixed master canvas appearing below screen area on launch by switching from in-flow flexbox child to absolute center-pinning (`position: absolute; left: 50%; top: 50%; margin-left: -1200px; margin-top: -1600px; transform: translate3d(panX, panY, 0) scale(scale); transform-origin: center center`).
  - **Synchronous Initial Scale**: Synchronously computed `getInitialFitScale` before mount based on current window dimensions, paired with a persistent `ResizeObserver` for exact auto-fitting to container geometry without layout jump or vertical displacement.
  - **Scrollwheel Isolation**: Eliminated dual action (zooming while moving down the page) by locking outer viewport `html, body, #root` to `height: 100%; overflow: hidden; overscroll-behavior: none;`, and attaching a native non-passive wheel event listener (`{ passive: false }`) with `e.preventDefault()` and `e.stopPropagation()` on the canvas viewport.
  - **Modal Screen Space Containment**: Resolved export modal (and curatorial/specification dialogs) exceeding screen boundaries by enforcing `max-h-[calc(100dvh-1.5rem)] flex flex-col` on dialog containers, pinning headers and footers with `shrink-0`, and giving the inner body `flex-1 min-h-0 overflow-y-auto`.

## Iteration 3: Pointer-Relative Zoom Geometry & Instant Wheel Responsiveness
- **Date**: 2026-10-13
- **Focus**: Mathematical pointer-anchored zoom mechanics.
- **Enhancements**:
  - **Pointer-Centric Coordinate Invariant**: Derived and implemented exact affine pan adjustment on wheel:
    $$\Delta pan_x = (M_x - X_c) \cdot (1 - \text{ratio}) + oldPan_x \cdot \text{ratio}$$
    $$newPan_x = M_x - X_c - (M_x - X_c - oldPan_x) \cdot \frac{scale_{new}}{scale_{old}}$$
    This guarantees that the exact sub-pixel point on the 2400 × 3200 vector canvas directly beneath the cursor remains fixed on screen throughout the zoom operation.
  - **Zero-Latency Interaction**: Added `isWheeling` state suppression for CSS transitions during active wheel scrolls to prevent lag or rubber-band cursor drift, while retaining smooth 180ms cubic bezier transitions for button clicks and preset zooms.
  - **Persistent Transform Ref**: Integrated `transformRef` for rapid sequential wheel ticks, eliminating stale closure artifacts.
  - **Double-Click Zoom**: Added double-click interaction to directly zoom into the clicked coordinate or toggle back to full fit if already magnified.

## Iteration 4: Deep Astrometry, Geological Stratification & Curatorial Ornamentation
- **Date**: 2026-10-13
- **Focus**: Elevating vector draftsmanship and intricate astronomical realism across all 7 layers.
- **Artistic & Vector Enhancements**:
  - **Layer 0 (Cosmos)**: Integrated the Great Andromeda Galaxy (M31) with core, inclined spiral disc, dust lanes, and companion dwarf galaxy M32; added the Great Orion Nebula (M42) with multi-lobed ionized hydrogen gas clouds; added luminous airglow dust stratum.
  - **Layer 1 (Celestial Grid)**: Rendered the full 12 Zodiac Constellation glyphs on the astrolabe $R=760$ ring with radial division rays; added classical Latin cardinal notations (`SEPTENTRIO`, `MERIDIES`, `ORIENS`, `OCCIDENS`); rendered Albireo as a genuine optical binary star with amber primary and sapphire companion.
  - **Layer 2 (The Eclipse)**: Formulated dipole magnetic field flux loops curving from solar north to south poles; added a 60-tooth sacred astrolabe gear ring; expanded lunar maria with Copernicus and Tycho crater ray ejecta systems; refined Baily's Beads with 16-point prismatic diamond flare facets.
  - **Layer 3 (Geology)**: Inscribed horizontal sedimentary strata lines into distant mountain escarpments; added columnar basalt polygonal vertical joint lines to volcanic spires; generated procedural wind ripples across the sunlit dune faces.
  - **Layer 4 (Architecture)**: Inscribed an 8-stage lunar phase relief frieze into the temple arch lintel; added ancient masonry block joint patterns to pylon facades; expanded the mirrored obsidian pool reflection with realistic water wave distortions and concentric ripples.
  - **Layer 5 (Foreground Sanctuary)**: Inlaid a 16-point bronze and gold compass rose medallion into the center terrace paving; added an astronomical armillary tripod stand beside the solitary astronomer; added planetary beads to the astronomer's staff.
  - **Layer 6 (Archival Matte)**: Added 90° astrolabe quadrant scales with vernier caliper ticks in all 4 corners; updated the curatorial cartouche with Latin dedication (`EX ARCHIVO OBSERVATORII · DIE SOLSTITII · OPUS I`).

## Iteration 5: Grand Galactic Belt, Chromosphere Spicules & Volumetric Crepuscular Optics
- **Date**: 2026-10-13
- **Focus**: Monumental cosmic structures, solar atmospheric physics, volumetric lighting shafts, and artisanal instrumentation.
- **Artistic & Vector Enhancements**:
  - **Layer 0 (Background & Deep Sky)**:
    - Painted the sweeping **Milky Way Galactic Core Arch** (`#milkyWayBand`) spanning the zenith into the horizon with dark interstellar Great Rift dust lanes and absorbing Bok globules.
    - Added the **Pleiades Open Star Cluster (M45 · Seven Sisters)** with dedicated sapphire reflection nebulosity shroud (`#pleiadesNebula`) and 9 individual named stellar points.
    - Rendered the **Zodiacal Light False Dawn Pyramid** (`#zodiacalCone`) rising along the ecliptic plane from the horizon toward the solar center.
  - **Layer 1 (Celestial Mechanics & Astrometry)**:
    - Inscribed the **Ecliptic Great Circle (Via Solis)** across the sky passing precisely through the eclipse point ($CX=1200, CY=1150$) inclined at 22.3°/23.44°, complete with 7 astrological graduation stations (Vernal Node, Solstice Summit, Autumnal Node).
    - Calculated and rendered **Astrolabe Almucantar Altitude Arcs** (+15° to +75°) for spherical horizon coordinates.
    - Integrated **Ursa Major (The Big Dipper)** with its mathematically aligned pointer ray (Merak $\to$ Dubhe $\to$ Polaris).
    - Rendered **Aquila (The Celestial Eagle)** with Altair in blue brilliance.
  - **Layer 2 (The Eclipse & Solar Dynamics)**:
    - Rendered 160 fine **Solar Chromosphere Micro-Spicules** (needle-like solar atmospheric gas jets) along the lunar limb in intense carmine, ruby, and pink.
    - Engineered twin colossal **Equatorial Helmet Streamers** extending over 1100px east and west along the magnetic equator.
    - Formulated brush-like **Polar Coronal Plumes** at the solar north and south magnetic poles.
    - Added 4 concentric **Newton's Refraction Diffraction Rings** around the Diamond Ring burst.
  - **Layer 3 (Geological Stratification)**:
    - Added **Talus Scree Cones & Polygonal Basalt Boulders** at the base of the needle spires.
    - Erected silhouetted **Horizon Megalithic Trilithons & Cairns** along distant ridges marking astronomical solstice alignment sightlines.
  - **Layer 4 (Monumental Architecture & Pool Dynamics)**:
    - Sculpted a **Monumental Bronze Armillary Sphere Monument** atop a stepped basalt pediment at the observatory apex (between the pylons at $Y=1870$).
    - Added **Volumetric Crepuscular God Rays** streaming downward through the central astrolabe aperture onto the 30-tier grand staircase.
    - Rendered **Inverted Aperture Spokes & Water Caustics Shimmers** across the reflecting pool basin.
  - **Layer 5 (Foreground Sanctuary & Instrumentation)**:
    - Placed an **Astronomer's Reading Plinth with Unrolled Antique Parchment Scroll** showing inscribed eclipse transit sine curves and brass stone paperweights.
    - Added an antique **Mounted Celestial Quadrant** on the reading plinth.
  - **Layer 6 (Archival Curatorial Cartouche)**:
    - Flanked the master cartouche with dual **Astronomical Ephemeris Data Plaques** (`HORA 11:42:19 UT`, `MAGNITUDO 1.048`, `SAROS CYCLUS 145`, `DURATIO 04M 12S`).
    - Inscribed an engraved circular **Foundation Seal Medallion** honoring the observatory.
- **Export Verification**:
  - Re-verified high-resolution PNG export with minimum dimension $\ge 2000$px preserved across all resolutions (2400×3200, 3600×4800, 4800×6400).

## Iteration 6: Harmonization, Physical Realism & Material Refinement of Existing Elements
- **Date**: 2026-10-14
- **Focus**: Improving and harmonizing existing elements rather than adding new ones, guided by the principle: *"Refinement doesn't always mean adding new elements. Sometimes refinement means improving existing elements."*
- **Artistic & Vector Refinements across Existing Elements**:
  - **Layer 2 (The Eclipse & Solar Dynamics)**:
    - **Celestial Earthshine Modeling**: Transformed the flat lunar disc into a 3D celestial sphere by applying a delicate spherical Earthshine gradient (`#lunarEarthshine`) simulating the light reflected from the fully illuminated Earth onto the lunar night side.
    - **Lunar Limb Mountain Topography**: Inscribed subtle mountain profile variations (Montes Apenninus and Leibnitz ridge peaks) along the lunar limb silhouetted against the corona, visually grounding the physical cause of Baily's Beads.
    - **Hydrogen-Alpha Prominence Cores**: Enhanced the 4 solar eruptive prominences with blazing white-pink plasma core strands (`#prominenceCore`) and anchored chromospheric footpoints at the solar limb.
    - **Equatorial Helmet Streamer Magnetic Spines**: Inscribed interior magnetic flux axis spines and reconnection cusp boundaries along the colossal east and west helmet streamers.
    - **Diamond Ring Prismatic Chromatic Dispersion**: Added optical chromatic diffraction envelopes (`#prismaticSpike`) behind the specular spikes, producing authentic prismatic rainbow fringe dispersion.
  - **Layer 4 (Monumental Architecture & Reflecting Waters)**:
    - **Brazier Fire Water Surface Reflections**: Integrated dynamic shimmering amber-orange reflections (`#brazierReflect`) of all four ceremonial braziers bouncing across the water ripples of the reflecting pool.
    - **Reflected Pylon Columns**: Mapped perspective basalt pylon reflections framing the mirrored corona, unifying the pool's architectural connection to the sanctuary.
    - **Grand Staircase Stone Balustrades**: Added stepped stone stringer parapets flanking both sides of the 30-tier staircase, anchoring the perspective descent between the pylons.
    - **Apex Armillary Sphere Graduations**: Engraved astrolabe degree ticks along the meridian colure ring and solstitial tropic bands of the apex monument.
  - **Layer 5 (Foreground Sanctuary & Instrumentation)**:
    - **Spatial Hierarchy De-Confliction**: Identified and resolved the visual conflict where the curatorial cartouche in Layer 6 was obscuring the terrace compass rose in Layer 5. Repositioned and scaled the compass rose to `(1200, 2935) scale(0.48)` directly on the sunlit terrace flagstones in front of the reflecting pool curb, making both elements 100% visible and unobstructed.
    - **Compass Rose Astrolabe Dial**: Added 36 ray degree divisions and classical cardinal Roman serif letter inscriptions (`N`, `S`, `E`, `W`).
    - **Astronomer Drapery & Anatomy**: Refined the solitary astronomer’s mantle with classical sculptural drapery fold fissures, an anatomically clasped hand on the staff, a girdle astrolabe sighting pendant, and a faceted crystal apex tip on the armillary staff.
    - **Parchment Vellum Curled Rolls & Eclipse Geometry**: Replaced the flat scroll with curled 3D vellum cylinders, an inscribed eclipse umbral cone ray diagram, and graduated degree arcs on the brass quadrant.
    - **Gnomon Obelisk Penumbra Softening**: Upgraded the forward shadow with a dual-stage umbra core and soft distance penumbra gradient (`#obeliskPenumbra`).
  - **Layer 3 (Geological Stratification)**:
    - **Mountain Couloir Ravines**: Inscribed dark vertical shadow couloirs and erosional ravines between the distant serrated peaks.
    - **Knife-Edge Dune Crest Highlight**: Added razor-sharp specular crest highlights (`#ffffff`, 1.0px) along the grand diagonal dune ridge.
  - **Layer 6 (Archival Matte & Typography)**:
    - **Cartouche Crest Pediment Mounting**: Repositioned the foundation seal medallion to sit atop the cartouche's beveled upper pediment as an architectural crest, aligning the entire vertical axis from the pool to the border with zero clipping.
- **Verification**:
  - Full TypeScript and Vite production compilation verified clean with zero errors.
  - Native 2400 × 3200 px PNG export with high smoothing quality confirmed.

## Iteration 7: Deep Nuanced Refinement of Existing Elements & Unified Lighting Physics
- **Date**: 2026-10-14
- **Focus**: Elevating existing elements to museum-grade perfection through rigorous attention to lighting physics, material textures, perspective math, and copperplate cartography: *"Refinement doesn't always mean adding new elements. Sometimes refinement means improving existing elements."*
- **Vector & Physical Refinements of Existing Elements**:
  - **Layer 0 (Atmospheric & Celestial Background)**:
    - **Zodiacal Light Hyperbolic Parabolic Smoothing**: Replaced the rigid straight-sided polygon triangle with a natural hyperbolic curve envelope (`M 420,2280 C 680,1860 960,1380 1200,1050 ...`) and a concentrated inner core, capturing authentic interplanetary dust scattering toward the eclipse.
    - **Horizon Airglow Transition**: Eliminated flat hex `#f97316` banding in the secondary twilight boundary by binding it to the multi-stop atmospheric gradient (`url(#horizonGlowGrad)`) with calibrated opacity.
  - **Layer 3 (Geological Stratification & Aeolian Geomorphology)**:
    - **Mountain Silhouette Micro-Arêtes**: Inscribed natural alpine micro-arêtes and tectonic facets into the far mountain crest while maintaining the iconic peak positions at $Y=1980$ and $Y=1970$.
    - **Dendritic Glacial Couloir Ravines**: Replaced uniform single straight line couloirs with branching dendritic fracture fissures following the cirque talus fall lines.
    - **Dual-Tone Alpenglow Rim Lighting**: Paired a warm atmospheric amber edge (`#f59e0b`, 3.2px) beneath the razor specular crest highlight (`#fef08a`, 1.6px) along the mountain crest.
    - **Organic Aeolian Dune Ripples**: Upgraded dune surface wind ripples to 22 organic Bézier curves with natural transverse wavelength drift and Gaussian-tapered opacities ($0.22 - 0.44$).
  - **Layer 4 (Monumental Architecture & Solar Alignment)**:
    - **Perspective-Weighted Stair Lip Highlights**: Applied perspective distance scaling to step front lips ($0.75\text{px} \to 1.90\text{px}$ stroke width) from apex tier to foreground terrace, amplifying depth.
    - **Staircase Meridian Solar Calendar Ticks**: Inscribed 11 solstitial calendar cross-ticks along the golden axial meridian channel, evoking Italian Renaissance cathedral meridian lines.
    - **Brazier Smoke & Ember Eddies**: Added delicate secondary rising eddies and incandescent airborne embers above all four ceremonial braziers.
  - **Layer 5 (Foreground Sanctuary & Lighting Physics)**:
    - **Ashlar Flagstone Paving Coursing**: Replaced plain horizontal stripes with staggered ashlar transverse joints and chamfered lip highlights, turning the floor into authentic megalithic stone pavement.
    - **Astronomer Lighting Alignment**: Re-anchored the figure's shadow to cast forward-left and amplified the direct golden rim light (`#fef08a`, 2.0px) on the cloak profile facing the eclipse core $(1200, 1150)$.
    - **Gnomon Obelisk Solar Shadow Projection**: Corrected the shadow vector to cast forward-right ($+108\text{px}$ lateral shift at $Y=460$) with trigonometric precision matching the solar vector from $(1200, 1150)$, resolving physical conflict with the sunlit left face.
  - **Layer 6 (Archival Curatorial Cartouche)**:
    - **Classical Intaglio Lettering Depth**: Added an offset intaglio engraved cast shadow beneath the primary "THE SOLSTICE OBSERVATORY" serif title.
    - **Ephemeris Plaque Hairline Insets**: Added delicate dashed inner hairline borders to both flanking ephemeris plaques.
- **Verification**:
  - Full TypeScript and Vite production compilation verified clean with zero errors.
  - Native 2400 × 3200 px PNG export with high smoothing quality confirmed.

## Iteration 8: Masterpiece Refinement of Obsidian Reflecting Pool & Waterline Optics
- **Date**: 2026-10-15
- **Focus**: Improving existing elements by harmonizing water reflection physics and masonry details: *"Refinement doesn't always mean adding new elements. Sometimes refinement means improving existing elements."*
- **Vector & Physical Refinements of Existing Elements**:
  - **MasterDefs (`#poolReflect` & Water Surface Optics)**:
    - **Obsidian Basin Color Correction**: Eliminated the extraneous high-intensity orange/yellow bottom gradient stops (`#8d3a25`, `#d97706`, `#f59e0b`, `#fef08a`) that produced a glowing sunset-like stripe across the base of the pool basin.
    - **Atmospheric Obsidian Depth**: Replaced with a deep, glassy midnight obsidian-to-indigo gradient (`#04060d` -> `#080b18` -> `#101528` -> `#151a32` -> `#1b1f38` -> `#0f1222`), establishing authentic water depth and physical reflection physics.
  - **Layer 4 (Architecture & Reflecting Pool)**:
    - **Carved Basin Recessed Waterline Shadow**: Inscribed an inner coping shadow polygon (`#05070e`) between the stone coping curb and the water basin, creating a tangible physical edge where the water meets the stone.
    - **Upper Waterline Specular Gilded Glint**: Added a crisp specular waterline highlight (`#fde047`, 0.9px, opacity 0.55) along the upper stone rim where light from the total eclipse catches the meniscus.
    - **Mirrored Capillary Wavelet Slices**: Calibrated the capillary wavelets and caustics across the lunar core reflection to sit harmoniously atop the dark glassy obsidian surface with zero saturation blow-out.
  - **Overall Composition Harmony**:
    - Confirmed flawless visual hierarchy between the dark mirrored basin, the foreground terrace compass rose, and the museum curatorial cartouche with clean spatial separation.
- **Verification**:
  - Offscreen 2400 × 3200 px PNG export pipeline verified.
  - TypeScript compilation and code integrity verified clean.

## Iteration 9: Softening Aquatic Corona Dispersion & Mirrored Diamond Flare Optics
- **Date**: 2026-10-17
- **Focus**: Eliminating artificial geometric boundaries in the reflecting pool and elevating existing celestial and curatorial elements: *"Refinement doesn't always mean adding new elements. Sometimes refinement means improving existing elements."*
- **Vector & Physical Refinements of Existing Elements**:
  - **MasterDefs (`#waterCoronaGlow`)**:
    - Created a dedicated soft radial water reflection gradient with smooth falloff (`#ffffff` core -> `#fef08a` -> `#f59e0b` -> `#ea580c` -> transparent `#1e1b4b` at 100%), replacing sharp-edged solid fills with optical aquatic diffusion.
  - **Layer 4 (Mirrored Corona & Diamond Ring Optics)**:
    - **Feathered Corona Reflection**: Replaced the hard-edged solid yellow ellipse (`fill="#fef08a"`) in the reflecting pool with `fill="url(#waterCoronaGlow)" rx="340" ry="75"`, eliminating the unnatural bright oval ring and restoring seamless blending into the dark obsidian water.
    - **Aquatic Diamond Flare Specular Path**: Enhanced the mirrored Diamond Ring burst (`1285, 2748`) with an authentic elongated horizontal specular flare spike (`M 1160,2748 L 1410,2748`), a luminous core, micro-diffraction glint cross, and discrete sparkling glint beads along adjacent capillary wavelets.
  - **Layer 5 (Terrace Compass Rose Precision)**:
    - **Cardinal Typography Engraving**: Scaled the cardinal letter inscriptions (`N`, `S`, `E`, `W`) from `9px` to `14px`, ensuring sharp legibility on the bronze dial in the 2400 × 3200 export.
    - **Intaglio Concentric Dial Rings**: Added inner concentric hairline rings (`r=46`, `r=32`) and a central gold-foil jewel orb to the compass rose dial.
  - **Layer 6 (Curatorial Ephemeris Plaque Typography)**:
    - **Ephemeris Text Proportions**: Elevated the data plaque font sizes from `8.5px` to `9.5px` with balanced baseline positions (`y=-11, 4, 19`), improving optical clarity of the astronomical constants.
- **Verification**:
  - Full TypeScript and Vite production compilation verified clean with zero errors.
  - Native 2400 × 3200 px PNG export pipeline verified.

## Iteration 10: Two-Tier Geological Mountain Massif & Photospheric Diamond Flare Optics
- **Date**: 2026-10-17
- **Focus**: Elevating existing landscape depth and optical flare physics: *"Refinement doesn't always mean adding new elements. Sometimes refinement means improving existing elements."*
- **Vector & Physical Refinements of Existing Elements**:
  - **MasterDefs (`#prismaticSpikeVertical` & `#diamondPhotosphereSliver`)**:
    - **Vertical Chromatic Dispersion**: Implemented `prismaticSpikeVertical` with vertical rainbow chromatic dispersion (`#38bdf8` -> `#818cf8` -> `#c084fc` -> `#ffffff` -> `#fde047` -> `#fb923c` -> `#f43f5e`), ensuring the vertical diffraction spike exhibits genuine optical prism behavior identical to the horizontal axis.
    - **Photospheric Emergence Flash Gradient**: Crafted `diamondPhotosphereSliver` with an ultra-incandescent core (`#ffffff` at 100%) and steep warm solar rim falloff, capturing the intense luminance of the uncovered solar disc.
  - **Layer 2 (The Eclipse & Diamond Ring Burst)**:
    - **Photospheric Emergence Crescent Sliver**: Inscribed an authentic solar limb emergence arc along the exact lunar contact point (`DIAMOND_X`, `DIAMOND_Y`) with a radiant 3.2px pure white stroke, capturing the split second of third contact.
    - **Airy Disc Diffraction Rings**: Refined the concentric diffraction rings with delicate spectral interference tints (incandescent white, golden yellow `#fef08a`, spectral cyan `#67e8f9`, and magenta `#f472b6`).
    - **Radial Micro-Diffraction Star Flare Needles**: Added 8 fine needle-thin star flare lines radiating from the diamond focus to capture realistic optical glass flare characteristics.
    - **Multi-Stage Incandescent Diamond Core**: Layered the core flash with a 36px photosphere flare, 18px inner core, 9px focus, and 4px central solar pinpoint.
  - **Layer 3 (Distant Landscape & Mountain Massif)**:
    - **Two-Tier Mountain Massif Separation**: Replaced the previously duplicated stroke paths with a true two-tier geological formation:
      - *Tier 1 (Far Distant Sawtooth Range)*: Ultra-distant high alpine arêtes and horns reaching y=1970, bathed in `url(#mountainDistant)` with a crisp 1.5px golden razor rim highlight.
      - *Tier 2 (Intermediate Sub-Ridge & Escarpment Foothills)*: Mid-distant mountain ridge (`url(#mountainMid)`) with warm amber sunlight crests (`stroke="#f59e0b"`, 2.0px) that establishes profound physical and atmospheric separation between the distant peaks and the desert floor.
- **Verification**:
  - Full TypeScript and Vite production compilation verified clean with zero errors.
  - Native 2400 × 3200 px PNG export pipeline verified.






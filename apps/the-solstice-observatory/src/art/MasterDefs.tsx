/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export default function MasterDefs() {
  return (
    <defs>
      {/* ========================================================
          ATMOSPHERIC & CELESTIAL SKY GRADIENTS
          ======================================================== */}
      {/* Master celestial sky gradient: zenith obsidian to twilight horizon */}
      <linearGradient id="skyZenithGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#03040a" />
        <stop offset="22%" stopColor="#070817" />
        <stop offset="45%" stopColor="#110e2b" />
        <stop offset="65%" stopColor="#22103a" />
        <stop offset="76%" stopColor="#3d1442" />
        <stop offset="85%" stopColor="#631d45" />
        <stop offset="91%" stopColor="#9c3447" />
        <stop offset="95%" stopColor="#cf6236" />
        <stop offset="98.5%" stopColor="#f3963e" />
        <stop offset="100%" stopColor="#fef08a" />
      </linearGradient>

      {/* Horizon atmospheric afterglow */}
      <linearGradient id="horizonGlowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0" />
        <stop offset="45%" stopColor="#f97316" stopOpacity="0.45" />
        <stop offset="80%" stopColor="#ec4899" stopOpacity="0.65" />
        <stop offset="100%" stopColor="#a855f7" stopOpacity="0.25" />
      </linearGradient>

      {/* Deep Celestial Stratum Glow */}
      <linearGradient id="stratumGlow" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f97316" stopOpacity="0" />
        <stop offset="25%" stopColor="#fbbf24" stopOpacity="0.35" />
        <stop offset="50%" stopColor="#ffffff" stopOpacity="0.75" />
        <stop offset="75%" stopColor="#fbbf24" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
      </linearGradient>

      {/* Volumetric Crepuscular God Rays (Atmospheric Light Shafts) */}
      <linearGradient id="volumetricRayGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
        <stop offset="20%" stopColor="#fef08a" stopOpacity="0.3" />
        <stop offset="55%" stopColor="#f59e0b" stopOpacity="0.14" />
        <stop offset="85%" stopColor="#d97706" stopOpacity="0.04" />
        <stop offset="100%" stopColor="#000000" stopOpacity="0" />
      </linearGradient>

      {/* Cosmic Nebula Gradients */}
      <radialGradient id="nebulaViolet" cx="35%" cy="30%" r="55%" fx="30%" fy="25%">
        <stop offset="0%" stopColor="#9333ea" stopOpacity="0.38" />
        <stop offset="28%" stopColor="#7e22ce" stopOpacity="0.25" />
        <stop offset="60%" stopColor="#4c1d95" stopOpacity="0.1" />
        <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
      </radialGradient>

      <radialGradient id="nebulaCyan" cx="72%" cy="22%" r="48%" fx="70%" fy="20%">
        <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.32" />
        <stop offset="35%" stopColor="#0284c7" stopOpacity="0.2" />
        <stop offset="70%" stopColor="#1e1b4b" stopOpacity="0.07" />
        <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
      </radialGradient>

      <radialGradient id="nebulaCrimson" cx="50%" cy="42%" r="45%" fx="50%" fy="40%">
        <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.28" />
        <stop offset="38%" stopColor="#be123c" stopOpacity="0.16" />
        <stop offset="75%" stopColor="#4c0519" stopOpacity="0.04" />
        <stop offset="100%" stopColor="#05050b" stopOpacity="0" />
      </radialGradient>

      {/* Andromeda Galaxy (M31) Core Gradient */}
      <radialGradient id="andromedaCore" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
        <stop offset="20%" stopColor="#fef08a" stopOpacity="0.85" />
        <stop offset="50%" stopColor="#93c5fd" stopOpacity="0.45" />
        <stop offset="80%" stopColor="#6366f1" stopOpacity="0.18" />
        <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0" />
      </radialGradient>

      {/* Orion Great Nebula (M42) Gas Gradient */}
      <radialGradient id="orionNebula" cx="45%" cy="45%" r="50%">
        <stop offset="0%" stopColor="#f472b6" stopOpacity="0.65" />
        <stop offset="35%" stopColor="#c084fc" stopOpacity="0.4" />
        <stop offset="70%" stopColor="#38bdf8" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#030712" stopOpacity="0" />
      </radialGradient>

      {/* Pleiades Open Star Cluster (M45) Reflection Shroud */}
      <radialGradient id="pleiadesNebula" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.8" />
        <stop offset="25%" stopColor="#38bdf8" stopOpacity="0.45" />
        <stop offset="60%" stopColor="#1d4ed8" stopOpacity="0.18" />
        <stop offset="100%" stopColor="#0b0f24" stopOpacity="0" />
      </radialGradient>

      {/* Milky Way Galactic Core Arc Gradient */}
      <linearGradient id="milkyWayBand" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1e1b4b" stopOpacity="0" />
        <stop offset="20%" stopColor="#312e81" stopOpacity="0.25" />
        <stop offset="40%" stopColor="#c084fc" stopOpacity="0.32" />
        <stop offset="50%" stopColor="#fde047" stopOpacity="0.45" />
        <stop offset="60%" stopColor="#f472b6" stopOpacity="0.3" />
        <stop offset="80%" stopColor="#3730a3" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
      </linearGradient>

      {/* Zodiacal Light Pyramid Gradient */}
      <linearGradient id="zodiacalCone" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor="#fef08a" stopOpacity="0.3" />
        <stop offset="40%" stopColor="#f59e0b" stopOpacity="0.18" />
        <stop offset="75%" stopColor="#9a3412" stopOpacity="0.08" />
        <stop offset="100%" stopColor="#0a0a14" stopOpacity="0" />
      </linearGradient>

      {/* Solar Chromosphere Jet & Spicule Gradient */}
      <radialGradient id="chromosphereSpicule" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
        <stop offset="20%" stopColor="#ff0055" stopOpacity="0.95" />
        <stop offset="60%" stopColor="#e11d48" stopOpacity="0.65" />
        <stop offset="90%" stopColor="#be123c" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#881337" stopOpacity="0" />
      </radialGradient>

      {/* Equatorial Helmet Streamer Radial Glow */}
      <linearGradient id="streamerHelmet" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
        <stop offset="25%" stopColor="#fef08a" stopOpacity="0.8" />
        <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.35" />
        <stop offset="85%" stopColor="#ea580c" stopOpacity="0.12" />
        <stop offset="100%" stopColor="#7c2d12" stopOpacity="0" />
      </linearGradient>

      {/* ========================================================
          THE ECLIPSE & CORONA GRADIENTS
          ======================================================== */}
      {/* Colossal radial halo surrounding the eclipse */}
      <radialGradient id="coronaGrandHalo" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
        <stop offset="16%" stopColor="#fef08a" stopOpacity="0.95" />
        <stop offset="32%" stopColor="#fbbf24" stopOpacity="0.7" />
        <stop offset="52%" stopColor="#f97316" stopOpacity="0.38" />
        <stop offset="74%" stopColor="#db2777" stopOpacity="0.16" />
        <stop offset="92%" stopColor="#6366f1" stopOpacity="0.05" />
        <stop offset="100%" stopColor="#000000" stopOpacity="0" />
      </radialGradient>

      {/* Golden corona ray taper gradient */}
      <linearGradient id="coronaBeamGold" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.98" />
        <stop offset="22%" stopColor="#fde047" stopOpacity="0.9" />
        <stop offset="55%" stopColor="#f59e0b" stopOpacity="0.5" />
        <stop offset="85%" stopColor="#ea580c" stopOpacity="0.18" />
        <stop offset="100%" stopColor="#7c2d12" stopOpacity="0" />
      </linearGradient>

      {/* Secondary softer corona ray */}
      <linearGradient id="coronaBeamAmber" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.85" />
        <stop offset="30%" stopColor="#fbbf24" stopOpacity="0.55" />
        <stop offset="70%" stopColor="#d97706" stopOpacity="0.22" />
        <stop offset="100%" stopColor="#9a3412" stopOpacity="0" />
      </linearGradient>

      {/* Solar Dipole Magnetic Field Line Gradient */}
      <linearGradient id="solarMagneticGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
        <stop offset="35%" stopColor="#fde047" stopOpacity="0.7" />
        <stop offset="70%" stopColor="#f59e0b" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
      </linearGradient>

      {/* Obsidian Lunar Disc with subtle deep velvet rim */}
      <radialGradient id="lunarBody" cx="48%" cy="46%" r="52%">
        <stop offset="0%" stopColor="#020307" />
        <stop offset="80%" stopColor="#04050d" />
        <stop offset="94%" stopColor="#0a0c18" />
        <stop offset="100%" stopColor="#1a1429" />
      </radialGradient>

      {/* Lunar Maria (Basalt Plains) subtle shading */}
      <radialGradient id="lunarMare" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#161830" stopOpacity="0.4" />
        <stop offset="65%" stopColor="#0d0f20" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#04050d" stopOpacity="0" />
      </radialGradient>

      {/* Lunar Crater Ray Systems (Copernicus / Tycho / Kepler) */}
      <radialGradient id="craterRayGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#272a4a" stopOpacity="0.6" />
        <stop offset="45%" stopColor="#181a33" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#060712" stopOpacity="0" />
      </radialGradient>

      {/* Diamond Ring / Baily's Beads flare */}
      <radialGradient id="diamondRingCore" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
        <stop offset="18%" stopColor="#fef9c3" stopOpacity="0.98" />
        <stop offset="42%" stopColor="#fde047" stopOpacity="0.75" />
        <stop offset="72%" stopColor="#f59e0b" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#b45309" stopOpacity="0" />
      </radialGradient>

      {/* Solar Prominence Flare Gradient */}
      <linearGradient id="prominenceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="25%" stopColor="#f43f5e" />
        <stop offset="65%" stopColor="#e11d48" />
        <stop offset="100%" stopColor="#881337" />
      </linearGradient>

      {/* Subtle Celestial Earthshine Illuminating Night-Side Lunar Maria */}
      <radialGradient id="lunarEarthshine" cx="38%" cy="36%" r="62%">
        <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.16" />
        <stop offset="25%" stopColor="#818cf8" stopOpacity="0.12" />
        <stop offset="55%" stopColor="#1e1b4b" stopOpacity="0.08" />
        <stop offset="85%" stopColor="#080d1a" stopOpacity="0.03" />
        <stop offset="100%" stopColor="#000000" stopOpacity="0" />
      </radialGradient>

      {/* Ethereal Lunar Limb Silhouette & Topographic Mountain Rim */}
      <linearGradient id="lunarLimbRelief" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
        <stop offset="40%" stopColor="#fef08a" stopOpacity="0.7" />
        <stop offset="75%" stopColor="#f59e0b" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#000000" stopOpacity="0" />
      </linearGradient>

      {/* Ionized Hydrogen-Alpha Prominence Plasma Core */}
      <radialGradient id="prominenceCore" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
        <stop offset="25%" stopColor="#fecdd3" stopOpacity="0.95" />
        <stop offset="55%" stopColor="#f43f5e" stopOpacity="0.8" />
        <stop offset="85%" stopColor="#be123c" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#881337" stopOpacity="0" />
      </radialGradient>

      {/* Prismatic Diffraction Fringe for Diamond Ring Burst (Horizontal) */}
      <linearGradient id="prismaticSpike" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#38bdf8" stopOpacity="0" />
        <stop offset="18%" stopColor="#818cf8" stopOpacity="0.45" />
        <stop offset="38%" stopColor="#c084fc" stopOpacity="0.75" />
        <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
        <stop offset="62%" stopColor="#fde047" stopOpacity="0.75" />
        <stop offset="82%" stopColor="#fb923c" stopOpacity="0.45" />
        <stop offset="100%" stopColor="#f43f5e" stopOpacity="0" />
      </linearGradient>

      {/* Prismatic Diffraction Fringe for Diamond Ring Burst (Vertical) */}
      <linearGradient id="prismaticSpikeVertical" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#38bdf8" stopOpacity="0" />
        <stop offset="18%" stopColor="#818cf8" stopOpacity="0.45" />
        <stop offset="38%" stopColor="#c084fc" stopOpacity="0.75" />
        <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
        <stop offset="62%" stopColor="#fde047" stopOpacity="0.75" />
        <stop offset="82%" stopColor="#fb923c" stopOpacity="0.45" />
        <stop offset="100%" stopColor="#f43f5e" stopOpacity="0" />
      </linearGradient>

      {/* Incandescent Photosphere Emergence Flash */}
      <radialGradient id="diamondPhotosphereSliver" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
        <stop offset="15%" stopColor="#ffffff" stopOpacity="1" />
        <stop offset="38%" stopColor="#fffbeb" stopOpacity="0.95" />
        <stop offset="65%" stopColor="#fef08a" stopOpacity="0.8" />
        <stop offset="88%" stopColor="#f59e0b" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#b45309" stopOpacity="0" />
      </radialGradient>

      {/* ========================================================
          GEOLOGICAL MOUNTAIN & DESERT GRADIENTS
          ======================================================== */}
      {/* Distant mountain silhouette */}
      <linearGradient id="mountainDistant" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#2a1440" />
        <stop offset="45%" stopColor="#1a0f2c" />
        <stop offset="100%" stopColor="#0e0a1b" />
      </linearGradient>

      {/* Mid-distance mountain with golden crest lighting */}
      <linearGradient id="mountainMid" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#3d1a42" />
        <stop offset="35%" stopColor="#251132" />
        <stop offset="75%" stopColor="#140b20" />
        <stop offset="100%" stopColor="#080512" />
      </linearGradient>

      {/* Desert Dune Sunlit Face */}
      <linearGradient id="duneLit" x1="20%" y1="0%" x2="80%" y2="100%">
        <stop offset="0%" stopColor="#dc7a38" />
        <stop offset="30%" stopColor="#b45309" />
        <stop offset="65%" stopColor="#78350f" />
        <stop offset="100%" stopColor="#451a03" />
      </linearGradient>

      {/* Desert Dune Shadow Face */}
      <linearGradient id="duneShadow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1c0f24" />
        <stop offset="50%" stopColor="#110819" />
        <stop offset="100%" stopColor="#06030a" />
      </linearGradient>

      {/* Dune Ridge Crest Highlight */}
      <linearGradient id="ridgeGlow" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#fef08a" stopOpacity="0.9" />
        <stop offset="45%" stopColor="#f59e0b" stopOpacity="0.95" />
        <stop offset="100%" stopColor="#d97706" stopOpacity="0.45" />
      </linearGradient>

      {/* Columnar Basalt Spires Shadow/Light */}
      <linearGradient id="columnarBasalt" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#2a2e45" />
        <stop offset="35%" stopColor="#1a1c2b" />
        <stop offset="70%" stopColor="#10121d" />
        <stop offset="100%" stopColor="#07080d" />
      </linearGradient>

      {/* ========================================================
          ARCHITECTURAL BASALT & MONOLITH GRADIENTS
          ======================================================== */}
      {/* Monumental Pylon Main Surface */}
      <linearGradient id="monolithBasalt" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#202336" />
        <stop offset="38%" stopColor="#141624" />
        <stop offset="78%" stopColor="#0c0d15" />
        <stop offset="100%" stopColor="#05060a" />
      </linearGradient>

      {/* Pylon Beveled Edge / Sunlit Rim */}
      <linearGradient id="monolithBevel" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#fef08a" stopOpacity="0.95" />
        <stop offset="28%" stopColor="#f59e0b" stopOpacity="0.65" />
        <stop offset="100%" stopColor="#78350f" stopOpacity="0.12" />
      </linearGradient>

      {/* Pylon Shadow Flank */}
      <linearGradient id="monolithShadow" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#040508" />
        <stop offset="68%" stopColor="#0a0b14" />
        <stop offset="100%" stopColor="#151724" />
      </linearGradient>

      {/* Grand Staircase Treads Lighting */}
      <linearGradient id="stairTread" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#4a5870" />
        <stop offset="45%" stopColor="#334155" />
        <stop offset="100%" stopColor="#1e293b" />
      </linearGradient>

      {/* Grand Staircase Riser Shadow */}
      <linearGradient id="stairRiser" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#08090e" />
        <stop offset="100%" stopColor="#020305" />
      </linearGradient>

      {/* Reflecting Pool Mirrored Water */}
      <linearGradient id="poolReflect" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#04060d" />
        <stop offset="30%" stopColor="#080b18" />
        <stop offset="60%" stopColor="#101528" />
        <stop offset="85%" stopColor="#151a32" />
        <stop offset="96%" stopColor="#1b1f38" />
        <stop offset="100%" stopColor="#0f1222" />
      </linearGradient>

      {/* Soft Mirrored Corona Water Shimmer Gradient */}
      <radialGradient id="waterCoronaGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
        <stop offset="25%" stopColor="#fef08a" stopOpacity="0.65" />
        <stop offset="55%" stopColor="#f59e0b" stopOpacity="0.32" />
        <stop offset="80%" stopColor="#ea580c" stopOpacity="0.12" />
        <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0" />
      </radialGradient>

      {/* Water Caustics Shimmer */}
      <linearGradient id="causticsHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#fef08a" stopOpacity="0" />
        <stop offset="50%" stopColor="#ffffff" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#fef08a" stopOpacity="0" />
      </linearGradient>

      {/* Brazier Ember Firelight */}
      <radialGradient id="brazierFire" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
        <stop offset="20%" stopColor="#fed7aa" stopOpacity="0.95" />
        <stop offset="50%" stopColor="#ea580c" stopOpacity="0.75" />
        <stop offset="82%" stopColor="#991b1b" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#450a0a" stopOpacity="0" />
      </radialGradient>

      {/* Brazier Flame Water Surface Shimmer Reflection */}
      <radialGradient id="brazierReflect" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.92" />
        <stop offset="25%" stopColor="#fed7aa" stopOpacity="0.8" />
        <stop offset="55%" stopColor="#ea580c" stopOpacity="0.55" />
        <stop offset="85%" stopColor="#9a3412" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#450a0a" stopOpacity="0" />
      </radialGradient>

      {/* Gnomon Obelisk Solar Shadow Penumbra Gradient */}
      <linearGradient id="obeliskPenumbra" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#010204" stopOpacity="0.95" />
        <stop offset="40%" stopColor="#04050a" stopOpacity="0.85" />
        <stop offset="75%" stopColor="#090b14" stopOpacity="0.65" />
        <stop offset="100%" stopColor="#0c0e18" stopOpacity="0.25" />
      </linearGradient>

      {/* ========================================================
          SACRED GEOMETRY, GOLD FOIL & METALLIC ACCENTS
          ======================================================== */}
      <linearGradient id="goldFoil" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fef9c3" />
        <stop offset="20%" stopColor="#facc15" />
        <stop offset="45%" stopColor="#eab308" />
        <stop offset="75%" stopColor="#ca8a04" />
        <stop offset="100%" stopColor="#854d0e" />
      </linearGradient>

      <linearGradient id="goldSheenHorizontal" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#ca8a04" stopOpacity="0.2" />
        <stop offset="35%" stopColor="#fde047" stopOpacity="0.85" />
        <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
        <stop offset="65%" stopColor="#fde047" stopOpacity="0.85" />
        <stop offset="100%" stopColor="#ca8a04" stopOpacity="0.2" />
      </linearGradient>

      {/* Astrolabe Brass Rete Frame Gradient */}
      <linearGradient id="reteBrass" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="30%" stopColor="#eab308" />
        <stop offset="70%" stopColor="#ca8a04" />
        <stop offset="100%" stopColor="#854d0e" />
      </linearGradient>

      {/* Terrace Compass Rose Bronze Gradient */}
      <radialGradient id="compassBronze" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="35%" stopColor="#ca8a04" />
        <stop offset="70%" stopColor="#78350f" />
        <stop offset="100%" stopColor="#291205" />
      </radialGradient>

      {/* Foreground Reading Desk Lantern Warmth */}
      <radialGradient id="lanternWarmth" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
        <stop offset="25%" stopColor="#fef08a" stopOpacity="0.9" />
        <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.45" />
        <stop offset="85%" stopColor="#b45309" stopOpacity="0.12" />
        <stop offset="100%" stopColor="#000000" stopOpacity="0" />
      </radialGradient>

      {/* Ancient Vellum Paper for Star Chart Scroll */}
      <linearGradient id="vellumPaper" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#d6c7a7" />
        <stop offset="35%" stopColor="#f5ebd7" />
        <stop offset="70%" stopColor="#e8dac0" />
        <stop offset="100%" stopColor="#cbb892" />
      </linearGradient>

      {/* Weathered Antique Parchment with Inscribed Grid */}
      <linearGradient id="parchmentAntique" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ede3cb" />
        <stop offset="45%" stopColor="#dfd1b3" />
        <stop offset="85%" stopColor="#c7b593" />
        <stop offset="100%" stopColor="#ad9773" />
      </linearGradient>

      {/* Water Mirror Wave Shimmer Gradient */}
      <linearGradient id="waterRippleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0" />
        <stop offset="30%" stopColor="#fde047" stopOpacity="0.45" />
        <stop offset="50%" stopColor="#ffffff" stopOpacity="0.85" />
        <stop offset="70%" stopColor="#fde047" stopOpacity="0.45" />
        <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
      </linearGradient>

      {/* Outer Border Vignette for Depth */}
      <radialGradient id="vignetteEdge" cx="50%" cy="50%" r="65%">
        <stop offset="0%" stopColor="#000000" stopOpacity="0" />
        <stop offset="65%" stopColor="#000000" stopOpacity="0" />
        <stop offset="84%" stopColor="#000000" stopOpacity="0.38" />
        <stop offset="100%" stopColor="#000000" stopOpacity="0.8" />
      </radialGradient>

      {/* ========================================================
          ARCHITECTURAL PATTERNS
          ======================================================== */}
      {/* Ancient Basalt Masonry Block Joint Pattern */}
      <pattern
        id="masonryBlocks"
        width="160"
        height="60"
        patternUnits="userSpaceOnUse"
      >
        <line x1="0" y1="0" x2="160" y2="0" stroke="#05060b" strokeWidth="1.2" opacity="0.8" />
        <line x1="80" y1="0" x2="80" y2="30" stroke="#05060b" strokeWidth="1.2" opacity="0.8" />
        <line x1="0" y1="30" x2="160" y2="30" stroke="#05060b" strokeWidth="1.2" opacity="0.8" />
        <line x1="0" y1="30" x2="0" y2="60" stroke="#05060b" strokeWidth="1.2" opacity="0.8" />
        <line x1="160" y1="30" x2="160" y2="60" stroke="#05060b" strokeWidth="1.2" opacity="0.8" />
      </pattern>

      {/* ========================================================
          PRECISION CLIP PATHS
          ======================================================== */}
      {/* Reflecting Pool Boundary */}
      <clipPath id="clipPool">
        <polygon points="760,2660 1640,2660 1780,2880 620,2880" />
      </clipPath>

      {/* Central Aperture Ring Cutout */}
      <clipPath id="clipAperture">
        <circle cx="1200" cy="2160" r="320" />
      </clipPath>

      {/* Frame Artwork Boundary */}
      <clipPath id="clipMatteBorder">
        <rect x="60" y="60" width="2280" height="3080" rx="4" />
      </clipPath>

      {/* ========================================================
          FINE PRINT / ETCHING GRAIN FILTER
          ======================================================== */}
      <filter id="subtleEtchGrain" x="0%" y="0%" width="100%" height="100%">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.65"
          numOctaves="3"
          stitchTiles="stitch"
          result="noise"
        />
        <feColorMatrix
          type="matrix"
          values="0.33 0.33 0.33 0 0
                  0.33 0.33 0.33 0 0
                  0.33 0.33 0.33 0 0
                  0 0 0 0.05 0"
          in="noise"
          result="coloredNoise"
        />
        <feBlend mode="overlay" in="SourceGraphic" in2="coloredNoise" />
      </filter>

      {/* Specular Star Flare Glow */}
      <filter id="starGlowFilter" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  );
}

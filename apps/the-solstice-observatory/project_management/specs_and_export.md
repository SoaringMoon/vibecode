# Technical Specifications & PNG Export Pipeline

## Resolution Requirements
- **Specification**: Smallest side of aspect ratio MUST be at least 2000px.
- **Master Canvas**: 2400 × 3200 px (Smallest side = 2400px $\ge$ 2000px).
- **Scale Options**:
  - Standard Master: 2400 × 3200 px (1.0x) -> 7.68 Megapixels
  - Ultra-HD Print: 3600 × 4800 px (1.5x) -> 17.28 Megapixels
  - Archival Gallery: 4800 × 6400 px (2.0x) -> 30.72 Megapixels

## Aliasing and Vector Quality
- `shape-rendering="geometricPrecision"` applied to critical lines, celestial circles, and architectural contours.
- `text-rendering="geometricPrecision"` applied to inscriptions and coordinate labels.
- Canvas 2D rasterization context:
  - `ctx.imageSmoothingEnabled = true`
  - `ctx.imageSmoothingQuality = 'high'`
- Full solid and gradient background rect ensures zero alpha fringing or transparent background artifacts.

## Export Engine Architecture
1. Clones the live SVG DOM or reconstructs SVG XML with all embedded `<defs>`, gradients, and layer groups.
2. Injects standard XML namespaces (`xmlns="http://www.w3.org/2000/svg"`).
3. Converts to an XML Blob with MIME `image/svg+xml;charset=utf-8`.
4. Renders asynchronously onto an off-screen `HTMLCanvasElement` sized to target export dimensions ($W \ge 2000$, $H \ge 2000$).
5. Calls `canvas.toBlob((blob) => { ... }, 'image/png')` for pristine lossless PNG encoding.
6. Generates a download trigger with timestamped/dimensioned filename: `the-solstice-observatory-2400x3200.png`.
7. Cleans up object URLs to prevent memory leaks.

## User Interface & Gallery Display
- Museum-grade viewer with smooth pan & zoom controls (Fit, 50%, 100%, 200%).
- Full-bleed / Matting view modes.
- Layer inspector allowing curatorial isolation of individual SVG layers to inspect vector construction.
- Non-interactive static visual output — no interactive animations.

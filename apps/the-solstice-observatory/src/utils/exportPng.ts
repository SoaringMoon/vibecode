/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ExportResolution {
  id: string;
  label: string;
  multiplier: number;
  width: number;
  height: number;
  megapixels: string;
  recommendedFor: string;
}

export const EXPORT_RESOLUTIONS: ExportResolution[] = [
  {
    id: 'standard-2400',
    label: 'Standard Master (2400 × 3200)',
    multiplier: 1.0,
    width: 2400,
    height: 3200,
    megapixels: '7.68 MP',
    recommendedFor: 'Master Native Resolution (Smallest side: 2400px >= 2000px)',
  },
  {
    id: 'ultra-3600',
    label: 'Ultra HD (3600 × 4800)',
    multiplier: 1.5,
    width: 3600,
    height: 4800,
    megapixels: '17.28 MP',
    recommendedFor: 'Fine Art Giclée Print (Smallest side: 3600px)',
  },
  {
    id: 'archival-4800',
    label: 'Archival Exhibition (4800 × 6400)',
    multiplier: 2.0,
    width: 4800,
    height: 6400,
    megapixels: '30.72 MP',
    recommendedFor: 'Large Format Museum Exhibition (Smallest side: 4800px)',
  },
];

export interface ExportProgress {
  status: 'idle' | 'rendering' | 'encoding' | 'downloading' | 'completed' | 'error';
  progressPercent: number;
  message?: string;
  error?: string;
  outputDetails?: {
    filename: string;
    width: number;
    height: number;
    fileSizeBytes: number;
  };
}

/**
 * Exports the artwork SVG to a pristine, high-resolution PNG image.
 * Guarantees smallest dimension is at least 2000px.
 */
export async function exportArtworkToPng(
  svgElementId: string,
  resolution: ExportResolution = EXPORT_RESOLUTIONS[0],
  onProgress?: (progress: ExportProgress) => void,
): Promise<{ filename: string; blob: Blob; width: number; height: number }> {
  try {
    onProgress?.({
      status: 'rendering',
      progressPercent: 20,
      message: `Preparing vector DOM for ${resolution.width} × ${resolution.height} px rasterization...`,
    });

    const svgEl = document.getElementById(svgElementId);
    if (!svgEl) {
      throw new Error(`SVG element with ID "${svgElementId}" not found in DOM.`);
    }

    // Clone the SVG node so modifications don't alter the live UI
    const clonedSvg = svgEl.cloneNode(true) as SVGSVGElement;
    clonedSvg.setAttribute('width', `${resolution.width}`);
    clonedSvg.setAttribute('height', `${resolution.height}`);
    clonedSvg.setAttribute('viewBox', '0 0 2400 3200');
    clonedSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    clonedSvg.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');

    // Embed Google Fonts @import inside the exported SVG for standalone fidelity
    const fontStyleElement = document.createElement('style');
    fontStyleElement.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
      .font-serif-display { font-family: 'Cinzel', Georgia, serif; }
      .font-mono-data { font-family: 'JetBrains Mono', monospace; font-variant-numeric: tabular-nums; }
    `;
    clonedSvg.insertBefore(fontStyleElement, clonedSvg.firstChild);

    // Serialize SVG to XML string
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(clonedSvg);
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const blobUrl = URL.createObjectURL(svgBlob);

    onProgress?.({
      status: 'rendering',
      progressPercent: 50,
      message: 'Rasterizing vector paths to off-screen canvas with high-precision smoothing...',
    });

    // Load SVG into Image object
    const img = new Image();
    img.crossOrigin = 'anonymous';

    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error('Failed to load serialized SVG vector data into raster image.'));
      img.src = blobUrl;
    });

    // Create high-precision offscreen canvas
    const canvas = document.createElement('canvas');
    canvas.width = resolution.width;
    canvas.height = resolution.height;
    const ctx = canvas.getContext('2d', { alpha: false });

    if (!ctx) {
      throw new Error('Canvas 2D rendering context could not be initialized.');
    }

    // Configure high-fidelity anti-aliasing and smoothing
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Base fill with obsidian zenith to eliminate transparent seam fringe
    ctx.fillStyle = '#04050d';
    ctx.fillRect(0, 0, resolution.width, resolution.height);

    // Render image
    ctx.drawImage(img, 0, 0, resolution.width, resolution.height);

    // Revoke vector blob URL
    URL.revokeObjectURL(blobUrl);

    onProgress?.({
      status: 'encoding',
      progressPercent: 85,
      message: 'Encoding lossless PNG data...',
    });

    // Convert Canvas to PNG Blob
    const pngBlob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Failed to encode canvas into PNG format.'));
        }
      }, 'image/png');
    });

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `the-solstice-observatory-${resolution.width}x${resolution.height}-${timestamp}.png`;

    onProgress?.({
      status: 'downloading',
      progressPercent: 95,
      message: 'Triggering browser file download...',
    });

    // Trigger download
    const downloadUrl = URL.createObjectURL(pngBlob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up
    setTimeout(() => {
      URL.revokeObjectURL(downloadUrl);
    }, 15000);

    onProgress?.({
      status: 'completed',
      progressPercent: 100,
      message: `Export successful! Saved ${filename} (${(pngBlob.size / (1024 * 1024)).toFixed(2)} MB).`,
      outputDetails: {
        filename,
        width: resolution.width,
        height: resolution.height,
        fileSizeBytes: pngBlob.size,
      },
    });

    return {
      filename,
      blob: pngBlob,
      width: resolution.width,
      height: resolution.height,
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown export error';
    onProgress?.({
      status: 'error',
      progressPercent: 0,
      error: errorMsg,
    });
    throw err;
  }
}

/**
 * Cloudinary URL Utilities
 *
 * Adds smart transformations to any Cloudinary URL so images are:
 *  - Resized to the display width (no giant raw files)
 *  - Auto-format (WebP/AVIF where supported)
 *  - Auto-quality (Cloudinary optimises compression)
 *
 * Usage:
 *   import { cldUrl, cldThumb } from '../utils/cloudinaryUrl';
 *
 *   cldUrl(photo.image, 800)      → web-optimised 800px-wide version
 *   cldThumb(photo.image)          → tiny 20px blur placeholder
 */

const CLD_BASE = 'https://res.cloudinary.com/qs6oltzi/image/upload/';

/**
 * Inject Cloudinary transformation parameters into a secure_url.
 * Works only on qs6oltzi Cloudinary URLs; passes everything else through unchanged.
 */
export function cldUrl(url, width = 1200, quality = 'auto', format = 'auto') {
  if (!url || !url.includes('res.cloudinary.com/qs6oltzi/image/upload/')) return url;
  const transforms = `w_${width},q_${quality},f_${format},c_limit`;
  return url.replace(CLD_BASE, `${CLD_BASE}${transforms}/`);
}

/**
 * Tiny 20px placeholder used for the blur-up effect.
 * Small enough to arrive almost instantly, blurred in CSS.
 */
export function cldThumb(url) {
  if (!url || !url.includes('res.cloudinary.com/qs6oltzi/image/upload/')) return url;
  return url.replace(CLD_BASE, `${CLD_BASE}w_20,q_10,f_auto,e_blur:400/`);
}

/**
 * Cover image size for the Photography section cards.
 * Landscape/portrait cropped to 800px wide.
 */
export function cldCover(url) {
  return cldUrl(url, 800);
}

/**
 * Gallery grid thumbnail — fits comfortably in the 430px tall grid cards.
 */
export function cldGrid(url) {
  return cldUrl(url, 700);
}

/**
 * Full-screen lightbox image — high quality, up to 1600px.
 */
export function cldFull(url) {
  return cldUrl(url, 1600);
}

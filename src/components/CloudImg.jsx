import { useState } from 'react';
import { cldThumb } from '../utils/cloudinaryUrl';

/**
 * CloudImg — Blur-up image component for Cloudinary images.
 *
 * How it works:
 *  1. A tiny 20px placeholder (blurred via CSS) is shown instantly.
 *  2. The full-res image loads in the background (invisible).
 *  3. Once loaded, it fades in over the placeholder — no pixel pop.
 *
 * Props mirror a standard <img> element, plus:
 *  - `src`       Full-resolution Cloudinary URL (already transformed by caller)
 *  - `thumb`     Optional override for the placeholder URL. Defaults to auto-generated thumb.
 *  - `className` Applied to the container <div>
 *  - `imgClass`  Applied to the <img> elements
 *  - All other props (alt, loading, etc.) forwarded to the real <img>
 */
export default function CloudImg({
  src,
  thumb,
  alt = '',
  className = '',
  imgClass = 'w-full h-full object-cover object-center',
  ...rest
}) {
  const [loaded, setLoaded] = useState(false);
  const placeholder = thumb || cldThumb(src);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Blurred placeholder — always visible until real image loads */}
      <img
        src={placeholder}
        alt=""
        aria-hidden="true"
        className={`absolute inset-0 ${imgClass} scale-110 blur-xl transition-opacity duration-500 ${
          loaded ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Real image — fades in once loaded */}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={`relative ${imgClass} transition-opacity duration-700 ease-out ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        {...rest}
      />
    </div>
  );
}

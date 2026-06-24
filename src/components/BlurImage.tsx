"use client";

import { useState } from "react";

interface BlurImageProps {
  src: string;
  alt: string;
  accent: string;
  className?: string;
  priority?: boolean;
}

/**
 * Lightweight blur-up image. Renders an accent-colored placeholder with a
 * subtle shimmer, then cross-fades the artwork in once it has loaded.
 * Uses a plain <img> so the prototype is bulletproof on any host without
 * image-optimizer configuration.
 */
export default function BlurImage({
  src,
  alt,
  accent,
  className = "",
  priority = false,
}: BlurImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`relative h-full w-full overflow-hidden ${className}`}
      style={{ backgroundColor: accent }}
    >
      {!loaded && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-black/20" />
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover transition-all duration-700 ease-out ${
          loaded ? "scale-100 opacity-100 blur-0" : "scale-105 opacity-0 blur-xl"
        }`}
      />
    </div>
  );
}

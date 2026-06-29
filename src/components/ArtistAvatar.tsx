"use client";

import { useState } from "react";

interface ArtistAvatarProps {
  /** Resolved picture URL (portrait or representative artwork). */
  src?: string;
  /** Fallback shown while loading, on error, or when there is no picture. */
  initials: string;
  /** Sizing + shape applied to the wrapper (e.g. "h-11 w-11 rounded-full"). */
  className?: string;
  /** Background + text styles for the initials fallback layer. */
  fallbackClassName?: string;
  /** Inline styles for the wrapper (e.g. a per-artist accent background). */
  style?: React.CSSProperties;
}

/**
 * Circular artist profile picture with a graceful initials fallback. The
 * initials always render underneath, so a slow or broken image never leaves an
 * empty/broken circle — it simply reveals the initials.
 */
export default function ArtistAvatar({
  src,
  initials,
  className = "",
  fallbackClassName = "bg-white/12 text-white",
  style,
}: ArtistAvatarProps) {
  const [failed, setFailed] = useState(false);
  const showImage = !!src && !failed;

  return (
    <span
      style={style}
      className={`relative flex items-center justify-center overflow-hidden ${fallbackClassName} ${className}`}
    >
      <span aria-hidden className="select-none">
        {initials}
      </span>
      {showImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt=""
          aria-hidden
          decoding="async"
          loading="lazy"
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
    </span>
  );
}

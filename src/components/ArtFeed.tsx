"use client";

import { useCallback, useRef } from "react";
import { artworks, getArtist } from "@/data";
import ArtworkCard from "./ArtworkCard";
import type { ToastState } from "./Toast";
import type { TutorialBridge } from "./tutorial";

interface ArtFeedProps {
  showToast: (message: string, variant?: ToastState["variant"]) => void;
  onOpenArtist: (artistId: string) => void;
  onCleanChange: (clean: boolean) => void;
  tutorial?: TutorialBridge;
}

export default function ArtFeed({
  showToast,
  onOpenArtist,
  onCleanChange,
  tutorial,
}: ArtFeedProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastScrollTop = useRef(0);

  // Lock vertical scrolling except on the step that teaches it, so the user
  // stays on the artwork while learning the other gestures.
  const lockScroll = !!tutorial?.active && tutorial.allow !== "scroll";
  const scrollStep = !!tutorial?.active && tutorial.allow === "scroll";

  const handleScroll = useCallback(() => {
    if (!scrollStep) return;
    const el = scrollRef.current;
    if (!el) return;

    const delta = Math.abs(el.scrollTop - lastScrollTop.current);
    if (delta < 24) return;

    lastScrollTop.current = el.scrollTop;
    tutorial?.report("scroll");
  }, [scrollStep, tutorial]);

  return (
    <div
      ref={scrollRef}
      onScroll={handleScroll}
      className={`h-full w-full snap-y snap-mandatory overscroll-contain scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
        lockScroll ? "overflow-hidden" : "overflow-y-scroll"
      }`}
    >
      {artworks.map((artwork, index) => {
        const artist = getArtist(artwork.artistId)!;
        return (
          <ArtworkCard
            key={artwork.id}
            artwork={artwork}
            artist={artist}
            priority={index === 0}
            showToast={showToast}
            onOpenArtist={onOpenArtist}
            onCleanChange={onCleanChange}
            tutorial={tutorial}
          />
        );
      })}
    </div>
  );
}

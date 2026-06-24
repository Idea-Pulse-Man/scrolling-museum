"use client";

import { artworks, getArtist } from "@/data";
import ArtworkCard from "./ArtworkCard";
import type { ToastState } from "./Toast";

interface ArtFeedProps {
  showToast: (message: string, variant?: ToastState["variant"]) => void;
  onOpenArtist: (artistId: string) => void;
  onCleanChange: (clean: boolean) => void;
}

export default function ArtFeed({
  showToast,
  onOpenArtist,
  onCleanChange,
}: ArtFeedProps) {
  return (
    <div className="h-full w-full snap-y snap-mandatory overflow-y-scroll overscroll-contain scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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
          />
        );
      })}
    </div>
  );
}

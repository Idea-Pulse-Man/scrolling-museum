"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Artwork, Artist } from "@/data";
import BlurImage from "./BlurImage";
import ActionRail from "./ActionRail";
import HistoryPlacard from "./HistoryPlacard";
import { ChevronUpIcon } from "./Icons";
import type { ToastState } from "./Toast";

interface ArtworkCardProps {
  artwork: Artwork;
  artist: Artist;
  priority?: boolean;
  showToast: (message: string, variant?: ToastState["variant"]) => void;
  onOpenArtist: (artistId: string) => void;
  onCleanChange: (clean: boolean) => void;
}

export default function ArtworkCard({
  artwork,
  artist,
  priority = false,
  showToast,
  onOpenArtist,
  onCleanChange,
}: ArtworkCardProps) {
  const [placardOpen, setPlacardOpen] = useState(false);
  const [clean, setClean] = useState(false);
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startPos = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    onCleanChange(clean);
  }, [clean, onCleanChange]);

  const clearHold = () => {
    if (holdTimer.current) {
      clearTimeout(holdTimer.current);
      holdTimer.current = null;
    }
  };

  const exitClean = () => {
    clearHold();
    setClean(false);
  };

  // Long-press the artwork to enter "clean art" mode (hides all chrome),
  // mirroring the "hold down to get rid of side bar" note in the sketch.
  const handlePointerDown = (e: React.PointerEvent) => {
    if (placardOpen) return;
    startPos.current = { x: e.clientX, y: e.clientY };
    clearHold();
    holdTimer.current = setTimeout(() => setClean(true), 320);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!startPos.current) return;
    const dx = Math.abs(e.clientX - startPos.current.x);
    const dy = Math.abs(e.clientY - startPos.current.y);
    if (dx > 8 || dy > 8) clearHold();
  };

  return (
    <section className="relative h-full min-h-0 w-full snap-start snap-always overflow-hidden bg-ink">
      {/* Artwork */}
      <div
        className="absolute inset-0"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={exitClean}
        onPointerLeave={exitClean}
        onPointerCancel={exitClean}
      >
        <BlurImage
          src={artwork.image}
          alt={`${artwork.title} by ${artist.name}`}
          accent={artwork.accent}
          priority={priority}
        />
      </div>

      {/* Readability gradients */}
      <AnimatePresence>
        {!clean && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="pointer-events-none absolute inset-0"
          >
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/55 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chrome: metadata, rail, history prompt */}
      <AnimatePresence>
        {!clean && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ActionRail showToast={showToast} />

            {/* Metadata */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 p-5 pb-24">
              <div className="pointer-events-auto max-w-[78%]">
                <div className="mb-2.5 flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-emerald-300/30 bg-emerald-400/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-200">
                    Public Domain
                  </span>
                  <span className="rounded-full border border-white/15 bg-white/10 px-2.5 py-0.5 text-[10px] font-medium tracking-wide text-white/80 backdrop-blur-md">
                    {artwork.source}
                  </span>
                </div>

                <h2 className="font-serif text-[28px] leading-[1.1] text-white drop-shadow">
                  {artwork.title}
                </h2>

                <button
                  onClick={() => onOpenArtist(artist.id)}
                  className="mt-1.5 inline-flex items-center gap-2 text-[15px] text-white/85 transition-colors hover:text-white"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15 text-[10px] font-semibold backdrop-blur-md">
                    {artist.initials}
                  </span>
                  <span className="underline-offset-4 hover:underline">
                    {artist.name}
                  </span>
                  <span className="text-white/45">· {artwork.year}</span>
                </button>
              </div>
            </div>

            {/* Swipe up for history */}
            <div className="pointer-events-none absolute inset-x-0 bottom-7 z-30 flex justify-center">
              <motion.button
                onClick={() => setPlacardOpen(true)}
                whileTap={{ scale: 0.96 }}
                className="pointer-events-auto flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-4 py-2 text-xs font-medium text-white/90 backdrop-blur-md"
              >
                <motion.span
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ChevronUpIcon className="h-4 w-4" />
                </motion.span>
                Swipe up for history
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <HistoryPlacard
        artwork={artwork}
        artist={artist}
        open={placardOpen}
        onClose={() => setPlacardOpen(false)}
      />
    </section>
  );
}

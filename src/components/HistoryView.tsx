"use client";

import { motion } from "framer-motion";
import { artworks, getArtist, historyEras } from "@/data";
import BlurImage from "./BlurImage";

interface HistoryViewProps {
  onOpenArtist: (artistId: string) => void;
}

export default function HistoryView({ onOpenArtist }: HistoryViewProps) {
  const artworkMap = Object.fromEntries(artworks.map((a) => [a.id, a]));

  return (
    <div className="h-full overflow-y-auto overscroll-contain scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="px-5 pb-10 pt-[calc(env(safe-area-inset-top)+6.5rem)]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
          Timeline
        </p>
        <h1 className="mt-2 font-serif text-[28px] leading-tight text-white">
          Art History
        </h1>
        <p className="mt-2 max-w-[90%] text-[15px] leading-relaxed text-white/60">
          Explore masterpieces organized by era — from the Renaissance to the
          dawn of modern art.
        </p>

        <div className="relative mt-8 space-y-10">
          <div className="absolute bottom-0 left-[7px] top-0 w-px bg-white/10" />

          {historyEras.map((era, eraIndex) => (
            <motion.section
              key={era.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: eraIndex * 0.06, duration: 0.35 }}
              className="relative pl-7"
            >
              <div className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-white/30 bg-ink ring-4 ring-ink" />

              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-300/80">
                {era.years}
              </p>
              <h2 className="mt-1 font-serif text-xl text-white">{era.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/55">
                {era.description}
              </p>

              <div className="mt-4 space-y-3">
                {era.artworkIds.map((id) => {
                  const artwork = artworkMap[id];
                  if (!artwork) return null;
                  const artist = getArtist(artwork.artistId)!;

                  return (
                    <button
                      key={id}
                      onClick={() => onOpenArtist(artist.id)}
                      className="group flex w-full items-center gap-3 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-2 text-left transition-colors hover:border-white/20 hover:bg-white/[0.06]"
                    >
                      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                        <BlurImage
                          src={artwork.image}
                          alt={artwork.title}
                          accent={artwork.accent}
                        />
                      </div>
                      <div className="min-w-0 flex-1 pr-2">
                        <p className="truncate font-serif text-[15px] text-white">
                          {artwork.title}
                        </p>
                        <p className="mt-0.5 truncate text-xs text-white/50">
                          {artist.name} · {artwork.year}
                        </p>
                        <p className="mt-1 truncate text-[11px] text-white/40">
                          {artwork.medium}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.section>
          ))}
        </div>
      </div>
    </div>
  );
}

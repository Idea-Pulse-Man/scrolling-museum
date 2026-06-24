"use client";

import { AnimatePresence, motion } from "framer-motion";
import { getArtworksByArtist, type Artist } from "@/data";
import BlurImage from "./BlurImage";
import { CloseIcon } from "./Icons";

interface ArtistProfileModalProps {
  artist: Artist | null;
  onClose: () => void;
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45">
        {label}
      </p>
      <p className="mt-1 text-sm text-white/85">{value}</p>
    </div>
  );
}

export default function ArtistProfileModal({
  artist,
  onClose,
}: ArtistProfileModalProps) {
  const works = artist ? getArtworksByArtist(artist.id) : [];

  return (
    <AnimatePresence>
      {artist && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0 z-[60] overflow-y-auto bg-ink"
        >
          {/* Hero */}
          <div className="relative h-60 w-full overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(120% 90% at 30% 10%, rgba(255,255,255,0.10), rgba(10,10,11,0.2)), linear-gradient(160deg, #2a2a30, #0a0a0b)`,
              }}
            />
            <div className="absolute inset-0 flex items-end p-6">
              <div className="flex items-end gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/15 bg-white/10 font-serif text-2xl text-white shadow-rail backdrop-blur-md">
                  {artist.initials}
                </div>
                <div className="pb-1">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
                    Artist
                  </p>
                  <h2 className="mt-1 font-serif text-3xl leading-none text-white">
                    {artist.name}
                  </h2>
                  <p className="mt-2 text-sm text-white/60">
                    {artist.nationality} · {artist.lifespan}
                  </p>
                </div>
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              aria-label="Close artist profile"
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/30 text-white backdrop-blur-md"
            >
              <CloseIcon className="h-5 w-5" />
            </motion.button>
          </div>

          {/* Body */}
          <div className="px-6 pb-12">
            <div className="grid grid-cols-2 gap-x-4 gap-y-5 border-b border-white/10 py-6">
              <Stat label="Period" value={artist.period} />
              <Stat label="Style" value={artist.style} />
              <div className="col-span-2">
                <Stat label="Known for" value={artist.knownFor} />
              </div>
            </div>

            <h3 className="mt-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">
              Biography
            </h3>
            <p className="mt-2 text-[15px] leading-relaxed text-white/75">
              {artist.bio}
            </p>

            <div className="mt-8 flex items-baseline justify-between">
              <h3 className="font-serif text-xl text-white">Works in collection</h3>
              <span className="text-xs text-white/45">
                {works.length} {works.length === 1 ? "piece" : "pieces"}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              {works.map((work) => (
                <div
                  key={work.id}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
                >
                  <div className="aspect-[3/4] w-full">
                    <BlurImage
                      src={work.image}
                      alt={work.title}
                      accent={work.accent}
                      className="transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-3">
                    <p className="truncate font-serif text-sm text-white">
                      {work.title}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-white/50">
                      {work.year} · {work.medium}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

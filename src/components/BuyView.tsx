"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { artworks, getArtist, shopItems, type PrintFormat } from "@/data";
import BlurImage from "./BlurImage";
import type { ToastState } from "./Toast";

interface BuyViewProps {
  showToast: (message: string, variant?: ToastState["variant"]) => void;
}

const FORMATS: PrintFormat[] = ["Poster", "Framed Print", "Canvas"];

export default function BuyView({ showToast }: BuyViewProps) {
  const [format, setFormat] = useState<PrintFormat>("Poster");
  const [cartCount, setCartCount] = useState(0);

  const items = useMemo(
    () => shopItems.filter((item) => item.format === format),
    [format]
  );

  const addToCart = (title: string) => {
    setCartCount((c) => c + 1);
    showToast(`${title} added to cart`);
  };

  return (
    <div className="h-full overflow-y-auto overscroll-contain scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="px-5 pb-10 pt-[calc(env(safe-area-inset-top)+6.5rem)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
              Museum Shop
            </p>
            <h1 className="mt-2 font-serif text-[28px] leading-tight text-white">
              Own the Art
            </h1>
            <p className="mt-2 max-w-[90%] text-[15px] leading-relaxed text-white/60">
              Museum-quality prints of public-domain masterpieces, shipped to your
              door.
            </p>
          </div>
          {cartCount > 0 && (
            <span className="mt-8 shrink-0 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
              Cart · {cartCount}
            </span>
          )}
        </div>

        <div className="mt-6 flex gap-2">
          {FORMATS.map((f) => (
            <button
              key={f}
              onClick={() => setFormat(f)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                format === f
                  ? "bg-white text-ink"
                  : "border border-white/15 bg-white/5 text-white/70 hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          {items.map((item, index) => {
            const artwork = artworks.find((a) => a.id === item.artworkId)!;
            const artist = getArtist(artwork.artistId)!;

            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04, duration: 0.3 }}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
              >
                <div className="aspect-[3/4] w-full">
                  <BlurImage
                    src={artwork.image}
                    alt={artwork.title}
                    accent={artwork.accent}
                  />
                </div>
                <div className="p-3">
                  <p className="truncate font-serif text-sm text-white">
                    {artwork.title}
                  </p>
                  <p className="mt-0.5 truncate text-[11px] text-white/45">
                    {artist.name}
                  </p>
                  <p className="mt-2 text-[10px] uppercase tracking-wide text-white/40">
                    {item.size}
                  </p>
                  <div className="mt-2 flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-white">
                      ${item.price}
                    </span>
                    <button
                      onClick={() => addToCart(artwork.title)}
                      className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-ink transition-transform active:scale-95"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getArtist, type Artist } from "@/data";
import TopTabs, { type Tab } from "./TopTabs";
import ArtFeed from "./ArtFeed";
import HistoryView from "./HistoryView";
import BuyView from "./BuyView";
import CreateView from "./CreateView";
import ArtistProfileModal from "./ArtistProfileModal";
import Toast, { type ToastState } from "./Toast";

export default function MobileShell() {
  const [toast, setToast] = useState<ToastState | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("For You");
  const [activeArtist, setActiveArtist] = useState<Artist | null>(null);
  const [clean, setClean] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback(
    (message: string, variant: ToastState["variant"] = "default") => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
      setToast({ id: Date.now(), message, variant });
      toastTimer.current = setTimeout(() => setToast(null), 2200);
    },
    []
  );

  const openArtist = useCallback((artistId: string) => {
    const artist = getArtist(artistId);
    if (artist) setActiveArtist(artist);
  }, []);

  const handleTabChange = useCallback((tab: Tab) => {
    setActiveTab(tab);
    setClean(false);
  }, []);

  return (
    <div className="flex min-h-[100dvh] w-full items-center justify-center bg-neutral-950 sm:bg-neutral-900 sm:py-6">
      {/* Phone frame (visible on larger screens) */}
      <div className="relative h-[100dvh] w-full overflow-hidden bg-ink sm:h-[844px] sm:w-[390px] sm:rounded-[44px] sm:border-[10px] sm:border-neutral-800 sm:shadow-2xl">
        {/* Brand mark */}
        <AnimatePresence>
          {!clean && activeTab === "For You" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pointer-events-none absolute left-1/2 top-[calc(env(safe-area-inset-top)+1.5rem)] z-40 flex -translate-x-1/2 items-center gap-1.5"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[11px] font-bold text-ink">
                S
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/85">
                Museum
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!clean && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              <TopTabs active={activeTab} onChange={handleTabChange} />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {activeTab === "For You" && (
            <motion.div
              key="for-you"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0"
            >
              <ArtFeed
                showToast={showToast}
                onOpenArtist={openArtist}
                onCleanChange={setClean}
              />
            </motion.div>
          )}

          {activeTab === "History" && (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 bg-ink"
            >
              <HistoryView onOpenArtist={openArtist} />
            </motion.div>
          )}

          {activeTab === "Buy" && (
            <motion.div
              key="buy"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 bg-ink"
            >
              <BuyView showToast={showToast} />
            </motion.div>
          )}

          {activeTab === "Create" && (
            <motion.div
              key="create"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 bg-ink"
            >
              <CreateView showToast={showToast} />
            </motion.div>
          )}
        </AnimatePresence>

        <Toast toast={toast} />

        <ArtistProfileModal
          artist={activeArtist}
          onClose={() => setActiveArtist(null)}
        />
      </div>
    </div>
  );
}

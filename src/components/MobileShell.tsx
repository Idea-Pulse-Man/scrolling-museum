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
import TutorialCoach from "./TutorialCoach";
import Toast, { type ToastState } from "./Toast";
import type { TutorialAction } from "./tutorial";

// The gesture each tutorial step teaches, in order.
const TUTORIAL_ALLOW: TutorialAction[] = [
  "scroll",
  "placard",
  "artist",
  "fit",
  "clean",
];

export default function MobileShell() {
  const [toast, setToast] = useState<ToastState | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("For You");
  const [activeArtist, setActiveArtist] = useState<Artist | null>(null);
  const [clean, setClean] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Interactive, learn-by-doing tutorial. Mock-only with no persistence — it
  // restarts on refresh. The user performs each real gesture to advance.
  const [tutorialActive, setTutorialActive] = useState(true);
  const [tutorialStep, setTutorialStep] = useState(0);
  const [resetToken, setResetToken] = useState(0);
  // True during the brief pause after a correct gesture, before the next step
  // appears — used to show a "got it" confirmation so the wait feels responsive.
  const [advancing, setAdvancing] = useState(false);
  const advancingRef = useRef(false);

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

  const handleTabChange = useCallback(
    (tab: Tab) => {
      if (tutorialActive) return;
      setActiveTab(tab);
      setClean(false);
    },
    [tutorialActive]
  );

  const endTutorial = useCallback(() => {
    setTutorialActive(false);
    setActiveArtist(null);
    setResetToken((t) => t + 1); // return the feed to a neutral state
  }, []);

  // Advance the tutorial when the user performs the gesture the current step
  // is teaching. We let the real result show briefly, then move on (closing any
  // sheet/modal so the next gesture isn't blocked).
  const reportGesture = useCallback(
    (action: TutorialAction) => {
      if (!tutorialActive || advancingRef.current) return;
      if (action !== TUTORIAL_ALLOW[tutorialStep]) return;

      advancingRef.current = true;
      setAdvancing(true);
      const advance = () => {
        setTutorialStep((s) => s + 1);
        advancingRef.current = false;
        setAdvancing(false);
      };

      switch (action) {
        case "scroll":
          setTimeout(advance, 650);
          break;
        case "placard":
          setTimeout(() => {
            setResetToken((t) => t + 1); // close the placard
            advance();
          }, 1200);
          break;
        case "artist":
          setTimeout(() => {
            setActiveArtist(null); // close the artist profile
            advance();
          }, 1200);
          break;
        case "fit":
          setTimeout(advance, 1000);
          break;
        case "clean":
          setTimeout(advance, 800);
          break;
      }
    },
    [tutorialActive, tutorialStep]
  );

  const tutorialBridge = {
    active: tutorialActive,
    allow: tutorialActive ? TUTORIAL_ALLOW[tutorialStep] ?? null : null,
    report: reportGesture,
    resetToken,
  };

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
              className={tutorialActive ? "pointer-events-none" : undefined}
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
                tutorial={tutorialBridge}
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

        <TutorialCoach
          open={tutorialActive}
          step={tutorialStep}
          advancing={advancing}
          onSkip={endTutorial}
          onStart={endTutorial}
        />
      </div>
    </div>
  );
}

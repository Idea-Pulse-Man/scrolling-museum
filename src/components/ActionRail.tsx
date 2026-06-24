"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Artist } from "@/data";
import {
  HeartIcon,
  BookmarkIcon,
  DownloadIcon,
  CommentIcon,
  PlusIcon,
  MinusIcon,
} from "./Icons";
import type { ToastState } from "./Toast";

interface ActionRailProps {
  artist: Artist;
  onOpenComments: () => void;
  showToast: (message: string, variant?: ToastState["variant"]) => void;
}

function RailButton({
  label,
  active,
  activeColor,
  onClick,
  children,
}: {
  label: string;
  active?: boolean;
  activeColor?: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <motion.button
        whileTap={{ scale: 0.82 }}
        onClick={onClick}
        aria-label={label}
        className={`flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/25 backdrop-blur-md transition-colors ${
          active ? activeColor : "text-white hover:bg-black/40"
        }`}
      >
        {children}
      </motion.button>
    </div>
  );
}

export default function ActionRail({
  artist,
  onOpenComments,
  showToast,
}: ActionRailProps) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [following, setFollowing] = useState(false);

  return (
    <div className="absolute bottom-36 right-3 z-40 flex flex-col items-center gap-4">
      {/* 1. Follow / unfollow */}
      <div className="flex flex-col items-center gap-1.5">
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={() => setFollowing((v) => !v)}
          aria-label={following ? `Unfollow ${artist.name}` : `Follow ${artist.name}`}
          aria-pressed={following}
          className="relative flex h-11 w-11 items-center justify-center rounded-full bg-black/25 text-[13px] font-semibold tracking-wide text-white ring-1 ring-white/30 backdrop-blur-md transition-colors hover:ring-white/60"
        >
          {artist.initials}

          {/* Follow indicator — inverts colour and morphs + ↔ − */}
          <motion.span
            animate={{
              backgroundColor: following ? "rgba(255,255,255,0.16)" : "#ffffff",
              color: following ? "#ffffff" : "#0a0a0b",
            }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -bottom-0.5 -right-0.5 flex h-[18px] w-[18px] items-center justify-center rounded-full shadow-[0_1px_4px_rgba(0,0,0,0.35)] ring-1 ring-white/40 backdrop-blur-md"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={following ? "following" : "follow"}
                initial={{ rotate: -90, scale: 0.4, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: 90, scale: 0.4, opacity: 0 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center justify-center"
              >
                {following ? (
                  <MinusIcon className="h-2.5 w-2.5" />
                ) : (
                  <PlusIcon className="h-2.5 w-2.5" />
                )}
              </motion.span>
            </AnimatePresence>
          </motion.span>
        </motion.button>
      </div>

      {/* 2. Like */}
      <RailButton
        label="Like"
        active={liked}
        activeColor="text-rose-500 bg-rose-500/15 border-rose-500/30"
        onClick={() => setLiked((v) => !v)}
      >
        <motion.span
          key={liked ? "liked" : "unliked"}
          animate={liked ? { scale: [1, 1.35, 1] } : {}}
          transition={{ duration: 0.4 }}
        >
          <HeartIcon filled={liked} className="h-5 w-5" />
        </motion.span>
      </RailButton>

      {/* 3. Comments / Art Discussion */}
      <RailButton label="Art discussion" onClick={onOpenComments}>
        <CommentIcon className="h-5 w-5" />
      </RailButton>

      {/* 4. Bookmark / Save */}
      <RailButton
        label="Save"
        active={saved}
        activeColor="text-amber-300 bg-amber-300/15 border-amber-300/30"
        onClick={() => setSaved((v) => !v)}
      >
        <BookmarkIcon filled={saved} className="h-5 w-5" />
      </RailButton>

      {/* 5. Download */}
      <RailButton
        label="Download"
        onClick={() => showToast("Artwork saved to device")}
      >
        <DownloadIcon className="h-5 w-5" />
      </RailButton>
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  HeartIcon,
  BookmarkIcon,
  DownloadIcon,
  ShareIcon,
} from "./Icons";
import type { ToastState } from "./Toast";

interface ActionRailProps {
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

export default function ActionRail({ showToast }: ActionRailProps) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <div className="absolute bottom-36 right-3 z-30 flex flex-col items-center gap-4">
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

      <RailButton
        label="Save"
        active={saved}
        activeColor="text-amber-300 bg-amber-300/15 border-amber-300/30"
        onClick={() => setSaved((v) => !v)}
      >
        <BookmarkIcon filled={saved} className="h-5 w-5" />
      </RailButton>

      <RailButton
        label="Download"
        onClick={() => showToast("Artwork saved to device")}
      >
        <DownloadIcon className="h-5 w-5" />
      </RailButton>

      <RailButton
        label="Share"
        onClick={() => showToast("Share link copied", "link")}
      >
        <ShareIcon className="h-5 w-5" />
      </RailButton>
    </div>
  );
}

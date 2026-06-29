"use client";

import { motion } from "framer-motion";
import type { Artist, ArtworkOrigin } from "@/data";
import { getArtistAvatar } from "@/data";
import ArtistAvatar from "./ArtistAvatar";
import {
  HeartIcon,
  DownloadIcon,
  CommentIcon,
  ShareIcon,
  MaximizeIcon,
  MinimizeIcon,
  BookmarkIcon,
} from "./Icons";
import { useAppState } from "./AppState";
import type { ToastState } from "./Toast";

interface ActionRailProps {
  artist: Artist;
  artworkId: string;
  artworkTitle: string;
  artworkOrigin: ArtworkOrigin;
  /** Opens the artist profile (the rail's top button is profile-only). */
  onOpenArtist: () => void;
  onOpenComments: () => void;
  showToast: (message: string, variant?: ToastState["variant"]) => void;
  /** Current framing: "cover" = Fill Screen, "contain" = Fit Art. */
  fit: "cover" | "contain";
  /** Toggle between Fill Screen and Fit Art (no toast — purely visual). */
  onToggleFit: () => void;
  /** Subtle highlight used while the tutorial explains the quick actions. */
  highlight?: boolean;
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
        aria-pressed={active}
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
  artworkId,
  artworkTitle,
  artworkOrigin,
  onOpenArtist,
  onOpenComments,
  showToast,
  fit,
  onToggleFit,
  highlight = false,
}: ActionRailProps) {
  const { isLiked, toggleLiked, isSaved, toggleSaved } = useAppState();

  const liked = isLiked(artworkId);
  const saved = isSaved(artworkId);
  const filling = fit === "cover";

  // Share uses the native share sheet when available, otherwise copies a link.
  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({
          title: artworkTitle,
          text: `${artworkTitle} — on Narsil`,
          url,
        });
        return;
      }
      if (typeof navigator !== "undefined" && navigator.clipboard && url) {
        await navigator.clipboard.writeText(url);
        showToast("Link copied to clipboard");
        return;
      }
      showToast("Sharing isn't available here");
    } catch {
      // User dismissed the native share sheet — no toast needed.
    }
  };

  return (
    <div
      className={`absolute bottom-44 right-3 z-40 flex flex-col items-center gap-4 rounded-full p-1 transition-shadow ${
        highlight ? "ring-2 ring-white/60 shadow-[0_0_30px_rgba(255,255,255,0.35)]" : ""
      }`}
    >
      {/* 1. Artist profile — tap to open the artist's profile. */}
      <div className="flex flex-col items-center gap-1.5">
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={onOpenArtist}
          aria-label={`View ${artist.name}'s profile`}
          className="relative flex h-11 w-11 items-center justify-center rounded-full text-[13px] font-semibold tracking-wide text-white ring-1 ring-white/30 backdrop-blur-md transition-[box-shadow] hover:ring-white/60"
        >
          <ArtistAvatar
            src={getArtistAvatar(artist.id)}
            initials={artist.initials}
            className="h-full w-full rounded-full"
            fallbackClassName="bg-black/25 text-white"
          />
        </motion.button>
      </div>

      {/* 2. Like */}
      <RailButton
        label="Like"
        active={liked}
        activeColor="text-rose-500 bg-rose-500/15 border-rose-500/30"
        onClick={() => toggleLiked(artworkId)}
      >
        <motion.span
          key={liked ? "liked" : "unliked"}
          animate={liked ? { scale: [1, 1.35, 1] } : {}}
          transition={{ duration: 0.4 }}
        >
          <HeartIcon filled={liked} className="h-5 w-5" />
        </motion.span>
      </RailButton>

      {/* 3. Save / bookmark — adds the artwork to the Saved collection. */}
      <RailButton
        label={saved ? "Remove from saved" : "Save"}
        active={saved}
        activeColor="text-amber-300 bg-amber-300/15 border-amber-300/30"
        onClick={() => {
          toggleSaved(artworkId);
          showToast(saved ? "Removed from saved" : "Saved to your gallery");
        }}
      >
        <motion.span
          key={saved ? "saved" : "unsaved"}
          animate={saved ? { scale: [1, 1.3, 1] } : {}}
          transition={{ duration: 0.4 }}
        >
          <BookmarkIcon filled={saved} className="h-5 w-5" />
        </motion.span>
      </RailButton>

      {/* 4. Comments / Art Discussion */}
      <RailButton label="Art discussion" onClick={onOpenComments}>
        <CommentIcon className="h-5 w-5" />
      </RailButton>

      {/* 5. Download — public domain is free; freelance needs permission.
          (Simulated — no real device download in v1.) */}
      <RailButton
        label="Download"
        onClick={() =>
          artworkOrigin === "artist-original"
            ? showToast("Download needs the artist's permission")
            : showToast(`"${artworkTitle}" downloaded · public domain`)
        }
      >
        <DownloadIcon className="h-5 w-5" />
      </RailButton>

      {/* 6. Share */}
      <RailButton label="Share" onClick={handleShare}>
        <ShareIcon className="h-5 w-5" />
      </RailButton>

      {/* 7. Fullscreen / Fit Art toggle (no toast — purely visual) */}
      <RailButton
        label={filling ? "Fit artwork" : "Fill screen"}
        active={!filling}
        activeColor="text-white bg-white/15 border-white/30"
        onClick={onToggleFit}
      >
        <motion.span
          key={filling ? "fill" : "fit"}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center"
        >
          {filling ? (
            <MinimizeIcon className="h-5 w-5" />
          ) : (
            <MaximizeIcon className="h-5 w-5" />
          )}
        </motion.span>
      </RailButton>
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { ToastState } from "./Toast";

interface CreateViewProps {
  showToast: (message: string, variant?: ToastState["variant"]) => void;
}

export default function CreateView({ showToast }: CreateViewProps) {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [medium, setMedium] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [hasImage, setHasImage] = useState(false);

  const canPublish =
    title.trim().length > 0 &&
    artist.trim().length > 0 &&
    description.trim().length > 0;

  const handlePublish = () => {
    if (!canPublish) return;
    showToast("Artwork submitted for review");
    setTitle("");
    setArtist("");
    setMedium("");
    setDescription("");
    setTags("");
    setHasImage(false);
  };

  return (
    <div className="h-full overflow-y-auto overscroll-contain scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="px-5 pb-10 pt-[calc(env(safe-area-inset-top)+6.5rem)]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
          Contribute
        </p>
        <h1 className="mt-2 font-serif text-[28px] leading-tight text-white">
          Create
        </h1>
        <p className="mt-2 max-w-[90%] text-[15px] leading-relaxed text-white/60">
          Share public-domain works or your own curation with the museum
          community.
        </p>

        <motion.button
          type="button"
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            setHasImage(true);
            showToast("Image selected (demo)");
          }}
          className={`mt-6 flex w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed py-10 transition-colors ${
            hasImage
              ? "border-emerald-400/40 bg-emerald-400/10"
              : "border-white/15 bg-white/[0.02] hover:border-white/25"
          }`}
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/10 text-2xl text-white/70">
            +
          </span>
          <span className="text-sm font-medium text-white/80">
            {hasImage ? "Image ready" : "Upload artwork image"}
          </span>
          <span className="text-xs text-white/40">JPG or PNG · max 10 MB</span>
        </motion.button>

        <form
          className="mt-6 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handlePublish();
          }}
        >
          <Field label="Title">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="The Starry Night"
              className="field-input"
            />
          </Field>

          <Field label="Artist">
            <input
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              placeholder="Vincent van Gogh"
              className="field-input"
            />
          </Field>

          <Field label="Medium">
            <input
              value={medium}
              onChange={(e) => setMedium(e.target.value)}
              placeholder="Oil on canvas"
              className="field-input"
            />
          </Field>

          <Field label="Description">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell the story behind this work…"
              rows={4}
              className="field-input resize-none"
            />
          </Field>

          <Field label="Tags">
            <input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Landscape, Post-Impressionism"
              className="field-input"
            />
          </Field>

          <motion.button
            type="submit"
            disabled={!canPublish}
            whileTap={canPublish ? { scale: 0.98 } : undefined}
            className="mt-2 flex w-full items-center justify-center rounded-full bg-white py-3.5 text-sm font-semibold text-ink transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
          >
            Publish to feed
          </motion.button>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45">
        {label}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

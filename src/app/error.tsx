"use client";

import { useEffect } from "react";

/**
 * Route-level error boundary. Converts an otherwise-blank client crash into a
 * visible, on-brand message so failures are debuggable instead of a white void.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface the real error in the console for debugging.
    console.error("Narsil app error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-ink px-8 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-lg font-bold text-ink">
        N
      </span>
      <h1 className="mt-6 font-serif text-2xl text-white">
        Something went wrong
      </h1>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/60">
        Narsil hit an unexpected error while loading. Try again — if it keeps
        happening, the details below help with debugging.
      </p>
      {error?.message && (
        <pre className="mt-4 max-w-sm overflow-x-auto rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-left text-[11px] text-white/50">
          {error.message}
        </pre>
      )}
      <button
        onClick={reset}
        className="mt-6 rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink transition-transform active:scale-95"
      >
        Try again
      </button>
    </div>
  );
}

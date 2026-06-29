"use client";

import { useEffect } from "react";

/**
 * Fallback for errors thrown in the root layout itself. Must render its own
 * <html>/<body>. Kept dark so a failure never flashes a white screen.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Narsil global error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100dvh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0b",
          color: "#f7f5f1",
          fontFamily: "system-ui, sans-serif",
          textAlign: "center",
          padding: "0 2rem",
        }}
      >
        <h1 style={{ fontSize: "1.5rem", fontWeight: 600 }}>
          Narsil failed to load
        </h1>
        <p style={{ marginTop: "0.5rem", opacity: 0.6, fontSize: "0.875rem" }}>
          Please reload the page.
        </p>
        <button
          onClick={reset}
          style={{
            marginTop: "1.5rem",
            borderRadius: "9999px",
            border: "none",
            backgroundColor: "#ffffff",
            color: "#0a0a0b",
            padding: "0.75rem 1.5rem",
            fontSize: "0.875rem",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Reload
        </button>
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { feedArtworks } from "@/data";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  fallback: ["system-ui", "Segoe UI", "Arial", "sans-serif"],
  adjustFontFallback: true,
});

const serif = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: "Narsil — Discover Art",
  description:
    "Narsil is a beautiful mobile-first art discovery app. Scroll an endless feed of public-domain masterpieces and freelance originals, learn the history, follow artists, and save what you love.",
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <head>
        {/* Warm the connections to Wikimedia's image hosts up front. Special:FilePath
            redirects to upload.wikimedia.org, so we pre-open both. */}
        <link rel="preconnect" href="https://upload.wikimedia.org" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://commons.wikimedia.org" />
        <link rel="dns-prefetch" href="https://upload.wikimedia.org" />
        {/* Preload the first feed artwork so it starts downloading before hydration. */}
        <link rel="preload" as="image" href={feedArtworks[0].image} fetchPriority="high" />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}

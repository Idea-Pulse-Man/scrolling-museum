import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { artworks } from "@/data";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Scrolling Museum",
  description:
    "An endless, beautiful feed of public-domain art. Browse, discover, and learn the history behind every masterpiece.",
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
        {/* Preload the first artwork so it starts downloading before hydration. */}
        <link rel="preload" as="image" href={artworks[0].image} fetchPriority="high" />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}

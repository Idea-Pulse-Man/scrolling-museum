# Scrolling Museum

A premium, minimalist mobile prototype for **endless public-domain art discovery** — think TikTok-style vertical scrolling meets a modern museum gallery app.

> **Note:** This is an **interactive design mockup / MVP prototype only**. It is **not** the final production app. There is no backend, no database, no real APIs, and no real device downloads — all artwork data is mock data and all actions (like, save, download, share) are simulated for demonstration.

## Experience highlights

- **Full-screen vertical art feed** with smooth snap scrolling (TikTok-style)
- **Edge-to-edge artwork** with subtle glassmorphism overlays — the art is always the hero
- **Right-side action rail** — like, save, download, share with micro-interactions and toasts
- **Swipe-up "history" placard** — a museum-style label with medium, date, source, description, and tags
- **Artist profile screen** — a Spotify-artist-style page with bio, stats, and a grid of works
- **Top tabs** — History · For You · Buy · Create (For You is active; others are visual placeholders)
- **Long-press the artwork** to enter "clean art" mode (hides all chrome)
- **Blur-up image loading**, refined typography, and elegant black / off-white / soft-gray palette

## Tech stack

- [Next.js 14](https://nextjs.org/) (App Router) + TypeScript
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/) for animations
- Public-domain artwork images served from [Wikimedia Commons](https://commons.wikimedia.org/)

## Project structure

```
src/
├─ app/
│  ├─ layout.tsx          # Root layout, fonts, metadata
│  ├─ page.tsx            # Entry point → renders MobileShell
│  └─ globals.css         # Tailwind + base styles
├─ components/
│  ├─ MobileShell.tsx     # Stateful phone frame: tabs, feed, toast, modal
│  ├─ TopTabs.tsx         # History / For You / Buy / Create
│  ├─ ArtFeed.tsx         # Vertical snap-scroll feed
│  ├─ ArtworkCard.tsx     # Full-screen artwork card
│  ├─ ActionRail.tsx      # Like / Save / Download / Share rail
│  ├─ HistoryPlacard.tsx  # Swipe-up museum placard bottom sheet
│  ├─ ArtistProfileModal.tsx
│  ├─ BlurImage.tsx       # Blur-up image loader
│  ├─ Toast.tsx           # Glass toast notifications
│  └─ Icons.tsx           # Inline SVG icon set
└─ data/
   ├─ artworks.ts         # Mock public-domain artworks
   ├─ artists.ts          # Mock artist profiles
   ├─ types.ts            # Shared types
   └─ index.ts            # Data helpers
```

## 1. Run locally

Requirements: **Node.js 18.18+** (Node 20+ recommended).

```bash
# install dependencies
npm install

# start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). For the intended experience, open your browser dev tools and switch to a **mobile viewport (~390px wide)**, or simply resize the window — on larger screens the app renders inside a phone frame.

Other scripts:

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # run ESLint
```

## 2. Deploy to Vercel

This is a standard Next.js app and deploys to Vercel with zero configuration.

**Option A — Git (recommended)**

1. Push this project to a GitHub/GitLab/Bitbucket repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Vercel auto-detects Next.js. Keep the defaults and click **Deploy**.

**Option B — Vercel CLI**

```bash
npm i -g vercel
vercel          # deploy a preview
vercel --prod   # deploy to production
```

No environment variables are required.

## 3. Important

This project is an **interactive mockup only**, intended to communicate the MVP design direction:

- Endless art scrolling
- Beautiful public-domain discovery
- Swipe-up art-history placard
- Artist profile pages
- Save / download concept (simulated)

It intentionally does **not** include a backend, authentication, payments, real downloads, or live data. Those would be built in a subsequent production phase.

---

*All artworks shown are in the public domain. Images are sourced from Wikimedia Commons.*

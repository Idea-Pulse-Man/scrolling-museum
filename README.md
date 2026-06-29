# Narsil

**Narsil** is a beautiful, mobile-first art discovery app — a TikTok-style vertical feed for public-domain museum masterpieces and sample freelance originals, wrapped in a calm, premium museum aesthetic.

> **Product v1.0** — this is the first real product version (not just a throwaway mockup). The UI is client-ready and the code is structured like a growable MVP. It runs entirely on local mock data + `localStorage`; there is **no** backend, payments, or real uploads yet. The architecture is intentionally shaped so a Supabase backend can be added later with minimal UI changes (see `src/lib/supabase.ts`).

## Experience highlights

- **Full-screen vertical art feed** (For You) with smooth snap scrolling, mixing public-domain masters and sample freelance originals
- **Five-button action rail** — follow artist, like, comment, save, download — persisted on-device via `localStorage`
- **Gestures** — swipe up/down to browse, swipe up / tap for the history placard, swipe left for the artist, swipe right for Fit ↔ Fill, long-press for clean viewing
- **Discover** — a category browsing grid (Paintings, Sculptures, Pottery, Roman, Greek, Egyptian, Renaissance, Japanese Art, Modern Art, and more)
- **Search** — front-end filtering by free text, category, period, empire, and artist
- **Saved** — bookmarked artworks, kept on the device
- **You** — profile, taste preferences, following, liked works, and a tutorial replay
- **Buy** — gallery-grade canvas prints with Small / Medium / Large sizing and a "checkout coming soon" interest capture
- **Create** — a freelance posting form (title, description, category, origin type) — mock only
- **Personalize your museum** — a preference modal after browsing a few artworks
- **Interactive, learn-by-doing tutorial** — six steps performed on the real feed, with Skip and Start Exploring

## Tech stack

- [Next.js 14](https://nextjs.org/) (App Router) + TypeScript
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/) for animation
- Public-domain artwork images served from [Wikimedia Commons](https://commons.wikimedia.org/)

## Project structure

```
src/
├─ app/
│  ├─ layout.tsx          # Root layout, fonts, metadata, image preconnect
│  ├─ page.tsx            # Wraps MobileShell in the AppStateProvider
│  └─ globals.css         # Tailwind + base styles
├─ components/
│  ├─ MobileShell.tsx     # App shell: top + bottom nav, screens, modals, tutorial
│  ├─ navigation.ts       # Screen model + top/bottom tab config
│  ├─ TopTabs.tsx         # History / For You / Buy / Search
│  ├─ BottomNav.tsx       # Discover / Create / Saved / You
│  ├─ AppState.tsx        # localStorage-backed context (saved/liked/following/prefs/tutorial)
│  ├─ ArtFeed.tsx         # Vertical snap-scroll feed
│  ├─ ArtworkCard.tsx     # Full-screen artwork card + gestures
│  ├─ ActionRail.tsx      # 5-button action rail
│  ├─ ArtworkTile.tsx     # Reusable grid tile (Discover/Search/Saved/You)
│  ├─ DiscoverView.tsx    # Category browsing
│  ├─ SearchView.tsx      # Search + filters
│  ├─ SavedView.tsx       # Saved collection
│  ├─ YouView.tsx         # Profile + preferences
│  ├─ BuyView.tsx         # Canvas shop + purchase-interest sheet
│  ├─ CreateView.tsx      # Freelance posting form (mock)
│  ├─ HistoryView.tsx     # Learning timeline + featured artists
│  ├─ HistoryPlacard.tsx  # Museum placard bottom sheet
│  ├─ ArtDiscussion.tsx   # Mock comments sheet
│  ├─ ArtistProfileModal.tsx  # Historical + freelance profiles
│  ├─ PreferenceModal.tsx # "Personalize your museum"
│  ├─ TutorialCoach.tsx   # Interactive 6-step tutorial
│  ├─ BlurImage.tsx       # Blur-up image with animated Fit ↔ Fill zoom
│  ├─ Toast.tsx / Icons.tsx
├─ data/
│  ├─ artworks.ts         # 15 artworks (public-domain + sample freelance)
│  ├─ artists.ts          # Historical, ancient, and freelance artists
│  ├─ categories.ts       # Discover categories + matcher
│  ├─ history.ts          # Learning eras + featured artists
│  ├─ shop.ts             # Canvas sizes + pricing
│  ├─ types.ts            # Shared domain types
│  └─ index.ts            # Barrel + search/filter/feed helpers
└─ lib/
   ├─ storage.ts          # SSR-safe localStorage helpers
   └─ supabase.ts         # Backend integration notes (not wired in v1.0)
```

## 1. Run locally

Requirements: **Node.js 18.18+** (Node 20+ recommended).

```bash
# install dependencies
npm install

# start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). For the intended experience, open your browser dev tools and switch to a **mobile viewport (~390px wide)**, or resize the window — on larger screens the app renders inside a phone frame.

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

No environment variables are required for v1.0.

## 3. What's included in Product v1.0

- Narsil branding and a consistent top + bottom navigation shell
- For You feed with mixed public-domain and freelance content, gestures, and the 5-button rail
- Discover (categories), Search (filters), Saved (bookmarks), You (profile + preferences)
- Buy (canvas sizes + pricing + interest capture), Create (mock posting form)
- History learning page, museum placards, art discussion, artist profiles (historical + freelance)
- "Personalize your museum" preference modal and an interactive 6-step tutorial
- On-device persistence (`localStorage`) for saves, likes, follows, preferences, and tutorial state
- A clean data layer + `lib/supabase.ts` notes so the app is ready to grow

## 4. Future v1.1 / v2 features (intentionally out of scope)

- **Supabase backend** — accounts, auth, cross-device sync of saves/likes/follows/preferences
- **Real canvas checkout & fulfillment** — payments, shipping, and a print partner
- **Real freelance uploads** — image storage, a moderation/review queue, and artist payouts
- **Rich media posts** — video and music uploads (noted in `CreateView.tsx`)
- **Personalized ranking** — turn the preference data into a real recommendation feed
- **Social layer** — real comments, notifications, and following activity

---

*All historical artworks are in the public domain (sourced from Wikimedia Commons). The "freelance" sample pieces reuse public-domain abstract works as placeholder imagery for the future artist-posting feature and are flagged as Artist Original in the data.*

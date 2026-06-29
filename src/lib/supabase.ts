/**
 * Supabase integration placeholder (NOT wired in v1.0).
 * ---------------------------------------------------------------------------
 * Narsil v1.0 runs entirely on local mock data (`src/data`) and localStorage
 * (`src/lib/storage.ts`). This file documents the intended backend shape so the
 * swap to Supabase is mechanical and isolated from the UI.
 *
 * To enable later:
 *   1. npm install @supabase/supabase-js
 *   2. Add env vars to .env.local:
 *        NEXT_PUBLIC_SUPABASE_URL=...
 *        NEXT_PUBLIC_SUPABASE_ANON_KEY=...
 *   3. Create the client below and replace the mock reads in `src/data` /
 *      `AppStateProvider` with queries against these tables.
 *
 * Suggested schema (v1 → v2):
 *   artists(id, name, profile_type, period, style, bio, followers, ...)
 *   artworks(id, title, artist_id, year, period, medium, source, image_url,
 *            description, tags[], category, origin, empire)
 *   collections(user_id, artwork_id, kind)   -- kind: 'saved' | 'liked'
 *   follows(user_id, artist_id)
 *   preferences(user_id, art_types[], periods[], empires[], artists[])
 *   posts(id, artist_id, title, description, category, origin, image_url, status)
 *
 * Example (commented until the package is installed):
 *
 *   import { createClient } from "@supabase/supabase-js";
 *   export const supabase = createClient(
 *     process.env.NEXT_PUBLIC_SUPABASE_URL!,
 *     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
 *   );
 */

export const SUPABASE_ENABLED = false;

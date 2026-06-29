import { artworks, artworkMap } from "./artworks";
import { artists, artistMap } from "./artists";
import { historyEras, featuredArtistIds } from "./history";
import { categories, categoryMap, artworkMatchesCategory } from "./categories";
import {
  canvasProducts,
  CANVAS_SIZES,
  priceForSize,
} from "./shop";
import type {
  Artwork,
  Artist,
  CategoryId,
  ArtworkOrigin,
  ArtistProfileType,
} from "./types";
import type { HistoryEra } from "./history";
import type { Category, CategoryGroup } from "./categories";
import type { CanvasSize, CanvasOption, CanvasProduct } from "./shop";

export {
  artworks,
  artworkMap,
  artists,
  artistMap,
  historyEras,
  featuredArtistIds,
  categories,
  categoryMap,
  artworkMatchesCategory,
  canvasProducts,
  CANVAS_SIZES,
  priceForSize,
};

export type {
  Artwork,
  Artist,
  CategoryId,
  ArtworkOrigin,
  ArtistProfileType,
  HistoryEra,
  Category,
  CategoryGroup,
  CanvasSize,
  CanvasOption,
  CanvasProduct,
};

export const getArtist = (artistId: string): Artist | undefined =>
  artistMap[artistId];

export const getArtwork = (artworkId: string): Artwork | undefined =>
  artworkMap[artworkId];

export const getArtworksByArtist = (artistId: string): Artwork[] =>
  artworks.filter((a) => a.artistId === artistId);

/**
 * The artist's profile portrait, if one exists. Returns undefined when the
 * artist has no portrait so the UI falls back to their initials (e.g. "Aurora
 * Vane" → "AV") rather than borrowing an artwork image.
 */
export const getArtistAvatar = (artistId: string): string | undefined => {
  return artistMap[artistId]?.avatar;
};

export const getArtworksByCategory = (id: CategoryId): Artwork[] =>
  artworks.filter((a) => artworkMatchesCategory(a, id));

/** Human-readable label for an origin badge. */
export const originLabel = (origin: ArtworkOrigin): string => {
  switch (origin) {
    case "public-domain":
      return "Public Domain";
    case "artist-original":
      return "Artist Original";
    case "fan-study":
      return "Fan Study";
  }
};

/**
 * Feed ordering for the For You page — interleaves public-domain masters with
 * sample freelance originals so both surface early. Replaceable later with a
 * personalised / Supabase-backed ranking.
 */
export const feedArtworks: Artwork[] = (() => {
  const historical = artworks.filter((a) => a.origin !== "artist-original");
  const freelance = artworks.filter((a) => a.origin === "artist-original");
  const out: Artwork[] = [];
  let fi = 0;
  historical.forEach((art, i) => {
    out.push(art);
    // Drop in a freelance piece every few historical works.
    if ((i + 1) % 3 === 0 && fi < freelance.length) {
      out.push(freelance[fi++]);
    }
  });
  while (fi < freelance.length) out.push(freelance[fi++]);
  return out;
})();

/** Unique, sorted facet values used by the Search filters. */
export const searchFacets = {
  periods: Array.from(new Set(artworks.map((a) => a.period))).sort(),
  empires: Array.from(
    new Set(artworks.map((a) => a.empire).filter((e): e is string => !!e))
  ).sort(),
  categories: categories.map((c) => c.id),
};

export interface ArtworkSearchQuery {
  text?: string;
  period?: string;
  empire?: string;
  category?: CategoryId;
  artistId?: string;
}

/** Pure, front-end filtering over the local dataset (v1 search). */
export const searchArtworks = (query: ArtworkSearchQuery): Artwork[] => {
  const text = query.text?.trim().toLowerCase() ?? "";
  return artworks.filter((art) => {
    if (query.period && art.period !== query.period) return false;
    if (query.empire && art.empire !== query.empire) return false;
    if (query.category && !artworkMatchesCategory(art, query.category))
      return false;
    if (query.artistId && art.artistId !== query.artistId) return false;
    if (text) {
      const artist = artistMap[art.artistId];
      const haystack = [
        art.title,
        art.period,
        art.medium,
        art.empire ?? "",
        artist?.name ?? "",
        ...art.tags,
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(text)) return false;
    }
    return true;
  });
};

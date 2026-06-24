import { artworks } from "./artworks";
import { artists, artistMap } from "./artists";
import { historyEras } from "./history";
import { shopItems, getShopItemsForArtwork } from "./shop";
import type { Artwork, Artist } from "./types";
import type { HistoryEra } from "./history";
import type { ShopItem, PrintFormat } from "./shop";

export { artworks, artists, artistMap, historyEras, shopItems, getShopItemsForArtwork };
export type { Artwork, Artist, HistoryEra, ShopItem, PrintFormat };

export const getArtist = (artistId: string): Artist | undefined =>
  artistMap[artistId];

export const getArtworksByArtist = (artistId: string): Artwork[] =>
  artworks.filter((a) => a.artistId === artistId);

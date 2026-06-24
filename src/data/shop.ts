import { artworks } from "./artworks";

export type PrintFormat = "Poster" | "Framed Print" | "Canvas";

export interface ShopItem {
  id: string;
  artworkId: string;
  format: PrintFormat;
  price: number;
  size: string;
}

const formats: { format: PrintFormat; size: string; basePrice: number }[] = [
  { format: "Poster", size: '18 × 24"', basePrice: 29 },
  { format: "Framed Print", size: '16 × 20"', basePrice: 89 },
  { format: "Canvas", size: '24 × 36"', basePrice: 149 },
];

export const shopItems: ShopItem[] = artworks.flatMap((artwork, index) =>
  formats.map((f, fi) => ({
    id: `${artwork.id}-${f.format.toLowerCase().replace(/\s+/g, "-")}`,
    artworkId: artwork.id,
    format: f.format,
    price: f.basePrice + (index % 3) * 10 + fi * 5,
    size: f.size,
  }))
);

export const getShopItemsForArtwork = (artworkId: string): ShopItem[] =>
  shopItems.filter((item) => item.artworkId === artworkId);

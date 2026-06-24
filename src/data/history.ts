export interface HistoryEra {
  id: string;
  title: string;
  years: string;
  description: string;
  artworkIds: string[];
}

export const historyEras: HistoryEra[] = [
  {
    id: "renaissance",
    title: "Renaissance",
    years: "1400 – 1600",
    description:
      "A rebirth of classical ideals — humanism, perspective, and luminous color transformed European painting.",
    artworkIds: ["birth-of-venus", "mona-lisa"],
  },
  {
    id: "baroque",
    title: "Baroque & Dutch Golden Age",
    years: "1600 – 1750",
    description:
      "Drama, light, and intimate domestic scenes. Masters captured everyday life with extraordinary precision.",
    artworkIds: ["girl-pearl-earring"],
  },
  {
    id: "romanticism",
    title: "Romanticism & Edo",
    years: "1750 – 1850",
    description:
      "Nature's sublime power and bold graphic traditions — from misty peaks to towering waves.",
    artworkIds: ["wanderer-fog", "great-wave"],
  },
  {
    id: "modern",
    title: "Modern Masters",
    years: "1850 – 1910",
    description:
      "Color, emotion, and ornament pushed to new extremes — the birth of modern art as we know it.",
    artworkIds: ["starry-night", "the-scream", "the-kiss"],
  },
];

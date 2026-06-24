import type { Artwork } from "./types";

/**
 * Image URLs use Wikimedia Commons' Special:FilePath endpoint, which redirects
 * to a sized thumbnail of the original public-domain file. This keeps the mock
 * data resilient without hard-coding fragile hashed CDN paths.
 */
const wm = (file: string, width = 1200) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(
    file
  )}?width=${width}`;

export const artworks: Artwork[] = [
  {
    id: "girl-pearl-earring",
    title: "Girl with a Pearl Earring",
    artistId: "vermeer",
    year: "c. 1665",
    medium: "Oil on canvas",
    source: "Mauritshuis, The Hague",
    image: wm("1665 Girl with a Pearl Earring.jpg"),
    accent: "#1c2330",
    description:
      "Often called the 'Mona Lisa of the North,' this tronie captures an anonymous girl turning toward the viewer, lips parted as if about to speak. The luminous pearl and the soft fall of light on her face make it one of the most beloved portraits ever painted.",
    tags: ["Baroque", "Portrait", "Oil Painting", "Dutch Golden Age"],
  },
  {
    id: "starry-night",
    title: "The Starry Night",
    artistId: "van-gogh",
    year: "1889",
    medium: "Oil on canvas",
    source: "The Museum of Modern Art",
    image: wm("Van Gogh - Starry Night - Google Art Project.jpg"),
    accent: "#10203f",
    description:
      "Painted from the window of his asylum room at Saint-Rémy, Van Gogh transformed a quiet village under the night sky into a turbulent, swirling cosmos. The rolling sky and flame-like cypress remain icons of emotional landscape painting.",
    tags: ["Post-Impressionism", "Landscape", "Oil Painting", "Night"],
  },
  {
    id: "great-wave",
    title: "The Great Wave off Kanagawa",
    artistId: "hokusai",
    year: "c. 1831",
    medium: "Woodblock print",
    source: "The Met Collection",
    image: wm("Tsunami_by_hokusai_19th_century.jpg"),
    accent: "#13384a",
    description:
      "The most famous work of Japanese art in the world, this print shows a towering wave threatening boats off the coast, with Mount Fuji small in the distance. Its dynamic composition and Prussian-blue palette captivated audiences across the globe.",
    tags: ["Ukiyo-e", "Landscape", "Woodblock Print", "Edo Period"],
  },
  {
    id: "mona-lisa",
    title: "Mona Lisa",
    artistId: "da-vinci",
    year: "c. 1503 – 1519",
    medium: "Oil on poplar panel",
    source: "Musée du Louvre",
    image: wm("Mona Lisa, by Leonardo da Vinci, from C2RMF retouched.jpg"),
    accent: "#2a2113",
    description:
      "Perhaps the most recognized painting in history, the Mona Lisa is celebrated for the sitter's enigmatic expression and Leonardo's pioneering use of sfumato — the soft, smoky transitions between light and shadow that give her an extraordinary lifelike presence.",
    tags: ["Renaissance", "Portrait", "Oil Painting", "Sfumato"],
  },
  {
    id: "the-kiss",
    title: "The Kiss",
    artistId: "klimt",
    year: "1907 – 1908",
    medium: "Oil and gold leaf on canvas",
    source: "Österreichische Galerie Belvedere",
    image: wm("Gustav Klimt 016.jpg"),
    accent: "#3a2c08",
    description:
      "The crowning work of Klimt's 'golden phase,' two lovers embrace within a shimmering field of gold leaf and ornamental pattern. The painting fuses intimacy and decoration into a radiant emblem of early modern Vienna.",
    tags: ["Art Nouveau", "Symbolism", "Gold Leaf", "Figures"],
  },
  {
    id: "birth-of-venus",
    title: "The Birth of Venus",
    artistId: "botticelli",
    year: "c. 1485",
    medium: "Tempera on canvas",
    source: "Uffizi Gallery, Florence",
    image: wm(
      "Sandro Botticelli - La nascita di Venere - Google Art Project - edited.jpg"
    ),
    accent: "#2c3526",
    description:
      "The goddess Venus arrives on shore, born from the sea foam and carried on a shell. Botticelli's flowing line and pale, luminous palette make this mythological allegory one of the defining images of the Italian Renaissance.",
    tags: ["Renaissance", "Mythology", "Tempera", "Allegory"],
  },
  {
    id: "the-scream",
    title: "The Scream",
    artistId: "munch",
    year: "1893",
    medium: "Oil, tempera & pastel on cardboard",
    source: "National Gallery of Norway",
    image: wm(
      "Edvard Munch, 1893, The Scream, oil, tempera and pastel on cardboard, 91 x 73 cm, National Gallery of Norway.jpg"
    ),
    accent: "#5a3410",
    description:
      "Against a blood-red sky, a figure clutches its face in a wave of existential dread. Munch described the moment of inspiration as a scream passing through nature — and the image has become the universal symbol of modern anxiety.",
    tags: ["Expressionism", "Symbolism", "Emotion", "Modern"],
  },
  {
    id: "wanderer-fog",
    title: "Wanderer above the Sea of Fog",
    artistId: "friedrich",
    year: "c. 1818",
    medium: "Oil on canvas",
    source: "Hamburger Kunsthalle",
    image: wm("Caspar David Friedrich - Wanderer above the sea of fog.jpg"),
    accent: "#2b3138",
    description:
      "A lone figure stands atop a rocky summit, gazing over a sea of mist and distant peaks. The painting has become the defining image of Romanticism — a meditation on the individual confronting the sublime vastness of nature.",
    tags: ["Romanticism", "Landscape", "Oil Painting", "Sublime"],
  },
];

import type { Artwork } from "./types";

/**
 * Image URLs use Wikimedia Commons' Special:FilePath endpoint, which redirects
 * to a sized thumbnail of the original public-domain file. This keeps the mock
 * data resilient without hard-coding fragile hashed CDN paths.
 */
const wm = (file: string, width = 1000) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(
    file
  )}?width=${width}`;

export const artworks: Artwork[] = [
  {
    id: "view-of-delft",
    title: "View of Delft",
    artistId: "vermeer",
    year: "c. 1660 – 1661",
    medium: "Oil on canvas",
    source: "Mauritshuis, The Hague",
    image: wm("Johannes Vermeer - View of Delft - 92 - Mauritshuis.jpg"),
    accent: "#243140",
    description:
      "Vermeer's only surviving cityscape and the most celebrated view in Dutch art. Morning light breaks over the harbour walls of Delft, glinting on still water while the town waits in serene silence — a study in atmosphere, reflection, and the poetry of an ordinary day.",
    tags: ["Baroque", "Cityscape", "Oil Painting", "Dutch Golden Age"],
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
    id: "last-supper",
    title: "The Last Supper",
    artistId: "da-vinci",
    year: "c. 1495 – 1498",
    medium: "Tempera and oil on plaster",
    source: "Santa Maria delle Grazie, Milan",
    image: wm(
      "Leonardo da Vinci (1452-1519) - The Last Supper (1495-1498).jpg"
    ),
    accent: "#2a2418",
    description:
      "Leonardo captures the charged instant after Christ announces that one among the table will betray him. Each figure reacts in a wave of gesture and emotion, while a rigorous one-point perspective draws every line toward his calm, central face — a landmark of Renaissance composition.",
    tags: ["Renaissance", "Fresco", "Religious", "Perspective"],
  },
  {
    id: "birch-forest",
    title: "Birch Forest",
    artistId: "klimt",
    year: "1903",
    medium: "Oil on canvas",
    source: "Paul G. Allen Collection",
    image: wm("Gustav Klimt, Birch Forest, 1903 - Paul G. Allen Collection.jpg"),
    accent: "#3a2f1c",
    description:
      "Klimt dissolves a stand of birch trees into a shimmering tapestry of gold, russet, and green. Slim white trunks rise like columns from a carpet of fallen leaves, turning the forest floor into the same ornamental, near-abstract surface that defined his celebrated golden phase.",
    tags: ["Art Nouveau", "Landscape", "Oil Painting", "Pattern"],
  },
  {
    id: "map-of-hell",
    title: "Map of Hell",
    artistId: "botticelli",
    year: "c. 1485",
    medium: "Silverpoint, ink and tempera on parchment",
    source: "Vatican Library",
    image: wm("Sandro Botticelli - La Carte de l'Enfer.jpg"),
    accent: "#2a1a16",
    description:
      "Drawn to illustrate Dante's Inferno, Botticelli charts the funnel of Hell as a vast inverted cone descending through nine circles toward the centre of the earth. Tiny figures crowd each terrace, transforming a cosmological diagram into one of the Renaissance's most haunting visions.",
    tags: ["Renaissance", "Drawing", "Allegory", "Dante"],
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

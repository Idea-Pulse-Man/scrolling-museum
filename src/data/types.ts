export interface Artist {
  id: string;
  name: string;
  initials: string;
  lifespan: string;
  nationality: string;
  period: string;
  style: string;
  knownFor: string;
  bio: string;
}

export interface Artwork {
  id: string;
  title: string;
  artistId: string;
  year: string;
  medium: string;
  source: string;
  image: string;
  /** Dominant color used for the blur-up placeholder background. */
  accent: string;
  description: string;
  tags: string[];
}

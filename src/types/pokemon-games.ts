export interface GameRelation {
  type: "remake" | "enhanced" | "sequel" | "spin-off";
  targetId: string;
  label: string;
}

export interface PokemonGameLocal {
  name: string;
  id: string;
  rawgId: number;
  rawgCollection: string;
  cover: string;
  frontCover?: string;
  trailerUrl?: string;
  relations?: GameRelation[];
  /** @deprecated Usar `relations` */
  relation?: GameRelation;
}

export interface PokemonGeneration {
  id: number;
  name: string;
  mainRegion: string;
  games: PokemonGameLocal[];
}

export interface RawgPlatform {
  platform: {
    id: number;
    name: string;
    slug: string;
  };
}

export interface RawgNamedEntity {
  id: number;
  name: string;
  slug: string;
}

export interface RawgScreenshot {
  id: number;
  image: string;
  width: number;
  height: number;
}

export interface RawgGameDetails {
  id: number;
  name: string;
  released: string | null;
  platforms: RawgPlatform[];
  rating: number;
  ratings_count: number;
  metacritic: number | null;
  playtime: number;
  genres: RawgNamedEntity[];
  developers: RawgNamedEntity[];
  publishers: RawgNamedEntity[];
  esrb_rating: RawgNamedEntity | null;
  background_image: string | null;
  background_image_additional: string | null;
  description: string;
  website: string;
}

export interface EnrichedPokemonGame {
  id: string;
  name: string;
  displayName: string;
  cover: string;
  frontCover: string;
  rawgId: number;
  rawgCollection: string;
  generationId: number;
  generationName: string;
  region: string;
  released: string | null;
  platforms: string[];
  rating: number | null;
  ratingsCount: number | null;
  metacritic: number | null;
  genres: string[];
  developers: string[];
  publishers: string[];
  playtime: number | null;
  esrbRating: string;
  relations?: GameRelation[];
}

export interface GameMediaItem {
  type: "image" | "video" | "youtube";
  src: string;
  preview?: string;
  label?: string;
  youtubeId?: string;
}

export interface LinkedGameEntry {
  game: EnrichedPokemonGame;
  label: string;
  tag: string;
  direction: "forward" | "reverse";
}

export interface GameDetailViewModel extends EnrichedPokemonGame {
  description: string;
  officialSite: string | null;
  bannerImage: string;
  mediaItems: GameMediaItem[];
  collectionLabel: string;
  collectionGames: EnrichedPokemonGame[];
  linkedGames: LinkedGameEntry[];
}

export type FilterType = "region" | "platform" | "search" | "recent";

export interface ActiveFilters {
  region: string;
  platform: string;
  search: string;
  recent: boolean;
}

export interface EnabledFilterTypes {
  region: boolean;
  platform: boolean;
  search: boolean;
  recent: boolean;
}

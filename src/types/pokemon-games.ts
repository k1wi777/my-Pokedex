export interface PokemonGameLocal {
  name: string;
  id: string;
  rawgId: number;
  rawgCollection: string;
  cover: string;
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
  esrb_rating: RawgNamedEntity | null;
  background_image: string | null;
}

export interface EnrichedPokemonGame {
  id: string;
  name: string;
  displayName: string;
  cover: string;
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
  playtime: number | null;
  esrbRating: string;
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

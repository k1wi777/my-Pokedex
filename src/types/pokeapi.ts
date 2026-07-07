import type { PokeApiNamedResource } from "@/types/pokeapi-generation";

export interface PokeApiTypePokemonEntry {
  slot: number;
  pokemon: PokeApiNamedResource;
}

export interface PokeApiTypeResponse {
  id: number;
  name: string;
  pokemon: PokeApiTypePokemonEntry[];
}

export interface PokeApiVersionResponse {
  id: number;
  name: string;
  version_group: PokeApiNamedResource;
}

export interface PokeApiVersionGroupResponse {
  id: number;
  name: string;
  pokedexes: PokeApiNamedResource[];
}

export interface PokeApiPokedexEntry {
  entry_number: number;
  pokemon_species: PokeApiNamedResource;
}

export interface PokeApiPokedexResponse {
  id: number;
  name: string;
  pokemon_entries: PokeApiPokedexEntry[];
}

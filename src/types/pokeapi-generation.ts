export interface PokeApiNamedResource {
  name: string;
  url: string;
}

export interface PokeApiGenerationResponse {
  id: number;
  name: string;
  pokemon_species: PokeApiNamedResource[];
}

export interface PokeApiPokemonResponse {
  id: number;
  name: string;
  sprites: {
    front_default: string | null;
    other: {
      "official-artwork": {
        front_default: string | null;
      };
    };
  };
  types: { type: { name: string } }[];
}

export interface GenerationPokemonItem {
  id: number;
  name: string;
  displayName: string;
  primaryType: string;
  spriteUrl: string;
}

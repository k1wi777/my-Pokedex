import { fetchGeneration, fetchPokemonByName } from "@/services/pokeapi";
import type {
  GenerationPokemonItem,
  PokeApiPokemonResponse,
} from "@/types/pokeapi-generation";

function formatPokemonName(name: string): string {
  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function normalizePokemon(pokemon: PokeApiPokemonResponse): GenerationPokemonItem {
  const primaryType = pokemon.types[0]?.type.name ?? "normal";
  const spriteUrl =
    pokemon.sprites.other["official-artwork"].front_default ??
    pokemon.sprites.front_default ??
    "/pokeball.svg";

  return {
    id: pokemon.id,
    name: pokemon.name,
    displayName: formatPokemonName(pokemon.name),
    primaryType,
    spriteUrl,
  };
}

export async function fetchGenerationPokemonList(
  generationId: number,
): Promise<GenerationPokemonItem[]> {
  const generation = await fetchGeneration(generationId);
  if (!generation) return [];

  const results = await Promise.allSettled(
    generation.pokemon_species.map((species) =>
      fetchPokemonByName(species.name),
    ),
  );

  return results
    .flatMap((result) =>
      result.status === "fulfilled" && result.value
        ? [normalizePokemon(result.value)]
        : [],
    )
    .sort((a, b) => a.id - b.id);
}

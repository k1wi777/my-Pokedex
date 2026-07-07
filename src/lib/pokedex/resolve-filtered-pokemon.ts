import { buildFilterCacheKey } from "@/lib/pokedex/filter-state";
import { fetchGameSpeciesNames } from "@/lib/pokedex/game-pokedex";
import {
  fetchGeneration,
  fetchPokemonByName,
  fetchTypePokemon,
} from "@/services/pokeapi";
import type { PokeApiPokemonResponse } from "@/types/pokeapi-generation";
import type { PokedexFilterState } from "@/lib/pokedex/filter-state";

const resolutionCache = new Map<string, PokeApiPokemonResponse[]>();

function intersectSets(sets: Set<string>[]): Set<string> {
  if (sets.length === 0) return new Set();
  const [first, ...rest] = sets;
  const result = new Set(first);
  for (const set of rest) {
    for (const name of result) {
      if (!set.has(name)) result.delete(name);
    }
  }
  return result;
}

async function fetchTypePokemonNames(typeName: string): Promise<Set<string>> {
  const typeData = await fetchTypePokemon(typeName);
  if (!typeData) return new Set();
  return new Set(typeData.pokemon.map((entry) => entry.pokemon.name));
}

async function fetchGenerationSpeciesNames(
  generationId: number,
): Promise<Set<string>> {
  const generation = await fetchGeneration(generationId);
  if (!generation) return new Set();
  return new Set(generation.pokemon_species.map((species) => species.name));
}

async function fetchPokemonDetailsBatch(
  names: string[],
): Promise<PokeApiPokemonResponse[]> {
  const results = await Promise.allSettled(
    names.map((name) => fetchPokemonByName(name)),
  );

  return results
    .flatMap((result) =>
      result.status === "fulfilled" && result.value ? [result.value] : [],
    )
    .sort((a, b) => a.id - b.id);
}

export async function resolveFilteredPokemon(
  state: Pick<PokedexFilterState, "types" | "generations" | "games">,
): Promise<PokeApiPokemonResponse[]> {
  const cacheKey = buildFilterCacheKey(state);
  const cached = resolutionCache.get(cacheKey);
  if (cached) return cached;

  const activeSets: Set<string>[] = [];

  if (state.types.length > 0) {
    const typeSets = await Promise.all(
      state.types.map((typeName) => fetchTypePokemonNames(typeName)),
    );
    activeSets.push(intersectSets(typeSets));
  }

  if (state.generations.length > 0) {
    const genSets = await Promise.all(
      state.generations.map((genId) => fetchGenerationSpeciesNames(genId)),
    );
    const union = new Set<string>();
    for (const set of genSets) {
      for (const name of set) union.add(name);
    }
    activeSets.push(union);
  }

  if (state.games.length > 0) {
    const gameSets = await Promise.all(
      state.games.map((gameId) => fetchGameSpeciesNames(gameId)),
    );
    activeSets.push(intersectSets(gameSets));
  }

  if (activeSets.length === 0) {
    return [];
  }

  const finalNames = intersectSets(activeSets);
  const pokemons = await fetchPokemonDetailsBatch([...finalNames]);

  resolutionCache.set(cacheKey, pokemons);
  return pokemons;
}

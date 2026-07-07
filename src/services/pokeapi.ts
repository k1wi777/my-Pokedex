import { POKEAPI_CACHE_REVALIDATE } from "@/lib/pokemon-games/constants";
import type {
  PokeApiGenerationResponse,
  PokeApiPokemonResponse,
} from "@/types/pokeapi-generation";
import type {
  PokeApiPokedexResponse,
  PokeApiTypeResponse,
  PokeApiVersionGroupResponse,
  PokeApiVersionResponse,
} from "@/types/pokeapi";

const POKEAPI_BASE_URL = "https://pokeapi.co/api/v2";

async function fetchFromPokeApi<T>(path: string): Promise<T | null> {
  try {
    const url = path.startsWith("http") ? path : `${POKEAPI_BASE_URL}${path}`;
    const res = await fetch(url, {
      next: { revalidate: POKEAPI_CACHE_REVALIDATE },
    });

    if (!res.ok) {
      console.error(`PokeAPI fetch failed: ${path} (${res.status})`);
      return null;
    }

    return (await res.json()) as T;
  } catch (error) {
    console.error(`PokeAPI fetch error: ${path}`, error);
    return null;
  }
}

export async function fetchGeneration(
  generationId: number,
): Promise<PokeApiGenerationResponse | null> {
  return fetchFromPokeApi<PokeApiGenerationResponse>(
    `/generation/${generationId}`,
  );
}

export async function fetchPokemonByName(
  name: string,
): Promise<PokeApiPokemonResponse | null> {
  return fetchFromPokeApi<PokeApiPokemonResponse>(`/pokemon/${name}`);
}

export async function fetchTypePokemon(
  typeName: string,
): Promise<PokeApiTypeResponse | null> {
  return fetchFromPokeApi<PokeApiTypeResponse>(`/type/${typeName}`);
}

export async function fetchVersion(
  versionId: number,
): Promise<PokeApiVersionResponse | null> {
  return fetchFromPokeApi<PokeApiVersionResponse>(`/version/${versionId}`);
}

export async function fetchVersionGroup(
  groupIdOrUrl: number | string,
): Promise<PokeApiVersionGroupResponse | null> {
  const path =
    typeof groupIdOrUrl === "number"
      ? `/version-group/${groupIdOrUrl}`
      : groupIdOrUrl.replace(POKEAPI_BASE_URL, "");
  return fetchFromPokeApi<PokeApiVersionGroupResponse>(path);
}

export async function fetchPokedex(
  pokedexIdOrUrl: number | string,
): Promise<PokeApiPokedexResponse | null> {
  const path =
    typeof pokedexIdOrUrl === "number"
      ? `/pokedex/${pokedexIdOrUrl}`
      : pokedexIdOrUrl.replace(POKEAPI_BASE_URL, "");
  return fetchFromPokeApi<PokeApiPokedexResponse>(path);
}

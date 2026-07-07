import {
  fetchPokedex,
  fetchVersion,
  fetchVersionGroup,
} from "@/services/pokeapi";

function extractResourceId(url: string): number {
  const segments = url.replace(/\/$/, "").split("/");
  return Number(segments[segments.length - 1]);
}

export async function fetchGameSpeciesNames(
  versionId: string,
): Promise<Set<string>> {
  const version = await fetchVersion(Number(versionId));
  if (!version) return new Set();

  const groupId = extractResourceId(version.version_group.url);
  const versionGroup = await fetchVersionGroup(groupId);
  if (!versionGroup) return new Set();

  const speciesNames = new Set<string>();

  for (const pokedexRef of versionGroup.pokedexes) {
    const pokedexId = extractResourceId(pokedexRef.url);
    const pokedex = await fetchPokedex(pokedexId);
    if (!pokedex) continue;

    for (const entry of pokedex.pokemon_entries) {
      speciesNames.add(entry.pokemon_species.name);
    }
  }

  return speciesNames;
}

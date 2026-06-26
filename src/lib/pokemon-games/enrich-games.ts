import pokemonGamesData from "@/data/pokemon-games.json";
import { DEFAULT_ESRB_RATING } from "@/lib/pokemon-games/constants";
import type {
  EnrichedPokemonGame,
  PokemonGeneration,
  RawgGameDetails,
} from "@/types/pokemon-games";

export function formatGameDisplayName(name: string): string {
  if (name === "legends-za") return "Pokémon Legends Z-A";
  if (name.includes(":") || name.toLowerCase().startsWith("legends")) {
    return name.startsWith("Pokémon") ? name : `Pokémon ${name}`;
  }
  return `Pokémon ${name}`;
}

function extractPlatforms(rawgGame: RawgGameDetails | undefined): string[] {
  if (!rawgGame?.platforms?.length) return [];
  return [...new Set(rawgGame.platforms.map((p) => p.platform.name))].sort();
}

export function enrichGames(
  rawgCache: Map<number, RawgGameDetails>,
): EnrichedPokemonGame[] {
  const generations = pokemonGamesData as PokemonGeneration[];

  return generations.flatMap((generation) =>
    generation.games.map((game) => {
      const rawgGame = rawgCache.get(game.rawgId);

      return {
        id: game.id,
        name: game.name,
        displayName: formatGameDisplayName(game.name),
        cover: game.cover,
        rawgId: game.rawgId,
        rawgCollection: game.rawgCollection,
        generationId: generation.id,
        generationName: generation.name,
        region: generation.mainRegion,
        released: rawgGame?.released ?? null,
        platforms: extractPlatforms(rawgGame),
        rating: rawgGame?.rating ?? null,
        ratingsCount: rawgGame?.ratings_count ?? null,
        metacritic: rawgGame?.metacritic ?? null,
        genres: rawgGame?.genres?.map((g) => g.name) ?? [],
        developers: rawgGame?.developers?.map((d) => d.name) ?? [],
        playtime: rawgGame?.playtime ? rawgGame.playtime : null,
        esrbRating: rawgGame?.esrb_rating?.name ?? DEFAULT_ESRB_RATING,
      };
    }),
  );
}

export function getGenerationsWithGames(
  games: EnrichedPokemonGame[],
): { generation: PokemonGeneration; games: EnrichedPokemonGame[] }[] {
  const generations = pokemonGamesData as PokemonGeneration[];

  return generations.map((generation) => ({
    generation,
    games: games.filter((g) => g.generationId === generation.id),
  }));
}

export function getUniqueRegions(games: EnrichedPokemonGame[]): string[] {
  return [...new Set(games.map((g) => g.region))].sort();
}

export function getUniquePlatforms(games: EnrichedPokemonGame[]): string[] {
  const platforms = games.flatMap((g) => g.platforms);
  return [...new Set(platforms)].sort();
}

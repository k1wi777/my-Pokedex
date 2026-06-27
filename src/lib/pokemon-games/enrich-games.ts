import pokemonGamesData from "@/data/pokemon-games.json";
import { COLLECTION_LABELS, DEFAULT_ESRB_RATING } from "@/lib/pokemon-games/constants";
import { getLinkedGames } from "@/lib/pokemon-games/relations";
import type {
  EnrichedPokemonGame,
  GameDetailViewModel,
  GameMediaItem,
  PokemonGameLocal,
  PokemonGeneration,
  RawgGameDetails,
  RawgMovie,
  RawgScreenshot,
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

function mapLocalGame(
  game: PokemonGameLocal,
  generation: PokemonGeneration,
  rawgGame: RawgGameDetails | undefined,
): EnrichedPokemonGame {
  return {
    id: game.id,
    name: game.name,
    displayName: formatGameDisplayName(game.name),
    cover: game.cover,
    frontCover: game.frontCover ?? game.cover,
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
    publishers: rawgGame?.publishers?.map((p) => p.name) ?? [],
    playtime: rawgGame?.playtime ? rawgGame.playtime : null,
    esrbRating: rawgGame?.esrb_rating?.name ?? DEFAULT_ESRB_RATING,
    relation: game.relation,
  };
}

export function getAllLocalGames(): PokemonGameLocal[] {
  const generations = pokemonGamesData as PokemonGeneration[];
  return generations.flatMap((g) => g.games);
}

export function findLocalGameById(id: string): {
  game: PokemonGameLocal;
  generation: PokemonGeneration;
} | null {
  const generations = pokemonGamesData as PokemonGeneration[];

  for (const generation of generations) {
    const game = generation.games.find((g) => g.id === id);
    if (game) return { game, generation };
  }
  return null;
}

export function enrichGames(
  rawgCache: Map<number, RawgGameDetails>,
): EnrichedPokemonGame[] {
  const generations = pokemonGamesData as PokemonGeneration[];

  return generations.flatMap((generation) =>
    generation.games.map((game) =>
      mapLocalGame(game, generation, rawgCache.get(game.rawgId)),
    ),
  );
}

export function getCollectionGames(
  allGames: EnrichedPokemonGame[],
  collectionSlug: string,
  excludeId: string,
): EnrichedPokemonGame[] {
  return allGames.filter(
    (g) => g.rawgCollection === collectionSlug && g.id !== excludeId,
  );
}

export function stripHtml(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function resolveBannerImage(
  rawgGame: RawgGameDetails | null,
  fallback: string,
): string {
  return (
    rawgGame?.background_image ??
    rawgGame?.background_image_additional ??
    fallback
  );
}

export function buildMediaItems(
  movies: RawgMovie[],
  screenshots: RawgScreenshot[],
  rawgGame: RawgGameDetails | null,
  local: PokemonGameLocal,
  fallbackCover: string,
): GameMediaItem[] {
  const items: GameMediaItem[] = [];

  for (const movie of movies) {
    const videoUrl = movie.data.max ?? movie.data["480"];
    if (videoUrl) {
      items.push({
        type: "video",
        src: videoUrl,
        preview: movie.preview || fallbackCover,
        label: movie.name || "Tráiler",
      });
    }
  }

  if (local.trailerUrl) {
    items.push({
      type: "video",
      src: local.trailerUrl,
      preview: fallbackCover,
      label: "Tráiler oficial",
    });
  }

  const imageSources: string[] = [];

  for (const shot of screenshots) {
    imageSources.push(shot.image);
  }

  if (rawgGame?.background_image) {
    imageSources.push(rawgGame.background_image);
  }
  if (rawgGame?.background_image_additional) {
    imageSources.push(rawgGame.background_image_additional);
  }

  const uniqueImages = [...new Set(imageSources)];

  for (const src of uniqueImages) {
    items.push({ type: "image", src });
  }

  if (!items.some((i) => i.type === "image")) {
    items.push({ type: "image", src: fallbackCover });
  }

  return items;
}

const DEFAULT_DESCRIPTION =
  "Explora regiones, captura Pokémon y conviértete en campeón en esta entrega de la saga principal.";

export function buildGameDetail(
  local: PokemonGameLocal,
  generation: PokemonGeneration,
  rawgGame: RawgGameDetails | null,
  screenshots: RawgScreenshot[],
  movies: RawgMovie[],
  allEnriched: EnrichedPokemonGame[],
): GameDetailViewModel {
  const base = mapLocalGame(local, generation, rawgGame ?? undefined);
  const allLocal = getAllLocalGames();

  return {
    ...base,
    description: rawgGame?.description
      ? stripHtml(rawgGame.description)
      : DEFAULT_DESCRIPTION,
    officialSite: rawgGame?.website || null,
    bannerImage: resolveBannerImage(rawgGame, local.cover),
    mediaItems: buildMediaItems(movies, screenshots, rawgGame, local, local.cover),
    collectionLabel:
      COLLECTION_LABELS[local.rawgCollection] ?? local.rawgCollection,
    collectionGames: getCollectionGames(
      allEnriched,
      local.rawgCollection,
      local.id,
    ),
    linkedGames: getLinkedGames(local.id, allLocal, allEnriched),
  };
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

export function generateGameStaticParams(): { id: string }[] {
  return getAllLocalGames().map((game) => ({ id: game.id }));
}

export function getGameSecondaryLine(game: EnrichedPokemonGame): string {
  const parts: string[] = [];
  if (game.platforms[0]) parts.push(game.platforms[0]);
  if (game.released) {
    parts.push(new Date(game.released).getFullYear().toString());
  } else {
    parts.push(game.region);
  }
  return parts.join(" · ");
}

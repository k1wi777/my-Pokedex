import { unstable_cache } from "next/cache";
import { RAWG_CACHE_REVALIDATE } from "@/lib/pokemon-games/constants";
import type { RawgGameDetails, RawgMovie, RawgScreenshot } from "@/types/pokemon-games";

const RAWG_BASE_URL = "https://api.rawg.io/api";

function getApiKey(): string {
  const key = process.env.RAWG_API_KEY;
  if (!key) {
    throw new Error("RAWG_API_KEY is not defined in environment variables");
  }
  return key;
}

async function fetchFromRawg<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${RAWG_BASE_URL}${path}`, {
      next: { revalidate: RAWG_CACHE_REVALIDATE },
    });

    if (!res.ok) {
      console.error(`RAWG fetch failed: ${path} (${res.status})`);
      return null;
    }

    return (await res.json()) as T;
  } catch (error) {
    console.error(`RAWG fetch error: ${path}`, error);
    return null;
  }
}

const getCachedRawgGame = unstable_cache(
  async (gameId: number): Promise<RawgGameDetails | null> =>
    fetchFromRawg<RawgGameDetails>(`/games/${gameId}?key=${getApiKey()}`),
  ["rawg-game"],
  { revalidate: RAWG_CACHE_REVALIDATE, tags: ["rawg"] },
);

const getCachedRawgScreenshots = unstable_cache(
  async (gameId: number): Promise<RawgScreenshot[]> => {
    const data = await fetchFromRawg<{ results: RawgScreenshot[] }>(
      `/games/${gameId}/screenshots?key=${getApiKey()}`,
    );
    return data?.results ?? [];
  },
  ["rawg-screenshots"],
  { revalidate: RAWG_CACHE_REVALIDATE, tags: ["rawg"] },
);

const getCachedRawgMovies = unstable_cache(
  async (gameId: number): Promise<RawgMovie[]> => {
    const data = await fetchFromRawg<{ results: RawgMovie[] }>(
      `/games/${gameId}/movies?key=${getApiKey()}`,
    );
    return data?.results ?? [];
  },
  ["rawg-movies"],
  { revalidate: RAWG_CACHE_REVALIDATE, tags: ["rawg"] },
);

export async function fetchRawgGame(gameId: number): Promise<RawgGameDetails | null> {
  return getCachedRawgGame(gameId);
}

export async function fetchRawgScreenshots(gameId: number): Promise<RawgScreenshot[]> {
  return getCachedRawgScreenshots(gameId);
}

export async function fetchRawgMovies(gameId: number): Promise<RawgMovie[]> {
  return getCachedRawgMovies(gameId);
}

export async function fetchRawgGamesByIds(
  ids: number[],
): Promise<Map<number, RawgGameDetails>> {
  const uniqueIds = [...new Set(ids)];
  const results = await Promise.all(
    uniqueIds.map(async (id) => {
      const game = await fetchRawgGame(id);
      return [id, game] as const;
    }),
  );

  const map = new Map<number, RawgGameDetails>();
  for (const [id, game] of results) {
    if (game) map.set(id, game);
  }
  return map;
}

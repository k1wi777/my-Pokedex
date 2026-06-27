import { unstable_cache } from "next/cache";
import { RAWG_CACHE_REVALIDATE } from "@/lib/pokemon-games/constants";
import type { RawgGameDetails, RawgScreenshot } from "@/types/pokemon-games";

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
    const url = path.startsWith("http") ? path : `${RAWG_BASE_URL}${path}`;
    const res = await fetch(url, {
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

async function fetchRawgGameUncached(gameId: number): Promise<RawgGameDetails | null> {
  return fetchFromRawg<RawgGameDetails>(`/games/${gameId}?key=${getApiKey()}`);
}

async function fetchAllScreenshotsUncached(gameId: number): Promise<RawgScreenshot[]> {
  const screenshots: RawgScreenshot[] = [];
  let nextUrl: string | null =
    `/games/${gameId}/screenshots?key=${getApiKey()}&page_size=40`;

  while (nextUrl) {
    const page: {
      results: RawgScreenshot[];
      next: string | null;
    } | null = await fetchFromRawg(nextUrl);

    if (!page?.results?.length) break;

    screenshots.push(...page.results);
    nextUrl = page.next;
  }

  return screenshots;
}

export async function fetchRawgGame(gameId: number): Promise<RawgGameDetails | null> {
  return unstable_cache(
    () => fetchRawgGameUncached(gameId),
    ["rawg-game", String(gameId)],
    { revalidate: RAWG_CACHE_REVALIDATE, tags: ["rawg", `rawg-game-${gameId}`] },
  )();
}

export async function fetchRawgScreenshots(gameId: number): Promise<RawgScreenshot[]> {
  return unstable_cache(
    () => fetchAllScreenshotsUncached(gameId),
    ["rawg-screenshots", String(gameId)],
    {
      revalidate: RAWG_CACHE_REVALIDATE,
      tags: ["rawg", `rawg-screenshots-${gameId}`],
    },
  )();
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

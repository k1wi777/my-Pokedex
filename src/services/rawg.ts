import type { RawgGameDetails } from "@/types/pokemon-games";

const RAWG_BASE_URL = "https://api.rawg.io/api";

function getApiKey(): string {
  const key = process.env.RAWG_API_KEY;
  if (!key) {
    throw new Error("RAWG_API_KEY is not defined in environment variables");
  }
  return key;
}

export async function fetchRawgGame(gameId: number): Promise<RawgGameDetails | null> {
  try {
    const res = await fetch(`${RAWG_BASE_URL}/games/${gameId}?key=${getApiKey()}`, {
      next: { revalidate: 60 * 60 * 24 },
    });

    if (!res.ok) {
      console.error(`RAWG fetch failed for game ${gameId}: ${res.status}`);
      return null;
    }

    return (await res.json()) as RawgGameDetails;
  } catch (error) {
    console.error(`RAWG fetch error for game ${gameId}:`, error);
    return null;
  }
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

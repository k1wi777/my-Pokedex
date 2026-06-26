import type { EnrichedPokemonGame } from "@/types/pokemon-games";

export function getMetacriticColor(score: number): string {
  if (score >= 75) return "#22c55e";
  if (score >= 50) return "#eab308";
  return "#ef4444";
}

export function formatRawgRating(rating: number | null): string | null {
  if (rating == null) return null;
  return `${rating.toFixed(1)}/5`;
}

export function formatRatingsCount(count: number | null): string | null {
  if (count == null || count === 0) return null;
  return count >= 1000 ? `${(count / 1000).toFixed(1)}k` : count.toString();
}

export function formatPlaytime(hours: number | null): string | null {
  if (hours == null || hours === 0) return null;
  return `${hours}h promedio`;
}

export interface GameQuickStat {
  label: string;
  value: string;
  valueClassName?: string;
  valueColor?: string;
}

const DEFAULT_GENRE = "RPG";
const DEFAULT_DEVELOPER = "Game Freak";

export function buildGameQuickStats(game: EnrichedPokemonGame): GameQuickStat[] {
  const ratingLabel = formatRawgRating(game.rating);
  const reviewsLabel = formatRatingsCount(game.ratingsCount);
  const playtimeLabel = formatPlaytime(game.playtime);

  return [
    {
      label: "RAWG",
      value: ratingLabel
        ? `★ ${ratingLabel}${reviewsLabel ? ` (${reviewsLabel})` : ""}`
        : "—",
      valueClassName: ratingLabel ? "" : "text-white/40",
    },
    {
      label: "Metacritic",
      value: game.metacritic != null ? game.metacritic.toString() : "—",
      valueClassName: game.metacritic != null ? "" : "text-white/40",
      valueColor:
        game.metacritic != null ? getMetacriticColor(game.metacritic) : undefined,
    },
    {
      label: "Género",
      value: game.genres.length ? game.genres.slice(0, 2).join(" · ") : DEFAULT_GENRE,
    },
    {
      label: "Desarrollador",
      value: game.developers[0] ?? DEFAULT_DEVELOPER,
    },
    {
      label: "Clasificación",
      value: game.esrbRating,
    },
    playtimeLabel
      ? { label: "Duración", value: playtimeLabel }
      : { label: "Región", value: game.region },
  ];
}

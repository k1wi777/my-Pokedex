import { RECENT_YEARS_THRESHOLD } from "./constants";
import type {
  ActiveFilters,
  EnabledFilterTypes,
  EnrichedPokemonGame,
} from "@/types/pokemon-games";

export function hasActiveFilterTypes(enabled: EnabledFilterTypes): boolean {
  return Object.values(enabled).some(Boolean);
}

export function hasActiveFilterValues(
  enabled: EnabledFilterTypes,
  filters: ActiveFilters,
): boolean {
  if (enabled.search && filters.search.trim()) return true;
  if (enabled.region && filters.region) return true;
  if (enabled.platform && filters.platform) return true;
  if (enabled.recent && filters.recent) return true;
  return false;
}

export function filterGames(
  games: EnrichedPokemonGame[],
  enabled: EnabledFilterTypes,
  filters: ActiveFilters,
): EnrichedPokemonGame[] {
  let result = [...games];

  if (enabled.region && filters.region) {
    result = result.filter((g) => g.region === filters.region);
  }

  if (enabled.platform && filters.platform) {
    result = result.filter((g) => g.platforms.includes(filters.platform));
  }

  if (enabled.search && filters.search.trim()) {
    const query = filters.search.trim().toLowerCase();
    result = result.filter(
      (g) =>
        g.displayName.toLowerCase().includes(query) ||
        g.name.toLowerCase().includes(query) ||
        g.region.toLowerCase().includes(query),
    );
  }

  if (enabled.recent && filters.recent) {
    const cutoffYear = new Date().getFullYear() - RECENT_YEARS_THRESHOLD;
    result = result.filter((g) => {
      if (!g.released) return false;
      return new Date(g.released).getFullYear() >= cutoffYear;
    });
  }

  if (enabled.recent && filters.recent) {
    result.sort((a, b) => {
      const dateA = a.released ? new Date(a.released).getTime() : 0;
      const dateB = b.released ? new Date(b.released).getTime() : 0;
      return dateB - dateA;
    });
  }

  return result;
}

export function formatReleaseYear(released: string | null): string {
  if (!released) return "—";
  return new Date(released).getFullYear().toString();
}

export function formatPlatforms(platforms: string[]): string {
  if (!platforms.length) return "—";
  if (platforms.length <= 2) return platforms.join(", ");
  return `${platforms.slice(0, 2).join(", ")} +${platforms.length - 2}`;
}

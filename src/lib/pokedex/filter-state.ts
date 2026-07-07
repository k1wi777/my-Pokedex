export type ExpandedFilter = "type" | "generation" | "game" | null;

export interface PokedexFilterState {
  types: string[];
  generations: number[];
  games: string[];
  expandedFilter: ExpandedFilter;
}

export const INITIAL_FILTER_STATE: PokedexFilterState = {
  types: [],
  generations: [],
  games: [],
  expandedFilter: null,
};

export function hasActiveFilters(
  state: Pick<PokedexFilterState, "types" | "generations" | "games">,
): boolean {
  return (
    state.types.length > 0 ||
    state.generations.length > 0 ||
    state.games.length > 0
  );
}

export function clearFilterCategory(
  state: PokedexFilterState,
  category: "type" | "generation" | "game",
): PokedexFilterState {
  switch (category) {
    case "type":
      return { ...state, types: [], expandedFilter: null };
    case "generation":
      return { ...state, generations: [], expandedFilter: null };
    case "game":
      return { ...state, games: [], expandedFilter: null };
  }
}

export function clearAllFilters(): PokedexFilterState {
  return { ...INITIAL_FILTER_STATE };
}

export function buildFilterCacheKey(
  state: Pick<PokedexFilterState, "types" | "generations" | "games">,
): string {
  return JSON.stringify({
    types: [...state.types].sort(),
    generations: [...state.generations].sort((a, b) => a - b),
    games: [...state.games].sort(),
  });
}

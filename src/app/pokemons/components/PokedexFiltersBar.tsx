"use client";

import { useCallback, useRef, useState } from "react";
import FilterPill from "./FilterPill";
import TypeFilterPanel from "./TypeFilterPanel";
import GenerationFilterPanel from "./GenerationFilterPanel";
import GameFilterPanel from "./GameFilterPanel";
import PokemonGrid from "@/app/components/PokemonGrid";
import { formatGameDisplayName, getAllLocalGames } from "@/lib/pokemon-games/enrich-games";
import {
  buildFilterCacheKey,
  clearAllFilters,
  clearFilterCategory,
  hasActiveFilters,
  INITIAL_FILTER_STATE,
  type PokedexFilterState,
} from "@/lib/pokedex/filter-state";
import { resolveFilteredPokemon } from "@/lib/pokedex/resolve-filtered-pokemon";
import type { PokeApiPokemonResponse } from "@/types/pokeapi-generation";

interface PokedexFiltersBarProps {
  initialResults: PokeApiPokemonResponse[];
  initialNext: string | null;
}

const ROMAN_NUMERALS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"] as const;
const GAME_LABELS = new Map(
  getAllLocalGames().map((game) => [game.id, formatGameDisplayName(game.name)]),
);
function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default function PokedexFiltersBar({
  initialResults,
  initialNext,
}: PokedexFiltersBarProps) {
  const [filterState, setFilterState] =
    useState<PokedexFilterState>(INITIAL_FILTER_STATE);
  const [filteredResults, setFilteredResults] = useState<
    PokeApiPokemonResponse[] | null
  >(null);
  const [isResolving, setIsResolving] = useState(false);
  const resolveRequestId = useRef(0);

  const filtersActive = hasActiveFilters(filterState);

  const applyFilterState = useCallback((next: PokedexFilterState) => {
    setFilterState(next);

    if (!hasActiveFilters(next)) {
      setFilteredResults(null);
      setIsResolving(false);
      return;
    }

    const requestId = ++resolveRequestId.current;
    setIsResolving(true);

    resolveFilteredPokemon({
      types: next.types,
      generations: next.generations,
      games: next.games,
    })
      .then((results) => {
        if (requestId === resolveRequestId.current) {
          setFilteredResults(results);
          setIsResolving(false);
        }
      })
      .catch((error) => {
        console.error("Error resolving filtered pokemon:", error);
        if (requestId === resolveRequestId.current) {
          setFilteredResults([]);
          setIsResolving(false);
        }
      });
  }, []);

  const expandFilter = useCallback(
    (filter: NonNullable<PokedexFilterState["expandedFilter"]>) => {
      setFilterState((prev) => ({
        ...prev,
        expandedFilter: prev.expandedFilter === filter ? null : filter,
      }));
    },
    [],
  );

  const collapseFilter = useCallback(() => {
    setFilterState((prev) => ({ ...prev, expandedFilter: null }));
  }, []);

  const handleClearAll = () => {
    applyFilterState(clearAllFilters());
  };

  const gridKey = filtersActive
    ? buildFilterCacheKey(filterState)
    : "default";

  const typeTags = filterState.types.map(capitalize);
  const generationTags = filterState.generations.map(
    (generationId) => `Gen ${ROMAN_NUMERALS[generationId - 1] ?? generationId}`,
  );
  const gameTags = filterState.games.map((gameId) => GAME_LABELS.get(gameId) ?? gameId);

  return (
    <div className="flex flex-col">
      <div className="relative z-20 px-4 pt-4 sm:px-6 md:px-10 lg:px-16 xl:px-20">
        <div className="mb-3 space-y-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-orange-300/80">
            Filtros de búsqueda
          </p>
          <p className="text-sm text-stone-400">
            Refina la Pokédex por tipo, generación o juego.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <FilterPill
            label="Tipo"
            hasSelection={filterState.types.length > 0}
            selectionTags={typeTags}
            expanded={filterState.expandedFilter === "type"}
            onToggle={() => expandFilter("type")}
            onClose={collapseFilter}
          >
            <TypeFilterPanel
              selected={filterState.types}
              onChange={(types) =>
                applyFilterState({ ...filterState, types })
              }
              onClear={() =>
                applyFilterState(clearFilterCategory(filterState, "type"))
              }
            />
          </FilterPill>

          <FilterPill
            label="Generación"
            hasSelection={filterState.generations.length > 0}
            selectionTags={generationTags}
            expanded={filterState.expandedFilter === "generation"}
            onToggle={() => expandFilter("generation")}
            onClose={collapseFilter}
          >
            <GenerationFilterPanel
              selected={filterState.generations}
              onChange={(generations) =>
                applyFilterState({ ...filterState, generations })
              }
              onClear={() =>
                applyFilterState(
                  clearFilterCategory(filterState, "generation"),
                )
              }
            />
          </FilterPill>

          <FilterPill
            label="Juego"
            hasSelection={filterState.games.length > 0}
            selectionTags={gameTags}
            expanded={filterState.expandedFilter === "game"}
            onToggle={() => expandFilter("game")}
            onClose={collapseFilter}
          >
            <GameFilterPanel
              selected={filterState.games}
              onChange={(games) =>
                applyFilterState({ ...filterState, games })
              }
              onClear={() =>
                applyFilterState(clearFilterCategory(filterState, "game"))
              }
            />
          </FilterPill>

          {filtersActive && (
            <button
              type="button"
              onClick={handleClearAll}
              className="text-xs font-semibold text-stone-400 transition-colors hover:text-white"
            >
              Limpiar todo
            </button>
          )}
        </div>

        {isResolving && (
          <p className="mt-3 text-sm text-gray-400 animate-pulse">
            Filtrando Pokémon…
          </p>
        )}
      </div>

      <PokemonGrid
        key={gridKey}
        initialResults={initialResults}
        initialNext={initialNext}
        filteredResults={filteredResults}
        isFilterMode={filtersActive}
        isLoading={isResolving}
      />
    </div>
  );
}

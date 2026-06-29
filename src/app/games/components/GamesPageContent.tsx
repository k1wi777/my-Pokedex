"use client";

import { useMemo, useState } from "react";
import {
  getGenerationsWithGames,
  getUniquePlatforms,
  getUniqueRegions,
} from "@/lib/pokemon-games/enrich-games";
import {
  filterGames,
  hasActiveFilterValues,
} from "@/lib/pokemon-games/filters";
import type {
  ActiveFilters,
  EnabledFilterTypes,
  EnrichedPokemonGame,
  FilterType,
} from "@/types/pokemon-games";
import GameCard from "./GameCard";
import GamesFilterCarousel from "./GamesFilterCarousel";
import GenerationSection from "./GenerationSection";

const INITIAL_ENABLED: EnabledFilterTypes = {
  region: false,
  platform: false,
  search: false,
  recent: false,
};

const INITIAL_FILTERS: ActiveFilters = {
  region: "",
  platform: "",
  search: "",
  recent: false,
};

interface GamesPageContentProps {
  games: EnrichedPokemonGame[];
}

export default function GamesPageContent({ games }: GamesPageContentProps) {
  const [enabledTypes, setEnabledTypes] =
    useState<EnabledFilterTypes>(INITIAL_ENABLED);
  const [filters, setFilters] = useState<ActiveFilters>(INITIAL_FILTERS);

  const regions = useMemo(() => getUniqueRegions(games), [games]);
  const platforms = useMemo(() => getUniquePlatforms(games), [games]);

  const showFilteredGrid = hasActiveFilterValues(enabledTypes, filters);

  const filteredGames = useMemo(
    () => filterGames(games, enabledTypes, filters),
    [games, enabledTypes, filters],
  );

  const generationsWithGames = useMemo(
    () => getGenerationsWithGames(filteredGames),
    [filteredGames],
  );

  const handleToggleFilterType = (type: FilterType) => {
    setEnabledTypes((prev) => {
      const next = { ...prev, [type]: !prev[type] };
      if (!next[type]) {
        setFilters((f) => ({
          ...f,
          ...(type === "region" && { region: "" }),
          ...(type === "platform" && { platform: "" }),
          ...(type === "search" && { search: "" }),
          ...(type === "recent" && { recent: false }),
        }));
      }
      return next;
    });
  };

  const handleClearFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  return (
    <div className="space-y-8">
      <GamesFilterCarousel
        enabled={enabledTypes}
        filters={filters}
        regions={regions}
        platforms={platforms}
        onToggle={handleToggleFilterType}
        onChange={setFilters}
        onClear={handleClearFilters}
      />
      <div className="mx-auto max-w-7xl px-6">
        {filteredGames.length === 0 ? (
          <p className="rounded-2xl border border-white/10 bg-white/5 py-12 text-center text-stone-400">
            No se encontraron juegos con los filtros seleccionados.
          </p>
        ) : showFilteredGrid ? (
          <section>
            <p className="mb-4 text-sm text-stone-500">
              {filteredGames.length} juego
              {filteredGames.length !== 1 ? "s" : ""} encontrado
              {filteredGames.length !== 1 ? "s" : ""}
            </p>
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 ">
              {filteredGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </section>
        ) : (
          <div className="space-y-12   sm:px-10 md:px-12 lg:px-14">
            {generationsWithGames.map(({ generation, games: genGames }) => (
              <GenerationSection
                key={generation.id}
                generationId={generation.id}
                generationName={generation.name}
                region={generation.mainRegion}
                games={genGames}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

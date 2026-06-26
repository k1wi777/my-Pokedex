"use client";

import { useMemo, useState } from "react";
import {
  getGenerationsWithGames,
  getUniquePlatforms,
  getUniqueRegions,
} from "@/lib/pokemon-games/enrich-games";
import {
  filterGames,
  hasActiveFilterTypes,
  hasActiveFilterValues,
} from "@/lib/pokemon-games/filters";
import type {
  ActiveFilters,
  EnabledFilterTypes,
  EnrichedPokemonGame,
  FilterType,
} from "@/types/pokemon-games";
import GameCard from "./GameCard";
import GamesFilterPanel from "./GamesFilterPanel";
import GamesFilterToggle from "./GamesFilterToggle";
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

  const isFilterMode = hasActiveFilterTypes(enabledTypes);
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
      <header className="space-y-2">
        <h1 className="text-2xl font-black tracking-wide text-yellow-400 sm:text-3xl">
          Juegos Pokémon
        </h1>
        <p className="max-w-2xl text-sm text-stone-400 sm:text-base">
          Explora la saga principal organizada por generación. Activa los filtros
          cuando quieras buscar por región, plataforma o lanzamientos recientes.
        </p>
      </header>

      <GamesFilterToggle enabled={enabledTypes} onToggle={handleToggleFilterType} />

      {isFilterMode && (
        <GamesFilterPanel
          enabled={enabledTypes}
          filters={filters}
          regions={regions}
          platforms={platforms}
          onChange={setFilters}
          onClear={handleClearFilters}
        />
      )}

      {filteredGames.length === 0 ? (
        <p className="rounded-2xl border border-white/10 bg-white/5 py-12 text-center text-stone-400">
          No se encontraron juegos con los filtros seleccionados.
        </p>
      ) : showFilteredGrid ? (
        <section>
          <p className="mb-4 text-sm text-stone-500">
            {filteredGames.length} juego{filteredGames.length !== 1 ? "s" : ""}{" "}
            encontrado{filteredGames.length !== 1 ? "s" : ""}
          </p>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
            {filteredGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </section>
      ) : (
        <div className="space-y-12">
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
  );
}

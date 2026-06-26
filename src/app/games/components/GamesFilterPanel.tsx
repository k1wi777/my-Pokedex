"use client";

import { RECENT_YEARS_THRESHOLD } from "@/lib/pokemon-games/constants";
import type { ActiveFilters, EnabledFilterTypes } from "@/types/pokemon-games";

interface GamesFilterPanelProps {
  enabled: EnabledFilterTypes;
  filters: ActiveFilters;
  regions: string[];
  platforms: string[];
  onChange: (filters: ActiveFilters) => void;
  onClear: () => void;
}

export default function GamesFilterPanel({
  enabled,
  filters,
  regions,
  platforms,
  onChange,
  onClear,
}: GamesFilterPanelProps) {
  const update = (partial: Partial<ActiveFilters>) => {
    onChange({ ...filters, ...partial });
  };

  return (
    <div className="animate-[fadeUp_0.35s_ease-out] rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md sm:p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-wider text-yellow-400">
          Opciones de filtro
        </h3>
        <button
          type="button"
          onClick={onClear}
          className="text-xs text-stone-400 transition-colors hover:text-white"
        >
          Limpiar valores
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {enabled.search && (
          <div className="sm:col-span-2 lg:col-span-1">
            <label className="mb-1.5 block text-xs font-medium text-stone-400">
              Buscar juego
            </label>
            <div className="relative">
              <input
                type="search"
                value={filters.search}
                onChange={(e) => update({ search: e.target.value })}
                placeholder="Nombre, región..."
                className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2.5 pl-10 text-sm text-white placeholder:text-stone-500 focus:border-orange-500/50 focus:outline-none focus:ring-1 focus:ring-orange-500/30"
              />
              <svg
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        )}

        {enabled.region && (
          <div>
            <label className="mb-1.5 block text-xs font-medium text-stone-400">
              Región
            </label>
            <select
              value={filters.region}
              onChange={(e) => update({ region: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 text-sm text-white focus:border-orange-500/50 focus:outline-none focus:ring-1 focus:ring-orange-500/30"
            >
              <option value="">Todas las regiones</option>
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>
        )}

        {enabled.platform && (
          <div>
            <label className="mb-1.5 block text-xs font-medium text-stone-400">
              Plataforma
            </label>
            <select
              value={filters.platform}
              onChange={(e) => update({ platform: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 text-sm text-white focus:border-orange-500/50 focus:outline-none focus:ring-1 focus:ring-orange-500/30"
            >
              <option value="">Todas las plataformas</option>
              {platforms.map((platform) => (
                <option key={platform} value={platform}>
                  {platform}
                </option>
              ))}
            </select>
          </div>
        )}

        {enabled.recent && (
          <div className="flex items-end">
            <label className="flex w-full cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-black/40 px-4 py-2.5 transition-colors hover:border-white/20">
              <input
                type="checkbox"
                checked={filters.recent}
                onChange={(e) => update({ recent: e.target.checked })}
                className="h-4 w-4 rounded accent-orange-500"
              />
              <span className="text-sm text-stone-300">
                Últimos {RECENT_YEARS_THRESHOLD} años
              </span>
            </label>
          </div>
        )}
      </div>
    </div>
  );
}

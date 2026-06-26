"use client";

import { FILTER_LABELS } from "@/lib/pokemon-games/constants";
import type { FilterType } from "@/types/pokemon-games";

interface GamesFilterToggleProps {
  enabled: Record<FilterType, boolean>;
  onToggle: (type: FilterType) => void;
}

const FILTER_TYPES: FilterType[] = ["region", "platform", "search", "recent"];

export default function GamesFilterToggle({
  enabled,
  onToggle,
}: GamesFilterToggleProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <span className="mr-1 self-center text-xs font-semibold uppercase tracking-wider text-stone-500">
        Filtros
      </span>
      {FILTER_TYPES.map((type) => {
        const isActive = enabled[type];
        return (
          <label
            key={type}
            className={`
              flex cursor-pointer items-center gap-2 rounded-full border px-3 py-1.5 text-sm
              transition-all duration-200 select-none
              ${
                isActive
                  ? "border-orange-500/60 bg-orange-500/15 text-orange-300"
                  : "border-white/10 bg-white/5 text-stone-400 hover:border-white/20 hover:text-stone-200"
              }
            `}
          >
            <input
              type="checkbox"
              checked={isActive}
              onChange={() => onToggle(type)}
              className="sr-only"
            />
            <span
              className={`h-3.5 w-3.5 rounded border transition-colors ${
                isActive
                  ? "border-orange-400 bg-orange-500"
                  : "border-stone-600 bg-transparent"
              }`}
            />
            {FILTER_LABELS[type]}
          </label>
        );
      })}
    </div>
  );
}

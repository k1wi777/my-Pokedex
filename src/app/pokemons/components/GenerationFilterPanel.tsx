"use client";

import pokemonGamesData from "@/data/pokemon-games.json";
import type { PokemonGeneration } from "@/types/pokemon-games";

const ROMAN_NUMERALS = [
  "I",
  "II",
  "III",
  "IV",
  "V",
  "VI",
  "VII",
  "VIII",
  "IX",
] as const;

const generations = (pokemonGamesData as PokemonGeneration[]).map((gen) => ({
  id: gen.id,
  label: `Gen ${ROMAN_NUMERALS[gen.id - 1] ?? gen.id}`,
  region: gen.mainRegion,
}));

interface GenerationFilterPanelProps {
  selected: number[];
  onChange: (generations: number[]) => void;
  onClear: () => void;
}

export default function GenerationFilterPanel({
  selected,
  onChange,
  onClear,
}: GenerationFilterPanelProps) {
  const toggleGeneration = (genId: number) => {
    if (selected.includes(genId)) {
      onChange(selected.filter((id) => id !== genId));
    } else {
      onChange([...selected, genId]);
    }
  };

  return (
    <div className="space-y-3 pr-6">
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
        Selecciona una o más generaciones
      </p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {generations.map((gen) => {
          const isSelected = selected.includes(gen.id);
          return (
            <button
              key={gen.id}
              type="button"
              onClick={() => toggleGeneration(gen.id)}
              className={`
                flex flex-col items-center rounded-lg border px-2 py-2.5 transition-all
                ${
                  isSelected
                    ? "border-orange-500 bg-orange-500/20 ring-1 ring-orange-500/50"
                    : "border-white/10 bg-white/5 hover:border-white/25"
                }
              `}
            >
              <span className="text-sm font-black text-white">{gen.label}</span>
              <span className="text-[10px] text-gray-400">{gen.region}</span>
            </button>
          );
        })}
      </div>
      {selected.length > 0 && (
        <button
          type="button"
          onClick={onClear}
          className="text-xs font-semibold text-stone-400 transition-colors hover:text-white"
        >
          Limpiar generaciones
        </button>
      )}
    </div>
  );
}

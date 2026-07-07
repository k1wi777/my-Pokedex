"use client";

import Image from "next/image";

export const POKEMON_TYPES = [
  "normal",
  "fire",
  "water",
  "electric",
  "grass",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
] as const;

interface TypeFilterPanelProps {
  selected: string[];
  onChange: (types: string[]) => void;
  onClear: () => void;
}

export default function TypeFilterPanel({
  selected,
  onChange,
  onClear,
}: TypeFilterPanelProps) {
  const toggleType = (typeName: string) => {
    if (selected.includes(typeName)) {
      onChange(selected.filter((t) => t !== typeName));
      return;
    }

    if (selected.length >= 2) {
      onChange([selected[1], typeName]);
      return;
    }

    onChange([...selected, typeName]);
  };

  return (
    <div className="space-y-3 pr-6">
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
        Selecciona 1–2 tipos
      </p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
        {POKEMON_TYPES.map((typeName) => {
          const isSelected = selected.includes(typeName);
          return (
            <button
              key={typeName}
              type="button"
              onClick={() => toggleType(typeName)}
              className={`
                type-${typeName} flex flex-col items-center gap-1 rounded-lg border p-2 transition-all
                ${
                  isSelected
                    ? "border-orange-500 bg-orange-500/20 ring-1 ring-orange-500/50"
                    : "border-white/10 bg-white/5 hover:border-white/25"
                }
              `}
            >
              <Image
                src={`/types/${typeName}.svg`}
                alt=""
                width={28}
                height={28}
                className="h-7 w-7"
              />
              <span className="text-[10px] font-bold capitalize text-white">
                {typeName}
              </span>
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
          Limpiar tipos
        </button>
      )}
    </div>
  );
}

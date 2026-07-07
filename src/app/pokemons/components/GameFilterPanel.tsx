"use client";

import Image from "next/image";
import {
  formatGameDisplayName,
  getAllLocalGames,
} from "@/lib/pokemon-games/enrich-games";

interface GameFilterPanelProps {
  selected: string[];
  onChange: (games: string[]) => void;
  onClear: () => void;
}

const allGames = getAllLocalGames();

export default function GameFilterPanel({
  selected,
  onChange,
  onClear,
}: GameFilterPanelProps) {
  const toggleGame = (gameId: string) => {
    if (selected.includes(gameId)) {
      onChange(selected.filter((id) => id !== gameId));
    } else {
      onChange([...selected, gameId]);
    }
  };

  return (
    <div className="space-y-3 pr-6">
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
        Selecciona uno o más juegos
      </p>
      <div className="thin-scroll grid max-h-64 grid-cols-2 gap-2 overflow-y-auto pr-1 sm:grid-cols-3 lg:grid-cols-4">
        {allGames.map((game) => {
          const isSelected = selected.includes(game.id);
          const cover =  game.cover ?? game.frontCover;
          return (
            <button
              key={game.id}
              type="button"
              onClick={() => toggleGame(game.id)}
              className={`
                group relative aspect-3/4 overflow-hidden rounded-lg border transition-all
                ${
                  isSelected
                    ? "border-orange-500 ring-2 ring-orange-500/60"
                    : "border-white/15 hover:border-white/35"
                }
              `}
            >
              <Image
                src={cover}
                alt={formatGameDisplayName(game.name)}
                fill
                sizes="(max-width: 640px) 33vw, 96px"
                quality={90}
                className="object-cover"
              />
              <div
                className={`
                  absolute inset-0 flex items-end bg-linear-to-t from-black/80 via-black/20 to-transparent
                  p-1 transition-colors
                  ${isSelected ? "bg-orange-500/25" : "group-hover:bg-black/30"}
                `}
              >
                <span className="line-clamp-2 text-left text-[12px] font-black leading-tight text-white drop-shadow">
                  {game.name}
                </span>
              </div>
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
          Limpiar juegos
        </button>
      )}
    </div>
  );
}

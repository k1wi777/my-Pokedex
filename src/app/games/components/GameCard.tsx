import Image from "next/image";
import type { CSSProperties } from "react";
import {
  formatPlatforms,
  formatReleaseYear,
} from "@/lib/pokemon-games/filters";
import { buildGameQuickStats } from "@/lib/pokemon-games/game-stats";
import type { EnrichedPokemonGame } from "@/types/pokemon-games";

interface GameCardProps {
  game: EnrichedPokemonGame;
}

interface QuickStatProps {
  label: string;
  value: string;
  valueClassName?: string;
  valueStyle?: CSSProperties;
}

function QuickStat({ label, value, valueClassName = "", valueStyle }: QuickStatProps) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[10px] font-semibold uppercase tracking-wider text-white/45">
        {label}
      </span>
      <span
        className={`text-xs font-bold text-white sm:text-sm ${valueClassName}`}
        style={valueStyle}
      >
        {value}
      </span>
    </div>
  );
}

export default function GameCard({ game }: GameCardProps) {
  const quickStats = buildGameQuickStats(game);

  return (
    <article className="group relative aspect-[2/3] w-full overflow-hidden rounded-xl">
      <Image
        src={game.cover}
        alt={game.displayName}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />

      <div
        className="
          absolute inset-x-0 bottom-0 z-10
          flex flex-col justify-end group-hover:justify-start
          h-[34%] group-hover:h-[58%]
          rounded-t-xl
          transition-[height,backdrop-filter,background-color] duration-500 ease-out
          bg-gradient-to-t from-black/90 via-black/55 to-transparent
          group-hover:from-black/75 group-hover:via-black/45 group-hover:to-black/10
          group-hover:backdrop-blur-lg group-hover:bg-white/[0.06]
        "
      >
        <div className="p-4 sm:p-5">
          <h3 className="text-base font-black leading-tight tracking-wide text-white sm:text-lg md:text-xl">
            {game.displayName}
          </h3>

          <p className="mt-1.5 text-xs font-medium text-white/75 sm:text-sm">
            {formatPlatforms(game.platforms)}
            {game.released && (
              <span className="text-white/50"> · {formatReleaseYear(game.released)}</span>
            )}
          </p>

          <div
            className="
              mt-0 max-h-0 overflow-hidden opacity-0
              transition-all duration-500 ease-out
              group-hover:mt-3 group-hover:max-h-56 group-hover:opacity-100
            "
          >
            <div className="grid grid-cols-2 gap-x-3 gap-y-3 border-t border-white/10 pt-3">
              {quickStats.map((stat) => (
                <QuickStat
                  key={stat.label}
                  label={stat.label}
                  value={stat.value}
                  valueClassName={stat.valueClassName}
                  valueStyle={
                    stat.valueColor ? { color: stat.valueColor } : undefined
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

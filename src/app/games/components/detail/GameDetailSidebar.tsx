import Image from "next/image";
import { formatReleaseDate } from "@/lib/pokemon-games/format";
import { formatPlaytime } from "@/lib/pokemon-games/game-stats";
import type { GameDetailViewModel } from "@/types/pokemon-games";
import GameRatingCard from "./GameRatingCard";
import { InfoRow } from "./GameDetailShared";

interface GameDetailSidebarProps {
  game: GameDetailViewModel;
}

export default function GameDetailSidebar({ game }: GameDetailSidebarProps) {
  const playtime = formatPlaytime(game.playtime);

  return (
    <aside className="w-full lg:w-[260px]">
      <figure className="mx-auto flex justify-center lg:mx-0 lg:justify-start">
        <Image
          src={game.frontCover}
          alt={game.displayName}
          width={240}
          height={360}
          className="h-[300px] w-auto rounded-xl border-2 border-white/20 mx-auto"
          priority
        />
      </figure>

      <div className="mt-6">
        <GameRatingCard esrbRating={game.esrbRating} />
      </div>

      <div className="mt-6">
        <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-stone-500">
          Información del juego
        </p>
        <InfoRow label="Desarrollador" value={game.developers[0] ?? "Game Freak"} />
        <InfoRow label="Editor" value={game.publishers[0] ?? "Nintendo"} />
        <InfoRow label="Lanzamiento" value={formatReleaseDate(game.released)} />
        <InfoRow label="Duración media" value={playtime ?? "—"} />
        <InfoRow label="Región" value={game.region} />
        <InfoRow label="Generación" value={game.generationName} />
      </div>
    </aside>
  );
}

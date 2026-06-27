import { formatPlaytime } from "@/lib/pokemon-games/game-stats";
import type { GameDetailViewModel } from "@/types/pokemon-games";
import { SectionHeading, Tag } from "./GameDetailShared";

interface GameAboutSectionProps {
  game: GameDetailViewModel;
}

export default function GameAboutSection({ game }: GameAboutSectionProps) {
  const playtime = formatPlaytime(game.playtime);

  return (
    <section>
      <SectionHeading>Información general</SectionHeading>

      <p className="w-full text-sm leading-7 text-stone-300 sm:text-[15px]">
        {game.description}
      </p>

      <div className="mt-8 space-y-5">
        {game.genres.length > 0 && (
          <div>
            <p className="mb-2.5 text-xs font-semibold uppercase tracking-widest text-stone-500">
              Géneros
            </p>
            <div className="flex flex-wrap gap-2">
              {game.genres.map((genre) => (
                <Tag key={genre}>{genre}</Tag>
              ))}
            </div>
          </div>
        )}

        <div>
          <p className="mb-2.5 text-xs font-semibold uppercase tracking-widest text-stone-500">
            Detalles
          </p>
          <div className="flex flex-wrap gap-2">
            <Tag>{game.region}</Tag>
            <Tag>{game.generationName}</Tag>
            {playtime && <Tag>{playtime}</Tag>}
            {game.developers[0] && <Tag>{game.developers[0]}</Tag>}
          </div>
        </div>
      </div>
    </section>
  );
}

import type { GameDetailViewModel } from "@/types/pokemon-games";
import RelatedGameCard from "./RelatedGameCard";
import { SectionHeading, SubSectionHeading } from "./GameDetailShared";

interface GameCollectionSectionProps {
  game: GameDetailViewModel;
}

export default function GameCollectionSection({ game }: GameCollectionSectionProps) {
  const hasLinked = game.linkedGames.length > 0;
  const hasCollection = game.collectionGames.length > 0;

  return (
    <section className="border-t border-white/10 pt-10">
      <SectionHeading subtitle={game.collectionLabel}>
        Colección y relaciones
      </SectionHeading>

      {hasCollection && (
        <div className="mb-10">
          <SubSectionHeading>Misma colección</SubSectionHeading>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {game.collectionGames.map((related) => (
              <RelatedGameCard
                key={related.id}
                game={related}
                tag="Colección"
              />
            ))}
          </div>
        </div>
      )}

      {hasLinked && (
        <div>
          <SubSectionHeading>Relaciones</SubSectionHeading>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {game.linkedGames.map(({ game: related, tag }) => (
              <RelatedGameCard
                key={`${related.id}-${tag}`}
                game={related}
                tag={tag}
              />
            ))}
          </div>
        </div>
      )}

      {!hasCollection && !hasLinked && (
        <p className="text-sm text-stone-500">
          Este juego forma parte de {game.collectionLabel}.
        </p>
      )}
    </section>
  );
}

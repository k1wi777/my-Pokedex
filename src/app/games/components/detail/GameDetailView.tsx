import type { GameDetailViewModel } from "@/types/pokemon-games";
import GameAboutSection from "./GameAboutSection";
import GameCollectionSection from "./GameCollectionSection";
import GameDetailSidebar from "./GameDetailSidebar";
import GameMediaGallery from "./GameMediaGallery";
import GameMetricsSection from "./GameMetricsSection";
import { SectionHeading } from "./GameDetailShared";

interface GameDetailViewProps {
  game: GameDetailViewModel;
}

export default function GameDetailView({ game }: GameDetailViewProps) {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10 sm:px-10 md:px-12 lg:px-14">
      <div className="grid gap-10 lg:grid-cols-[1fr_260px] lg:gap-12">
        <section className="min-w-0">
          <SectionHeading>Galería</SectionHeading>
          <GameMediaGallery
            mediaItems={game.mediaItems}
            gameName={game.displayName}
          />
        </section>

        <GameDetailSidebar game={game} />

        <div className="space-y-12 lg:col-span-2">
          <GameAboutSection game={game} />
          <GameMetricsSection game={game} />
          <GameCollectionSection game={game} />
        </div>
      </div>
    </div>
  );
}

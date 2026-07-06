import type { GameDetailViewModel } from "@/types/pokemon-games";
import type { GenerationPokemonItem } from "@/types/pokeapi-generation";
import GameAboutSection from "./GameAboutSection";
import GameCollectionSection from "./GameCollectionSection";
import GameDetailSidebar from "./GameDetailSidebar";
import GameMediaGallery from "./GameMediaGallery";
import GameMetricsSection from "./GameMetricsSection";
import GenerationPokemonSection from "./GenerationPokemonSection";
import { SectionHeading } from "./GameDetailShared";

interface GameDetailViewProps {
  game: GameDetailViewModel;
  generationPokemon: GenerationPokemonItem[];
}

export default function GameDetailView({
  game,
  generationPokemon,
}: GameDetailViewProps) {
  return (
    <div className="mx-auto max-w-7xl overflow-x-hidden px-6 py-10 sm:px-10 md:px-12 lg:px-14">
      <div className="grid min-w-0 gap-10 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-12">
        <section className="min-w-0 overflow-hidden">
          <SectionHeading>Galería</SectionHeading>
          <GameMediaGallery
            mediaItems={game.mediaItems}
            gameName={game.displayName}
          />
        </section>

        <div className="min-w-0 lg:row-span-1">
          <GameDetailSidebar game={game} />
        </div>

        <div className="min-w-0 space-y-12 overflow-hidden lg:col-span-2">
          <GameAboutSection game={game} />
          <GameMetricsSection game={game} />
          <GameCollectionSection game={game} />
          <GenerationPokemonSection
            pokemon={generationPokemon}
            generationName={game.generationName}
          />
        </div>
      </div>
    </div>
  );
}

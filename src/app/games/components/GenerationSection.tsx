import { GENERATION_ACCENTS } from "@/lib/pokemon-games/constants";
import type { EnrichedPokemonGame } from "@/types/pokemon-games";
import GameCard from "./GameCard";

interface GenerationSectionProps {
  generationName: string;
  generationId: number;
  region: string;
  games: EnrichedPokemonGame[];
}

export default function GenerationSection({
  generationName,
  generationId,
  region,
  games,
}: GenerationSectionProps) {
  const accent = GENERATION_ACCENTS[generationId] ?? "#f97316";

  return (
    <section className="space-y-6">
      <header className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
        <h2 className="text-xl font-black tracking-wide text-white sm:text-2xl">
          {generationName}
        </h2>
        <span
          className="rounded-full border px-3 py-1 text-xs font-semibold"
          style={{
            color: accent,
            borderColor: `${accent}50`,
            backgroundColor: `${accent}15`,
          }}
        >
          {region}
        </span>
      </header>

      <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </section>
  );
}

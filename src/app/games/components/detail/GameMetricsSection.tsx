import {
  formatPlaytime,
  formatRatingsCount,
  formatRawgRating,
  getMetacriticColor,
} from "@/lib/pokemon-games/game-stats";
import type { GameDetailViewModel } from "@/types/pokemon-games";
import { SectionHeading } from "./GameDetailShared";

interface MetricRingProps {
  value: string;
  label: string;
  percent: number;
  color?: string;
}

function MetricRing({ value, label, percent, color = "#38bdf8" }: MetricRingProps) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative h-28 w-28">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="6"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-white">{value}</span>
        </div>
      </div>
      <p className="mt-2 max-w-[120px] text-xs leading-snug text-stone-400">
        {label}
      </p>
    </div>
  );
}

interface GameMetricsSectionProps {
  game: GameDetailViewModel;
}

export default function GameMetricsSection({ game }: GameMetricsSectionProps) {
  const rawgRating = formatRawgRating(game.rating);
  const reviews = formatRatingsCount(game.ratingsCount);
  const rawgPercent = game.rating != null ? Math.round((game.rating / 5) * 100) : 0;
  const metacriticPercent = game.metacritic ?? 0;

  return (
    <section className="border-t border-white/10 pt-10">
      <SectionHeading subtitle="Valoraciones de la comunidad y crítica">
        Calificaciones
      </SectionHeading>

      <div className="flex flex-wrap justify-center gap-10 sm:justify-start sm:gap-14">
        <MetricRing
          value={rawgRating ? `${rawgPercent}%` : "—"}
          label={
            reviews
              ? `Valoración RAWG (${reviews} reseñas)`
              : "Valoración RAWG"
          }
          percent={rawgPercent}
          color="#f97316"
        />
        <MetricRing
          value={game.metacritic?.toString() ?? "—"}
          label="Puntuación Metacritic"
          percent={metacriticPercent}
          color={
            game.metacritic != null
              ? getMetacriticColor(game.metacritic)
              : "#525252"
          }
        />
        <MetricRing
          value={rawgRating ?? "—"}
          label="Promedio en escala 5"
          percent={rawgPercent}
          color="#eab308"
        />
      </div>
    </section>
  );
}

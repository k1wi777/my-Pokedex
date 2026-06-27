import Image from "next/image";
import Link from "next/link";
import type { EnrichedPokemonGame } from "@/types/pokemon-games";

const TAG_STYLES: Record<string, string> = {
  Colección: "bg-sky-600/95",
  Remake: "bg-violet-600/95",
  "Versión mejorada": "bg-amber-600/95",
  Secuela: "bg-emerald-600/95",
  "Spin-off": "bg-stone-600/95",
};

interface RelatedGameCardProps {
  game: EnrichedPokemonGame;
  tag: string;
}

export default function RelatedGameCard({ game, tag }: RelatedGameCardProps) {
  const tagStyle = TAG_STYLES[tag] ?? "bg-stone-600/95";

  return (
    <Link
      href={`/games/${game.id}`}
      className="group shrink-0 w-[130px] sm:w-[150px]"
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-xl">
        <Image
          src={game.cover}
          alt={game.displayName}
          fill
          sizes="150px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span
          className={`absolute right-2 top-2 rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm ${tagStyle}`}
        >
          {tag}
        </span>
      </div>
      <p className="mt-2.5 line-clamp-2 text-sm font-semibold leading-snug text-white group-hover:text-orange-300">
        {game.displayName}
      </p>
    </Link>
  );
}

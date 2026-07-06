import Image from "next/image";
import Link from "next/link";
import type { GenerationPokemonItem } from "@/types/pokeapi-generation";

interface GenerationPokemonCardProps {
  pokemon: GenerationPokemonItem;
}

export default function GenerationPokemonCard({
  pokemon,
}: GenerationPokemonCardProps) {
  return (
    <Link
      href={`/pokemons/${pokemon.name}`}
      className={`type-${pokemon.primaryType} group shrink-0 w-[130px] sm:w-[145px]`}
    >
      <div className="overflow-hidden rounded-xl border border-white/10 bg-[#171717] shadow-[0_8px_20px_rgba(0,0,0,0.25)] transition-transform duration-300 group-hover:-translate-y-1">
        <div className="flex items-center gap-1.5 px-2.5 pt-2.5 pb-1">
          <span
            className={`type-${pokemon.primaryType} shrink-0 rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-[rgb(var(--type-text))] bg-[linear-gradient(to_bottom,rgb(var(--type-color)/0.9),rgb(var(--type-color-2)/0.9))]`}
          >
            {pokemon.primaryType}
          </span>
          <span className="truncate text-xs font-semibold text-white group-hover:text-orange-300">
            {pokemon.displayName}
          </span>
        </div>

        <div className="relative mx-2 mb-2 aspect-square overflow-hidden rounded-lg bg-[linear-gradient(to_bottom,rgb(var(--type-color)/0.14),rgb(var(--type-color-2)/0.08))]">
          <Image
            src={pokemon.spriteUrl}
            alt={pokemon.displayName}
            fill
            sizes="145px"
            unoptimized
            className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </div>
    </Link>
  );
}

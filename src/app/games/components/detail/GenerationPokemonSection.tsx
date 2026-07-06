"use client";

import { useMemo, useState } from "react";
import type { GenerationPokemonItem } from "@/types/pokeapi-generation";
import GenerationPokemonCard from "./GenerationPokemonCard";

interface GenerationPokemonSectionProps {
  pokemon: GenerationPokemonItem[];
  generationName: string;
}

export default function GenerationPokemonSection({
  pokemon,
  generationName,
}: GenerationPokemonSectionProps) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return pokemon;

    return pokemon.filter(
      (item) =>
        item.name.includes(query) ||
        item.displayName.toLowerCase().includes(query),
    );
  }, [pokemon, search]);

  if (pokemon.length === 0) {
    return (
      <section className="border-t border-white/10 pt-10">
        <div className="mb-5 border-b border-white/10 pb-3">
          <h2 className="text-lg font-bold tracking-tight text-white sm:text-xl">
            Pokémon de esta Generación
          </h2>
          <p className="mt-1 text-sm text-stone-400">{generationName}</p>
        </div>
        <p className="text-sm text-stone-500">
          No se pudieron cargar los Pokémon de esta generación.
        </p>
      </section>
    );
  }

  return (
    <section className="border-t border-white/10 pt-10">
      <div className="mb-5 flex flex-col gap-4 border-b border-white/10 pb-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-white sm:text-xl">
            Pokémon de esta Generación
          </h2>
          <p className="mt-1 text-sm text-stone-400">{generationName}</p>
        </div>

        <div className="relative w-full sm:w-64">
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar Pokémon..."
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2.5 pl-10 text-sm text-white placeholder:text-stone-500 focus:border-orange-500/50 focus:outline-none focus:ring-1 focus:ring-orange-500/30"
          />
          <svg
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="thin-scroll flex gap-3 overflow-x-auto pb-2">
          {filtered.map((item) => (
            <GenerationPokemonCard key={item.id} pokemon={item} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-stone-500">
          Ningún Pokémon coincide con &ldquo;{search}&rdquo;.
        </p>
      )}
    </section>
  );
}

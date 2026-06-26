import type { Metadata } from "next";
import { enrichGames } from "@/lib/pokemon-games/enrich-games";
import { fetchRawgGamesByIds } from "@/services/rawg";
import pokemonGamesData from "@/data/pokemon-games.json";
import type { PokemonGeneration } from "@/types/pokemon-games";
import GamesPageBackground from "./components/GamesPageBackground";
import GamesPageContent from "./components/GamesPageContent";

export const metadata: Metadata = {
  title: "Juegos Pokémon",
  description:
    "Explora los juegos principales de la saga Pokémon organizados por generación.",
};

export default async function GamesPage() {
  const generations = pokemonGamesData as PokemonGeneration[];
  const rawgIds = generations.flatMap((g) => g.games.map((game) => game.rawgId));

  const rawgCache = await fetchRawgGamesByIds(rawgIds);
  const games = enrichGames(rawgCache);

  return (
    <>
      <GamesPageBackground />
      <div className="relative min-h-screen px-6 py-8 sm:px-10 md:px-12 lg:px-14">
        <div className="mx-auto max-w-7xl">
          <GamesPageContent games={games} />
        </div>
      </div>
    </>
  );
}

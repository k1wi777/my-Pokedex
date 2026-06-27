import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GamesPageBackground from "@/app/games/components/GamesPageBackground";
import GameDetailBanner from "@/app/games/components/detail/GameDetailBanner";
import GameDetailView from "@/app/games/components/detail/GameDetailView";
import {
  buildGameDetail,
  enrichGames,
  findLocalGameById,
  formatGameDisplayName,
  generateGameStaticParams,
} from "@/lib/pokemon-games/enrich-games";
import {
  fetchRawgGame,
  fetchRawgScreenshots,
} from "@/services/rawg";

interface GameDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return generateGameStaticParams();
}

export async function generateMetadata({
  params,
}: GameDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const found = findLocalGameById(id);
  if (!found) return { title: "Juego no encontrado" };

  return {
    title: formatGameDisplayName(found.game.name),
  };
}

export default async function GameDetailPage({ params }: GameDetailPageProps) {
  const { id } = await params;
  const found = findLocalGameById(id);

  if (!found) notFound();

  const { game: localGame, generation } = found;

  const [rawgGame, screenshots] = await Promise.all([
    fetchRawgGame(localGame.rawgId),
    fetchRawgScreenshots(localGame.rawgId),
  ]);

  const allEnriched = enrichGames(new Map());
  const game = buildGameDetail(
    localGame,
    generation,
    rawgGame,
    screenshots,
    allEnriched,
  );

  return (
    <>
      <GamesPageBackground />
      <GameDetailBanner
        title={game.displayName}
        bannerImage={game.bannerImage}
        platforms={game.platforms}
        officialSite={game.officialSite}
      />
      <GameDetailView game={game} />
    </>
  );
}

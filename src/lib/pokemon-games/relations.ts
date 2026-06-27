import type { GameRelation, LinkedGameEntry, PokemonGameLocal } from "@/types/pokemon-games";
import type { EnrichedPokemonGame } from "@/types/pokemon-games";

export const RELATION_TAGS: Record<GameRelation["type"], string> = {
  remake: "Remake",
  enhanced: "Versión mejorada",
  sequel: "Secuela",
  "spin-off": "Spin-off",
};

const REVERSE_LABELS: Record<GameRelation["type"], string> = {
  remake: "Remake de este juego",
  enhanced: "Versión mejorada de este juego",
  sequel: "Secuela de este juego",
  "spin-off": "Spin-off relacionado con este juego",
};

export function getRelationTag(type: GameRelation["type"]): string {
  return RELATION_TAGS[type];
}

export function getLinkedGames(
  gameId: string,
  localGames: PokemonGameLocal[],
  enrichedGames: EnrichedPokemonGame[],
): LinkedGameEntry[] {
  const enrichedMap = new Map(enrichedGames.map((g) => [g.id, g]));
  const local = localGames.find((g) => g.id === gameId);
  const links: LinkedGameEntry[] = [];

  if (local?.relation) {
    const target = enrichedMap.get(local.relation.targetId);
    if (target) {
      links.push({
        game: target,
        label: local.relation.label,
        tag: getRelationTag(local.relation.type),
        direction: "forward",
      });
    }
  }

  for (const other of localGames) {
    if (!other.relation || other.relation.targetId !== gameId || other.id === gameId) {
      continue;
    }
    const enriched = enrichedMap.get(other.id);
    if (enriched) {
      links.push({
        game: enriched,
        label: `${enriched.displayName} — ${REVERSE_LABELS[other.relation.type]}`,
        tag: getRelationTag(other.relation.type),
        direction: "reverse",
      });
    }
  }

  return links;
}

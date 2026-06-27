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

export function normalizeRelations(
  game: PokemonGameLocal & { relation?: GameRelation },
): GameRelation[] {
  if (game.relations?.length) return game.relations;
  if (game.relation) return [game.relation];
  return [];
}

function relationTargetsGame(relation: GameRelation, gameId: string): boolean {
  return relation.targetId === gameId;
}

export function getLinkedGames(
  gameId: string,
  localGames: PokemonGameLocal[],
  enrichedGames: EnrichedPokemonGame[],
): LinkedGameEntry[] {
  const enrichedMap = new Map(enrichedGames.map((g) => [g.id, g]));
  const local = localGames.find((g) => g.id === gameId);
  const links: LinkedGameEntry[] = [];
  const seen = new Set<string>();

  const addLink = (entry: LinkedGameEntry) => {
    const key = `${entry.game.id}-${entry.label}`;
    if (seen.has(key)) return;
    seen.add(key);
    links.push(entry);
  };

  if (local) {
    for (const relation of normalizeRelations(local)) {
      const target = enrichedMap.get(relation.targetId);
      if (target) {
        addLink({
          game: target,
          label: relation.label,
          tag: getRelationTag(relation.type),
          direction: "forward",
        });
      }
    }
  }

  for (const other of localGames) {
    if (other.id === gameId) continue;

    for (const relation of normalizeRelations(other)) {
      if (!relationTargetsGame(relation, gameId)) continue;

      const enriched = enrichedMap.get(other.id);
      if (enriched) {
        addLink({
          game: enriched,
          label: `${enriched.displayName} — ${REVERSE_LABELS[relation.type]}`,
          tag: getRelationTag(relation.type),
          direction: "reverse",
        });
      }
    }
  }

  return links;
}

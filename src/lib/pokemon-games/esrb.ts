import { getEsrbIconPath } from "@/data/game-assets";

export interface EsrbInfo {
  shortLabel: string;
  fullLabel: string;
  description: string;
  accent: string;
  iconPath: string;
}

const ESRB_MAP: Record<string, EsrbInfo> = {
  Everyone: {
    shortLabel: "E",
    fullLabel: "Everyone",
    description: "Contenido apto para todas las edades.",
    accent: "#22c55e",
    iconPath: getEsrbIconPath("Everyone"),
  },
  "Everyone 10+": {
    shortLabel: "E10+",
    fullLabel: "Everyone 10+",
    description: "Contenido apto desde los 10 años.",
    accent: "#84cc16",
    iconPath: getEsrbIconPath("Everyone 10+"),
  },
  Teen: {
    shortLabel: "T",
    fullLabel: "Teen",
    description: "Contenido apto desde los 13 años.",
    accent: "#eab308",
    iconPath: getEsrbIconPath("Teen"),
  },
  Mature: {
    shortLabel: "M",
    fullLabel: "Mature 17+",
    description: "Contenido apto desde los 17 años.",
    accent: "#ef4444",
    iconPath: getEsrbIconPath("Mature"),
  },
  "Rating Pending": {
    shortLabel: "RP",
    fullLabel: "Rating Pending",
    description: "Clasificación pendiente o no disponible.",
    accent: "#a3a3a3",
    iconPath: getEsrbIconPath("Rating Pending"),
  },
};

const DEFAULT_ESRB = ESRB_MAP["Rating Pending"];

export function getEsrbInfo(rating: string): EsrbInfo {
  return (
    ESRB_MAP[rating] ?? {
      ...DEFAULT_ESRB,
      fullLabel: rating,
      shortLabel: rating.charAt(0).toUpperCase(),
      iconPath: getEsrbIconPath(rating),
    }
  );
}

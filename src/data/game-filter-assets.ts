import type { FilterType } from "@/types/pokemon-games";

export interface GameFilterAsset {
  /** Ruta local en /public — reemplaza la imagen cuando quieras */
  image: string;
  title: string;
  subtitle: string;
}

/**
 * Imágenes del carrusel de filtros en /games.
 * Sustituye cada `image` por tu propio banner (recomendado ~800×600).
 */
export const GAME_FILTER_ASSETS: Record<FilterType, GameFilterAsset> = {
  region: {
    image: "/Pokeballs-tittle.png",
    title: "Región",
    subtitle: "Kanto, Johto, Hoenn y más",
  },
  platform: {
    image: "/games/filters/platform.jpg",
    title: "Plataforma",
    subtitle: "Game Boy, DS, Switch…",
  },
  search: {
    image: "/games/filters/search.jpg",
    title: "Búsqueda",
    subtitle: "Encuentra un juego por nombre",
  },
  recent: {
    image: "/games/filters/recent.jpg",
    title: "Recientes",
    subtitle: "Lanzamientos de los últimos años",
  },
};

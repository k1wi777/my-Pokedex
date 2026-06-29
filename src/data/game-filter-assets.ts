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
    image: "/categories/regiones.png",
    title: "Región",
    subtitle: "Kanto, Johto, Hoenn y más",
  },
  platform: {
    image: "/categories/consolas2.webp",
    title: "Plataforma",
    subtitle: "Game Boy, DS, Switch…",
  },
  search: {
    image: "/categories/busqueda2.webp",
    title: "Búsqueda",
    subtitle: "Encuentra un juego por nombre",
  },
  recent: {
    image: "/categories/recientes.webp",
    title: "Recientes",
    subtitle: "Lanzamientos de los últimos años",
  },
};

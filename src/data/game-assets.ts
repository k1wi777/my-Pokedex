/**
 * Rutas de assets en /public.
 * Actualiza este archivo al añadir o mover iconos de plataformas o clasificación ESRB.
 */

export const PLATFORM_ICON_PATHS: Record<string, string> = {
  "nintendo switch": "/platforms/Nintendo_Switch_logo.png",
  "game boy": "/platforms/gameboy_logo.jpg",
  "game boy color": "/platforms/gameboy_color_logo.jpg",
  "game boy advance": "/platforms/gameboyadvance_logo.jpg",
  "nintendo ds": "/platforms/nintendoDS.jpg",
  "nintendo 3ds": "/platforms/nintendo3DS.jpg", 
  pc: "/platforms/pc_logo.png",
  "wii u": "/platforms/wiiu_logo.png",
};

export const ESRB_ICON_PATHS: Record<string, string> = {
  Everyone: "/icons/ESRB_Everyone.png",
  "Everyone 10+": "/icons/ESRB_Everyone_10+.png",
  Teen: "/icons/ESRB_Teen.png",
  Mature: "/icons/ESRB_Mature.png",
  "Adults Only": "/icons/ESRB_Adults_Only.png",
  "Rating Pending": "/icons/ESRB_Rating_Pending_.png",
};

export function getPlatformIconPath(platformName: string): string | null {
  return PLATFORM_ICON_PATHS[platformName.toLowerCase()] ?? null;
}

export function getEsrbIconPath(rating: string): string {
  return ESRB_ICON_PATHS[rating] ?? ESRB_ICON_PATHS["Rating Pending"];
}

export const RAWG_CACHE_REVALIDATE = 60 * 60 * 24 * 7; // 7 days

export const POKEAPI_CACHE_REVALIDATE = 60 * 60 * 24 * 7; // 7 days

export const DEFAULT_ESRB_RATING = "Rating Pending";

export const RECENT_YEARS_THRESHOLD = 5;

export const FILTER_LABELS = {
  region: "Región",
  platform: "Plataforma",
  search: "Búsqueda",
  recent: "Recientes",
} as const;

export const GENERATION_ACCENTS: Record<number, string> = {
  1: "#ef4444",
  2: "#eab308",
  3: "#22c55e",
  4: "#38bdf8",
  5: "#1f2937",
  6: "#f97316",
  7: "#f59e0b",
  8: "#8b5cf6",
  9: "#dc2626",
};

export const COLLECTION_LABELS: Record<string, string> = {
  "red-blue-yellow": "Kanto — Red, Blue & Yellow",
  "gold-silver": "Johto — Gold & Silver",
  crystal: "Johto — Crystal",
  "ruby-sapphire-emerald": "Hoenn — Ruby, Sapphire & Emerald",
  "firered-leafgreen": "Kanto — FireRed & LeafGreen",
  "diamond-pearl": "Sinnoh — Diamond & Pearl",
  platinum: "Sinnoh — Platinum",
  "heartgold-soulsilver": "Johto — HeartGold & SoulSilver",
  "black-white": "Unova — Black & White",
  "black2-white2": "Unova — Black 2 & White 2",
  "x-y": "Kalos — X & Y",
  "omega-ruby-alpha-sapphire": "Hoenn — Omega Ruby & Alpha Sapphire",
  "sun-moon": "Alola — Sun & Moon",
  "ultra-sun-ultra-moon": "Alola — Ultra Sun & Ultra Moon",
  "sword-shield": "Galar — Sword & Shield",
  "brilliant-diamond-shining-pearl": "Sinnoh — Brilliant Diamond & Shining Pearl",
  "legends-arceus": "Hisui — Legends: Arceus",
  "scarlet-violet": "Paldea — Scarlet & Violet",
  "legends-za": "Kalos — Legends Z-A",
};

export const PLATFORM_STYLES: Record<string, { short: string; bg: string }> = {
  "nintendo switch": { short: "NS", bg: "#e60012" },
  "nintendo ds": { short: "DS", bg: "#c8c8c8" },
  "nintendo 3ds": { short: "3DS", bg: "#d1222a" },
  "game boy": { short: "GB", bg: "#8b8b8b" },
  "game boy color": { short: "GBC", bg: "#6a5acd" },
  "game boy advance": { short: "GBA", bg: "#4a3f8c" },
  pc: { short: "PC", bg: "#2563eb" },
  "wii u": { short: "WiiU", bg: "#009ac7" },
};

export const DEFAULT_PLATFORM_STYLE = { short: "?", bg: "#525252" };

import { getPlatformIconPath } from "@/data/game-assets";
import {
  DEFAULT_PLATFORM_STYLE,
  PLATFORM_STYLES,
} from "@/lib/pokemon-games/constants";

export function getPlatformStyle(platformName: string) {
  return PLATFORM_STYLES[platformName.toLowerCase()] ?? {
    ...DEFAULT_PLATFORM_STYLE,
    short: platformName
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 4)
      .toUpperCase(),
  };
}

export function getPlatformIcon(platformName: string): string | null {
  return getPlatformIconPath(platformName);
}

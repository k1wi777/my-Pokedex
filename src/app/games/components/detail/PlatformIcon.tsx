import Image from "next/image";
import { getPlatformIcon, getPlatformStyle } from "@/lib/pokemon-games/platforms";

interface PlatformIconProps {
  platform: string;
}

export default function PlatformIcon({ platform }: PlatformIconProps) {
  const iconPath = getPlatformIcon(platform);
  const style = getPlatformStyle(platform);

  if (iconPath) {
    return (
      <div
        className="flex h-13 w-13 items-center justify-center overflow-hidden rounded-lg bg-white/10 "
        title={platform}
      >
        <Image
          src={iconPath}
          alt={platform}
          width={32}
          height={32}
          className="h-full w-full object-contain"
        />
      </div>
    );
  }

  return (
    <div
      className="flex h-11 w-11 items-center justify-center rounded-lg text-[10px] font-black tracking-tight text-white shadow-sm"
      style={{ backgroundColor: style.bg }}
      title={platform}
    >
      {style.short}
    </div>
  );
}

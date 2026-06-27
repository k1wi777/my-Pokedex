import Image from "next/image";
import { getEsrbInfo } from "@/lib/pokemon-games/esrb";

interface GameRatingCardProps {
  esrbRating: string;
}

export default function GameRatingCard({ esrbRating }: GameRatingCardProps) {
  const esrb = getEsrbInfo(esrbRating);

  return (
    <div className="rounded-xl border border-white/12 bg-white/[0.03] p-4">
      <div className="flex items-center gap-4">
        <div className="relative h-16 w-16 shrink-0">
          <Image
            src={esrb.iconPath}
            alt={esrb.fullLabel}
            fill
            className="object-contain"
            sizes="64px"
          />
        </div>
        <div>
          <p className="font-bold text-white">{esrb.fullLabel}</p>
          <p className="mt-0.5 text-xs leading-relaxed text-stone-400">
            {esrb.description}
          </p>
        </div>
      </div>
    </div>
  );
}

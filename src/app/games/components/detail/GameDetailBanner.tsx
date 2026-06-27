import Image from "next/image";
import Link from "next/link";
import PlatformIcon from "./PlatformIcon";

interface GameDetailBannerProps {
  title: string;
  bannerImage: string;
  platforms: string[];
  officialSite: string | null;
}

export default function GameDetailBanner({
  title,
  bannerImage,
  platforms,
  officialSite,
}: GameDetailBannerProps) {
  return (
    <section className="relative h-[240px] w-full overflow-hidden sm:h-[300px] md:h-[360px] rounded-b-4xl">
      <Image
        src={bannerImage}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/25 rounded-b-4xl" />

      <Link
        href="/games"
        className="absolute left-4 top-4 z-10 flex items-center gap-1.5 rounded-lg bg-black/45 px-3 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-black/65 sm:left-8 sm:top-6"
      >
        ← Juegos
      </Link>

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-5 sm:flex-row sm:items-end sm:justify-between sm:p-8 md:p-10">
        <div className="space-y-3">
          <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl md:text-4xl">
            {title}
          </h1>
          {platforms.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {platforms.map((platform) => (
                <PlatformIcon key={platform} platform={platform} />
              ))}
            </div>
          )}
        </div>

        {officialSite && (
          <a
            href={officialSite}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 self-start rounded-lg bg-gradient-to-r from-red-500 to-orange-500 px-5 py-2.5 text-center text-sm font-bold text-white transition-opacity hover:opacity-90 sm:self-end"
          >
            Ir al sitio oficial
          </a>
        )}
      </div>
    </section>
  );
}

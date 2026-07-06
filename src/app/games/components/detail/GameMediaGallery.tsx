"use client";

import CarouselNavButton from "@/app/components/CarouselNavButton";
import Image from "next/image";
import { useState } from "react";
import type { GameMediaItem } from "@/types/pokemon-games";

interface GameMediaGalleryProps {
  mediaItems: GameMediaItem[];
  gameName: string;
}

function getThumbnailSrc(item: GameMediaItem, fallbackCover: string): string | null {
  if (item.preview) return item.preview;
  if (item.type === "image") return item.src;
  return null;
}

export default function GameMediaGallery({
  mediaItems,
  gameName,
}: GameMediaGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = mediaItems[activeIndex] ?? mediaItems[0];
  const fallbackCover =
    mediaItems.find((i) => i.type === "image")?.src ?? active?.preview ?? "";

  if (!active) return null;

  const goPrev = () => {
    setActiveIndex((i) => (i === 0 ? mediaItems.length - 1 : i - 1));
  };

  const goNext = () => {
    setActiveIndex((i) => (i === mediaItems.length - 1 ? 0 : i + 1));
  };

  return (
    <section className="min-w-0 max-w-full">
      <div className="relative min-w-0 max-w-full overflow-hidden rounded-xl bg-black/40">
        <div className="relative aspect-video min-w-0 w-full max-w-full overflow-hidden">
          {active.type === "youtube" && active.youtubeId ? (
            <iframe
              key={active.youtubeId}
              src={`https://www.youtube.com/embed/${active.youtubeId}`}
              title={active.label ?? `${gameName} tráiler`}
              className="h-full w-full max-w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : active.type === "video" ? (
            <video
              key={active.src}
              src={active.src}
              controls
              poster={active.preview}
              className="h-full w-full max-w-full object-cover"
            />
          ) : (
            <Image
              src={active.src}
              alt={`${gameName} captura ${activeIndex + 1}`}
              fill
              sizes="(max-width: 1024px) 100vw, 65vw"
              className="object-cover"
            />
          )}
        </div>

        {mediaItems.length > 1 && (
          <>
            <CarouselNavButton
              direction="prev"
              onClick={goPrev}
              ariaLabel="Anterior"
            />
            <CarouselNavButton
              direction="next"
              onClick={goNext}
              ariaLabel="Siguiente"
            />
          </>
        )}
      </div>

      {mediaItems.length > 1 && (
        <div className="mt-3 min-w-0 max-w-full overflow-hidden">
          <div className="thin-scroll flex w-full min-w-0 max-w-full gap-2 overflow-x-auto pb-2">
          {mediaItems.map((item, index) => {
            const thumb = getThumbnailSrc(item, fallbackCover);
            const isVideo = item.type === "video" || item.type === "youtube";

            return (
              <button
                key={`${item.type}-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`relative h-16 w-28 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                  index === activeIndex
                    ? "border-orange-500 opacity-100"
                    : "border-transparent opacity-55 hover:opacity-90"
                }`}
              >
                {thumb ? (
                  <Image
                    src={thumb}
                    alt=""
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-stone-800 text-white">
                    ▶
                  </div>
                )}
                {isVideo && (
                  <span className="absolute inset-0 flex items-center justify-center bg-black/40 text-white">
                    ▶
                  </span>
                )}
              </button>
            );
          })}
          </div>
        </div>
      )}
    </section>
  );
}

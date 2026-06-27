"use client";

import Image from "next/image";
import { useState } from "react";
import type { GameMediaItem } from "@/types/pokemon-games";

interface GameMediaGalleryProps {
  mediaItems: GameMediaItem[];
  gameName: string;
}

export default function GameMediaGallery({
  mediaItems,
  gameName,
}: GameMediaGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = mediaItems[activeIndex] ?? mediaItems[0];

  if (!active) return null;

  const goPrev = () => {
    setActiveIndex((i) => (i === 0 ? mediaItems.length - 1 : i - 1));
  };

  const goNext = () => {
    setActiveIndex((i) => (i === mediaItems.length - 1 ? 0 : i + 1));
  };

  return (
    <section>
      <div className="relative overflow-hidden rounded-xl bg-black/40">
        <div className="relative aspect-video w-full">
          {active.type === "video" ? (
            <video
              key={active.src}
              src={active.src}
              controls
              poster={active.preview}
              className="h-full w-full object-cover"
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
            <button
              type="button"
              onClick={goPrev}
              aria-label="Anterior"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/55 px-3 py-2 text-lg text-white hover:bg-black/75"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Siguiente"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/55 px-3 py-2 text-lg text-white hover:bg-black/75"
            >
              ›
            </button>
          </>
        )}
      </div>

      {mediaItems.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {mediaItems.map((item, index) => (
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
              <Image
                src={item.preview ?? item.src}
                alt=""
                fill
                sizes="112px"
                className="object-cover"
              />
              {item.type === "video" && (
                <span className="absolute inset-0 flex items-center justify-center bg-black/40 text-white">
                  ▶
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}

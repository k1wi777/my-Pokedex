"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import CarouselNavButton from "@/app/components/CarouselNavButton";
import { GAME_FILTER_ASSETS } from "@/data/game-filter-assets";
import { RECENT_YEARS_THRESHOLD } from "@/lib/pokemon-games/constants";
import type {
  ActiveFilters,
  EnabledFilterTypes,
  FilterType,
} from "@/types/pokemon-games";
import SearchStyleDropdown from "./SearchStyleDropdown";

const FILTER_TYPES: FilterType[] = ["region", "platform", "search", "recent"];
const COLLAPSED_WIDTH = 152;
const SCROLL_SPEED = 31;

interface GamesFilterCarouselProps {
  enabled: EnabledFilterTypes;
  filters: ActiveFilters;
  regions: string[];
  platforms: string[];
  onToggle: (type: FilterType) => void;
  onChange: (filters: ActiveFilters) => void;
  onClear: () => void;
}

function hasFilterValue(type: FilterType, filters: ActiveFilters): boolean {
  switch (type) {
    case "region":
      return Boolean(filters.region);
    case "platform":
      return Boolean(filters.platform);
    case "search":
      return Boolean(filters.search.trim());
    case "recent":
      return filters.recent;
    default:
      return false;
  }
}

interface FilterPanelProps {
  type: FilterType;
  expanded: boolean;
  dimmed: boolean;
  hasValue: boolean;
  onSelect: () => void;
  children?: ReactNode;
}

function FilterPanel({
  type,
  expanded,
  dimmed,
  hasValue,
  onSelect,
  children,
}: FilterPanelProps) {
  const asset = GAME_FILTER_ASSETS[type];
  const [imageFailed, setImageFailed] = useState(false);

  const panelClass = `
    group/panel relative h-full overflow-hidden  text-left
    transition-all duration-500 ease-out
    ${
      expanded
        ? "w-[60%] shrink-0 cursor-default border-2 border-amber-300"
        : "w-[100px] shrink-0 cursor-pointer hover:brightness-110 sm:w-[120px] md:w-[25%] lg:w-[25%]"
    }
    ${dimmed ? "opacity-55" : "opacity-100"}
  `;

  const content = (
    <>
      <div className="absolute inset-0 bg-gradient-to-br from-stone-800 via-stone-900 to-black " />
      {!imageFailed && (
        <Image
          src={asset.image}
          alt=""
          fill
          sizes={"60vw"}
          className="object-cover transition-transform duration-700 group-hover/panel:scale-105 group-hover/panel:-translate-x-5"
          onError={() => setImageFailed(true)}
        />
      )}
      <div
        className={`absolute inset-0 transition-colors duration-500 ${
          expanded
            ? "bg-gradient-to-r from-black/90 via-black/75 to-black/40"
            : "bg-gradient-to-t from-black/90 via-black/35 to-black/10"
        }`}
      />

      {hasValue && !expanded && (
        <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-orange-500 ring-2 ring-black/50" />
      )}

      <div className="absolute inset-x-0 bottom-0 p-2.5 transition-all duration-500 sm:p-3">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-400/90">
          Filtro
        </p>
        <p className="text-xs font-black uppercase tracking-wide text-white sm:text-sm">
          {asset.title}
        </p>
        {!expanded && (
          <p className="mt-0.5 line-clamp-2 text-[10px] text-stone-300 sm:text-[11px]">
            {asset.subtitle}
          </p>
        )}
      </div>

      {expanded && children && (
        <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5">
          <div className="mb-14 max-w-md animate-[fadeUp_0.35s_ease-out] space-y-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-orange-400">
                {asset.title}
              </p>
              <p className="mt-1 text-base font-bold text-white sm:text-lg">
                {asset.subtitle}
              </p>
            </div>
            {children}
          </div>
        </div>
      )}
    </>
  );

  return (
    <button
      type="button"
      disabled={expanded}
      onClick={!expanded ? onSelect : undefined}
      className={panelClass}
    >
      {content}
    </button>
  );
}

export default function GamesFilterCarousel({
  enabled,
  filters,
  regions,
  platforms,
  onToggle,
  onChange,
  onClear,
}: GamesFilterCarouselProps) {
  const [expanded, setExpanded] = useState<{
    type: FilterType;
    index: number;
  } | null>(null);

  const trackRef = useRef<HTMLDivElement>(null);

const offsetRef = useRef(0);

  const rafRef = useRef<number>(0);

  const update = useCallback(
    (partial: Partial<ActiveFilters>) => {
      onChange({ ...filters, ...partial });
    },
    [filters, onChange],
  );

  const collapse = useCallback(
    (type: FilterType) => {
      if (!hasFilterValue(type, filters) && enabled[type]) {
        onToggle(type);
      }
      setExpanded(null);
    },
    [enabled, filters, onToggle],
  );

  const expand = useCallback(
    (type: FilterType, index: number) => {
      if (expanded?.index === index) return;

      if (
        expanded &&
        !hasFilterValue(expanded.type, filters) &&
        enabled[expanded.type]
      ) {
        onToggle(expanded.type);
      }

      if (!enabled[type]) {
        onToggle(type);
      }

      setExpanded({
        type,
        index,
      });
    },
    [enabled, expanded, filters, onToggle],
  );

  useEffect(() => {

    if (expanded) return;

    const track = trackRef.current;

    if (!track) return;

    let last = performance.now();

    const tick = (now: number) => {

        const delta = (now - last) / 1000;

        last = now;

        offsetRef.current += SCROLL_SPEED * delta;

        const sectionWidth = track.scrollWidth / 3;

        if (offsetRef.current >= sectionWidth) {
            offsetRef.current -= sectionWidth;
        }

        track.style.transform =
            `translateX(${-offsetRef.current}px)`;

        rafRef.current = requestAnimationFrame(tick);

    };

    rafRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafRef.current);

}, [expanded]);

  

  const renderFilterInput = (type: FilterType) => {
    switch (type) {
      case "region":
        return (
          <SearchStyleDropdown
            value={filters.region}
            onChange={(region) => update({ region })}
            placeholder="Todas las regiones"
            options={[
              { value: "", label: "Todas las regiones" },
              ...regions.map((region) => ({ value: region, label: region })),
            ]}
          />
        );
      case "platform":
        return (
          <SearchStyleDropdown
            value={filters.platform}
            onChange={(platform) => update({ platform })}
            placeholder="Todas las plataformas"
            options={[
              { value: "", label: "Todas las plataformas" },
              ...platforms.map((platform) => ({
                value: platform,
                label: platform,
              })),
            ]}
          />
        );
      case "search":
        return (
          <form onSubmit={(e) => e.preventDefault()} className="relative">
            <div className="flex w-full overflow-hidden rounded-full border border-white/60 bg-gray-800 shadow-lg">
              <input
                type="search"
                value={filters.search}
                onChange={(e) => update({ search: e.target.value })}
                placeholder="Nombre, región..."
                className="w-full bg-white/40 px-4 py-2.5 text-sm font-bold text-black outline-none"
              />
              <div className="flex items-center border-y-2 border-r-2 border-[rgba(127,5,220,0.7)] bg-[rgba(127,5,220,0.2)] px-4">
                <img
                  src="/icons/search.svg"
                  alt=""
                  className="w-7 drop-shadow-[0_0_10px_rgba(0,255,255,0.35)]"
                />
              </div>
            </div>
          </form>
        );
      case "recent":
        return (
          <label className="flex cursor-pointer items-center gap-3 rounded-full border border-white/60 bg-gray-800 px-4 py-3 shadow-lg">
            <input
              type="checkbox"
              checked={filters.recent}
              onChange={(e) => update({ recent: e.target.checked })}
              className="h-4 w-4 rounded accent-orange-500"
            />
            <span className="text-sm font-bold text-white">
              Solo últimos {RECENT_YEARS_THRESHOLD} años
            </span>
          </label>
        );
      default:
        return null;
    }
  };

  const marqueeItems = [...FILTER_TYPES, ...FILTER_TYPES, ...FILTER_TYPES];
  const items = expanded ? FILTER_TYPES : marqueeItems;
  return (
    <section className="relative">
      <div className="relative w-full  h-[280px] overflow-hidden  sm:h-[300px] md:h-[360px] lg:h-[420px]">
        <>
          <div className="relative h-full overflow-hidden">
            <div ref={trackRef} className="flex h-full will-change-transform">
              {marqueeItems.map((type, index) => (
                <FilterPanel
                  key={`${type}-${index}`}
                  type={type}
                  expanded={expanded?.index === index}
                  dimmed={expanded !== null && expanded.index !== index}
                  hasValue={hasFilterValue(type, filters)}
                  onSelect={() => expand(type, index)}
                >
                  {expanded?.index === index && (
                    <>
                      {renderFilterInput(type)}
                      <div className="flex flex-wrap gap-3 pt-1">
                        <button
                          type="button"
                          onClick={onClear}
                          className="text-xs font-semibold text-stone-400 transition-colors hover:text-white"
                        >
                          Limpiar valores
                        </button>
                      </div>
                    </>
                  )}
                </FilterPanel>
              ))}
              {expanded && (
                <button
                  type="button"
                  onClick={() => collapse(expanded.type)}
                  aria-label="Cerrar filtro"
                  className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-lg text-white backdrop-blur-sm transition-colors hover:bg-black/70"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          <CarouselNavButton
            direction="prev"
            onClick={() => offsetRef.current -= 180}
            ariaLabel="Anterior"
            className="left-1 opacity-80"
          />
          <CarouselNavButton
            direction="next"
            onClick={() => offsetRef.current += 180}
            ariaLabel="Siguiente"
            className="right-1 opacity-80"
          />
        </>
      </div>
    </section>
  );
}

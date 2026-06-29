"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
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
  onClose?: () => void;
  children?: ReactNode;
}

function FilterPanel({
  type,
  expanded,
  dimmed,
  hasValue,
  onSelect,
  onClose,
  children,
}: FilterPanelProps) {
  const asset = GAME_FILTER_ASSETS[type];
  const [imageFailed, setImageFailed] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const EXPANDED_WIDTH = "99vw";
  const panelStyle = expanded ? { width: EXPANDED_WIDTH } : undefined;
  const panelClass = `
    group/panel relative h-full text-left
    transition-all duration-500 ease-out
    ${
      expanded
        ? "shrink-0 cursor-default overflow-visible z-10"
        : "w-[140px] shrink-0 cursor-pointer hover:brightness-110 sm:w-[170px] md:w-[25%] lg:w-[25%] overflow-hidden"
    }
    ${dimmed ? "opacity-55" : "opacity-100"}
  `;

  const content = (
    <>
      <div className="absolute" />
      {!imageFailed && (
        <div className="relative h-full w-screen">
          <Image
            src={asset.image}
            alt=""
            fill
            sizes="100vw"
            className={`object-cover transition-transform duration-700 ${
              !expanded ? "group-hover/panel:scale-105 group-hover/panel:-translate-x-5" : ""
            }`}
            onError={() => setImageFailed(true)}
          />
        </div>
      )}
      {/* Closed State Gradient Overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10 transition-opacity duration-500 ${
          expanded ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      />

      {/* Expanded State Gradient Overlay: w-screen matches the image container so it is already full width and expands synchronously */}
      <div
        className={`absolute inset-y-0 left-0 w-screen bg-gradient-to-l from-black/95 via-black/70 to-transparent transition-opacity duration-500 ${
          expanded ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {hasValue && !expanded && (
        <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-orange-500 ring-2 ring-black/50" />
      )}

      {/* Closed State Text: Centered, higher up, and fades out instantly (150ms) in-place on expand */}
      <div
        className={`absolute bottom-16 left-0 right-0 px-4 text-center flex flex-col items-center justify-center pointer-events-none transition-opacity duration-150 ease-out ${
          expanded ? "opacity-0" : "opacity-100"
        }`}
      >
        <p className="text-sm xs:text-base sm:text-xl md:text-2xl lg:text-3xl font-black uppercase tracking-wider text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)] leading-tight max-w-full break-words select-none transition-transform duration-500 group-hover/panel:scale-110">
          {asset.title}
        </p>
      </div>

      {/* Expanded State Content: Appears from below with delay for a clean reveal */}
      {expanded && children && (
        <div className="absolute inset-0 flex flex-col justify-center items-center sm:items-start sm:left-auto sm:right-0 sm:w-[48%] p-6 sm:p-12 md:p-16 z-10">
          <div
            style={{ animationDelay: "350ms", animationFillMode: "both" }}
            className="w-full max-w-sm animate-[fadeUp_0.4s_ease-out] space-y-6 text-center sm:text-left"
          >
            <div className="space-y-1">
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-orange-400">
                {asset.title}
              </p>
              <p className="text-2xl font-black uppercase tracking-wide text-white sm:text-3xl md:text-4xl drop-shadow-md">
                {asset.subtitle}
              </p>
            </div>
            <div className="w-full text-left">
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );

  return (
    <div
      ref={panelRef}
      style={panelStyle}
      role="button"
      onClick={() => {
        if (expanded) return;
        onSelect();
      }}
      className={panelClass}
    >
      {content}
      {expanded && onClose && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          aria-label="Cerrar filtro"
          className="absolute right-4 top-4 sm:right-6 sm:top-6 z-50 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-lg text-white backdrop-blur-sm transition-all hover:bg-black/80 hover:scale-105"
        >
          ×
        </button>
      )}
    </div>
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
  const wrapperRef = useRef<HTMLDivElement>(null);
  const autoOffsetRef = useRef(0);
  const [wrapperOffset, setWrapperOffset] = useState(0);

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
      setWrapperOffset(0);
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
    const track = trackRef.current;

    if (!track) return;

    let last = performance.now();

    const tick = (now: number) => {
      const delta = (now - last) / 1000;

      last = now;

      if (!expanded) {
        autoOffsetRef.current += SCROLL_SPEED * delta;

        const sectionWidth = track.scrollWidth / 3;

        if (autoOffsetRef.current >= sectionWidth) {
          autoOffsetRef.current -= sectionWidth;
        }
      }

      track.style.transform = `translateX(${-autoOffsetRef.current}px)`;

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafRef.current);
  }, [expanded]);

  useLayoutEffect(() => {
    if (!expanded) return;

    const track = trackRef.current;
    if (!track) return;

    const panel = track.children[expanded.index] as HTMLElement;

    if (!panel) return;

    const rect = panel.getBoundingClientRect();

    setWrapperOffset((offset) => offset - rect.left);
  }, [expanded]);

  const renderFilterInput = (type: FilterType) => {
    switch (type) {
      case "region":
        return (
          <SearchStyleDropdown
            value={filters.region}
            onChange={(region) => update({ region })}
            placeholder="Todas las regiones"
            position="up"
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
            position="up"
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

  return (
    <section className="relative">
      <div className="relative w-full h-[320px] sm:h-[340px] md:h-[400px] lg:h-[450px]">
        <>
          <div className="relative h-full overflow-hidden">
            <div
              ref={wrapperRef}
              className="h-full transition-transform duration-500 ease-out will-change-transform"
              style={{
                transform: `translateX(${wrapperOffset}px)`,
              }}
            >
              <div
                ref={trackRef}
                className="flex h-full items-stretch will-change-transform"
              >
                {marqueeItems.map((type, index) => (
                  <FilterPanel
                    key={`${type}-${index}`}
                    type={type}
                    expanded={expanded?.index === index}
                    dimmed={expanded !== null && expanded.index !== index}
                    hasValue={hasFilterValue(type, filters)}
                    onSelect={() => expand(type, index)}
                    onClose={() => collapse(type)}
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
              </div>
            </div>
          </div>

          <CarouselNavButton
            direction="prev"
            onClick={() => (autoOffsetRef.current -= 180)}
            ariaLabel="Anterior"
            className="hidden sm:block left-1 opacity-80"
          />
          <CarouselNavButton
            direction="next"
            onClick={() => (autoOffsetRef.current += 180)}
            ariaLabel="Siguiente"
            className="hidden sm:block right-1 opacity-80"
          />
        </>
      </div>
    </section>
  );
}

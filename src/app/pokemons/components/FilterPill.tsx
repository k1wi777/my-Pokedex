"use client";

import {
  autoUpdate,
  FloatingPortal,
  flip,
  offset,
  shift,
  size,
  useFloating,
} from "@floating-ui/react";
import { useEffect, useRef, type ReactNode } from "react";

interface FilterPillProps {
  label: string;
  hasSelection: boolean;
  selectionTags?: string[];
  expanded: boolean;
  onToggle: () => void;
  onClose: () => void;
  children?: ReactNode;
}

export default function FilterPill({
  label,
  hasSelection,
  selectionTags,
  expanded,
  onToggle,
  onClose,
  children,
}: FilterPillProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const floatingRef = useRef<HTMLDivElement>(null);

  const {
    refs: { setReference, setFloating },
    floatingStyles,
  } = useFloating({
    open: expanded,
    placement: "bottom-start",
    strategy: "fixed",
    middleware: [
      offset(10),
      flip({ padding: 12 }),
      shift({ padding: 12 }),
      size({
        padding: 12,
        apply({ availableWidth, availableHeight, elements }) {
          elements.floating.style.width = `${Math.min(availableWidth, 448)}px`;
          elements.floating.style.maxWidth = "calc(100vw - 1rem)";
          elements.floating.style.maxHeight = `${Math.min(availableHeight, 520)}px`;
        },
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  useEffect(() => {
    if (!expanded) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node) &&
        floatingRef.current &&
        !floatingRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [expanded, onClose]);

  return (
    <div ref={wrapperRef} className="relative">
      <button
        ref={setReference}
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        className={`
          relative flex min-h-11 items-center gap-2 rounded-full border px-4 py-2 text-left text-sm font-bold
          transition-all duration-200
          ${
            expanded
              ? "border-orange-500/60 bg-orange-500/15 text-orange-300"
              : "border-white/20 bg-white/5 text-white hover:border-white/40 hover:bg-white/10"
          }
        `}
      >
        <span className="shrink-0 whitespace-nowrap">{label}</span>
        {selectionTags?.length ? (
          <span className="flex max-w-48 flex-wrap gap-1">
            {selectionTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-orange-400/30 bg-black/30 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-orange-100"
              >
                {tag}
              </span>
            ))}
          </span>
        ) : hasSelection ? (
          <span className="h-2 w-2 shrink-0 rounded-full bg-orange-500 ring-2 ring-black/30" />
        ) : null}
      </button>

      {expanded && children && (
        <FloatingPortal>
          <div
            ref={(node) => {
              floatingRef.current = node;
              setFloating(node);
            }}
            style={floatingStyles}
            className="thin-scroll relative z-50 overflow-y-auto rounded-xl border border-white/15 bg-[#1a1a1a]/95 p-4 shadow-2xl backdrop-blur-md"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar filtro"
              className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-black/50 text-sm text-white transition-colors hover:bg-black/70"
            >
              ×
            </button>
            {children}
          </div>
        </FloatingPortal>
      )}
    </div>
  );
}

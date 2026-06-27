"use client";

import { useEffect, useRef, useState } from "react";

export interface DropdownOption {
  value: string;
  label: string;
}

interface SearchStyleDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: DropdownOption[];
  placeholder: string;
  id?: string;
}

export default function SearchStyleDropdown({
  value,
  onChange,
  options,
  placeholder,
  id,
}: SearchStyleDropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedLabel =
    options.find((option) => option.value === value)?.label ?? placeholder;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative z-20">
      <button
        id={id}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="
          flex w-full items-center justify-between gap-2
          rounded-full border border-white/60 bg-gray-800
          px-4 py-2.5 text-left text-sm font-bold text-white
          shadow-lg transition-colors hover:bg-gray-700
        "
      >
        <span className={value ? "text-white" : "text-stone-400"}>
          {selectedLabel}
        </span>
        <svg
          className={`h-4 w-4 shrink-0 text-stone-400 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {open && (
        <ul
          className="
            absolute top-[calc(100%+8px)] left-0 right-0 z-30
            max-h-48 overflow-y-auto
            rounded-xl border border-white/20 bg-gray-200/20
            shadow-2xl backdrop-blur-xs
            moves-scroll
          "
        >
          {options.map((option) => (
            <li key={option.value || "__all__"}>
              <button
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className={`
                  w-full px-4 py-2 text-left text-sm font-semibold transition-colors
                  ${
                    value === option.value
                      ? "bg-white/25 text-white"
                      : "text-white/80 hover:bg-white/20 hover:text-white"
                  }
                `}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

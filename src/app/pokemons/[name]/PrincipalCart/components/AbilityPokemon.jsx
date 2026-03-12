"use client";

import { useState, useEffect, useRef } from "react";
import { abilitiesDetails } from "@/services/fetches";

export default function AbilityPokemon({ ability }) {

  const [details, setDetails] = useState(null);
  const [open, setOpen] = useState(false);

  const ref = useRef(null);

  useEffect(() => {
    async function loadAbility() {
      const data = await abilitiesDetails(ability.ability);
      setDetails(data);
    }

    loadAbility();
  }, [ability]);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div
      ref={ref}
      onClick={handleClick}
      className={`
        relative group px-1 md:py-1 md:px-3 rounded-xl font-semibold
        backdrop-blur-md transition-all duration-800 cursor-help overflow-visible
        ${ability.is_hidden
          ? "bg-purple-500/20 border border-purple-400/40 text-purple-200"
          : "bg-white/20 border border-white/30"}
      `}
    >
      {details?.name ?? ability.ability.name}

      {ability.is_hidden && (
        <span className="absolute -top-2 -right-2 text-[10px] p-1 md:px-2 py-[1px] rounded-full bg-purple-600 shadow hidden md:flex">
          hidden
        </span>
      )}

      <div
        className={`
          overflow-hidden
          transition-all duration-500 ease-in-out text-center
          ${open ? "max-h-40 max-w-80 opacity-100 lg:mt-1" : "max-h-0 max-w-0 opacity-0"}
        `}
      >
        <span className="block text-[0.8em] leading-relaxed pt-1">
          {details?.description}
        </span>
      </div>

    </div>
  );
}
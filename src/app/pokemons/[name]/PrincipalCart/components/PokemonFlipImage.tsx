"use client"

import { useState } from "react";
import Image from "next/image";

export default function PokemonFlipImage({ normal, shiny }) {
  const [isShiny, setIsShiny] = useState(false);

  const handleToggle = () => {
    setIsShiny(prev => !prev);
  };

  return (
    <div className="relative w-full h-full perspective group">

      {/*  Botón overlay */}
      <button
        onClick={handleToggle}
        className={`
          absolute top-4 right-4 z-30
          opacity-100 md:opacity-0
           md:group-hover:opacity-100
          transition-all duration-300
          text-3xl
          ${isShiny 
            ? "text-yellow-400 scale-110 drop-shadow-[0_0_6px_gold]" 
            : "text-white/50 hover:text-yellow-300"}
        `}
      >
        ★
      </button>

      {/* CONTENEDOR 3D */}
      <div
        className={`
          relative w-full h-full
          transition-transform duration-700
          transform-style-preserve-3d
          ${isShiny ? "rotate-y-180" : ""}
        `}
      >
        {/* CARA NORMAL */}
        <div className="absolute inset-0 backface-hidden">
          <Image
            src={normal}
            alt="pokemon normal"
            fill
            priority
            className="
              object-contain
              drop-shadow-[0_0_7px_rgba(0,255,255,0.35)]
              transition-transform duration-500
              scale-120 md:scale-100
              group-hover:scale-105
            "
          />
        </div>

        {/* CARA SHINY */}
        <div className="absolute inset-0 rotate-y-180 backface-hidden">
          <Image
            src={shiny}
            alt="pokemon shiny"
            fill
            priority
            className="
              object-contain
              drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]
              transition-transform duration-500
               scale-120 md:scale-100
              group-hover:scale-105
            "
          />
        </div>

      </div>
    </div>
  );
}
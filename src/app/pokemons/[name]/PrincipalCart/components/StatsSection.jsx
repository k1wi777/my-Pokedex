"use client";
import { useState } from "react";
import StatPokemon from "./StatPokemon";

function handleLevelChange(value) {
  const num = Number(value)


  const clamped = Math.min(100, Math.max(0, num))

  setLevel(clamped)
}


export default function StatsSection({ stats }) {
  const [level, setLevel] = useState(0);
  return (
    <div className="flex flex-col gap-1">
      <section
        className="
                                     relative
                                     w-full
                                     bg-gradient-to-br from-white/10 via-white/5 to-transparent
                                     backdrop-blur-xl
                                     border border-white/20
                                     shadow-[0_0_25px_rgba(255,255,255,0.05)]
                                     rounded-lg
                                     py-[2px] md:py-2
                                    pr-[10%] text-[0.3em] 
                                "
      >
        <div className="flex items-center gap-2 h-2  mb-1  text-[0.95em] w-[95%]">
          <span className="opacity-70 pl-px">Nivel</span>

          <input
            type="range"
            min="0"
            max="100"
            value={level}
            onChange={(e) => handleLevelChange(e.target.value)}
            className="slider flex-1 hidden md:flex md:w-[60%] cursor-pointer"
          />

          <input
            type="number"
            min="0"
            max="100"
            value={level === 0 ? "" : level}
            onChange={(e) => handleLevelChange(e.target.value)}
            className="px-2.5 md:px-1 text-center bg-black/20 border border-white/20 rounded"
          />
        </div>

        {stats.map((stat) => (
          <StatPokemon stat={stat} level={level} key={stat.stat.name} />
        ))}
      </section>
      <span className="text-[0.22em] text-center opacity-50">
        {level === 0 ? "Base stats" : " Stats estimadas (IV perfectos, sin EV)"}
      </span>
    </div>
  );
}

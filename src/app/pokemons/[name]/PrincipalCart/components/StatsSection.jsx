'use client'
import { useState } from "react";
import StatPokemon from "./StatPokemon";

export default function StatsSection({stats}) {
    const [level, setLevel] = useState(0);
  return (
    <section
      className="
                                     relative
                                     w-full
                                     bg-gradient-to-br from-white/10 via-white/5 to-transparent
                                     backdrop-blur-xl
                                     border border-white/20
                                     shadow-[0_0_25px_rgba(255,255,255,0.05)]
                                     rounded-xl
                                     py-[3px] md:py-2
                                    pr-[10%] text-[0.3em] 
                                "
    >
      <div className="flex items-center gap-1 lg:gap-2 mb-1 lg:mb-3 text-[0.35em]">
        <span className="opacity-70">Nivel</span>

        <input
          type="range"
          min="0"
          max="100"
          value={level}
          onChange={(e) => setLevel(Number(e.target.value))}
          className="flex-1 accent-purple-400 cursor-pointer"
        />

        <input
          type="number"
          min="0"
          max="100"
          value={level}
          onChange={(e) => setLevel(Number(e.target.value))}
          className="w-12 text-center bg-black/20 border border-white/20 rounded"
        />
      </div>

      

      {stats.map((stat) => (
        <StatPokemon stat={stat}  level={level} key={stat.stat.name} />
      ))}
      <span className="text-[0.25em] opacity-50">
       {level ===0  ? 'Base stats':' Stats estimadas (IV perfectos, sin EV)'}
      </span>
    </section>
  );
}

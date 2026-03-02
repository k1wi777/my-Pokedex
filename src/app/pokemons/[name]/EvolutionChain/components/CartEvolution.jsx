'use client'
import PokemonHero from "@/app/components/PokemonHero";
import { fetchInfoPokemon } from "@/services/fetches";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import useObserver from '@/hooks/useObserver'
import ObserverCart from "@/app/components/ObserverCart";

export default function CartEvolution({ evolution, isCurrent }) {
  const [pkmn,setPkmn] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchInfoPokemon(evolution.name);
        setPkmn(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [evolution]);

  
  return (
    <Link href={`/pokemons/${pkmn?.name}` }  className={`rounded-2xl    ${
      isCurrent
        ? "border-slate-300 ring-2 ring-slate-200/40 scale-y-105"
        : "border-white/30  "
    }`}>
      <ObserverCart>

      <PokemonHero image={pkmn?.sprites.other["official-artwork"].front_default}>
        <div
          className={`
    w-57 not-visited:py-6 px-6 rounded-2xl 
    bg-white/10 backdrop-blur-md
    shadow-xl border 
    
   
   
  `}
        >
          {isCurrent && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <div
                className="w-0 h-0 
                    border-l-[10px] border-l-transparent
                    border-r-[10px] border-r-transparent
                    border-b-[14px] border-b-slate-300
                    drop-shadow-md rotate-180"
              />
            </div>
          )}
          <section className=" relative  hover:opacity-100 hover:scale-115 group-hover:opacity-60 transition-all duration-500">
            {/* Número grande de fondo */}
            <span className="absolute inset-0 top-[20%] text-[6rem] flex justify-center  font-black text-black/10 pointer-events-none select-none">
              #{String(pkmn?.id).padStart(3, "0")}
            </span>

            {/* Contenido real */}
            <div className="relative z-10 flex flex-col items-center py-5">
              {/* Nombre */}
              <h2 className="text-2xl font-extrabold capitalize mb-2 tracking-wide">
                {pkmn?.name}
              </h2>

              {/* Imagen */}
              <Image
                src={pkmn?.sprites.other["official-artwork"].front_default}
                alt={"pokemon " + pkmn?.name}
                width={400}
                height={400}
                quality={100}
                unoptimized
                className="w-full   drop-shadow-xl mb-4 "
              />

              {/* Tipos */}
              <div className="flex gap-3 mb-4">
                {pkmn?.types.map((t) => (
                  <span
                    key={t.type.name}
                    className={`type-${t.type.name}
                  px-5 py-1 rounded-full text-sm font-bold
                  text-[rgb(var(--type-text))]
                  bg-[linear-gradient(to_bottom,rgb(var(--type-color)/1)_50%,rgb(var(--type-color-2)/1)_50%)]
                  shadow-md border-2`}
                  >
                    {t.type.name}
                  </span>
                ))}
              </div>

              {/* Trigger */}
              <div className="text-center min-h-[60px] flex items-center justify-center">
                {evolution.trigger ? (
                  <div className="bg-black/70 text-white text-xs px-4 py-2 rounded-full shadow-md text-center">
                    <span className="block text-[10px] opacity-70">
                      Evoluciona con
                    </span>
                    <span className="font-bold">{evolution.trigger}</span>
                  </div>
                ) : (
                  <div className="bg-emerald-500/80 text-white text-xs px-4 py-2 rounded-full shadow-md">
                    Forma base
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </PokemonHero>
      </ObserverCart>
    </Link>
  );
}

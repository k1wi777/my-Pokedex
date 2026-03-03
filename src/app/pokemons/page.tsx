import {  fetchInitialDetailed, fetchPokemons } from "@/services/fetches";

import Search from '@/app/components/Search.jsx'
import "./global.css";
import PokemonGrid from "@/app/components/PokemonGrid"

export default async function PokemonPage() {
  const { count, next, previous, results } = await fetchPokemons();


  // Traemos detalles iniciales en paralelo
  const initialDetailed = await fetchInitialDetailed(results)

  return (
    <>

      <div className="
  relative
  bg-gradient-to-b from-[#3a3a3a] to-[#2a2a2a] pt-3
  pb-10 px-8   sm:px-10 md:pb-12 md:px-12 lg:pb-12 lg:px-14
  shadow-inner
  border-t-4 border-black
  [clip-path:polygon(0_0,100%_0,100%_75%,50%_75%,45%_100%,0_100%)]
  flex flex-col gap-1  md:gap-3
">
         {/* Línea decorativa superior */}
        <div className="absolute top-0 left-0 w-full h-2 bg-red-600" />

        {/* LEDs estilo Pokédex */}
        <div className="absolute right-4 sm:right-6 top-6 flex gap-3">
          <div className="w-3 h-3 sm:w-4 sm:h-4 bg-blue-400 rounded-full animate-pulse" />
          <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-400 rounded-full animate-pulse" />
        </div>

        {/* Contenedor centrado */}
        <div className="max-w-5xl mx-auto w-full flex flex-col gap-1 md:gap-4">
          
          <h2 className="
            text-lg sm:text-xl md:text-2xl
            font-black
            tracking-wider
            text-yellow-400
            drop-shadow
          ">
            BUSCAR POKÉMON
          </h2>

          <Search />

          <p className="
            text-gray-400
            text-xs sm:text-sm
            tracking-wide
          ">
            Usa el buscador para encontrar un Pokémon por nombre o ID.
          </p>
        </div>

      </div>

      <PokemonGrid
        initialResults={initialDetailed}
        initialNext={next}
      />

    </>
  );
}




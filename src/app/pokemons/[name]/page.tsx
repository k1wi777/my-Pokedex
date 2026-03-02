
import { fetchInfoPokemon } from "@/services/fetches";

import EvolutionSection from './EvolutionChain/EvolutionSection'
import PrincipalCart from "./PrincipalCart/PrincipalCart";
import TypeEffectCard from './TypeEffectCard/TypeEffectCard'
import { notFound } from "next/navigation";
import Search from "@/app/components/Search";




export default async function InfoPokemonPage({ params }) {
  const param = await params;
  const name = param.name;
  const lang = "es"; //  hay que hacerlo dinamico /////

  const pkmn = await fetchInfoPokemon(name, lang);

  if (!pkmn) {
    notFound(); // en caso de que no se encuentre el pokemon esot lanza el not-found
  }

  const effectiveness = pkmn.effectiveness()
  const evolutions = await pkmn.evolutions()

  return (
    <div className="mx-auto py-5 px-4 flex flex-col gap-5 w-full fade-in">
      <Search small placeholder="Busqueda de un pokemón" />
      <div className="flex flex-col-reverse lg:flex-row gap-5">
        {/* cart de types matchups */}
        <section className="w-full lg:w-[38%]
          relative
          bg-gradient-to-br from-white/10 via-white/5 to-transparent
          backdrop-blur-xl
          border border-white/15
          rounded-3xl
          px-4 pt-6 pb-8
          shadow-[0_10px_40px_rgba(0,0,0,0.35)]
          flex flex-col gap-8
          text-xl  lg:text-2xl
          overflow-hidden
        ">
          {/* Background layer */}
          <div
            className="absolute inset-0 opacity-[0.09] pointer-events-none"
            style={{
              backgroundImage: "url('/pokeball.svg')",
              backgroundRepeat: "repeat",
              backgroundSize: "220px",
              transform: "rotate(-15deg) scale(1.4)",
            }}
          />

          <TypeEffectCard
            defensive={effectiveness.defensive}
            offensive={effectiveness.offensive}
          />

        </section>


        <section className=" w-full lg:w-[63%]
            flex flex-col
            gap-6 lg:gap-9
            text-2xl sm:text-3xl lg:text-4xl">
          <PrincipalCart pkmn={pkmn} />
        </section>
      </div>
      <section className="col-span-2">
        {/* <EvolutionChain evolutions={evolutions} name={name} /> */}
        <EvolutionSection
          evolutionData={evolutions}
          name={name}
        />
      </section>
    </div>
  );
}

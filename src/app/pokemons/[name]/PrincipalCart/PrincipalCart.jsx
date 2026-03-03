import PokemonHero from "@/app/components/PokemonHero";
import Image from "next/image";
import TipePokemon from "./components/TipePokemon";
import AbilityPokemon from "./components/AbilityPokemon";
import StatPokemon from "./components/StatPokemon";
import GenderRatio from "./components/GenderRatio";
import ExperienceBadge from "./components/ExperienceBadge";
import GrowthRateBadge from "./components/GrowthRateBadge";
import CaptureRateBar from "./components/CaptureRateBar";
import GenerationBadge from "./components/GenerationBadge";
import PokemonFlipImage from "./components/PokemonFlipImage.jsx";

export default async function PrincipalCart({ pkmn }) {

    const description = pkmn.description();
    const category = pkmn.category();

    const pokeballCategory =
        category === "legendary"
            ? "/masterball.png"
            : category === "mythical"
                ? "/ultraball.png"
                : "/pokeball-color.png";

    return (
        <PokemonHero image={pkmn.sprites.other["official-artwork"].front_default}>
            <div className="pl-1 md:p-2 relative">
                <section className="absolute right-1 top-1  xl:right-[10%]  xl:top-[13%] text-[0.4em] z-20">
                    <GenerationBadge generation={pkmn.generation.name} getMain_region={pkmn.main_region} />

                </section>
                {/* Nombre */}
                <h2 className=" font-black capitalize text-center mb-2 md:mb-6 text-start" >
                    {pkmn.name}
                </h2>
                <section className=" flex flex-col pb-4">
                    {/* ================= TYPES (arriba) ================= */}
                    <div className="
                        w-[40%]
                        flex
                        justify-center
                        mx-auto z-20
                    ">
                        <section className="flex gap-3 text-[0.5em] justify-center">
                            {pkmn.types.map((t) => (
                                <TipePokemon
                                    name={t.type.name}
                                    key={t.type.name}
                                />
                            ))}
                        </section>
                    </div>

                    {/* CONTENEDOR RADIAL RESPONSIVE */}
                    <div className="
                        relative
                        w-full
                        flex
                        items-center
                        justify-center
                        mb-1
                    ">
                        {/* panel izquierdo */}
                        <div className="w-[26%] grid-col  grid-cols-1  space-y-1 md:space-y-6" style={{
                            WebkitMaskImage: "radial-gradient(circle at 214% 50%, transparent 50%, black 51%)",
                            maskImage: "radial-gradient(circle at 214% 50%, transparent 50%, black 51%)",
                        }}>
                            {/* datos basicos */}
                            <section className="
                                      p-1 md:p-2 space-y-1 text-[0.4em]
                                " >
                                <div className="space-y-1">

                                    <h3 className=" font-black capitalize opacity-80">
                                        base experience
                                    </h3>
                                    <ExperienceBadge value={pkmn.base_experience} />
                                </div>
                                <div className="lg:pl-2 xl:pl-5 space-y-1 ">

                                    <h3 className=" font-black capitalize opacity-80">
                                        growth rate
                                    </h3>
                                    <GrowthRateBadge value={pkmn.growth_rate.name} />
                                </div>
                            </section>

                            {/* stats */}
                            <section className="
                                     relative
                                     w-full
                                     bg-gradient-to-br from-white/10 via-white/5 to-transparent
                                     backdrop-blur-xl
                                     border border-white/20
                                     shadow-[0_0_25px_rgba(255,255,255,0.05)]
                                     rounded-xl
                                     py-[3px] md:py-2
                                    pr-[10%] text-[0.3em] 
                                " >

                                {pkmn.stats.map((stat) => (
                                    <StatPokemon
                                        stat={stat}
                                        key={stat.stat.name}
                                    />
                                ))}
                            </section>

                            {/* growth rate */}
                            <section className="
                                       md:pt-2  ml-auto md:space-y-2 text-lg relative  text-[0.4em]
                                " >
                                <h3 className=" font-black capitalize opacity-80">
                                    growth rate
                                </h3>
                                <CaptureRateBar rate={pkmn.capture_rate} />

                                <h3 className=" font-black capitalize opacity-80 text-[0.9em]">
                                    base Happiness:  {pkmn.base_happiness}
                                </h3>

                            </section>

                        </div>

                        {/* ================= CENTRO ================= */}
                        <div className="relative w-[42%] aspect-square flex items-center justify-center ">

                            {/* CÍRCULO BASE SUAVE */}
                            <div className="
                                absolute inset-0
                                rounded-full
                                border border-white/15
                            " />

                            {/* CÍRCULO SPIN SEGMENTADO 2 */}
                            <div className="
                                 absolute inset-[8%]
                                 rounded-full
                                 border-2 border-transparent
                                 border-b-white/30
                                 animate-spin
                                 [animation-duration:5s]

                             " />

                            {/* CÍRCULO SPIN SEGMENTADO 1 */}
                            <div className="
                                absolute inset-0
                                rounded-full
                                border-2 border-transparent
                                border-t-white/50
                                border-r-white/50
                                animate-spin
                                [animation-duration:10s]

                            " />
                            <div className="
                              absolute
                              inset-[-4%]
                              rounded-full
                              border-2
                              border-transparent
                              border-t-white/60
                              border-b-white/60
                              animate-spin
                              [animation-duration:14s]

                            " />


                            <Image
                                src={pokeballCategory}
                                alt="pokeball fondo"
                                fill
                                className="object-contain opacity-10 scale-125 pointer-events-none"
                            />

                            <PokemonFlipImage
                                normal={pkmn.sprites.other["official-artwork"].front_default}
                                shiny={pkmn.sprites.other["official-artwork"].front_shiny}
                            />
                        </div>
                        {/* section derecha */}
                        <div className="w-[26%] justify-start flex flex-col gap-y-4 md:gap-y-8" style={{
                            WebkitMaskImage: "radial-gradient(circle at -95% 50%, transparent 50%, black 51%) ",
                            maskImage: "radial-gradient(circle at -95% 50%, transparent 50%, black 51%)",
                        }}>
                            {/* abilities */}
                            <section className="
                               
                                relative
                                w-full
                                bg-gradient-to-br from-white/10 via-white/5 to-transparent
                                backdrop-blur-xl
                                border border-white/20
                                shadow-[0_0_25px_rgba(255,255,255,0.05)]
                                rounded-xl rounded-r-4xl
                                justify-center py-2 
                                flex flex-col items-center
                            " >



                                <h3 className="text-[0.4em] font-black md:mb-2 opacity-80">
                                    Abilities
                                </h3>

                                <div className="flex flex-wrap px-1 gap-1 md:gap-2 justify-center text-[0.3em] ">
                                    {pkmn.abilities.map((ability) => (
                                        <AbilityPokemon
                                            ability={ability}
                                            key={ability.ability.name}
                                        />
                                    ))}
                                </div>
                            </section>
                            {/* data pokemon */}
                            <section className="
                               
                                relative
                                w-full
                                bg-gradient-to-br from-white/10 via-white/5 to-transparent
                                backdrop-blur-xl
                                border border-white/20
                                shadow-[0_0_25px_rgba(255,255,255,0.05)]
                                rounded-3xl
                                pl-[10%] py-2
                                flex flex-col gap-3 justify-start text-[0.5em] 
                            " >


                                <div className=" text-start flex justify-around pr-2 text-[0.6em]">
                                    <div>
                                        <h3 className=" font-black  opacity-80">
                                            Height
                                        </h3>
                                        <span>{pkmn.height / 10 + " m"}</span>
                                    </div>
                                    <div className="md:w-[60%]">
                                        <h3 className="font-black  opacity-80">
                                            Gender
                                        </h3>
                                        <GenderRatio rate={pkmn.gender_rate} />
                                    </div>
                                </div>
                                <div className=" text-start flex justify-around pr-2 md:pr-8 text-[0.6em]  gap-2">
                                    <div>
                                        <h3 className=" font-black  opacity-80">
                                            Weight
                                        </h3>
                                        <span>{pkmn.weight / 10 + " kg"}</span>

                                    </div>
                                    <div>

                                        <h3 className=" font-black  opacity-80">
                                            genera
                                        </h3>
                                        <span className="text-[1.02em] font-semibold">{pkmn.genera}</span>
                                    </div>
                                </div>


                            </section>
                        </div>

                    </div>
                    {/* ================= DESCRIPTION (abajo) ================= */}
                    <div className="
                        mx-auto
                        w-[60%]
                    ">
                        <section className="
                            
                        relative
                        w-full
                        bg-gradient-to-br from-white/10 via-white/5 to-transparent
                        backdrop-blur-xl
                        border border-white/20
                        shadow-[0_0_25px_rgba(255,255,255,0.05)]
                        rounded-3xl px-1 py-1 md:px-6  md:py-3
                            text-center
                        ">
                            <p className="text-[0.4em] ">
                                {description}
                            </p>
                        </section>
                    </div>
                </section>
            </div>
        </PokemonHero>
    );
}


// import PokemonHero from "@/app/components/PokemonHero";
// import Image from "next/image";
// import TipePokemon from "./components/TipePokemon";
// import AbilityPokemon from "./components/AbilityPokemon";
// import StatPokemon from "./components/StatPokemon";

// export default async function PrincipalCart({ pkmn }) {

//     const mainType = pkmn.types[0].type.name;
//     const description = pkmn.description();
//     const category = pkmn.category();

//     const pokeballCategory =
//         category === "legendary"
//             ? "/masterball.png"
//             : category === "mythical"
//                 ? "/ultraball.png"
//                 : "/pokeball-color.png";

//     return (
//         <PokemonHero image={pkmn.sprites.other["official-artwork"].front_default}>
//             <div className="p-4">

//                 {/* Nombre */}
//                 <h2 className="text-4xl font-black capitalize text-center mb-6">
//                     {pkmn.name}
//                 </h2>

//                 {/* Contenedor radial */}
//                 <div className="relative w-full h-[650px] flex items-center justify-center">

//                     {/* ===== Centro (Pokémon + Pokéball) ===== */}
//                     <div className="relative w-[350px] h-[350px] flex items-center justify-center">

//                         {/* Pokéball fondo */}
//                         <Image
//                             src={pokeballCategory}
//                             alt="pokeball fondo"
//                             width={400}
//                             height={400}
//                             className="absolute opacity-10 scale-125 pointer-events-none"
//                         />

//                         {/* Pokémon */}
//                         <img
//                             src={pkmn.sprites.other["official-artwork"].front_default}
//                             alt={pkmn.name}
//                             className="relative z-10 w-[90%]"
//                         />
//                     </div>


//                     {/* ===== TYPES (arriba) ===== */}
//                     <div className="absolute top-6 left-1/2 -translate-x-1/2">
//                         <section className="flex gap-3 text-xl">
//                             {pkmn.types.map((t) => (
//                                 <TipePokemon
//                                     name={t.type.name}
//                                     key={t.type.name}
//                                 />
//                             ))}
//                         </section>
//                     </div>


//                     {/* ===== STATS (izquierda) ===== */}
//                     <div className="absolute left-10 top-1/2 -translate-y-1/2 w-[250px]">
//                         <section className="bg-black/20 backdrop-blur-md p-3 rounded-xl">
//                             {pkmn.stats.map((stat) => (
//                                 <StatPokemon
//                                     stat={stat}
//                                     key={stat.stat.name}
//                                 />
//                             ))}
//                         </section>
//                     </div>


//                     {/* ===== ABILITIES (derecha) ===== */}
//                     <div className="absolute right-10 top-1/2 -translate-y-1/2 w-[250px]">
//                         <section className="flex flex-col items-center bg-black/20 backdrop-blur-md p-3 rounded-xl">
//                             <h3 className="text-lg font-black mb-2 opacity-80">
//                                 Abilities
//                             </h3>

//                             <div className="flex flex-wrap gap-3 justify-center">
//                                 {pkmn.abilities.map((ability) => (
//                                     <AbilityPokemon
//                                         ability={ability}
//                                         key={ability.ability.name}
//                                     />
//                                 ))}
//                             </div>
//                         </section>
//                     </div>


//                     {/* ===== DESCRIPTION (abajo) ===== */}
//                     <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[60%]">
//                         <section className="backdrop-blur-xl bg-black/20 border border-white/20 shadow-lg rounded-2xl p-3 text-center">
//                             <p className="text-sm leading-relaxed">
//                                 {description}
//                             </p>
//                         </section>
//                     </div>

//                 </div>
//             </div>
//         </PokemonHero>
//     );
// }
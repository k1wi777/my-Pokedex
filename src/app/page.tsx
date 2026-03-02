import { fetchInitialDetailed, fetchPokeballs, fetchPokemons, getDataPokeball, translateLabel } from "@/services/fetches";
import CartPokemon from "@/app/components/CartPokemon.jsx";
import { randomNumber } from "@/app/utils/random";
import { NUMBER_POKEMON } from "@/app/utils/dataFetch";
import Carousel from "@/app/components/Carousel";
import Link from "next/link";
import CartPokeball from '@/app/components/CartPokeball'
import ObserverCart from "./components/ObserverCart";
import Image from "next/image";

const number = randomNumber(NUMBER_POKEMON - 20);


export default async function HomePage() {
  const { count, next, previous, results } = await fetchPokemons(number);
  const initialDetailed = await fetchInitialDetailed(results)
  const listPokeballs = await fetchPokeballs();
  return (
    <>

      <Carousel results={results}>
        {initialDetailed.map((pokemon) => {
          return (
            <Link href={`/pokemons/${pokemon.name}`} key={pokemon.name} className="w-full h-full">
              <CartPokemon pkmn={pokemon} />
            </Link>
          )
        })}
      </Carousel>
      <div className="w-full flex flex-col md:flex-row items-center justify-center relative overflow-hidden py-4">
        

          <div className="z-10  h-full  px-8  flex justify-between items-center ">
            <ObserverCart>
              <div className="text-xl sm:text-3xl md:text-4xl lg:text-5xl transition-all duration-300 flex justify-between">

            <section className="w-[70%]">
              <h3 className="capitalize font-black opacity-40">pokémon</h3>
              <p className="text-[0.5em] pt-4 sm:pt-6  md:pt-8 lg:pt-10 font-bold opacity-70 leading-4 sm:leading-6 md:leading-8 lg:leading-10">Pokémon es una franquicia que originalmente comenzó como un videojuego RPG, pero debido a su popularidad ha logrado expandirse a otros medios de entretenimiento como series de televisión, películas, juegos de cartas, ropa..., convirtiéndose en una marca que es reconocida en el mercado mundial.</p>
            </section>
            <Image src="/farmer-aura.jpg" alt="pokemon photo" width={290} height={340} className="rounded-lg  drop-shadow-[0_0_7px_rgba(255,255,255,0.35)] opacity-70 w-25 sm:w-[20%] ml-1 my-auto" />
              </div>
            </ObserverCart>

          </div>
        
        <Image src={'/banner4.jpg'} alt="text pokeballs" width={400} height={400} className=" mx-auto  opacity-70 rotate-270 absolute scale-112 scale-y-145  z-0" />
      </div>
      <Image src={'/Pokeballs-tittle.png'} alt="text pokeballs" width={900} height={900} className="w-[70%] sm:w-[50%] md:w-[30%]  mx-auto drop-shadow-[0_0_7px_rgba(0,255,255,0.35)]" />

      <div className="px-8  space-y-15">
        {listPokeballs.map((category) => {
          return (
            <>
              <h2 className="text-4xl font-black tracking-wider
              text-yellow-400
                drop-shadow-lg
                border-b border-yellow-500/40
                pb-2
                mb-4">{category.name.replace('-', " ")}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 items-center">
                {category.items.map(async (item) => {

                  return (
                    <ObserverCart key={item.name}>
                      <CartPokeball item={item} lang={'es'} />

                    </ObserverCart>
                  )
                })}
              </div>
            </>
          )
        })}
      </div>
    </>
  );
}

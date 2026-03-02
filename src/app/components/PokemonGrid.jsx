"use client";

import { useState } from "react";
import Link from "next/link";
import CartPokemon from "./CartPokemon";
import { fetchGetPokemon } from "@/services/fetches";
import Image from "next/image";
import ObserverCart from "./ObserverCart";

export default function PokemonGrid({ initialResults, initialNext }) {
  const [pokemons, setPokemons] = useState(initialResults);
  const [nextUrl, setNextUrl] = useState(initialNext);

  const fetchPokemonDetails = async (name) => await fetchGetPokemon(name);

  const loadMore = async () => {
    if (!nextUrl) return;

    const res = await fetch(nextUrl);
    const data = await res.json();

    setNextUrl(data.next);

    //  Render progresivo
    data.results.forEach((pokemon) => {
      fetchPokemonDetails(pokemon.name).then((info) => {
        setPokemons((prev) => [...prev, info]);
      });
    });
  };

  return (
    <>
      <div className=" w-full
    py-10
    px-4
    sm:px-6
    md:px-10
    lg:px-16
    xl:px-20

    grid
    grid-cols-1
    sm:grid-cols-2
    md:grid-cols-3
    lg:grid-cols-4
    xl:grid-cols-5

    gap-6 ">
        {pokemons.map((pokemon) => {
          return (
            <ObserverCart key={pokemon.id}>
              <Link
                href={`/pokemons/${pokemon.name}`}
                className={`  
            `}
              >
                <div
                  className="md:jumpClass fade-in
                  w-full h-full rounded-xl 
                  shadow-[inset_0_2px_6px_rgba(255,255,255,0.7),
                          inset_0_-6px_10px_rgba(0,0,0,0.25)] bg-[#171717] shadow-[0_8px_20px_rgba(0,0,0,0.25)]
            before:absolute before:inset-0 before:rounded-2xl
            before:bg-[linear-gradient(120deg,rgba(255,255,255,0.6),transparent_40%)] text-4xl sm:3xl md:2xl lg:text-xl
                md:hover:-translate-y-3 transition-all duration-200"
                >
                  <CartPokemon
                    pkmn={pokemon}
                    containerClass="cartClass"
                    bottomClass="text-white rounded-b-lg py-3 flex flex-col justify-between h-[40%]"
                  />
                </div>
              </Link>
            </ObserverCart>
          );
        })}
      </div>
      <div className="flex relative  justify-center pt-3 pb-20 ">
        <button
          onClick={loadMore}
          className="bg-white/5 animate-bounce transition  hover:bg-black/50  duration-150 ease-in p-3 rounded-full font-bold text-white border-2 border-white/20 flex items-center justify-center"
        >
          <Image
            src="/arrow.png"
            alt="arrow for more results"
            width="14"
            height="14"
            className="rotate-90  invert w-9 "
          />
        </button>
        <span className="absolute bottom-6 text-sm text-gray-300">Cargar más</span>
      </div>
    </>
  );
}

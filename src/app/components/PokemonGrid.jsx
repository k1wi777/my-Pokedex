"use client";

import { useState } from "react";
import Link from "next/link";
import CartPokemon from "./CartPokemon";
import { fetchGetPokemon } from "@/services/fetches";
import Image from "next/image";
import ObserverCart from "./ObserverCart";

const FILTERED_PAGE_SIZE = 20;
const FILTER_SKELETON_COUNT = 8;

/**
 * @param {object} props
 * @param {import("@/types/pokeapi-generation").PokeApiPokemonResponse[]} props.initialResults
 * @param {string | null} props.initialNext
 * @param {import("@/types/pokeapi-generation").PokeApiPokemonResponse[] | null} [props.filteredResults]
 * @param {boolean} [props.isFilterMode]
 * @param {boolean} [props.isLoading]
 */
export default function PokemonGrid({
  initialResults,
  initialNext,
  filteredResults = null,
  isFilterMode = false,
  isLoading = false,
}) {
  const [pokemons, setPokemons] = useState(initialResults);
  const [nextUrl, setNextUrl] = useState(initialNext);
  const [visibleCount, setVisibleCount] = useState(FILTERED_PAGE_SIZE);

  const displayedPokemons =
    isFilterMode
      ? filteredResults
        ? filteredResults.slice(0, visibleCount)
        : []
      : pokemons;

  const showFilterSkeleton = isFilterMode && isLoading && !filteredResults;

  const fetchPokemonDetails = async (name) => await fetchGetPokemon(name);

  const loadMore = async () => {
    if (isFilterMode) {
      if (!filteredResults) return;
      setVisibleCount((prev) => prev + FILTERED_PAGE_SIZE);
      return;
    }

    if (!nextUrl) return;

    const res = await fetch(nextUrl);
    const data = await res.json();

    setNextUrl(data.next);

    data.results.forEach((pokemon) => {
      fetchPokemonDetails(pokemon.name).then((info) => {
        setPokemons((prev) => [...prev, info]);
      });
    });
  };

  const hasMore = isFilterMode
    ? filteredResults && visibleCount < filteredResults.length
    : Boolean(nextUrl);

  const showEmptyState =
    isFilterMode && !isLoading && filteredResults && filteredResults.length === 0;

  if (showEmptyState) {
    return (
      <div className="flex flex-col items-center justify-center px-4 py-20 text-center">
        <p className="text-lg font-bold text-white">
          No se encontraron Pokémon
        </p>
        <p className="mt-2 max-w-md text-sm text-gray-400">
          Ningún Pokémon coincide con la combinación de filtros seleccionada.
          Prueba ajustando los criterios.
        </p>
      </div>
    );
  }

  return (
    <>
      <div
        className=" w-full
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

    gap-6 "
      >
        {showFilterSkeleton &&
          Array.from({ length: FILTER_SKELETON_COUNT }).map((_, index) => (
            <div
              key={`filter-skeleton-${index}`}
              className="overflow-hidden rounded-xl border border-white/10 bg-[#171717]"
            >
              <div className="aspect-2/3 animate-pulse bg-linear-to-br from-white/10 via-white/5 to-white/10" />
              <div className="space-y-3 p-4">
                <div className="h-4 w-3/4 rounded-full bg-white/10 animate-pulse" />
                <div className="h-3 w-1/2 rounded-full bg-white/10 animate-pulse" />
                <div className="flex gap-2">
                  <div className="h-6 w-14 rounded-full bg-white/10 animate-pulse" />
                  <div className="h-6 w-10 rounded-full bg-white/10 animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        {displayedPokemons.map((pokemon) => {
          return (
            <ObserverCart key={pokemon.id}>
              <Link href={`/pokemons/${pokemon.name}`} className={`  
            `}>
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
      {hasMore && (
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
          <span className="absolute bottom-6 text-sm text-gray-300">
            Cargar más
          </span>
        </div>
      )}
    </>
  );
}

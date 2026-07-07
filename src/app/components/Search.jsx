"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { POKEMON_SUGGESTIONS } from "@/utils/pokemonNames";

export default function Search({
  small = false,
  placeholder = "ej. Pikachu o 25",
}) {
  const inputRef = useRef();
  const router = useRouter();
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  function handleInputChange(e) {
    const query = e.target.value.toLowerCase();
    if (query) {
      // Convertimos espacios a guiones para buscar en la base de la PokeAPI
      const queryFormatted = query.replaceAll(" ", "-");
      const filtered = POKEMON_SUGGESTIONS.filter((pokemon) =>
        pokemon.toLowerCase().includes(queryFormatted)
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }

  function handleSuggestionClick(pokemon) {
    if (inputRef.current) {
      // Al hacer click, mostramos con espacios en vez de guiones
      inputRef.current.value = pokemon.replaceAll("-", " ");
    }
    setShowSuggestions(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const value = inputRef.current?.value?.trim();
    if (!value) return;
    const valueParsed = value.replaceAll(" ", "-");
    router.push(`/pokemons/${valueParsed}`);
  }
  
  return (
    <form
      onSubmit={handleSubmit}
      className={`relative w-full `}
    >
      <div className="flex w-full items-stretch overflow-hidden rounded-full border border-white/15 bg-[linear-gradient(90deg,rgba(255,255,255,0.08),rgba(255,255,255,0.05),rgba(255,255,255,0.08))] shadow-[0_10px_30px_rgba(0,0,0,0.24)] backdrop-blur-md">
        <input
          ref={inputRef}
          type="text"
          autoComplete="off"
          onChange={handleInputChange}
          onFocus={handleInputChange}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder={placeholder}
          className={`min-w-0 flex-1 bg-transparent text-sm font-semibold text-white outline-none placeholder:text-stone-400 ${
            small ? "px-3 py-2.5 sm:px-4 sm:py-3" : "px-4 py-3 sm:px-5 sm:py-3.5"
          }`}
        />

        <button
          type="submit"
          aria-label="Buscar Pokémon"
          className={`group inline-flex items-center justify-center border-l border-white/10 bg-[linear-gradient(180deg,rgba(120,43,220,0.95),rgba(75,24,150,0.95))] text-white transition-all hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-orange-400/40 ${
            small ? "min-w-14 px-3 sm:min-w-16 sm:px-4" : "min-w-15 px-4 sm:min-w-19 sm:px-5"
          }`}
        >
          <Image
            src="/icons/search.svg"
            alt=""
            width={small ? 20 : 24}
            height={small ? 20 : 24}
            className={`drop-shadow-[0_0_10px_rgba(255,255,255,0.25)] transition-transform group-hover:scale-105 ${
              small ? "h-4 w-4 sm:h-5 sm:w-5" : "h-5 w-5 sm:h-6 sm:w-6"
            }`}
          />
        </button>
      </div>

      {showSuggestions && filteredSuggestions.length > 0 && (
        <ul className="moves-scroll absolute left-0 right-0 top-[calc(100%+0.75rem)] z-80 max-h-56 overflow-y-auto rounded-2xl border border-white/15 bg-[#1a1a1a]/20 p-2 shadow-2xl backdrop-blur-sm">
          {filteredSuggestions.map((pokemon) => (
            <li
              key={pokemon}
              onClick={() => handleSuggestionClick(pokemon)}
              className="cursor-pointer rounded-xl px-4 py-2.5 text-sm font-semibold text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            >
              {pokemon.replaceAll("-", " ")}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}

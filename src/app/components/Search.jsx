"use client";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import {  POKEMON_SUGGESTIONS } from "@/utils/pokemonNames";

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
    const value = inputRef.current.value;
    const valueParsed = value.replaceAll(" ", "-");
    router.push(`/pokemons/${valueParsed}`);
  }
  
  return (
    <form onSubmit={handleSubmit} className={`relative z-[100] ${small ? "" : ""}`}>
      <div
        className="
            w-full 
            border-1 border-white/60
            flex
            rounded-full
            overflow-hidden
            bg-gray-800
            shadow-lg
          "
      >
        <input
          ref={inputRef}
          type="text"
          autoComplete="off"
          onChange={handleInputChange}
          onFocus={handleInputChange}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder={placeholder}
          className="
              bg-white/40
              py-2 px-3
              text-black
              text-sm
              font-bold
              w-full
              outline-none
            "
        />

        <button
          type="submit"
          className="
              bg-[rgba(127,5,220,0.2)]
              border-r-2 border-y-2 border-[rgba(127,5,220,0.7)]
              rounded-r-3xl
              hover:bg-[rgba(127,5,220,0.7)]
              transition
              px-6
              font-black
              tracking-wide
              text-white
            "
        >
          <img
            src="/icons/search.svg"
            alt="icon search"
            className="w-8 md:w-12 drop-shadow-[0_0_10px_rgba(0,255,255,0.35)]"
          />
        </button>
      </div>

      {showSuggestions && filteredSuggestions.length > 0 && (
        <ul className="absolute top-[calc(100%+8px)] left-0 right-0 z-999 max-h-48 w-66 overflow-y-auto bg-gray-200/20 backdrop-blur-xs border border-white/20 rounded-xl shadow-2xl custom-scrollbar moves-scroll">
          {filteredSuggestions.map((pokemon) => (
            <li
              key={pokemon}
              onClick={() => handleSuggestionClick(pokemon)}
              className="px-4 py-2 text-white/80 hover:bg-white/20 hover:text-white cursor-pointer text-sm font-semibold transition-colors  "
            >
              {pokemon.replaceAll("-", " ")}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}

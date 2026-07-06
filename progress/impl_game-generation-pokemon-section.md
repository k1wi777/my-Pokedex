# Implementación — game-generation-pokemon-section

## Resumen

Se añadió la sección "Pokémon de esta Generación" en la pantalla de detalle de juego, debajo de colección y relaciones.

## Archivos creados

| Archivo | Propósito |
|---------|-----------|
| `src/types/pokeapi-generation.ts` | Tipos PokeAPI y view model de tarjeta |
| `src/services/pokeapi.ts` | Fetch de generación y Pokémon con caché 7 días |
| `src/lib/pokemon-games/generation-pokemon.ts` | Normalización, fetch paralelo y ordenación por id |
| `src/app/games/components/detail/GenerationPokemonCard.tsx` | Tarjeta con gradiente por tipo y link a ficha |
| `src/app/games/components/detail/GenerationPokemonSection.tsx` | Sección client con búsqueda y scroll horizontal |

## Archivos modificados

| Archivo | Cambio |
|---------|--------|
| `src/lib/pokemon-games/constants.ts` | `POKEAPI_CACHE_REVALIDATE` |
| `src/app/games/[id]/page.tsx` | Fetch en servidor en paralelo con RAWG |
| `src/app/games/components/detail/GameDetailView.tsx` | Render de nueva sección |
| `src/app/games/[id]/loading.tsx` | Skeleton de la sección Pokémon |

## Verificación

- `pnpm exec tsc --noEmit` — OK
- ESLint en archivos tocados — OK
- `./init.sh` — falla por 11 errores de lint preexistentes (no introducidos por este trabajo)

## Notas

- El fetch de ~100 Pokémon por generación ocurre en servidor; `loading.tsx` cubre el tiempo de carga.
- Fallos de PokeAPI devuelven array vacío y mensaje discreto en UI.

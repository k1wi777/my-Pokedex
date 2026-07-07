# Implementación — pokedex-filters

## Resumen

Se implementó el sistema de filtros de categoría (Tipo, Generación, Juego) en `/pokemons` con pills colapsables, resolución async de conjuntos vía PokeAPI, combinación por intersección entre categorías y paginación client-side del grid filtrado.

## Archivos creados

| Archivo | Propósito |
|---------|-----------|
| `src/types/pokeapi.ts` | Tipos para endpoints type, version, version-group y pokedex |
| `src/lib/pokedex/filter-state.ts` | Estado de filtros, detección activa y limpieza |
| `src/lib/pokedex/game-pokedex.ts` | Resolución versión → Pokédex → especies |
| `src/lib/pokedex/resolve-filtered-pokemon.ts` | Intersección/unión de conjuntos y caché en memoria |
| `src/app/pokemons/components/FilterPill.tsx` | Pill colapsable reutilizable con indicador |
| `src/app/pokemons/components/TypeFilterPanel.tsx` | Grid 18 tipos, máx. 2 selecciones |
| `src/app/pokemons/components/GenerationFilterPanel.tsx` | Selector múltiple Gen I–IX |
| `src/app/pokemons/components/GameFilterPanel.tsx` | Grid glassmorphism de carátulas |
| `src/app/pokemons/components/PokedexFiltersBar.tsx` | Orquestación de filtros, resolución y grid |

## Archivos modificados

| Archivo | Cambio |
|---------|--------|
| `src/services/pokeapi.ts` | `fetchTypePokemon`, `fetchVersion`, `fetchVersionGroup`, `fetchPokedex` |
| `src/app/pokemons/page.tsx` | Integración de `PokedexFiltersBar` (sin tocar `Search.jsx`) |
| `src/app/components/PokemonGrid.jsx` | Modo filtrado, paginación client-side, estado vacío |
| `specs/pokedex-filters/tasks.md` | Tareas T1–T13 marcadas completadas |
| `specs/pokedex-filters/meta.json` | `status` → `review` |

## Cambios realizados

- **T1–T4:** Capa de datos PokeAPI extendida y lógica de dominio en `src/lib/pokedex/`.
- **T5–T9:** UI de filtros con pills, paneles desplegables y resolución async con indicador de carga.
- **T10–T12:** Integración en página, adaptación del grid y mensaje de estado vacío.
- **Reglas de filtrado:** tipos (intersección 1–2), generaciones (unión), juegos (intersección), categorías (intersección).
- **Sin filtros activos:** comportamiento original del grid con carga incremental vía offset PokeAPI.

## Verificación

| ID | Comando | Resultado | Observaciones |
|----|---------|-----------|---------------|
| V1 | `pnpm lint` | Falla (global) | 14 errores preexistentes en otros archivos; **0 errores** en archivos de este Work Item |
| V1 | `pnpm exec eslint src/app/pokemons/components src/lib/pokedex …` | Pasa | Solo warnings preexistentes en `page.tsx` (`count`, `previous` sin usar) |
| V2 | `pnpm exec tsc --noEmit` | Pasa | Sin errores de tipado |
| init.sh | `./init.sh` | Falla en lint | Typecheck OK; lint global falla por errores preexistentes ajenos a este WI |

## Observaciones

- La resolución de filtros usa caché en memoria (`Map`) por clave de combinación de filtros.
- Al seleccionar un tercer tipo, se sustituye el primero (según `design.md`).
- `PokemonGrid` recibe `key` basado en filtros activos para resetear paginación al cambiar criterios.
- `Search.jsx` no fue modificado (R2).

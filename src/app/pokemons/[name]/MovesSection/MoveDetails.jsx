"use client";

import { useEffect, useState } from "react";

export default function MoveDetails({ move }) {
  const [data, setData] = useState(null);
  const [typeData, setTypeData] = useState(null);

  useEffect(() => {
    if (!move) return;

    async function fetchMove() {
      const res = await fetch(`https://pokeapi.co/api/v2/move/${move}`);
      const json = await res.json();

      setData(json);
    }

    fetchMove();
  }, [move]);

  useEffect(() => {
    if (!data) return;

    async function fetchType() {
      const res = await fetch(data.type.url);
      const json = await res.json();
      setTypeData(json);
    }

    fetchType();
  }, [data]);

  if (!move)
    return (
      <div className="flex-1 flex items-center justify-center opacity-50">
        Selecciona un movimiento
      </div>
    );

  if (!data)
    return (
      <div className="flex-1 flex items-center justify-center">Loading...</div>
    );

  const type = data.type.name;

  const description =
    data.effect_entries.find((e) => e.language.name === "en")?.effect ??
    "No description";

  const effectChance = data.effect_chance ?? null;

  const ailment = data.meta?.ailment?.name ?? "none";

  const ailmentChance = data.meta?.ailment_chance ?? null;

  const critRate = data.meta?.crit_rate ?? 0;
  const typeSprite = typeData
    ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-vii/lets-go-pikachu-lets-go-eevee/${typeData.id}.png`
    : null;
  const ailmentBadge =
    ailment !== "none"
      ? `${ailment}${ailmentChance ? ` ${ailmentChance}%` : ""}`
      : null;

  return (
    <div
      className={`
      flex
      flex-1
      rounded-xl
      overflow-hidden
      border border-white/20
      type-${type} color-white
    `}
      style={{
        background:
          "linear-gradient(135deg, rgb(var(--type-color) / 0.45), rgb(var(--type-color-2) / 0.15))",
        boxShadow: "0 0 16px rgb(var(--type-color) / 0.35)",
      }}
    >
      <div className="flex-1 flex flex-col  gap-4">
        {/* HEADER */}

        <div
          className="flex items-center gap-3 px-3 py-2"
          style={{ background: "rgb(var(--type-color))" }}
        >
          {typeSprite && (
            <img src={typeSprite} className="h-7 object-contain" />
          )}

          <h3 className="capitalize text-xl font-semibold">
            {data.name.replace("-", " ")}
          </h3>

          <div className="ml-auto flex items-center gap-2 px-2 py-1 bg-[#363636] border border-white/20 rounded">
            <img
              src={`/categories/${data.damage_class.name}.svg`}
              className="h-4"
            />

            <span className="text-[0.75em] capitalize">
              {data.damage_class.name}
            </span>
          </div>
        </div>

        {/* GRID PRINCIPAL */}

        <div className="grid grid-cols-2 gap-4 p-4">
          {/* STATS */}

          <div className="flex flex-col gap-2">
            {/* POWER */}

            <div className="flex items-center justify-between bg-black/25 border border-white/20 rounded px-3 py-1 text-[0.8em]">
              <div className="flex items-center gap-2">
                {/* icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-red-400"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
                </svg>

                <span className="opacity-80">Power</span>
              </div>

              <span className="font-semibold">{data.power ?? "-"}</span>
            </div>

            {/* ACCURACY */}

            <div className="flex items-center justify-between bg-black/25 border border-white/20 rounded px-3 py-1 text-[0.8em]">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-blue-400"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 3a7 7 0 110 14 7 7 0 010-14zm0 3a4 4 0 100 8 4 4 0 000-8z" />
                </svg>

                <span className="opacity-80">Accuracy</span>
              </div>

              <span className="font-semibold">{data.accuracy ?? "-"}</span>
            </div>

            {/* PP */}

            <div className="flex items-center justify-between bg-black/25 border border-white/20 rounded px-3 py-1 text-[0.8em]">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-purple-400"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2l3 7h7l-5.5 4.5L18 22l-6-4-6 4 1.5-8.5L2 9h7z" />
                </svg>

                <span className="opacity-80">PP</span>
              </div>

              <span className="font-semibold">{data.pp}</span>
            </div>

            {/* PRIORITY */}

            <div className="flex items-center justify-between bg-black/25 border border-white/20 rounded px-3 py-1 text-[0.8em]">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-yellow-400"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 4l8 8-8 8-2-2 4.5-4.5H4v-3h10.5L10 6l2-2z" />
                </svg>

                <span className="opacity-80">Priority</span>
              </div>

              <span className="font-semibold">{data.priority}</span>
            </div>

            {/* CRIT RATE */}

            <div className="flex items-center justify-between bg-black/25 border border-white/20 rounded px-3 py-1 text-[0.8em]">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-green-400"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2l2.9 6.1L22 9l-5 4.9L18.2 22 12 18.6 5.8 22 7 13.9 2 9l7.1-.9z" />
                </svg>

                <span className="opacity-80">Crit Rate</span>
              </div>

              <span className="font-semibold">{critRate}</span>
            </div>
          </div>
          {/* DESCRIPCIÓN */}

          <div className="flex flex-col gap-3">
            <div
              className="
            text-[0.8em] md:text-[0.95em]
            font-semibold
            leading-relaxed
            bg-black/35
            border border-white/20
            rounded
            p-3
            
  max-h-[85%]
  overflow-y-auto

  scrollbar-thin
  scrollbar-thumb-white/20
  scrollbar-track-transparent
          "
            >
              {description.replace("$effect_chance", effectChance ?? "")}
            </div>

            {(ailmentBadge || effectChance) && (
              <div className="flex flex-wrap gap-2">
                {ailmentBadge && (
                  <span
                    className="
                  px-3
                  py-1
                  rounded-md
                  bg-red-500/20
                  border
                  border-red-400/40
                  text-[0.75em]
                  capitalize
                "
                  >
                    {ailmentBadge}
                  </span>
                )}

                {effectChance && (
                  <span
                    className="
                  px-3
                  py-1
                  rounded-md
                  bg-yellow-500/20
                  border
                  border-yellow-400/40
                  text-[0.75em]
                "
                  >
                    Effect {effectChance}%
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

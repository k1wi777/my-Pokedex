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
      type-${type}
    `}
    style={{
      background:
        "linear-gradient(135deg, rgb(var(--type-color) / 0.35), rgb(var(--type-color-2) / 0.15))",
      color: "rgb(var(--type-text))",
      boxShadow: "0 0 16px rgb(var(--type-color) / 0.35)",
    }}
  >

    {/* barra lateral */}

    <div
      className="w-2"
      style={{ background: "rgb(var(--type-color))" }}
    />

    <div className="flex-1 flex flex-col p-4 gap-4">

      {/* HEADER */}

      <div className="flex items-center gap-3">

        {typeSprite && (
          <img
            src={typeSprite}
            className="h-7 object-contain"
          />
        )}

        <h3 className="capitalize text-xl font-semibold">
          {data.name.replace("-", " ")}
        </h3>

        <div className="ml-auto flex items-center gap-2 px-2 py-1 bg-black/30 border border-white/20 rounded">

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

      <div className="grid grid-cols-2 gap-4">

        {/* STATS */}

        <div className="flex flex-col gap-2">

          {/* POWER */}

          <div className="flex items-center justify-between bg-black/25 border border-white/20 rounded px-3 py-2 text-[0.8em]">

            <div className="flex items-center gap-2">

              <span className="w-2 h-2 rounded-full bg-red-400"></span>

              <span className="opacity-80">Power</span>

            </div>

            <span className="font-semibold">
              {data.power ?? "-"}
            </span>

          </div>

          {/* ACCURACY */}

          <div className="flex items-center justify-between bg-black/25 border border-white/20 rounded px-3 py-2 text-[0.8em]">

            <div className="flex items-center gap-2">

              <span className="w-2 h-2 rounded-full bg-blue-400"></span>

              <span className="opacity-80">Accuracy</span>

            </div>

            <span className="font-semibold">
              {data.accuracy ?? "-"}
            </span>

          </div>

          {/* PP */}

          <div className="flex items-center justify-between bg-black/25 border border-white/20 rounded px-3 py-2 text-[0.8em]">

            <div className="flex items-center gap-2">

              <span className="w-2 h-2 rounded-full bg-purple-400"></span>

              <span className="opacity-80">PP</span>

            </div>

            <span className="font-semibold">
              {data.pp}
            </span>

          </div>

          {/* PRIORITY */}

          <div className="flex items-center justify-between bg-black/25 border border-white/20 rounded px-3 py-2 text-[0.8em]">

            <div className="flex items-center gap-2">

              <span className="w-2 h-2 rounded-full bg-yellow-400"></span>

              <span className="opacity-80">Priority</span>

            </div>

            <span className="font-semibold">
              {data.priority}
            </span>

          </div>

          {/* CRIT RATE */}

          <div className="flex items-center justify-between bg-black/25 border border-white/20 rounded px-3 py-2 text-[0.8em]">

            <div className="flex items-center gap-2">

              <span className="w-2 h-2 rounded-full bg-green-400"></span>

              <span className="opacity-80">Crit Rate</span>

            </div>

            <span className="font-semibold">
              {critRate}
            </span>

          </div>

        </div>

        {/* DESCRIPCIÓN */}

        <div className="flex flex-col gap-3">

          <div
            className="
            text-[0.8em]
            leading-relaxed
            bg-black/35
            border border-white/20
            rounded
            p-3
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

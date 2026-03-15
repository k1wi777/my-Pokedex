"use client";

import { useEffect, useState } from "react";

export default function MoveDetails({ move }) {

  const [data, setData] = useState(null);

  useEffect(() => {
    if (!move) return;

    async function fetchMove() {

      const res = await fetch(`https://pokeapi.co/api/v2/move/${move}`);
      const json = await res.json();

      setData(json);
    }

    fetchMove();

  }, [move]);

  if (!move)
    return (
      <div className="flex-1 flex items-center justify-center opacity-50">
        Selecciona un movimiento
      </div>
    );

  if (!data)
    return (
      <div className="flex-1 flex items-center justify-center">
        Loading...
      </div>
    );

  const type = data.type.name;

  const description =
    data.effect_entries.find(e => e.language.name === "en")?.effect ??
    "No description";

  const effectChance = data.effect_chance ?? null;

  const ailment = data.meta?.ailment?.name ?? "none";

  const ailmentChance = data.meta?.ailment_chance ?? null;

  const critRate = data.meta?.crit_rate ?? 0;

  return (
  <div
    className={`
      flex-1
      flex
      rounded-xl
      overflow-hidden
      border border-white/20
      type-${type}
    `}
    style={{
      background:
        "linear-gradient(135deg, rgb(var(--type-color) / 0.35), rgb(var(--type-color-2) / 0.15))",
      color: "rgb(var(--type-text))",
      boxShadow: "0 0 15px rgb(var(--type-color) / 0.35)",
    }}
  >

    {/* barra lateral del tipo */}

    <div
      className="w-2"
      style={{ background: "rgb(var(--type-color))" }}
    />

    <div className="flex-1 p-4 flex flex-col gap-3">

      {/* HEADER */}

      <div className="flex items-center gap-2">

        {/* sprite tipo */}

        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/legends-arceus/${type}.png`}
          className="h-6 object-contain"
        />

        {/* nombre movimiento */}

        <h3 className="capitalize text-lg font-semibold">
          {data.name.replace("-", " ")}
        </h3>

        {/* icono categoría */}

        <img
          src={`/categories/${data.damage_class.name}.svg`}
          className="h-5 ml-auto opacity-90"
        />

      </div>

      {/* STATS */}

      <div className="grid grid-cols-2 gap-y-2 text-[0.8em]">

        <div className="flex items-center gap-1 opacity-80">
          ⚡ Power
        </div>
        <div>{data.power ?? "-"}</div>

        <div className="flex items-center gap-1 opacity-80">
          🎯 Accuracy
        </div>
        <div>{data.accuracy ?? "-"}</div>

        <div className="flex items-center gap-1 opacity-80">
          📦 PP
        </div>
        <div>{data.pp}</div>

        <div className="flex items-center gap-1 opacity-80">
          ⚡ Priority
        </div>
        <div>{data.priority}</div>

        <div className="flex items-center gap-1 opacity-80">
          💥 Crit Rate
        </div>
        <div>{critRate}</div>

        {/* ailment */}

        <div className="flex items-center gap-1 opacity-80">
          🧪 Status
        </div>

        <div className="capitalize">
          {ailment !== "none"
            ? `${ailment} ${ailmentChance ? `(${ailmentChance}%)` : ""}`
            : "None"}
        </div>

        {/* effect chance */}

        {effectChance && (
          <>
            <div className="flex items-center gap-1 opacity-80">
              ✨ Effect
            </div>
            <div>{effectChance}%</div>
          </>
        )}

      </div>

      {/* DESCRIPCIÓN */}

      <div
        className="
        mt-1
        text-[0.75em]
        leading-relaxed
        bg-black/25
        border border-white/20
        rounded
        p-2
      "
      >
        {description.replace("$effect_chance", effectChance ?? "")}
      </div>

    </div>
  </div>
);
}
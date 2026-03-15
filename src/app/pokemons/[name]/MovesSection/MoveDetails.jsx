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
    data.effect_entries.find((e) => e.language.name === "en")?.effect ??
    "No description";

  const effectChance = data.effect_chance ?? null;

  const critRate = data.meta?.crit_rate ?? 0;

  return (
    <div
      className={`flex-1 rounded-xl p-4 border border-white/20 type-${type}`}
      style={{
        background:
          "linear-gradient(135deg, rgb(var(--type-color) / 0.35), rgb(var(--type-color-2) / 0.15))",
        color: "rgb(var(--type-text))",
        boxShadow: "0 0 15px rgb(var(--type-color) / 0.35)",
      }}
    >
      {/* header */}

      <div className="flex items-center justify-between mb-3">

        <h3 className="capitalize text-xl font-semibold">
          {data.name.replace("-", " ")}
        </h3>

        <div
          className={`
          px-2 py-[2px]
          text-[0.7em]
          rounded
          border border-white/30
          capitalize
        `}
        >
          {type}
        </div>

      </div>

      {/* stats */}

      <div className="grid grid-cols-2 gap-y-1 gap-x-4 text-[0.8em] mb-3">

        <div className="opacity-70">Power</div>
        <div>{data.power ?? "-"}</div>

        <div className="opacity-70">Accuracy</div>
        <div>{data.accuracy ?? "-"}</div>

        <div className="opacity-70">PP</div>
        <div>{data.pp}</div>

        <div className="opacity-70">Priority</div>
        <div>{data.priority}</div>

        <div className="opacity-70">Category</div>
        <div className="capitalize">{data.damage_class.name}</div>

        <div className="opacity-70">Crit Rate</div>
        <div>{critRate}</div>

        {effectChance && (
          <>
            <div className="opacity-70">Effect Chance</div>
            <div>{effectChance}%</div>
          </>
        )}

      </div>

      {/* description */}

      <div
        className="
        text-[0.75em]
        leading-relaxed
        bg-black/20
        border border-white/20
        rounded
        p-2
      "
      >
        {description.replace(
          "$effect_chance",
          effectChance ?? ""
        )}
      </div>
    </div>
  );
}
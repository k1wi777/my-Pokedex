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
    ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/brilliant-diamond-and-shining-pearl/${typeData.id}.png`
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
        boxShadow: "0 0 14px rgb(var(--type-color) / 0.35)",
      }}
    >
      {/* barra lateral */}

      <div className="w-2" style={{ background: "rgb(var(--type-color))" }} />

      <div className="flex-1 flex flex-col p-4 gap-3">
        {/* HEADER */}

        <div className="flex items-center gap-3">
          {typeSprite && (
            <img src={typeSprite} className="h-7 object-contain" />
          )}

          <h3 className="capitalize text-lg font-semibold">
            {data.name.replace("-", " ")}
          </h3>

          <div className="ml-auto flex items-center gap-1 opacity-90">
            <img
              src={`/categories/${data.damage_class.name}.svg`}
              className="h-5"
            />

            <span className="text-[0.75em] capitalize">
              {data.damage_class.name}
            </span>
          </div>
        </div>

        {/* STATS PANEL */}

        <div
          className="
        grid
        grid-cols-2
        gap-y-2
        gap-x-6
        text-[0.8em]
        bg-black/20
        border border-white/20
        rounded
        p-3
      "
        >
          <div className="opacity-70">Power</div>
          <div>{data.power ?? "-"}</div>

          <div className="opacity-70">Accuracy</div>
          <div>{data.accuracy ?? "-"}</div>

          <div className="opacity-70">PP</div>
          <div>{data.pp}</div>

          <div className="opacity-70">Priority</div>
          <div>{data.priority}</div>

          <div className="opacity-70">Crit Rate</div>
          <div>{critRate}</div>
        </div>

        {/* EFFECTS */}

        {(ailmentBadge || effectChance) && (
          <div
            className="
          flex
          flex-wrap
          gap-2
          text-[0.75em]
        "
          >
            {ailmentBadge && (
              <span
                className="
                px-2
                py-[2px]
                rounded
                border border-white/20
                bg-black/30
                capitalize
              "
              >
                {ailmentBadge}
              </span>
            )}

            {effectChance && (
              <span
                className="
                px-2
                py-[2px]
                rounded
                border border-white/20
                bg-black/30
              "
              >
                effect {effectChance}%
              </span>
            )}
          </div>
        )}

        {/* DESCRIPTION */}

        <div
          className="
          text-[0.75em]
          leading-relaxed
          bg-black/30
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

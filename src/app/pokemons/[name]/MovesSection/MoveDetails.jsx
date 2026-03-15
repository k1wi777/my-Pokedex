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
      <div className="flex-1 flex items-center justify-center">Loading...</div>
    );

  const type = data.type.name;

  return (
    <div
      className={`flex-1 rounded p-3 border border-white/20 type-${type}`}
      style={{
        background:
          "linear-gradient(135deg, rgba(var(--type-color),0.35), rgba(var(--type-color-2),0.15))",
        color: "rgb(var(--type-text))",
        boxShadow: "0 0 12px rgba(var(--type-color),0.35)",
      }}
    >
      <h3 className="capitalize text-lg mb-2">{data.name.replace("-", " ")}</h3>

      <div className="grid grid-cols-2 gap-1 text-[0.8em]">
        <div>Power</div>
        <div>{data.power ?? "-"}</div>

        <div>Accuracy</div>
        <div>{data.accuracy ?? "-"}</div>

        <div>PP</div>
        <div>{data.pp}</div>

        <div>Priority</div>
        <div>{data.priority}</div>

        <div>Category</div>
        <div>{data.damage_class.name}</div>
      </div>
    </div>
  );
}

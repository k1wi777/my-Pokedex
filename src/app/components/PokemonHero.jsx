"use client";

import { useEffect, useState } from "react";
import ColorThief from "colorthief";

export default function PokemonHero({ image, children }) {
  const [bgColor, setBgColor] = useState("rgb(200,200,200)");
  const [textColor, setTextColor] = useState("white");

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = image;

    img.onload = () => {
      const colorThief = new ColorThief();
      const [r, g, b] = colorThief.getColor(img);

      //  Oscurecemos ligeramente el color
      const deepen = [
        Math.floor(r * 0.9),
        Math.floor(g * 0.9),
        Math.floor(b * 0.9),
      ];

      //  Calcular luminancia
      const luminance =
        0.299 * deepen[0] + 0.587 * deepen[1] + 0.114 * deepen[2];

      //  Decidir color del texto

      const dynamicTextColor = luminance < 128 ? "#ffffff" : "#1a1a1a";

      setBgColor(`rgb(${deepen[0]}, ${deepen[1]}, ${deepen[2]})`);
      setTextColor(dynamicTextColor);
    };
  }, [image]);
  const color = textColor=== '#ffffff'?'text-[#ffffff]': 'text-[#1a1a1a]';

  
  return (
    <div
      className="relative rounded-2xl   shadow-[0_25px_60px_rgba(0,0,0,0.35)]"
      style={{ backgroundColor: bgColor }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.08),transparent_70%)]" />
      {/*  Luz radial tipo estudio (MUY sutil) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(
              circle at 65% 35%,
              rgba(255,255,255,0.12),
              transparent 50%
            )
          `,
        }}
      />

      {/*  Oscurecimiento inferior suave */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(
              to bottom,
              transparent 60%,
              rgba(0,0,0,0.15)
            )
          `,
        }}
      />

      {/*  Contenido */}
      <div className={color}>
        {/* <div className={`w-41 h-20 border-2 bg-[#1a1a1a]`}>{color}</div> */}
        {children}</div>
    </div>
  );
}

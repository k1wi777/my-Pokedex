"use client";
import Image from "next/image";
import { useState } from "react";

export default function CartPokemon({
  containerClass = "",
  bottomClass = "",
  circleClass = "",
  pkmn,
}) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const mainType = pkmn.types[0].type.name;
  return (
    <div
      className={`w-full h-full  rounded-xl  shadow-lg flex flex-col overflow-visible   type-${mainType} ${containerClass ? containerClass : "bg-zinc-800 text-white"}`}
    >
      {/* Zona superior (imagen + esfera) */}
      <div
        className={`relative flex-1 flex flex-col items-center  pb-1 justify-center   bg-[linear-gradient(to_bottom,rgb(var(--type-color)/0.08),rgb(var(--type-color-2)/0.08))] rounded-t-xl w-full`}
      >
        <div
          className={
            circleClass
              ? ""
              : ` circle-background absolute w-[70%]
    aspect-square rounded-full
    bg-[linear-gradient(to_bottom,rgb(var(--type-color)/1)_50%,rgb(var(--type-color-2)/1)_50%)]
    shadow-[inset_0_-20px_35px_rgba(0,0,0,0.25),inset_0_15px_25px_rgba(255,255,255,0.25)]`
          }
        ></div>

        {/* 🔥 Skeleton mientras carga imagen */}
        {!imgLoaded && (
          <>
            <div className="w-full"></div>
            <Image
              src={"/pokeball.svg"}
              width={20}
              height={30}
              alt="pokeball de carga"
              className="absolute w-[70%] transition-all duration-200 ease-in animate-spin opacity-45 "
            />
          </>
        )}

        <Image
          src={pkmn.sprites.other["official-artwork"].front_default}
          alt={"pokemon " + pkmn.name}
          width={400}
          height={400}
          quality={75}
          unoptimized
          onLoad={() => setImgLoaded(true)}
          className={`pokemon-image w-[70%] transition-all duration-500 -translate-y-1 ${
            imgLoaded ? "opacity-100 scale-100" : "opacity-0 "
          }`}
        />
      </div>

      {/* Info inferior */}
      <section
        className={`${bottomClass ? bottomClass : "w-full bg-zinc-900 p-2 sm:p-3 rounded-b-lg justify-between"} `}
      >
        {/* seccion de nombre y id */}
        <div className="flex justify-around items-center  px-2 w-full">
          <h2 className="capitalize font-black ">{pkmn.name}</h2>
          <span
            className={`
            text-[0.5em]
            font-bold
            tracking-wider
             sm:px-4 py-1
            rounded-full
            bg-gradient-to-r
            from-zinc-800
            to-zinc-600
            text-zinc-200
            shadow-inner
           ${bottomClass?'px-4':'px-1'}` }
          >
            #{String(pkmn.id).padStart(3, "0")}
          </span>
        </div>

        {/* seccion de tipos */}
        <div
          className="mt-3 flex justify-center 
        text-[0.5em] flex-col "
        >
          <div className=" flex  items-center gap-3  mx-auto ">
            {pkmn.types.map((t) => (
              <p
                key={t.type.name}
                className={`type-${t.type.name}
                 text-center px-2 sm:px-4 py-[0.2em] rounded-xl  font-black  inline-block  text-[rgb(var(--type-text))]
                bg-[linear-gradient(to_bottom,rgb(var(--type-color)/1)_50%,rgb(var(--type-color-2)/1)_50%)]
              `}
              >
                {t.type.name}
              </p>
            ))}
          </div>

          {/* seccion de otros datos como altura y peso */}
          <div className={`flex  justify-center mt-2 sm:mt-3
 sm:gap-2 text-[0.8em] ${bottomClass? 'gap-3': 'gap-1'}`}>
            <div
              className="
              flex  items-center
               gap-1
              
            "
            >
              <span className="text-[0.8em] font-bold tracking-widest opacity-70">
                WEIGHT:
              </span>
              <span
                className="font-black text-[0.9em] rounded-xl py-1 px-1 sm:px-2
                 bg-gradient-to-br
                 from-zinc-200
                 to-zinc-500
                 text-zinc-800
                 shadow-lg"
              >
                {pkmn.weight / 10} kg
              </span>
            </div>

            <div
              className="
    flex items-center
    
    gap-1 
  "
            >
              <span className="text-[0.8em] font-bold tracking-widest opacity-70">
                HEIGHT
              </span>
              <span
                className="font-black  text-[1em] rounded-xl py-1 px-1 sm:px-2
    bg-gradient-to-br
    from-zinc-200
    to-zinc-500
    text-zinc-800
    shadow-lg"
              >
                {pkmn.height / 10} m
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

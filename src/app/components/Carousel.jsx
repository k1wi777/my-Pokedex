"use client";

import Image from "next/image";
import useCarousel from "@/hooks/useCarousel";


export default function Carousel({ children }) {
  const numberList = children.length;
  const { prev, next, getItem, setPaused } = useCarousel(numberList, 2000);

  return (
    <section
      className="relative w-full  group mt-6  fade-in overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      
    >
      <div
        className="
  bg-white/10 
  w-full md:w-[30%] 
  text-lg sm:text-xl md:text-2xl 
  px-4 py-4 
  rounded-t-3xl 
  capitalize font-black 
  flex justify-between items-center
"
      >
        <h2>pokemons destacados</h2>
        <Image
          width={200}
          height={200}
          src="/pokeball-color.svg"
          alt="pokeball"
          className="w-8 mr-8"
        />
      </div>

      <div
        className="flex justify-center items-start
  bg-white/10
  h-[195px] sm:h-[230px] md:h-[260px] lg:h-[290px] 
  gap-2 md:gap-1
  mb-15 md:mb-40
  w-full
  relative "
      >
        {/* Flechas */}
        <button
          onClick={next}
          className="   absolute left-2 top-1/2 -translate-y-1/2 z-20
  bg-black/40 text-white
  p-3 sm:p-4
  rounded-full
  opacity-70 md:opacity-0
  md:group-hover:opacity-50
  hover:opacity-100
  transition"
        >
          <Image
            src="/arrow.png"
            alt=""
            width="24"
            height="24"
            className="rotate-180  invert w-15 "
          />
        </button>

        <button
          onClick={prev}
          className="   absolute right-2 top-1/2 -translate-y-1/2 z-20
  bg-black/40 text-white
  p-3 sm:p-4
  rounded-full
  opacity-70 md:opacity-0
  md:group-hover:opacity-50
  hover:opacity-100
  transition"
        >
          <Image
            src="/arrow.png"
            alt=""
            width="24"
            height="24"
            className=" invert w-15 "
          />
        </button>

        {/* organizacion de las carts */}
        {/* MOBILE VERSION */}
        <div className="flex md:hidden items-center justify-center gap-2 w-full">
          {/* izquierda pequeña */}
          <div className="w-[28%] opacity-60 text-xs">
            {children[getItem(1)]}
          </div>

          {/* centro */}
          <div className="w-[44%] z-10">
            <div
              className="
      w-full h-full flex justify-center
      [&_.pokemon-image]:scale-125
      transition-all duration-500 text-sm
    "
            >
              {children[getItem(0)]}
            </div>
          </div>

          {/* derecha pequeña */}
          <div className="w-[28%] opacity-60 text-xs">
            {children[getItem(-1)]}
          </div>
        </div>

        {/* DESKTOP VERSION */}
        <div className="hidden md:flex justify-center items-start gap-1 w-full">
          <div className="w-[260px] aspect-[5/6] opacity-60 text-lg">
            {children[getItem(2)]}
          </div>

          <div className="w-[260px] aspect-[5/6] opacity-60 text-lg">
            {children[getItem(1)]}
          </div>

          <div className="w-[380px] aspect-[5/6] z-10">
            <div
              className="
      w-full h-full flex justify-center
      [&_.pokemon-image]:scale-150
      [&_.pokemon-image]:-translate-y-9
      transition-all duration-500 text-2xl
    "
            >
              {children[getItem(0)]}
            </div>
          </div>

          <div className="w-[260px] aspect-[5/6] opacity-60 text-lg">
            {children[getItem(-1)]}
          </div>

          <div className="w-[260px] aspect-[5/6] opacity-60 text-lg">
            {children[getItem(-2)]}
          </div>
        </div>
      </div>
    </section>
  );
}

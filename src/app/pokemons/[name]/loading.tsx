export default function LoadingPokemonInfo() {
  return (
    <div className="mx-auto py-5 px-4 flex flex-col gap-5 w-full animate-pulse">

      {/* Search skeleton */}
      <div className="h-10 w-full  bg-white/10 rounded-xl" />

      <div className="flex flex-col-reverse lg:flex-row gap-5">

        {/* LEFT PANEL */}
        <section
          className="
          w-full lg:w-[38%]
  relative
  bg-gradient-to-br from-white/10 via-white/5 to-transparent
  backdrop-blur-xl
  border border-white/15
  rounded-3xl
  px-4 pt-6 pb-8
  shadow-[0_10px_40px_rgba(0,0,0,0.35)]
  flex flex-col gap-8
  text-xl  lg:text-2xl
  overflow-hidden
        "
        >
          {/* Fake type effect rows */}
          <div className="w-[30%] h-6 mx-auto mb-6 bg-white/10 rounded-lg" />

          <section className="flex flex-col md:flex-row gap-3 h-full">

          <div className="space-y-6 md:w-1/2">
            <div className="h-6 w-full bg-white/10 rounded-lg" />
            <div className="px-3 space-x-3 space-y-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-10 bg-white/10 rounded-xl"
                />
              ))}
            </div>
          </div>

          <div className="space-y-6 md:w-1/2">
            <div className="h-6 w-full bg-white/10 rounded-lg" />
            <div className="px-3 space-x-3 space-y-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-10 bg-white/10 rounded-xl"
                />
              ))}
            </div>
          </div>
          </section>
        </section>

        {/* RIGHT PANEL */}
        <section className=" w-full lg:w-[63%]
  flex flex-col
  gap-6 lg:gap-9
  text-2xl sm:text-3xl lg:text-4xl">

          <div
            className="
            relative
            bg-gradient-to-br from-white/10 via-white/5 to-transparent
            backdrop-blur-xl
            border border-white/15
            rounded-3xl
            p-8
            flex flex-col items-center gap-6
            "
          >

            {/* Name */}
            <div className="h-10 w-1/3 bg-white/10 rounded-lg" />

            {/* Circle image skeleton */}
            <div className="w-[42%] aspect-square rounded-full bg-white/10" />

            {/* Description */}
            <div className="w-2/3 h-16 bg-white/10 rounded-xl" />
          </div>

        </section>
      </div>

      {/* Evolution Section */}
      <div className="h-40 w-full bg-white/10 rounded-3xl" />

    </div>
  );
}
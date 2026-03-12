import { getDataPokeball } from "@/services/fetches";

function getCategoryStyle(name) {
  switch (name) {
    case "standard-balls":
      return "from-red-500/20 via-red-400/10 to-transparent border-red-400/30";
    case "special-balls":
      return "from-purple-500/20 via-purple-400/10 to-transparent border-purple-400/30";
    case "apricorn-balls":
      return "from-yellow-500/20 via-yellow-400/10 to-transparent border-yellow-400/30";
    default:
      return "from-cyan-500/20 via-cyan-400/10 to-transparent border-cyan-400/30";
  }
}

export default async function CartPokeball({ item, lang }) {
  const pokeball = await getDataPokeball(item.url, lang);

  return (
    <div
      className={`
                       relative
                       group
                       p-3 sm:p-4 md:p-5
                       rounded-2xl
                       bg-gradient-to-br ${getCategoryStyle(pokeball.category.name)}
                       backdrop-blur-xl
                       border
                       w-full
                       flex flex-col
                       items-center
                       justify-between
                       transition-all duration-400
                       md:hover:-translate-y-2

                       
                     `}
    >
      <h3
        className="
                           text-xs sm:text-sm md:text-base
  font-bold uppercase tracking-wider
  text-white/90 mt-3
                        "
      >
        {pokeball.name}
      </h3>
      <div className="relative flex items-center justify-center w-full mt-3 ">
        {/* sombra lateral izquierda */}
        <div
          className="
                              absolute
                              left-[30%]
                              bottom-[17%]
                              w-[25%]
                              h-[30%]
                              rotate-18
                              bg-gradient-to-r
                              from-black/30
                              to-transparent
                              blur-xs
                              rounded-full
                              z-0
                            "
        />
        {/* ESTRELLAS */}
        <div className="absolute top-[-4%] flex gap-1 pointer-events-none">
          <span className="star group-hover:animate-[star-1_3.5s_ease-out_2s_forwards]" />
          <span className="star group-hover:animate-[star-2_3.5s_ease-out_2s_forwards]" />
          <span className="star group-hover:animate-[star-3_3.5s_ease-out_2s_forwards]" />
        </div>

        <img
          src={pokeball.sprites.default}
          alt={pokeball.name}
          className="
                                w-[50%] sm:w-[45%] md:w-[38%]
  relative
  transition-transform
  capture-glow
  md:group-hover:animate-[capture-shake_2s_ease-in-out_forwards]
  z-10"
        />
      </div>
      <p
        className="
                          
  text-[10px] sm:text-xs md:text-sm
  text-white/60 text-center mt-2
  
  group-hover:scale-110
  transition-transform duration-200
                        "
      >
        <p className="flex group-hover:hidden transition-all duration-700 ">{pokeball.description}</p>
        <span className="text-[.7em] hidden group-hover:flex transition-all duration-700">
          {pokeball.effect}
        </span>
      </p>
    </div>
  );
}

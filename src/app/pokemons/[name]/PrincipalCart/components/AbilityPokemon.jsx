export default function AbilityPokemon({ ability }) {
    return <div
        key={ability.slot}
        className={`
          relative px-1 md:py-1 md:px-3  rounded-xl  font-semibold
          backdrop-blur-md
          transition-all duration-300
          ${ability.is_hidden
                ? "bg-purple-500/20 border border-purple-400/40 text-purple-200"
                : "bg-white/20 border border-white/30 "}
        `}
    >
        {ability.ability.name}

        {ability.is_hidden && (
            <span className="absolute -top-2 -right-2 text-[10px] p-1 md:px-2 py-[1px] rounded-full bg-purple-600  shadow hidden md:flex">
                hidden
            </span>
        )}
    </div>
}
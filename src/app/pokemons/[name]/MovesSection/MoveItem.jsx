export default function MoveItem({ data, onClick, selected }) {

  const detail = data.version_group_details[0]

  const level = detail.level_learned_at
  const method = detail.move_learn_method.name

  const moveName = data.move.name.replace("-", " ")

  return (

    <button
      onClick={onClick}
      className={`
      relative
      text-left
      px-3 py-2
      rounded-lg
      transition
      border
      border-white/10
      bg-black/20

      hover:bg-white/10
      hover:border-white/20

      ${selected
        ? "bg-white/15 border-white/30 shadow-[0_0_10px_rgba(255,255,255,0.1)]"
        : ""}
      `}
    >

      {/* barra izquierda estilo UI */}

      {selected && (
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-white/60 rounded-l-lg"/>
      )}

      <div className="capitalize text-[0.9em] font-medium">

        {moveName}

      </div>

      <div className="flex items-center gap-2 text-[0.7em] opacity-70 mt-1">

        <span className="px-1.5 py-[1px] rounded bg-white/10 capitalize">

          {method}

        </span>

        <span>

          lvl {level}

        </span>

      </div>

    </button>

  )

}
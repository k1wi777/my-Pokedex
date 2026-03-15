export default function MoveItem({ data, onClick, selected }) {

  const detail = data.version_group_details[0]

  const level = detail.level_learned_at
  const method = detail.move_learn_method.name

  const moveName = data.move.name.replace("-", " ")

  return (

    <button
      onClick={onClick}
      className={`
      text-left
      px-2 py-1
      rounded
      transition
      border
      border-white/10

      ${selected
        ? "bg-white/15 border-white/30 shadow-[0_0_10px_rgba(255,255,255,0.1)]"
        : "hover:bg-white/10"}
      `}
    >

      <div className="capitalize text-[0.9em]">

        {moveName}

      </div>

      <div className="text-[0.7em] opacity-60">

        lvl {level} • {method}

      </div>

    </button>

  )
}

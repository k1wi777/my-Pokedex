export default function MoveItem({ data, onClick, selected }) {

  const detail = data.version_group_details[0]

  const level = detail.level_learned_at
  const method = detail.move_learn_method.name

  const moveName = data.move.name.replace("-", " ")

  const methodConfig = {

    "level-up": {
      style: "bg-green-500/20 text-green-300 border-green-400/40",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 4l6 6h-4v6h-4v-6H6z"/>
        </svg>
      )
    },

    machine: {
      style: "bg-blue-500/20 text-blue-300 border-blue-400/40",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 6h16v12H4zM9 9h6v6H9z"/>
        </svg>
      )
    },

    tutor: {
      style: "bg-purple-500/20 text-purple-300 border-purple-400/40",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3L2 8l10 5 8-4v6h2V8z"/>
        </svg>
      )
    },

    egg: {
      style: "bg-pink-500/20 text-pink-300 border-pink-400/40",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2c3 0 6 5 6 10a6 6 0 11-12 0c0-5 3-10 6-10z"/>
        </svg>
      )
    }

  }

  const config = methodConfig[method] || {
    style: "bg-white/10 text-white border-white/20",
    icon: null
  }

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

      {selected && (
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-white/60 rounded-l-lg"/>
      )}

      <div className="capitalize text-[0.9em] font-medium">
        {moveName}
      </div>

      <div className="flex items-center gap-2 text-[0.7em] mt-1">

        <span
          className={`
          flex items-center gap-1
          px-2 py-[1px]
          rounded
          border
          capitalize
          ${config.style}
          `}
        >

          {config.icon}

          {method.replace("-", " ")}

        </span>

        <span className="opacity-70">
          lvl {level}
        </span>

      </div>

    </button>

  )

}
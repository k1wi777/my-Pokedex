export default function TypeRow({ title, types }) {
  if (!types.length) return null;
  
  return (
    <div className="mb-7  ">
      <h4 className="text-[0.7em] font-bold uppercase tracking-wide opacity-60 mb-1">
        {title}
      </h4>

      <div className="flex flex-wrap gap-3">
        {types.map(({ type, value }) => (
          <span
            key={type}
            className={`relative w-20 text-center
              px-2 py-1 rounded-xl text-[0.6em] 
              backdrop-blur-md font-black
              transition-all duration-300 border-2 
              type-${type} bg-[linear-gradient(to_bottom,rgb(var(--type-color)/0.8),rgb(var(--type-color-2)/0.8))]  text-[rgb(var(--type-text))]  border-[rgb(var(--type-color))]
              shadow-[0_0_12px_rgb(var(--type-color))] md:shadow-[0_0_0px_rgb(var(--type-color))]
              hover:scale-105
              hover:shadow-[0_0_12px_rgb(var(--type-color))]
            `}
          >
            {type}

            {/* 👇 AQUÍ VA EL MULTIPLICADOR */}
            {value !== 1 && (
              <span
                className={`
                absolute -top-2 -right-2
                text-[10px] font-bold px-1.5 py-0.5 rounded-full
                
                ${
                  value >= 4
                    ? "bg-[rgba(255,0,0,60%)] border border-[rgb(255,0,0)] text-white shadow-pulse "
                    : value > 1
                      ? "bg-[rgba(255,93,0,70%)] border border-[rgb(255,63,0)] text-white"
                      : value === 0
                        ? "bg-[rgba(159,159,159,60%)] border border-[rgb(159,159,159)] text-white"
                        : value === 0.5? "bg-[rgb(21,93,252,60%)] border border-[rgb(21,93,252)] text-white":"bg-[rgb(28,57,142,60%)] border border-[rgb(28,57,142)] text-white"
                }
              `}
              >
                x{value}
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

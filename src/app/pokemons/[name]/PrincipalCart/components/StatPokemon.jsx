
export default function StatPokemon({ stat, level }) {
  function getStatColor(value, reference) {
  const percentage = (value / reference) * 100;

  if (percentage < 20) return "#ef4444"; // rojo
  if (percentage < 30) return "#f97316"; // naranja
  if (percentage < 50) return "#eab308"; // amarillo
  if (percentage < 65) return "#22c55e"; // verde
  if (percentage < 90) return "#3b82f6"; // azul
  return "#a855f7"; // morado
}

  function calculateHP(base, level, iv = 31, ev = 0) {
    return Math.floor(((2 * base + iv + ev / 4) * level) / 100) + level + 10;
  }

  function calculateStat(base, level, iv = 31, ev = 0, nature = 1) {
    const value = Math.floor(((2 * base + iv + ev / 4) * level) / 100) + 5;

    return Math.floor(value * nature);
  }
  
 

  const value =
    level === 0
      ? stat.base_stat
      : stat.stat.name === "hp"
        ? calculateHP(stat.base_stat, level)
        : calculateStat(stat.base_stat, level);
  const   reference = 150 + level * 2.5;

  const percentage = (value / reference) * 100;
  const color = getStatColor(value, reference)

  return (
    <div
      className=" flex flex-col border-l-3 border-white/50 pl-1 pb-[2px]   lg:pb-1"
    >
      <div className="flex justify-between  font-medium w-full">
        <span className="capitalize w-[30%] opacity-65 mr-2">
          {stat.stat.name}
        </span>
        <span className="w-[30%]">{value}</span>
        <div className="w-[40%] h-2 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700 ease-out"
            style={{
              width: `${percentage}%`,
              backgroundColor: color,
            }}
          />
        </div>
      </div>
    </div>
  );
}

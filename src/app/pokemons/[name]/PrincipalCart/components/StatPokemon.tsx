export default function StatPokemon({ stat }) {

  function getStatColor(value) {
    const percentage = (value / 200) * 100;

    if (percentage < 20) return "#ef4444"; // rojo
    if (percentage < 30) return "#f97316"; // naranja
    if (percentage < 50) return "#eab308"; // amarillo
    if (percentage < 65) return "#22c55e"; // verde
    if (percentage < 90) return "#3b82f6"; // azul
    return "#a855f7"; // morado (stats muy altas)
  }

  const percentage = (stat.base_stat / 255) * 100;
  const color = getStatColor(stat.base_stat);


  return (
    <div key={stat.stat.name} className="mb- flex flex-col border-l-3 border-white/50 pl-1 pb-1">
      <div className="flex justify-between  font-medium w-full">
        <span className="capitalize w-[30%] opacity-65 mr-2">
          {stat.stat.name}
        </span>
        <span className="w-[30%]">{stat.base_stat}</span>
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
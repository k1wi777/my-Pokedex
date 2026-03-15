import MoveItem from "./MoveItem"
export default function MoveList({ moves, onSelect, selectedMove }) {

  return (

    <div
      className="
      md:w-[40%]
      flex flex-col
      gap-1
      max-h-[280px]
      overflow-y-auto
      pr-1

      scrollbar-thin
      scrollbar-thumb-white/20
      scrollbar-track-transparent

      hover:scrollbar-thumb-white/40
      "
    >

      {moves.map((moveData) => (

        <MoveItem
          key={moveData.move.name}
          data={moveData}
          selected={selectedMove === moveData.move.name}
          onClick={() => onSelect(moveData.move.name)}
        />

      ))}

    </div>

  )

}
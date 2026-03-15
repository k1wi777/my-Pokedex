import MoveItem from "./MoveItem"
export default function MoveList({ moves, onSelect, selectedMove }) {

  const sortedMoves = [...moves].sort((a, b) => {

  const detailA = a.version_group_details[0]
  const detailB = b.version_group_details[0]

  const methodA = detailA.move_learn_method.name
  const methodB = detailB.move_learn_method.name

  const levelA = detailA.level_learned_at
  const levelB = detailB.level_learned_at

  const priority = {
    "level-up": 0,
    tutor: 1,
    egg: 2,
    machine: 3
  }

  if (priority[methodA] !== priority[methodB]) {
    return priority[methodA] - priority[methodB]
  }

  return levelA - levelB
})
  return (

    <div
      className="
      moves-scroll
      md:w-[40%]
      flex flex-col
      gap-1
      max-h-[280px]
      overflow-y-auto
      pr-1

      "
    >

      {sortedMoves.map((moveData) => (

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
"use client"

import { useState } from "react"
import MoveList from "./MoveList"
import MoveDetails from "./MoveDetails"

export default function MovesSection({ moves }) {

  const [selectedMove, setSelectedMove] = useState(null)

  return (

    <section
      className="
      flex flex-col md:flex-row
      gap-3
      w-full
      bg-gradient-to-br from-white/10 via-white/5 to-transparent
      backdrop-blur-xl
      border border-white/20
      rounded-lg
      p-2
      "
    >

      <MoveList
        moves={moves}
        selectedMove={selectedMove}
        onSelect={setSelectedMove}
      />

      <MoveDetails
        move={selectedMove}
      />

    </section>

  )
}

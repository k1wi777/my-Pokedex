
import CartEvolution from "./CartEvolution";


function EvolutionArrow() {
  return (
    <div className="relative flex items-center justify-center">
      
      {/* Glow animado */}
      <div className="absolute w-14 h-14 rounded-full 
                      bg-white/20 blur-xl animate-pulse" />

      <svg
        className="
          w-10 h-10 text-white
          rotate-90 md:rotate-0
        "
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 12h14M13 6l6 6-6 6"
        />
      </svg>
    </div>
  );
}


export default function EvolutionChain({ evolutions ,name}) {

  return (
    <section className="relative w-full rounded-lg bg-black/20 p-1 shadow-[-3px_3px_15px_rgba(255,255,255,0.4)]">
      <h2 className="text-3xl font-black">linea evolutiva</h2>
      <div className="group 
  flex flex-col md:flex-row
  items-center justify-center
  gap-8 md:gap-5
  max-w-full
  overflow-hidden
  py-8
  scroll-smooth">
        {evolutions.map((evolution, index) => (
          <div
            key={evolution.name}
            className="flex items-center gap-6 flex-col md:flex-row"
          >
            <CartEvolution  evolution={evolution} isCurrent={evolution.name === name}/>

            {/* Si NO es el último, renderizamos conector */}
            {index < evolutions.length - 1 && <EvolutionArrow/>
            }
          </div>
        ))}
      </div>
    </section>
  );
}

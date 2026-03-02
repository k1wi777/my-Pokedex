import CartEvolution from "./CartEvolution";

function EvolutionNode({ node, currentName }) {
  return (
    <div className="flex flex-col items-center gap-6">
      {/* Nodo actual */}
      <CartEvolution evolution={node} isCurrent={node.name === currentName} />

      {/* Si tiene hijos, los renderizamos */}
      {node.children && node.children.length > 0 && (
        <div className="flex flex-col items-center gap-2 ">
          {/* Flecha vertical */}
          <div
            className="w-[2px] h-10 
                bg-gradient-to-b 
                from-white/60 to-white/10"
          />
          {/* Línea horizontal si hay más de 1 hijo */}
          {node.children.length > 1 && (
            <div className="h-[2px] w-full bg-white/30 mb-3" />
          )}

          {/* Hijos */}
          <div className="flex flex-wrap  justify-center gap-6 ">
            {node.children.map((child, index) => (
              <div
                key={child.name}
                style={{ animationDelay: `${index * 0.5}s` }}
                className="
               "
              >
                <EvolutionNode node={child} currentName={currentName} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function EvolutionTree({ tree, currentName }) {
  return (
    <section className="relative w-full rounded-lg bg-black/20 p-4 shadow-[-3px_3px_15px_rgba(255,255,255,0.4)] py-4 flex flex-col">
      <h2 className="text-3xl font-black text-white mb-6">
        Línea evolutiva ramificada
      </h2>

      <div className="flex justify-center ">
        <EvolutionNode node={tree} currentName={currentName} />
      </div>
    </section>
  );
}

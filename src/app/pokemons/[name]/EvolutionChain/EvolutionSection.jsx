import EvolutionChain from "./components/EvolutionChain";
import EvolutionTree from "./components/EvolutionTree"; // luego lo hacemos

function flattenLinearEvolution(tree) {
  const result = [];
  let current = tree;

  while (current) {
    result.push({
      name: current.name,
      url: current.url,
      trigger: current.trigger,
    });

    if (!current.children || current.children.length !== 1) break;

    current = current.children[0];
  }

  return result;
}

export default function EvolutionSection({ evolutionData, name }) {
  if (!evolutionData) return null;

  const { tree, hasBranching } = evolutionData;

  if (!tree) return null;

  //  Si hay ramificación usamos otro componente
  if (hasBranching) {
    return (
      <EvolutionTree
        tree={tree}
        currentName={name}
      />
    );
  }

  //  Si es lineal convertimos a array
  const evolutions = flattenLinearEvolution(tree);

  return (
    <EvolutionChain
      evolutions={evolutions}
      name={name}
    />
  );
}
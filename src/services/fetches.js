

//fetch para obtener una lista de pokeemons
export async function fetchPokemons(offset = 0, limit = 20) {
  try {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
    );
    const json = await res.json();
    return {
      ...json,
    };
  } catch (error) {
    console.error("ocurrio algun error en la consulta \n" + error);
  }
}

export async function fetchGetPokemon(name) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  return await res.json();
}

export async function fetchInitialDetailed(list) {
  return await Promise.all(
    list.map(async (pokemon) => {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`,
      );
      return await res.json();
    }),
  );
}

//fetch para conseguir toda la informacion referente a un pokemon
export async function fetchInfoPokemon(name, lang = "en") {
  try {
    //  Fetch principal del Pokémon
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

    if (!res.ok) {
      throw new Error("No se pudo obtener el Pokémon");
    }

    const pokemon = await res.json();

    //  Fetch de species (una sola vez)
    const species = await fetchSpeciesData(pokemon);
    //funcion de fetch de la infro de  cada tipo
    const types = await fetchInfoTypes(pokemon.types);

    // funcion auxiliar de el calculo de los tipos efectivos del pokemon
    const effectiveness = () => calculateTypeEffectiveness(types);

    //  Funciones auxiliares que reutilizan species
    const description = () => getDescription(species, lang);
    const category = () => getCategory(species);
    const genera = getGenera(species, lang);

    const main_region = async () => await fetchGenerationSpecies(species);
    //
    const evolutions = async () => await getEvolutions(species);

    return {
      ...pokemon,
      description,
      genera,
      category,
      effectiveness,
      capture_rate: species.capture_rate,
      base_happiness: species.base_happiness,
      generation: species.generation,
      main_region,
      growth_rate: species.growth_rate,
      habitat: species.habitat,
      gender_rate: species.gender_rate,
      evolutions,
    };
  } catch (error) {
    console.error("Error en fetchInfoPokemon:", error);
    return null;
  }
}

export async function fetchPokeballs() {
  const res = await fetch("https://pokeapi.co/api/v2/item-pocket/3/");
  const json = await res.json();

  const list = await getInfoCategories(json);

  return list;
}

async function getInfoCategories(json) {
  return Promise.all(
    json.categories.map(async ({ url }) => {
      const res = await fetch(url);
      const { name, items } = await res.json();
      return { name, items };
    }),
  );
}

export async function abilitiesDetails({url}) {
  let ability = {}
  try {
    const res =await  fetch(url)
    const json = await res.json()
    const description = translateLabel(json["flavor_text_entries"],'es',1,0)
    const name = translateLabel(json.names,'es')
    ability={description,name}
  } catch (error) {
    console.error('ha habido un error ',error)
  }
  finally{
    return ability
  }
}
export async function getDataPokeball(url, lang = 'en') {
  const res = await fetch(url);
  const pokeball = await res.json();
  const name = translateLabel(pokeball.names,lang);
  const description = translateLabel(pokeball.flavor_text_entries, lang);
  const effect= translateLabel(pokeball.effect_entries,lang,1,0)
  return {...pokeball, name,description,effect}
}

export async function fetchSpeciesData(pkmn) {
  const res = await fetch(pkmn.species.url);
  const json = await res.json();
  return json;
}

async function fetchGenerationSpecies(species, lang) {
  const res = await fetch(species.generation.url);
  const json = await res.json();
  return json.main_region.name;
}

async function fetchInfoTypes(types) {
  const listTypes = [];
  for (const type of types) {
    const res = await fetch(type.type.url);
    const json = await res.json();
    listTypes.push(json);
  }
  return listTypes;
}

function calculateTypeEffectiveness(pokemonTypes) {
  const defensive = {};
  const offensive = {};

  const apply = (target, list, multiplier) => {
    list.forEach(({ name }) => {
      target[name] = (target[name] ?? 1) * multiplier;
    });
  };

  for (const type of pokemonTypes) {
    const rel = type.damage_relations;
    // Defensive

    apply(defensive, rel.double_damage_from, 2);
    apply(defensive, rel.half_damage_from, 0.5);
    apply(defensive, rel.no_damage_from, 0);

    // Offensive
    apply(offensive, rel.double_damage_to, 2);
    apply(offensive, rel.half_damage_to, 0.5);
    apply(offensive, rel.no_damage_to, 0);
  }

  const splitDefensive = {
    weaknesses: [],
    resistances: [],
    immunities: [],
  };

  const splitOffensive = {
    strong: [],
    weak: [],
    noEffect: [],
  };

  Object.entries(defensive).forEach(([type, value]) => {
    if (value === 0) splitDefensive.immunities.push({ type, value });
    else if (value > 1) splitDefensive.weaknesses.push({ type, value });
    else if (value < 1) splitDefensive.resistances.push({ type, value });
  });

  Object.entries(offensive).forEach(([type, value]) => {
    if (value === 0) splitOffensive.noEffect.push({ type, value });
    else if (value > 1) splitOffensive.strong.push({ type, value });
    else if (value < 1) splitOffensive.weak.push({ type, value });
  });

  return {
    defensive: splitDefensive,
    offensive: splitOffensive,
  };
}

function getDescription(species, lang = "es") {
  const entry = species.flavor_text_entries.find(
    (e) => e.language.name === lang,
  );

  return entry
    ? entry.flavor_text.replace(/\f/g, " ")
    : "No description available.";
}

function getGenera(species, lang = "es") {
  const entry = species.genera.find((e) => e.language.name === lang);

  return entry ? entry.genus.replace(/\f/g, " ") : "No genera available.";
}

function getCategory(species) {
  if (species?.is_mythical) return "mythical";
  if (species?.is_legendary) return "legendary";
  return "normal";
}

function extractEvolutionTree(chainNode) {
  let hasBranching = false;

  function buildNode(node, triggerInfo = null) {
    const evolutionNode = {
      name: node.species.name,
      url: node.species.url,
      trigger: triggerInfo,
      children: [],
    };

    if (node.evolves_to.length > 1) {
      hasBranching = true;
    }

    node.evolves_to.forEach((nextEvolution) => {
      const details = nextEvolution.evolution_details[0];
      let triggerText = null;

      if (details) {
        if (details.trigger?.name === "level-up") {
          triggerText = details.min_level
            ? `Level ${details.min_level}`
            : "Level Up";
        } else if (details.trigger?.name === "use-item") {
          triggerText = `Use ${details.item?.name}`;
        } else if (details.trigger?.name === "trade") {
          triggerText = "Trade";
        }
      }

      evolutionNode.children.push(buildNode(nextEvolution, triggerText));
    });

    return evolutionNode;
  }

  const tree = buildNode(chainNode);

  return { tree, hasBranching };
}

async function getEvolutions(species) {
  const response = await fetch(species.evolution_chain.url);
  const data = await response.json();

  const { tree, hasBranching } = extractEvolutionTree(data.chain);

  return { tree, hasBranching };
}

export function translateLabel(languages, lang = "en", indexLanguage =0,indexText=1) {
  let translate = "";
  let english = "";
  const entry = languages.find((e) => Object.values(e)[indexLanguage].name === lang);

  const defaultLabel = languages.find((e) => Object.values(e)[indexLanguage].name === "en");

  return entry
    ? Object.values(entry)[indexText]?.replace(/\f/g, " ")
    : defaultLabel
      ? Object.values(defaultLabel)[indexText]
      : "No name available.";
}

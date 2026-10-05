async function explorarPokemon (){
    const respuesta = await 
    fetch("https://pokeapi.co/api/v2/pokemon/pikachu")

    console.log("Status: " + respuesta.status)

    const datos = await
    respuesta.json();

    console.log("nombre del pokemon: ", datos.name);
    console.log("Número	en	la	Pokédex: ", datos.id);
    console.log("Altura: ", datos.height ,"cm");
    console.log("Peso: ", datos.weight ,"hg");

    console.log("Tipos de Pokemon:");  
    for (const t of datos.types){
        console.log(t.type.name);
    }

    console.log("Stats:");  
    for (const s of datos.stats){
        console.log(`${s.stat.name}: ${s.base_stat}`);
    }

    console.log("Habilidades: ");  
    for (const s of datos.abilities){
        console.log(s.ability.name);
    }
}
async function buscarPokemon(nombre) {
  const url = `https://pokeapi.co/api/v2/pokemon/${nombre.toLowerCase()}`;

  const respuesta = await fetch(url);

  if (!respuesta.ok) {
    console.log(`Error: No se encontró el Pokémon "${nombre}". Status: ${respuesta.status}`);
    return null;
  }

  return await respuesta.json();
}

module.exports = { buscarPokemon };

explorarPokemon();

function mostrarFicha(datos) {
  if (!datos) {
    console.log("No hay datos para mostrar.");
    return;
  }

  console.log(`//////////////////////////////////////////`);
  console.log(`POKÉMON: ${datos.name.toUpperCase()} (#${datos.id}`);
  console.log("///////////////////////////////");

  const tipos = datos.types.map(t => t.type.name).join(" / ");
  console.log(`Tipos: ${tipos}`);

  const alturaCm = datos.height * 10;
  const pesoKg = datos.weight / 10;
  console.log(`Altura: ${alturaCm} cm | Peso: ${pesoKg} kg`);

  
  console.log("Estadísticas: ");
  for (const s of datos.stats) {
    console.log(`${s.stat.name}: ${s.base_stat}`);
  }

  console.log("Habilidades");
  for (const a of datos.abilities) {
    const oculta = a.is_hidden ? " (oculta)" : "";
    console.log(`- ${a.ability.name}${oculta}`);
  }
  console.log("////////////////////////////////////");
}

module.exports = { buscarPokemon, mostrarFicha };


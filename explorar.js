module.exports = { buscarPokemon, mostrarFicha, compararPokemon, obtenerStat, pokemonMasFuerte};


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



function	obtenerStat(datos,	nombreStat)	{
  for (let i = 0 ; i < datos.stats.length; i++){
    if(datos.stats[i].stat.name === nombreStat.toLowerCase()){
      return datos.stats[i].base_stat;
    }
  }
  return null;
}

async function compararPokemon (nombre1, nombre2, stat){
  const poke1 = await buscarPokemon(nombre1);
  const poke2 = await buscarPokemon(nombre2);
  if (poke1 === null || poke2 === null ){
    console.log("no se puede comparar");
    return;
  }
 const statpoke1 = obtenerStat(poke1, stat);
 const statpoke2 = obtenerStat(poke2, stat);

 if (statpoke1===null || statpoke2 === null){
  console.log("no existe");
  console.log("estadisticas validas: hp, attack, defense, special-attack, special-defense, speed");
  return;
 }

 if (statpoke1 > statpoke2){
  console.log(`ganador en ${stat}: ${poke1.name.toLowerCase()}`);
 }
 else if (statpoke1 < statpoke2){
  console.log(`ganador en ${stat}: ${poke2.name.toLowerCase()}`);
 }
 else {
  console.log("es un empate");
 }

}


 async function pokemonMasFuerte(listaNombres, stat) {
  let mejorNombre = "";
  let mejorValor = -1;

  for (const nombre of listaNombres) {
    const pokemon = await buscarPokemon(nombre);

    if (!pokemon) continue;

    const valorStat = obtenerStat(pokemon, stat);

    if (valorStat === null) continue;

    if (valorStat > mejorValor) {
      mejorValor = valorStat;
      mejorNombre = pokemon.name;
  }

  return mejorNombre;
}
}


async function ejercicio5() {
 
  const miEquipo = ["pikachu", "charizard", "gengar", "mewtwo", "snorlax", "machamp"];

  console.log("=== EJERCICIO 5: DESAFÍO FINAL ===");

  const ganadorAtaque = await pokemonMasFuerte(miEquipo, "attack");
  console.log(`El pokémon con mayor ataque es: ${ganadorAtaque}`);

  const ganadorDefensa = await pokemonMasFuerte(miEquipo, "defense");
  console.log(`El pokémon con mayor defensa es: ${ganadorDefensa}`);

  console.log("\nFicha completa del ganador de ataque:");
  const datosGanadorAtaque = await buscarPokemon(ganadorAtaque);
  mostrarFicha(datosGanadorAtaque);
}

ejercicio5();
const { compararPokemon, buscarPokemon, mostrarFicha, pokemonMasFuerte} = require('./explorar.js');

async function probarPokedex() {
  console.log("Buscando Pokémon 1");
  const p1 = await buscarPokemon("pikachu");
  if (p1) console.log(`Nombre: ${p1.name} | ID: ${p1.id}`);

  console.log("\n--- Buscando Pokémon 2 (probando mayúsculas) ---");
  const p2 = await buscarPokemon("CHARIZARD");
  if (p2) console.log(`Nombre: ${p2.name} | ID: ${p2.id}`);

  console.log("\nBuscando Pokémon 3");
  const p3 = await buscarPokemon("snorlax");
  if (p3) console.log(`Nombre: ${p3.name} | ID: ${p3.id}`);

  console.log("Pokémon inexistente");
  const p4 = await buscarPokemon("agumn");
  if (p4) {
    console.log(`Nombre: ${p4.name}`);
  } else {
    console.log("Prueba superada: El programa no se rompió y manejó el error correctamente.");
  }
}

probarPokedex();


async function probarEjercicio3() {
  const pokemon1 = await buscarPokemon("gengar");
  mostrarFicha(pokemon1);

  const pokemon2 = await buscarPokemon("mewtwo");
  mostrarFicha(pokemon2);
}

probarEjercicio3()



async function comparacion() {
  console.log("=== Snorlax vs Machamp ===");
  // Justificación: Comparamos HP porque Snorlax tiene mas cantidad de puntos de vida.
  await compararPokemon('snorlax', 'machamp', 'hp');

  console.log("\n=== Comparación en Defensa ===");
  await compararPokemon('blastoise', 'charizard', 'defense');

  console.log("\n=== Stat Inexistente ===");
  await compararPokemon('pikachu', 'eevee', 'fuerza');
}

 comparacion();


async function luchapokemon() {
 
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

luchapokemon();
const { buscarPokemon } = require('./explorar.js');

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

const { buscarPokemon, mostrarFicha } = require('./explorar.js');

async function probarEjercicio3() {
  const pokemon1 = await buscarPokemon("gengar");
  mostrarFicha(pokemon1);

  const pokemon2 = await buscarPokemon("mewtwo");
  mostrarFicha(pokemon2);
}

probarEjercicio3()
async function explorarPokemon (){
    const respuesta = await 
    fetch("https://pokeapi.co/api/v2/pokemon/pikachu")

    const datos = await
    respuesta.json();

    console.log(respuesta.status)
    console.log(datos.name);
    ;
}

explorarPokemon();


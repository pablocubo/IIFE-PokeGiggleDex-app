const pokemonRepository = (function () {
  const pokemonList = [
    { name: "Bulbasaur", height: 7, weight: 6.9, types: ["grass", "poison"] },
    { name: "Charmander", height: 6, weight: 9, types: ["fire"] },
    { name: "Squirtle", height: 0.5, weight: 8.5, types: ["water"] },
  ];

  function getAll() {
    return pokemonList;
  }

  function add(item) {
    pokemonList.push(item);
  }

  return {
    getAll: getAll,
    add: add,
  };
})();

function displayPokemon() {
  document.getElementById("output").innerHTML = "";

  pokemonRepository.getAll().forEach(function (pokemon) {
    const name = pokemon.name;
    const height = pokemon.height;
    const weight = pokemon.weight;
    const types = pokemon.types.join(", ");

    let output = `${name} (height: ${height}) (weight: ${weight}) ${types} <br>`;

    if (height > 6) {
      output += " - Wow, that's big! <br>";
    }

    document.getElementById("output").innerHTML += output;
  });
}

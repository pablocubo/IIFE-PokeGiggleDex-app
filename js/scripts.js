const pokemonRepository = (function () {
  var pokemonList = [
    { name: "Bulbasaur", height: 7, weight: 6.9, types: ["grass", "poison"] },
    { name: "Charmander", height: 6, weight: 9, types: ["fire"] },
    { name: "Squirtle", height: 0.5, weight: 8.5, types: ["water"] },
  ];

  function getAll() {
    return pokemonList;
  }

  return {
    getAll: getAll,
  };
})();

// Function to add a list item for a Pokémon
function addListItem(pokemon) {
  var outputDiv = document.getElementById("output");
  var listItem = document.createElement("div");
  listItem.innerHTML = '<h3>' + pokemon.name + '</h3>'
                     + '<p>Height: ' + pokemon.height + '</p>'
                     + '<p>Weight: ' + pokemon.weight + '</p>'
                     + '<p>Type: ' + pokemon.types.join(", ") + '</p>';
  listItem.addEventListener("click", function() {
    console.log("Clicked Pokémon: " + pokemon.name);
  });
  outputDiv.appendChild(listItem);
}

// Function to search for a Pokémon by name
function searchPokemon() {
  var searchValue = document.getElementById("search-input").value.trim().toLowerCase();
  var outputDiv = document.getElementById("output");
  outputDiv.innerHTML = ""; // Clear previous details

  var pokemon = pokemonRepository.getAll().find(function(p) {
    return p.name.toLowerCase() === searchValue;
  });

  if (pokemon) {
    addListItem(pokemon);
  } else {
    outputDiv.innerHTML = "<p>Pokémon not found!</p>";
  }
}

// Function to display all Pokémon
function showAllPokemon() {
  var outputDiv = document.getElementById("output");
  outputDiv.innerHTML = ""; // Clear previous details

  var allPokemon = pokemonRepository.getAll();

  allPokemon.forEach(function(pokemon) {
    addListItem(pokemon);
  });
}

// Attach functions to buttons
document.getElementById("search-button").addEventListener("click", searchPokemon);
document.getElementById("show-all-button").addEventListener("click", showAllPokemon);

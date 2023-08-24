const pokemonRepository = (function () {
  var pokemonList = [
    { name: "Pikachu", height: 2, weight: 13, types: ["electric"] },
    { name: "Bulbasaur", height: 7, weight: 6.9, types: ["grass", "poison"] },
    { name: "Charmander", height: 6, weight: 9, types: ["fire"] },
    { name: "Squirtle", height: 0.5, weight: 8.5, types: ["water"] },
  ];

  function addListItem(pokemon) {
    const listItem = document.createElement('li');
    const button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemon-button');
    listItem.appendChild(button);


    let infoShown = false;


    button.addEventListener('click', function () {

      const pokemonInfo = document.getElementById('pokemon-info');

      if (infoShown) {

        pokemonInfo.innerHTML = '';
      } else {
        // Show the info
        pokemonInfo.innerHTML = '<h3>' + pokemon.name + '</h3>'
          + '<p>Height: ' + pokemon.height + '</p>'
          + '<p>Weight: ' + pokemon.weight + '</p>'
          + '<p>Type: ' + pokemon.types.join(", ") + '</p>';
      }


      infoShown = !infoShown;
    });

    let pokemonListElement = document.querySelector('.pokemon-list');
    pokemonListElement.appendChild(listItem);
  }

  function getAll() {
    return pokemonList;
  }

  return {
    getAll: getAll,
    addListItem: addListItem,
  };
})();

console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});

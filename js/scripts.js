var pokemonRepository = (function () {
  var pokemonList = [];
  var infoShown = false;

  function addListItem(pokemon) {
    const listItem = document.createElement('li');
    const button = document.createElement('button');
    button.textContent = pokemon.name; // Use textContent for security
    button.classList.add('pokemon-button');
    listItem.appendChild(button);

    button.addEventListener('click', function () {
      const pokemonInfo = document.getElementById('pokemon-info');
      if (infoShown) {
        pokemonInfo.innerHTML = '';
      } else {
        // Show the info
        pokemonInfo.innerHTML = `<div class="pokemon-details">
          <h3>${pokemon.name}</h3>
          <img src="${pokemon.imgUrl}">
          <p>Height: ${pokemon.height}</p>
          <p>Weight: ${pokemon.weight}</p>
          <p>Types: ${pokemon.types.join(', ')}</p>
        </div>`;
      }
      infoShown = !infoShown;
    });

    let pokemonListElement = document.querySelector('.pokemon-list');
    pokemonListElement.appendChild(listItem);
  }

  function getAll() {
    return pokemonList;
  }

  async function loadList() {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon/');
      const data = await response.json();
      data.results.forEach(function (item) {
        var pokemon = {
          name: item.name,
          detailsUrl: item.url,
        };
        pokemonList.push(pokemon);
      });
    } catch (error) {
      console.error('Error loading Pokémon list', error);
    }
  }

  async function loadDetails(pokemon) {
    try {
      const response = await fetch(pokemon.detailsUrl);
      const details = await response.json();

      pokemon.imgUrl = details.sprites.front_default;
      pokemon.height = details.height;
      pokemon.weight = details.weight;
      pokemon.types = details.types;
    } catch (error) {
      console.error('Error loading Pokémon details', error);
    }
  }

  return {
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
  };
})();

async function initialize() {
  await pokemonRepository.loadList();
  const pokemonList = pokemonRepository.getAll();
  for (const pokemon of pokemonList) {
    await pokemonRepository.loadDetails(pokemon);
    pokemonRepository.addListItem(pokemon);
  }
}

initialize();



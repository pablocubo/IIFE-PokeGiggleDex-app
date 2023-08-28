var pokemonRepository = (function () {
  var pokemonList = [];
  var infoShown = false;

  function addListItem(pokemon) {
    const listItem = document.createElement('li');
    const button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemon-button');
    listItem.appendChild(button);

    button.addEventListener('click', function () {
      const pokemonInfo = document.getElementById('pokemon-info');
      if (infoShown) {
        pokemonInfo.innerHTML = '';
      } else {
        // Show the info
        pokemonInfo.innerHTML = '<div class="pokemon-details">' +
          '<h3>' + pokemon.name + '</h3>' +
          '<img src="' + pokemon.imgUrl + '">' +
          '<p>Height: ' + pokemon.height + '</p>' +
          '<p>Weight: ' + pokemon.weight + '</p>' +
          '<p>Types: ' + pokemon.types.join(', ') + '</p>' +
          '<p>Stats: ' + JSON.stringify(pokemon.stats) + '</p>' +
          '<p>Sprites: ' + JSON.stringify(pokemon.sprites) + '</p>' +
          '<p>Moves: ' + JSON.stringify(pokemon.moves) + '</p>' +
          '<p>Species: ' + JSON.stringify(pokemon.species) + '</p>' +
          '<p>Evolution Chain: ' + JSON.stringify(pokemon.evolutionChain) + '</p>' +
          '</div>';
      }
      infoShown = !infoShown;
    });

    let pokemonListElement = document.querySelector('.pokemon-list');
    pokemonListElement.appendChild(listItem);
  }

  function getAll() {
    return pokemonList;
  }

  function loadList() {
    return fetch('https://pokeapi.co/api/v2/pokemon/')
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        data.results.forEach(function (item) {
          var pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          pokemonList.push(pokemon);
        });
      })
      .catch(function (error) {
        console.error('Error loading Pokémon list', error);
      });
  }

  function loadDetails(pokemon) {
    var url = pokemon.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        // Update imgUrl to the front sprite image URL
        pokemon.imgUrl = details.sprites.front_default;
        pokemon.height = details.height;
        pokemon.weight = details.weight;
        pokemon.types = details.types;
        // ... (other properties)
      })
      .catch(function (error) {
        console.error('Error loading Pokémon details', error);
      });
  }

  return {
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      pokemonRepository.addListItem(pokemon);
    });
  });
});


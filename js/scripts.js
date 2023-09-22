let pokemonRepository = (function () {
  let pokemonList = []; // Store the list of Pokemon
  let infoShown = false; // Track if Pokemon info is shown or hidden

  // Function to add a Pokemon to the list
  function addListItem(pokemon) {
    const listItem = document.createElement('li'); // Create an <li> element
    listItem.classList.add('col-12', 'col-md-4', 'mb-2');
    const button = document.createElement('button'); // Create a <button> element
    button.textContent = pokemon.name; // Set the button text to the Pokemon's name
    button.classList.add('pokemon-button', 'btn', 'btn-block', 'btn-success', 'w-100', 'mb-3'); // Add a CSS class to the button
    listItem.appendChild(button); // Append the button to the list item

    // Add data attributes to store Pokémon details
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#exampleModal');
    button.setAttribute('data-name', pokemon.name);
    button.setAttribute('data-img', pokemon.imgUrl);
    button.setAttribute('data-height', pokemon.height);
    button.setAttribute('data-weight', pokemon.weight);
    button.setAttribute('data-types', pokemon.types.join(', '));
    button.setAttribute('data-abilities', pokemon.abilities.join(', '));

    listItem.appendChild(button);


    button.addEventListener('click', function () {
      // Retrieve Pokémon details from data attributes
      const modalTitle = document.querySelector('.modal-title');
      const modalBody = document.querySelector('.modal-body');

      const name = button.getAttribute('data-name');
      const imgUrl = button.getAttribute('data-img');
      const height = button.getAttribute('data-height');
      const weight = button.getAttribute('data-weight');
      const types = button.getAttribute('data-types');
      const abilities = button.getAttribute('data-abilities');

      // Set modal content with Pokémon details
      modalTitle.textContent = name;
      modalBody.innerHTML = `
        <img src="${imgUrl}" class="modal-img" style="width: 50%;">
        <p>Height: ${height}</p>
        <p>Weight: ${weight}</p>
        <p>Types: ${types}</p>
        <p>Abilities: ${abilities}</p>
      `;
    });

    let pokemonListElement = document.querySelector('.pokemon-list'); // Get the list element
    pokemonListElement.appendChild(listItem); // Append the list item to the list
  }

  // Function to get all Pokemon in the repository
  function getAll() {
    return pokemonList;
  }

  // Function to fetch a list of Pokemon from the API
  async function loadList() {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=88'); // Fetch Pokemon list
      const data = await response.json(); // Parse response to JSON
      data.results.forEach(function (item) {
        var pokemon = {
          name: item.name,
          detailsUrl: item.url,
        };
        pokemonList.push(pokemon); // Add each Pokemon to the list
      });
    } catch (error) {
      console.error('Error loading Pokémon list', error);
    }
  }

  // Function to load details for a specific Pokemon
  async function loadDetails(pokemon) {
    try {
      const response = await fetch(pokemon.detailsUrl); // Fetch Pokemon details
      const details = await response.json(); // Parse response to JSON
      pokemon.types = details.types.map((typeInfo) => typeInfo.type.name);

      // Populate Pokemon details
      pokemon.imgUrl = details.sprites.front_default;
      pokemon.height = details.height;
      pokemon.weight = details.weight;
      pokemon.types = details.types;
      pokemon.abilities = details.abilities;



    } catch (error) {
      console.error('Error loading Pokémon details', error);
    }
  }

  // Function to show the modal with Pokemon details
  function showModal(pokemon) {
    const modal = document.getElementById('exampleModal');
    const modalContent = document.getElementById('modal-body');



    // Create the modal content
    const modalHTML = `
   <div class="pokemon-details">
     <h3>${pokemon.name}</h3>
     <img src="${pokemon.imgUrl}">
     <p>Height: ${pokemon.height}</p>
     <p>Weight: ${pokemon.weight}</p>
     <p>Types: ${pokemon.types.map(type => type.type.name).join(', ')}</p>
     <p>Abilities: ${pokemon.abilities.map(ability => ability.ability.name).join(', ')}</p>
   </div>
 `;

    modalContent.innerHTML = modalHTML;
  }

  // Expose public methods
  return {
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
  };
})();


// Your existing code up to the 'initialize' function remains unchanged

async function initialize() {
  const pokeball = document.getElementById('pokeball');
  pokeball.classList.add('spinning');

  await pokemonRepository.loadList();

  // Add spinning back if removed due to await
  pokeball.classList.add('spinning');

  pokeball.addEventListener('click', async function () {
    // Remove spinning
    pokeball.classList.remove('spinning');

    // Fade out animation
    pokeball.style.transition = 'opacity 1s linear';
    pokeball.style.opacity = '0';

    setTimeout(async () => {
      pokeball.style.display = 'none';

      // Show the Pokémon list container
      const pokemonContainer = document.getElementById('pokemon-container');
      pokemonContainer.style.display = 'block';

      await pokemonRepository.loadList(); // Load Pokémon list
      const pokemonList = pokemonRepository.getAll(); // Get all Pokémon
      for (const pokemon of pokemonList) {
        await pokemonRepository.loadDetails(pokemon); // Load details for each Pokémon
        pokemonRepository.addListItem(pokemon); // Add the Pokémon to the list
      }

      renderPokemonList(pokemonList);
    }, 1000); // 1 second fade out time
  });
}


initialize(); // Initialize the app
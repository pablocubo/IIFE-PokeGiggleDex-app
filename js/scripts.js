let pokemonRepository = (function () {
  let pokemonList = []; // Store the list of Pokemon

  // Function to add a Pokemon to the list
  function addListItem(pokemon) {
    const listItem = document.createElement('li'); // Create an <li> element
    listItem.classList.add('col-12', 'col-md-4', 'mb-2');
    const button = document.createElement('button'); // Create a <button> element
    button.textContent = pokemon.name; // Set the button text to the Pokemon's name
    button.classList.add('pokemon-button', 'btn', 'btn-block', 'btn-lg', 'w-100', 'mb-3'); // Add a CSS class to the button
    listItem.appendChild(button); // Append the button to the list item

    // Add data attributes to store Pokémon details
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#exampleModal');
    button.setAttribute('data-name', pokemon.name);
    button.setAttribute('data-img', pokemon.imgUrl);
    button.setAttribute('data-height', pokemon.height);
    button.setAttribute('data-weight', pokemon.weight);
    button.setAttribute('data-abilities', pokemon.abilities);
    button.setAttribute('data-types', pokemon.types);

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
        <img src="${imgUrl}" class="modal-img" style="width: 40%;">
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
      const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=45'); // Fetch Pokemon list
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

      // Process abilities and convert them into a comma-separated string
      const abilityNames = details.abilities.map(abilityObj => abilityObj.ability.name);
      pokemon.abilities = abilityNames.join(', ');

      // Process types and convert them into a comma-separated string
      const typeNames = details.types.map(typeObj => typeObj.type.name);
      pokemon.types = typeNames.join(', ');
      // Populate Pokemon details
      pokemon.imgUrl = details.sprites.front_default;
      pokemon.height = details.height;
      pokemon.weight = details.weight;


    } catch (error) {
      console.error('Error loading Pokémon details', error);
    }
  }

  // Function to show the modal with Pokemon details
  function showModal(pokemon) {
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



// Function to show search bar
function showSearchBar() {
  const searchElement = document.querySelector('.search-wrapper');
  if (searchElement) {
    searchElement.style.display = 'd-none';
  }
}

// Add the click event to the Pokéball
document.addEventListener('DOMContentLoaded', function () {
  const pokeballElement = document.querySelector('#pokeball');
  if (pokeballElement) {
    pokeballElement.addEventListener('click', function () {
      showSearchBar();
    });
  }
});


// Initialize function to set up the initial state and event listeners
async function initialize() {
  // Get the pokeball element and add the spinning class for animation
  const pokeball = document.getElementById('pokeball');
  pokeball.classList.add('spinning');

  // Load the list of Pokemon from the repository
  await pokemonRepository.loadList();

  // Get the search input element and make it visible
  const searchInput = document.getElementById('realtime-search');
  searchInput.style.display = 'block';

  // Function to filter Pokemon based on a search query
  function filterPokemon(query) {
    // Get all buttons that represent Pokemon
    const pokemonButtons = document.querySelectorAll('.pokemon-button');

    // Loop through each button to filter Pokemon
    pokemonButtons.forEach(function (button) {
      const name = button.textContent.toLowerCase();

      // Show the Pokemon if its name includes the search query
      if (name.includes(query)) {
        button.parentElement.style.display = 'block';
      } else {
        // Hide the Pokemon if its name does not include the search query
        button.parentElement.style.display = 'none';
      }
    });
  }

  // Event listener for real-time search functionality
  searchInput.addEventListener('input', function () {
    // Get the search term from the input
    const searchTerm = this.value.toLowerCase();

    // Filter the Pokemon list based on the search term
    filterPokemon(searchTerm);
  });

  // Event listener for the pokeball click action
  pokeball.addEventListener('click', async function () {
    // Stop the pokeball from spinning and hide it
    pokeball.classList.remove('spinning');
    pokeball.style.display = 'none';

    // Hide the pokeball container
    const pokeballContainer = document.getElementById('pokeball-container');
    if (pokeballContainer) {
      pokeballContainer.style.display = 'none';
    }

    // Show the Pokemon list after a 1-second delay
    setTimeout(async () => {
      const pokemonContainer = document.getElementById('pokemon-container');
      if (pokemonContainer) {
        // Make the Pokemon container visible
        pokemonContainer.style.display = 'block';
        pokemonContainer.classList.remove('d-none');

        // Fetch and display all Pokemon
        const pokemonList = pokemonRepository.getAll();
        for (const pokemon of pokemonList) {
          await pokemonRepository.loadDetails(pokemon);
          pokemonRepository.addListItem(pokemon);
        }
      }
    }, 1000);
  });
}

// Invoke the initialize function to set everything up
initialize();

/* eslint quotes: "off" */
// Create a Pokemon Repository
let pokemonRepository = (function () {
  let pokemonList = []; // Store the list of Pokemon
  let infoShown = false; // Track if Pokemon info is shown or hidden

  // Function to add a Pokemon to the list
  function addListItem(pokemon) {
    const listItem = document.createElement('li'); // Create an <li> element
    const button = document.createElement('button'); // Create a <button> element
    button.textContent = pokemon.name; // Set the button text to the Pokemon's name
    button.classList.add('pokemon-button'); // Add a CSS class to the button
    listItem.appendChild(button); // Append the button to the list item

    // Add a click event listener to the button
    button.addEventListener('click', function () {
      const modal = document.getElementById('pokemon-modal');
      const modalContent = document.getElementById('modal-content');
      const closeButton = document.querySelector('.close');

      modal.style.display = 'block'; //Display the modal

      //Create the modal content

      const modalHTML = `<div class="pokemon-details">
      <h3>${pokemon.name}</h3>
      <img src="${pokemon.imgUrl}">
      <p>Height: ${pokemon.height}</p>
      <p>Weight: ${pokemon.weight}</p>
      <p>Types: ${pokemon.types.join(', ')}</p>
    </div>`;

      modalContent.innerHTML = modalHTML;

      closeButton.addEventListener('click', function () {
        modal.style.display = 'none';
      });
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
      const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=42'); // Fetch Pokemon list
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

      // Populate Pokemon details
      pokemon.imgUrl = details.sprites.front_default;
      pokemon.height = details.height;
      pokemon.weight = details.weight;
      pokemon.types = details.types;
    } catch (error) {
      console.error('Error loading Pokémon details', error);
    }
  }

  // Expose public methods
  return {
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
  };
})();

// Function to initialize the app
async function initialize() {
  await pokemonRepository.loadList(); // Load Pokemon list
  const pokemonList = pokemonRepository.getAll(); // Get all Pokemon
  for (const pokemon of pokemonList) {
    await pokemonRepository.loadDetails(pokemon); // Load details for each Pokemon
    pokemonRepository.addListItem(pokemon); // Add the Pokemon to the list
  }

  // Stringify the pokemonList array
  const jsonString = JSON.stringify(pokemonList);
  console.log(jsonString);
}

initialize(); // Initialize the app

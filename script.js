document.addEventListener("DOMContentLoaded", () => {
  const pokemonImage = document.getElementById("pokemon-image");
  const pokemonName = document.getElementById("pokemon-name");
  const pokemonType = document.getElementById("pokemon-type");
  const pokemonAbilities = document.getElementById("pokemon-abilities");

  const searchButton = document.getElementById("search-button");
  const pokemonInput = document.getElementById("pokemon-input");

  searchButton.addEventListener("click", function () {
    const pokemonNameValue = pokemonInput.value.toLowerCase();
    if (pokemonNameValue.trim() !== "") {
      searchPokemon(pokemonNameValue);
    }
  });

  pokemonInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      const pokemonNameValue = pokemonInput.value.toLowerCase();
      if (pokemonNameValue.trim() !== "") {
        searchPokemon(pokemonNameValue);
      }
    }
  });

  function searchPokemon(name) {
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${name}`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Pokemon not found!");
        }
        return response.json();
      })
      .then((data) => {
        const largeImage = data.sprites.other["official-artwork"].front_default;

        pokemonImage.src = largeImage ? largeImage : data.sprites.front_default;
        pokemonName.textContent = data.name.toUpperCase();
        pokemonType.textContent =
          "Type: " +
          data.types
            .map((type) => type.type.name)
            .join(", ")
            .toUpperCase();
        pokemonAbilities.innerHTML = "";
        data.abilities.forEach((ability) => {
          const li = document.createElement("li");
          li.textContent = ability.ability.name;
          pokemonAbilities.appendChild(li);
        });

        pokemonInput.value = "";
      })
      .catch((error) => {
        console.log(error);
        alert("Pokemon not found!");
      });
  }
});

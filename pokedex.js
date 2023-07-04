class Pokedex {
    constructor() {
      this.pokemonData = [];
    }
  
    async loadPokemonData() {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        const data = await response.json();
        this.pokemonData = data.results;
        this.renderCards();
      } catch (error) {
        console.error('Error loading Pokemon data:', error);
      }
    }
  
    async getPokemonDetails(url) {
      try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error loading Pokemon details:', error);
      }
    }
  
    async renderCards() {
      const container = document.getElementById('pokemon-container');
      container.innerHTML = '';
  
      for (const pokemon of this.pokemonData) {
        const pokemonDetails = await this.getPokemonDetails(pokemon.url);
  
        const card = document.createElement('div');
        card.classList.add('card');
  
        const image = document.createElement('img');
        image.src = pokemonDetails.sprites.front_default;
        card.appendChild(image);
  
        const name = document.createElement('h3');
        name.textContent = pokemon.name;
        card.appendChild(name);
  
        const type = document.createElement('p');
        type.textContent = `Type: ${pokemonDetails.types.map(type => type.type.name).join(', ')}`;
        card.appendChild(type);
  
        card.addEventListener('click', async () => {
          const fullDetails = await this.getPokemonDetails(pokemon.url);
          this.openModal(fullDetails);
        });
  
        container.appendChild(card);
      }
    }
  
    openModal(pokemon) {
      const modal = document.getElementById('modal');
      const modalTitle = document.getElementById('modal-title');
      const modalInfo = document.getElementById('modal-info');
  
      modalTitle.textContent = pokemon.name;
      modalInfo.innerHTML = `
        <p>Weight: ${pokemon.weight}</p>
        <p>Moves: ${pokemon.moves.map(move => move.move.name).join(', ')}</p>
      `;
  
      modal.style.display = 'block';
  
      const closeBtn = document.getElementsByClassName('close')[0];
      closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
      });
    }
  }
  
  const pokedex = new Pokedex();
  pokedex.loadPokemonData();
  
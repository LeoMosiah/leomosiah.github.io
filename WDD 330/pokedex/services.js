function client(url) {
    const promise = fetch(url);
    return promise.then((response) => {
        return response.json();
    });
}

async function onLoad() {
    const pokedexcontainer = document.getElementById("pokedex-container");
    pokedexcontainer.innerHTML += renderLoadingSpinner();
    const spinner = document.getElementById('loading-spinner');
    const { results } = await client('https://pokeapi.co/api/v2/pokemon?offset=0&limit=151')
    const pokemonDetails = await Promise.all(results.map(({ url }) => client(url)))
    pokedexcontainer.removeChild(spinner);
    const pokedex = document.getElementById("pokedex");
    pokedex.innerHTML += pokemonDetails.map((pokemon) => renderPokedexItem(pokemon)).join('');
    const savedEntry = JSON.parse(localStorage.getItem('pokemonDetails'))
    if (savedEntry) {
        renderPokemonEntry(savedEntry);
    }
}

async function handleCLick(name) {
    const pokemonEntry = await fetchPokemonInformation(name);
    renderPokemonEntry(pokemonEntry);
}

async function fetchPokemonInformation(name) {
    const homeContainer = document.getElementById("home-container");
    const modalElement = document.getElementById("modal-container");
    modalElement.remove()
    homeContainer.innerHTML += renderLoading();
    const pokemon = await client(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const abilitiesDetails = await Promise.all(pokemon.abilities.map(({ ability }) => client(ability.url)))
    const typeDetails = await Promise.all(pokemon.types.map(({ type }) => client(type.url)))
    const pokemonEntry = {...pokemon, abilitiesDetails, typeDetails }
    localStorage.setItem('pokemonDetails', JSON.stringify(pokemonEntry))
    return pokemonEntry;
}

function renderPokemonEntry(pokemonEntry) {
    const homeContainer = document.getElementById("home-container");
    const modalElement = document.getElementById("modal-container");
    modalElement.remove()
    homeContainer.innerHTML += renderPokemonDetails(pokemonEntry);
}

function renderLoading() {
    return `
        <div id="modal-container" style="background: rgb(255, 255, 255);">
            ${renderLoadingSpinner()}
        </div>
    `
}

function renderLoadingSpinner() {
    return `
          <div class="loading" id="loading-spinner">
            <img class="loading" id="loading-image" src="./assets/images/pokeball.svg" alt="Loading Pokedex"/>
          </div>
          `
}

function renderPokedexItem(pokemon) {
    return `
        <li class="come-in" id="pokedex-item" onclick="handleCLick('${pokemon.name}')"> 
            <div id="pokemon-image">
               <img
                 src="https://img.pokemondb.net/sprites/home/normal/${pokemon.name}.png"
                 alt="${pokemon.name}"
                />
                <div id="pokemon-types">
                ${pokemon.types.map(renderTypes).join('')}
                </div>
            </div>
            <div id="pokedex-detail">
                <span>#${pokemon.id}</span>
                <strong>${pokemon.name}</strong>
            </div>
        </li>
    `
}

function renderTypes(item) {
    return `
        <img
            class="type-icon"
            alt="${item.type.name}"
            src="./assets/types/${item.type.name}.svg"
        />`
}

function renderPokemonDetails(pokemonDetails) {
    const colorGradient = colorsGradient[pokemonDetails.types[0].type.name]
    const color = colors[pokemonDetails.types[0].type.name]
    return `
        <div id="modal-container" style="background: ${colorGradient}">
            <div id="modal-header"></div>
            <div id="modal-body">
               <img
                 id="pokemon-image"
                 src="https://img.pokemondb.net/sprites/home/normal/${pokemonDetails.name}.png"
                 alt="${pokemonDetails.name}"
                />
                <div id="pokemon-details">
                    <h1>${pokemonDetails.name}</h1>
                    <ul id="pokemon-types">
                        ${pokemonDetails.types.map(renderPokemonTypes).join('')}
                    </ul>
                    <div id="pokemon-tabs" class="pokemon-tab">
                        <ul id="stats">
                            ${pokemonDetails.stats.map((stat) => renderStats(stat, color, colorGradient)).join('')}
                        </ul>
                        <div class="section-title">
                            <span style="color: ${color}">Weaknesses</span>
                        </div>              
                        <ul id="weaknesses">
                            ${pokemonDetails.typeDetails[0].damage_relations.double_damage_to.map((weakness) => renderWeakness(weakness, '2X')).join('')}
                            ${pokemonDetails.typeDetails[0].damage_relations.half_damage_to.map((weakness) => renderWeakness(weakness, '1/2X')).join('')}
                            ${pokemonDetails.typeDetails[0].damage_relations.no_damage_to.map((weakness) => renderWeakness(weakness, '0X')).join('')}
                        </ul>
                        <div class="section-title">
                            <span style="color: ${color}">Abilities</span>
                        </div>
                        <ul id="abilities">
                          ${pokemonDetails.abilitiesDetails.map((ability) => renderAbility(ability, color)).join('')}
                        </ul> 
                    </div>
                </div>
                <div id="more-content">
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" size="70" color="${color}" height="70" width="70" xmlns="http://www.w3.org/2000/svg" style="color: rgb(251, 155, 81);">
                        <path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"></path>
                    </svg>
                </div>
            </div>
        </div>    
    `
}

function renderPokemonTypes(item) {
    return `
        <li>
            <img
                class="type-icon"
                alt="${item.type.name}"
                src="./assets/types/${item.type.name}.svg"
            />
        </li>
    `
}

function renderStats(stat, color, colorGradient) {
    return `
        <li>
            <div class="stat-title" style="color: ${color}">
                ${stats[stat.stat.name]}
            </div>
            <div class="stat-value">${stat.base_stat}</div>
            <div class="stat-bar">
                <div class="stat-progress" style="background: ${colorGradient}; width: ${(100 * stat.base_stat) / 250}%"></div>
            </div>
        </li>
    `
}

function renderWeakness(weakness, force) {
    return `
        <li class="weakness">
           <img
              class="type-icon"
               alt="${weakness.name}"
               src="./assets/types/${weakness.name}.svg"
            />
            <span>${force}</span>
        </li>
    `
}

function renderAbility(ability, color) {
    return `
        <li class="ability">
            <span class="subtitle" style="color: ${color}">${ability.name}</span>
            <p class="ability-description">${ability.effect_entries[0].effect}</p>
        </li>
    `
}


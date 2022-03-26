const generateButton = document.querySelector('button#generateButton')
const imageElement = document.querySelector('img#image')
const imageCaptionElement = document.querySelector('em#imageCaption')

generateButton.addEventListener('click', generatePokemon)

function returnApiUrl(pokemonId) {
  return `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
}

async function generatePokemon() {
  const randomPokemonId = (Math.floor(Math.random() * 898) + 1)
  // const randomPokemonId = 1000
  const apiUrl = returnApiUrl(randomPokemonId)

  const response = await fetch(apiUrl)
  if (!response.ok) return showError()

  const data = await response.json()

  const { name } = data
  const { front_default: sprite } = data.sprites

  updateFrontend({ id: randomPokemonId, name, sprite })
}

function showError() {
  imageElement.remove()
  imageCaptionElement.textContent = 'Ocorreu um erro ao fazer uma requisição no servidor da API.'
}

function updateFrontend(data) {
  imageElement.setAttribute('src', data.sprite)
  imageCaptionElement.textContent = `${data.name.charAt(0).toUpperCase()}${data.name.slice(1)}`
}

window.onload = generatePokemon
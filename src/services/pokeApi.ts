export const getPokeList = () => {

  return new Promise((resolve, reject) => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0`)
    .then(res => res.json())
    .then(data => resolve(data))
    .catch(err => reject(err));
  })
}

export const getPokeDetails = (pokeUrl: string) => {

  return new Promise((resolve, reject) => {
    fetch(`${pokeUrl}`)
    .then(res => res.json())
    .then(data => resolve(data))
    .catch(err => reject(err));
  })
}

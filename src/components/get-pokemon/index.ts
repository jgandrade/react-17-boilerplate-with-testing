import { PokemonTypesI } from "../../pages/Home"

 const getPokemon = async (value: string) => {
  try {
    const response:Response = await fetch(`https://pokeapi.co/api/v2/pokemon/${value}`)
      if (response.status >= 400) {
        throw new Error("Error")
      } 
      const jsonResponse = await response?.json()
      const responseSpecies:Response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${value}`)

      if (responseSpecies.status >= 400) {
        throw new Error("Error")
      } 
      const jsonResponseSpecies = await responseSpecies?.json()

      const { name, height, weight, id, types, sprites  } = jsonResponse
      const { 
        color, generation, growth_rate,
        habitat, flavor_text_entries } = jsonResponseSpecies
    return {
      name: name.toUpperCase(),
      height,
      id,
      species: {
        color: color?.name || "blue",
        generation: generation.name,
        growthRate: growth_rate.name,
        habitat: habitat?.name || "",
        textEntry: flavor_text_entries[0].flavor_text,
      },
      types: types.map((item:PokemonTypesI) => item.type.name),
      weight,
      image: sprites?.front_default,
    }
  }
  catch(err){
  }
}

export default getPokemon
import { PokemonI, PokemonInfoI, PokemonTypesI } from "../../pages/Home";

const getPokemons = async (page: number) => {
    try {
        const offset: number = page === 1 ? 0 : 50 * page;
        const response: Response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=50`
        );
        if (response?.status >= 400) {
        throw new Error("Something went wrong");
        }
        const jsonResponse = await response?.json();
        if (jsonResponse && jsonResponse.results) {
        const moreResponse = await Promise.all(
            jsonResponse.results.map(async (pokemon: PokemonI) => {
            const pokemonResponse = await fetch(pokemon.url);
            if (pokemonResponse?.status >= 400) {
                throw new Error("Error on getting pokemon");
            }
            const jsonPokemonResponse = await pokemonResponse?.json();
            if (jsonPokemonResponse) {
                const data: PokemonInfoI = {
                id: jsonPokemonResponse.id,
                name: jsonPokemonResponse.name,
                image: jsonPokemonResponse.sprites?.front_default,
                types: jsonPokemonResponse.types.map(
                    (item: PokemonTypesI) => item.type.name
                ),
                url: pokemon.url,
                };
                return data;
            }
            return {};
            })
        );
        console.log({jsonResponse, moreResponse})
        return {
            pokemonData: moreResponse,
            pokemonCount: jsonResponse.count,
            pokemonNextPage: jsonResponse.next,
        };
        }
        return {}
    } catch (err) {
        console.error(err);
    }
}
export default getPokemons
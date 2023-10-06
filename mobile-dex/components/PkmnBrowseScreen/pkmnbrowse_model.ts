import { NamedAPIResource, NamedAPIResourceList, PokemonClient } from 'pokenode-ts';

const getPokemonList = async (): Promise<NamedAPIResource[]> => {
    const api = new PokemonClient();

    // await api
    //     .getPokemonByName(name)
    //     .then((data) => {
    //         return data.name
    //     })
    //     .catch((error) => console.error(error));

    try {
        const data = await api.listPokemons(0, 200);
        // setFunction( {data} )
        return data.results
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export default getPokemonList;
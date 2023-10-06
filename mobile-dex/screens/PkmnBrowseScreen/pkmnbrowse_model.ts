import { NamedAPIResource, NamedAPIResourceList, PokemonClient } from 'pokenode-ts';

const getPokemonList = async (): Promise<NamedAPIResource[]> => {
    const api = new PokemonClient();

    try {
        const data = await api.listPokemons(0, 1000);
        return data.results
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export default getPokemonList;
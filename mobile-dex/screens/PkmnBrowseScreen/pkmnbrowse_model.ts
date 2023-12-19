import { NamedAPIResource, NamedAPIResourceList, PokemonClient } from 'pokenode-ts'


const getPokemonList = async (pageNumber: number): Promise<NamedAPIResource[]> => {
    const api = new PokemonClient()

    try {
        // const data = await api.listPokemons(0, 2000);
        // 1017
        if (pageNumber == 0) {
            const data = await api.listPokemonSpecies(0, 12);
            return data.results
        }
        const start: number = 12 * pageNumber;
        const data = await api.listPokemonSpecies(0 + (12 * pageNumber), 12);
        return data.results
    } catch (error) {
        console.error(error)
        throw error
    }
}

export default getPokemonList
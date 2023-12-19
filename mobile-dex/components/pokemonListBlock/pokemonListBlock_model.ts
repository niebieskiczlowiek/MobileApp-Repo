import { NamedAPIResource, NamedAPIResourceList, PokemonClient } from 'pokenode-ts'

export const getPokemonSprite = async (pokemonNumber: number): Promise<string | null> => {
    const api = new PokemonClient()

    try {
        const data = await api.getPokemonById(pokemonNumber);
        return data.sprites.front_default;
    } catch (error) {
        console.error(error)
        throw error
    }
}

export const getPokemonType = async (pokemonNumber: number): Promise<string> => {
    const api = new PokemonClient()

    try {
        const data = await api.getPokemonById(pokemonNumber);
        return data.types[0].type.name;
    } catch (error) {
        console.error(error)
        throw error
    }
}
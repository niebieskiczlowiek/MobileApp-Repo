import { NamedAPIResource, NamedAPIResourceList, PokemonClient } from 'pokenode-ts'

import PokemonSpecies from '../../types/pokemonspecies_type'
import Pokemon from '../../types/pokemon_type'


export const getPokemonDetails = async (speciesName: string): Promise<PokemonSpecies> => {
    const api = new PokemonClient()

    try {
        const data = await api.getPokemonSpeciesByName(speciesName)
        return data
    } catch (error) {
        console.error(error)
        throw error
    } 
}

export const getPokemonSpeciesById = async (id: number): Promise<PokemonSpecies | null> => {
    const api = new PokemonClient()

    try {
        const data = await api.getPokemonSpeciesById(id);
        if (!data) return null;
        return data
    } catch (error) {
        return null
    }
}

export const getPokemonById = async (id: number): Promise<Pokemon> => {
    const api = new PokemonClient();

    try {
        const data = await api.getPokemonById(id)
        return data
    } catch (error) {
        throw error
    }
}
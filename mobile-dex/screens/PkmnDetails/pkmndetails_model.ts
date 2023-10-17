import { NamedAPIResource, NamedAPIResourceList, PokemonClient } from 'pokenode-ts'

import PokemonSpecies from './pkmnspecies_type'


const getPokemonDetails = async (speciesName: string): Promise<PokemonSpecies> => {
    const api = new PokemonClient()

    try {
        const data = await api.getPokemonSpeciesByName(speciesName)
        return data
    } catch (error) {
        console.error(error)
        throw error
    }
}

export default getPokemonDetails
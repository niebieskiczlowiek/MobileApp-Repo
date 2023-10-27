import * as React from 'react'
import {View, Text} from 'react-native';

// type
import PokemonSpecies from './pkmnspecies_type';

// model 
import {getPokemonDetails, getPokemonById} from './pkmndetails_model'
type PkmnDetailsScreenProps = {
    route: any;
    navigation: any,
}

const PkmnDetails: React.FC<PkmnDetailsScreenProps> = ({ route }) => {
    const [displayedPokemon, setDisplayedPokemon] = React.useState<PokemonSpecies | null>(null)
    const [nextPokemon, setNextPokemon] = React.useState<string | null>(null);
    const [previousPokemon, setPreviousPokemon] = React.useState<string | null>(null);
    const { name, id } = route.params


    const displayedPokemonHandler = async (speciesName: string): Promise<void> => {
        try {
            const data = await getPokemonDetails(speciesName) // gets pokemon species info 
            // console.log("data type", data.names[6].name)
            const result = data.names[6].name
            // console.log(data.pokedex_numbers , " <<=== dex entry")
            setDisplayedPokemon(data)
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    const getNextPokemon = async (id: number): Promise<void> => {
        try {
            const data = await getPokemonById(id)
            let result
            if (!data) {
                result = null
            } else {
                result = data.names[6].name
            }

            console.log(result, "<< next pokemon")
            setNextPokemon(result)
        } catch (error) {
            throw error
        }
    }

    const getPreviousPokemon = async (id: number): Promise<void> => {
        try {
            const data = await getPokemonById(id)
            let result
            if (!data) {
                result = null
            } else {
                result = data.names[6].name
            }

            console.log(result, "<< previous pokemon")
            setPreviousPokemon(result);
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    React.useEffect(() => {
        displayedPokemonHandler(name)
        getNextPokemon(id+1)
        getPreviousPokemon(id-1)
    }, []);

    return (
        <View>
            {displayedPokemon !== null ? (
                <View>
                    <Text>{displayedPokemon.name}</Text>
                    <Text>{displayedPokemon.pokedex_numbers[0].entry_number}</Text>
                    <Text>{ displayedPokemon.generation.url.split("/").reverse()[2] + displayedPokemon.generation.url.split("/").reverse()[1] }</Text>
                    
                    {previousPokemon !== null ? (
                        <Text>previous {previousPokemon}</Text>
                    ) : (
                        <Text>previous ...</Text>
                    )}

                    {nextPokemon !== null ? (
                        <Text>next {nextPokemon}</Text>
                    ) : (
                        <Text>next ...</Text>
                    )}

                </View>
                ) : (
                <Text>Loading...</Text>
            )}
        </View>
    )
}

export default PkmnDetails;
import * as React from 'react'
import {View, Text} from 'react-native';

// type
import PokemonSpecies from './pkmnspecies_type';

// model 
import getPokemonDetails from './pkmndetails_model'

type PkmnDetailsScreenProps = {
    route: any;
    navigation: any,
}

const PkmnDetails: React.FC<PkmnDetailsScreenProps> = ({ route }) => {
    const [displayedPokemon, setDisplayedPokemon] = React.useState<PokemonSpecies | null>(null)
    const { name } = route.params

    const displayedPokemonHandler = async (speciesName: string): Promise<void> => {
        try {
            const data = await getPokemonDetails(speciesName) // gets pokemon species info 
            console.log("data type", data.names[6].name)
            const result = data.names[6].name
            setDisplayedPokemon(data)
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    React.useEffect(() => {
        displayedPokemonHandler(name)
    }, []);

    return (
        <View>
            {displayedPokemon !== null ? (
                <Text>{displayedPokemon.name}</Text>
                ) : (
                <Text>Loading...</Text>
            )}
        </View>
    )
}

export default PkmnDetails;
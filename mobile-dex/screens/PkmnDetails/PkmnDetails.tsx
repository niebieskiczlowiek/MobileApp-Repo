import * as React from 'react'
import {View, Text, ScrollView, Pressable} from 'react-native';

// styles
import styles from './pokemonDetails_styles';

// types
import PokemonSpecies from './pkmnspecies_type';
import Pokemon from './pokemon_type';

// model 
import {getPokemonDetails, getPokemonSpeciesById, getPokemonById} from './pkmndetails_model'
import { APIResource } from 'pokenode-ts';

type PkmnDetailsScreenProps = {
    route: any;
    navigation: any,
}

const PkmnDetails: React.FC<PkmnDetailsScreenProps> = ({ route }) => {
    const [displayedPokemon, setDisplayedPokemon] = React.useState<PokemonSpecies | null>(null) // current species
    const [speciesForms, setSpeciesForms] = React.useState<Object[] | null>(null) // other forms of the species
    const [currentForm, setCurrentForm] = React.useState<Pokemon | null> (null)

    const [nextPokemon, setNextPokemon] = React.useState<string | null>(null) // next species in the dex
    const [previousPokemon, setPreviousPokemon] = React.useState<string | null>(null) // previous species in the dex
    const { name, id } = route.params

    const extractPokemonNumFromUrl = (url: string): number => {
        let pokemonNum: number = parseInt(url.split("/")[6]);
        return pokemonNum
    }

    const displayedPokemonHandler = async (speciesName: string): Promise<number> => {
        try {
            const data = await getPokemonDetails(speciesName) // gets pokemon species info 
            setDisplayedPokemon(data)
            return extractPokemonNumFromUrl(data.varieties[0].pokemon.url)
            
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    const currentFormHandler = async (formId: number): Promise<void> => {
            try {
                const data = await getPokemonById(formId)
                setCurrentForm(data)
            } catch (error) {
                throw error
            }
    }

    const getNextPokemon = async (id: number): Promise<void> => {
        try {
            const data = await getPokemonSpeciesById(id)
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
            const data = await getPokemonSpeciesById(id)
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
            .then((result) => {
                currentFormHandler(result)
            })
            .catch((error) => {
                throw error
            })
        getNextPokemon(id+1)
        getPreviousPokemon(id-1)
    }, []);

    return (
        <ScrollView>
            <View style={styles.top_container}>
                <Text>XDD</Text>
            </View>

            {displayedPokemon !== null && currentForm !== null ? (
                <View style={styles.bottom_container}>
                    <Text>Other forms:</Text>
                    {displayedPokemon.varieties.map((variety) =>{
                        return (
                            <View key={ extractPokemonNumFromUrl(variety.pokemon.url) }>
                                <Pressable onPress={() => {
                                    currentFormHandler(extractPokemonNumFromUrl(variety.pokemon.url))
                                }} 
                                style={styles.form_button}>
                                    <Text>{variety.pokemon.name}</Text>
                                </Pressable>
                            </View>
                        )
                    })}
                    
                    <Text>Current Form:</Text>
                    <Text>{currentForm.name}</Text>
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
        </ScrollView>
    )
}

export default PkmnDetails;
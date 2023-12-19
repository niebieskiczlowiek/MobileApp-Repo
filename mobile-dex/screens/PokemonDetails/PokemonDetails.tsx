import * as React from 'react'
import {View, Text, ScrollView, Pressable, Modal } from 'react-native'
// styles
import styles from './pokemonDetails_styles'

// types
import PokemonSpecies from '../../types/pokemonspecies_type';
import Pokemon from '../../types/pokemon_type'

// model 
import {getPokemonDetails, getPokemonSpeciesById, getPokemonById} from './pokemondetails_model'

// components
import PokemonFormInfo from '../../components/pokemonFormInfo/PokemonFormInfo'
import PokemonFormSelect from '../../components/pokemonFormSelect/PokemonFormSelect'
import PokemonSprite from '../../components/pokemonSprite/PokemonSprite'
import PokemonNavigateButton from '../../components/pokemonNavigateButton/pokemonNavigateButton';

type PokemonDetailsScreenProps = {
    route: any,
    navigation: any,
}

type PokemonSpeciesSmall = {
    name: string
    pokemonNum: number
}

const PokemonDetails: React.FC<PokemonDetailsScreenProps> = (props) => {
    const route = props.route
    let { name, id } = route.params // name and Id of displayed species
    const navigation = props.navigation

    const [displayedPokemon, setDisplayedPokemon] = React.useState<PokemonSpecies | null>(null) // current species
    const [currentForm, setCurrentForm] = React.useState<Pokemon | null> (null)

    const [nextPokemon, setNextPokemon] = React.useState<PokemonSpeciesSmall | null>(null) // next species in the dex

    const [previousPokemon, setPreviousPokemon] = React.useState<PokemonSpeciesSmall | null>(null) // previous species in the dex
    const [formsModalVisible, setFormsModalVisible] = React.useState<boolean>(false);

    const extractPokemonNumFromUrl = (url: string): number => {
        let pokemonNum: number = parseInt(url.split("/")[6])
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
                result = {
                    name: data.name,
                    pokemonNum: data.pokedex_numbers[0].entry_number
                }
            }
            
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
                result = {
                    name: data.name,
                    pokemonNum: data.pokedex_numbers[0].entry_number
                }
            }

            setPreviousPokemon(result);
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    const loadPreviousPokemon = (pokemon: PokemonSpeciesSmall) => {
        console.log(pokemon.name, pokemon.pokemonNum)
        const name = pokemon.name
        const id = pokemon.pokemonNum
        navigation.replace('PokemonDetails', {name, id})
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
            <Modal
                visible={formsModalVisible} 
                onRequestClose={() => {
                    setFormsModalVisible(false)
                  }}>
                <View>
                    
                    <Text>Other forms:</Text>

                    {displayedPokemon !== null && currentForm !== null 
                        ? (
                            <PokemonFormSelect 
                            displayedPokemonSpecies={displayedPokemon} 
                            currentForm={currentForm} 
                            updateCurrentForm={(form: Pokemon) => {
                                setCurrentForm(form)
                            }}
                            closeFormModal={() => {
                                setFormsModalVisible(false)
                            }}
                            />
                        )
                        : (
                            <Text>Loading...</Text>
                        ) 
                    }

                    <Pressable
                        style={styles.button}
                        onPress={() => setFormsModalVisible(false)}>
                        <Text>Hide Modal</Text>
                    </Pressable>
                </View>
            </Modal>


            <View style={styles.top_container}>
                {displayedPokemon !== null && currentForm !== null
                    ? (
                        <PokemonSprite pokemonForm={currentForm} />
                    )
                    : (
                        <View>
                            <Text>Loading ... </Text>
                        </View>
                    )
                }
            </View>


            {displayedPokemon !== null && currentForm !== null ? (
                <View style={styles.bottom_container}>

                    <PokemonFormInfo pokemonForm={currentForm} />
                    
                    <Text>{displayedPokemon.pokedex_numbers[0].entry_number}</Text>
                    <Text>{ displayedPokemon.generation.url.split("/").reverse()[2] + displayedPokemon.generation.url.split("/").reverse()[1] }</Text>

                    <Pressable
                        style={styles.button}
                        onPress={() => {
                            setFormsModalVisible(true)
                        }}
                    >
                        <Text>Show forms</Text>
                    </Pressable>

                    {previousPokemon !== null ? (
                        <View>
                            <Text>previous {previousPokemon.name}</Text>
                            <PokemonNavigateButton 
                                navigateTo={previousPokemon}
                                currentName={name}
                                pressFunction={() => {
                                    loadPreviousPokemon(previousPokemon)
                                }}
                            />
                        </View>
                    ) : (
                        <Text>previous ...</Text>
                    )}

                    {nextPokemon !== null ? (
                        <View>
                            <Text>next {nextPokemon.name}</Text>
                            <PokemonNavigateButton 
                                navigateTo={nextPokemon}
                                currentName={name}

                                pressFunction={() => {
                                    loadPreviousPokemon(nextPokemon)
                                }}
                            />
                        </View>
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

export default PokemonDetails;
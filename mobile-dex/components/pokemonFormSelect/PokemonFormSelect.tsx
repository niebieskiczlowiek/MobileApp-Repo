import * as React from 'react'
import { Text, View, Pressable } from 'react-native';

// type
import Pokemon from '../../types/pokemon_type';
import PokemonSpecies from '../../types/pkmnspecies_type'

// styles
import styles from './pokemonFormSelect_styles'

// model
import { getPokemonById } from '../../screens/PkmnDetails/pkmndetails_model';

type pokemonFormSelect = {
    displayedPokemonSpecies: PokemonSpecies, // the species that the component will list forms for
    currentForm: Pokemon, // currently selected form in the parent component
    updateCurrentForm: Function // function to update the currently selected form in the parent component
    closeFormModal: Function
}

const PokemonFormSelect: React.FC<pokemonFormSelect> = (props) => {

    const extractPokemonNumFromUrl = (url: string): number => {
        let pokemonNum: number = parseInt(url.split("/")[6]);
        return pokemonNum
    }

    const currentFormHandler = async (formId: number): Promise<Pokemon> => {
        try {
            const data = await getPokemonById(formId)
            return data
        } catch (error) {
            throw error
        }
    }

    const updateSelectedForm = (form: Pokemon): void => {
        props.updateCurrentForm(form)
    }

    return (
        <View>
            {props.displayedPokemonSpecies.varieties.map((variety) => {
                return (
                    <View key={ extractPokemonNumFromUrl(variety.pokemon.url) }>
                        <Pressable onPress={() => {
                            currentFormHandler(extractPokemonNumFromUrl(variety.pokemon.url))
                                .then((result) => {
                                    updateSelectedForm(result)
                                })
                                .then(() => {
                                    props.closeFormModal()
                                })
                                .catch((error) => {
                                    throw error
                                })
                        }}
                        style={styles.form_button}
                        >
                            <Text>{variety.pokemon.name}</Text>
                        </Pressable>
                    </View>
                )
            })}
        </View>
    )
}

export default PokemonFormSelect;
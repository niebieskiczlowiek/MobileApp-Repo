import * as React from 'react'
import { Text, View, ScrollView, Pressable, GestureResponderEvent } from 'react-native'

import getPokemonList from './pkmnbrowse_model'
import { NamedAPIResource } from 'pokenode-ts'

// components
import PkmnListBlock from '../../components/pokemonListBlock/PkmnListBlock';
import { GestureDirection } from '@react-navigation/stack/lib/typescript/src/types';

type PkmnBrowseScreenPorps = {
    navigation: any,
}

const PkmnBrowse: React.FC<PkmnBrowseScreenPorps> = (props) => {
    const [pokemonList, setPokemonList] = React.useState<NamedAPIResource[]>([])

    const navigation = props.navigation

    const pokemonListHandler = async (): Promise<void> => {
        try {
            const data = await getPokemonList()
            console.log("data type", data)
            setPokemonList(data)
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    const extractPokemonNumFromUrl = (url: string): number => {
        let pokemonNum: number = parseInt(url.split("/")[6]);
        return pokemonNum
    }

    const navigateToPokemonScreen = (name: string): void => {
        navigation.navigate('PokemonDetails', { name })
    }

    React.useEffect(() => {
        pokemonListHandler()
    }, []);

    return (
        <ScrollView>
            {pokemonList.map((pokemon) => {
                return (
                    // <Pressable key={ extractPokemonNumFromUrl(pokemon.url) }
                    //     onPress={() => {
                    //         navigateToPokemonScreen(pokemon.name)
                    //     }}
                    // >
                    //     <PkmnListBlock pkmnNum={extractPokemonNumFromUrl(pokemon.url)} pkmnName={pokemon.name} />
                    // </Pressable>
                    <View key={ extractPokemonNumFromUrl(pokemon.url) }>
                        <PkmnListBlock 
                            pkmnNum={extractPokemonNumFromUrl(pokemon.url)}
                            pkmnName={pokemon.name}

                            pressFunction={() => {
                                navigateToPokemonScreen(pokemon.name)
                            }}
                        />
                    </View>
                )
            })}
        </ScrollView>
    )
}

export default PkmnBrowse;
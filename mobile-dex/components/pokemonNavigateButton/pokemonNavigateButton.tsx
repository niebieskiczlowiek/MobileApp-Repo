import * as React from 'react'
import {View, Text, Pressable} from 'react-native'

// types
import Pokemon from '../../types/pokemon_type'

// styles
import styles from './styles';

type PokemonSpeciesSmall = {
    name: string
    pokemonNum: number
}

type PokemonNavigateButtonType = {
    navigateTo: PokemonSpeciesSmall,
    currentName: string,
    pressFunction: () => void,
}

const PokemonNavigateButton: React.FC<PokemonNavigateButtonType> = (props) => {
    return (
        <Pressable 
            style={styles.button} 
            onPress={() => {
                props.pressFunction();
                console.log("PRESSED")
            }}
        >
            <Text>{props.navigateTo.name} {props.navigateTo.pokemonNum}</Text>
        </Pressable>
    )
}

export default PokemonNavigateButton
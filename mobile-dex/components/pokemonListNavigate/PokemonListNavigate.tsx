import * as React from 'react';
import { Text, View, Pressable } from 'react-native';

// styles
import styles from './styles'

type PokemonListNavigateType = {
    directionRight: boolean,
    pressFunction: () => void
}

const PokemonListNavigate: React.FC<PokemonListNavigateType> = (props) => {
    return (
        <View>
            <Pressable
            onPress={() => {
                props.pressFunction()
            }}
            style={styles.button}
            >
                {props.directionRight == true
                    ? ( <Text> → </Text> )
                    : ( <Text> ← </Text> )
                }
            </Pressable>
        </View>
    )
}

export default PokemonListNavigate;
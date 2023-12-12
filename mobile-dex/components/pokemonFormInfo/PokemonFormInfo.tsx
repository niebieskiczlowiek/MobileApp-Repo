import * as React from 'react';
import { Text, View, Pressable } from 'react-native';

// type
import Pokemon from '../../types/pokemon_type';

type pokemonFormInfoType = {
    pokemonForm: Pokemon
}

const PokemonFormInfo: React.FC<pokemonFormInfoType> = (props) => {
    // const [displayedForm, setDisplayedForm] = React.useState<Pokemon | null>(null);
    const { pokemonForm } = props

    return (
        <View>
            <Text>
                { pokemonForm.name }
            </Text>

            { pokemonForm.types.map((type) => {
                return (
                    <View key={type.slot}>
                        <Text>{type.type.name}</Text>
                    </View>
                )
            })}
        </View>
    )
}

export default PokemonFormInfo;
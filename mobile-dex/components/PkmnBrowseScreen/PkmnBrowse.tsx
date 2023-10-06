import * as React from 'react';
import { Text, View, ScrollView } from 'react-native';

import getPokemonList from './pkmnbrowse_model'
import { NamedAPIResource } from 'pokenode-ts';

const PkmnBrowse: React.FC = () => {
    const [pokemonList, setPokemonList] = React.useState<NamedAPIResource[]>([]);

    const pokemonListHandler = async () => {
        try {
            const data = await getPokemonList();
            console.log("data type", typeof data)
            setPokemonList(data)
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    React.useEffect(() => {
        pokemonListHandler();
        console.log(pokemonList)
    }, []);

    return (
        <ScrollView>
            {pokemonList.map((pokemon) => {
                return (
                    <View key={pokemon.name}>
                        <Text>{ pokemon.name }</Text>
                    </View>
                )
            })}
        </ScrollView>
    )
}

export default PkmnBrowse;
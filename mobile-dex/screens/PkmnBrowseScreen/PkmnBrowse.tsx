import * as React from 'react';
import { Text, View, ScrollView } from 'react-native';

import getPokemonList from './pkmnbrowse_model'
import { NamedAPIResource } from 'pokenode-ts';

// components
import PkmnListBlock from '../../components/pokemonListBlock/PkmnListBlock';

const PkmnBrowse: React.FC = () => {
    const [pokemonList, setPokemonList] = React.useState<NamedAPIResource[]>([]);

    const pokemonListHandler = async () => {
        try {
            const data = await getPokemonList();
            console.log("data type", data)
            setPokemonList(data)
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    const extractPokemonNum = (url: string):string => {
        const pokemonNum = url.split("/")[6];
        return pokemonNum
    }

    React.useEffect(() => {
        pokemonListHandler();
    }, []);

    return (
        <ScrollView>
            {pokemonList.map((pokemon) => {
                return (
                    <View key={ extractPokemonNum(pokemon.url) }>
                        <PkmnListBlock pkmnNum={extractPokemonNum(pokemon.url)} pkmnName={pokemon.name} />
                    </View>
                )
            })}
        </ScrollView>
    )
}

export default PkmnBrowse;
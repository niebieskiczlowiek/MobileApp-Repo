import * as React from 'react';
import { Text, View } from 'react-native';

type pkmnListBlockType = {
    pkmnNum: string,
    pkmnName: string,
}

const PkmnListBlock: React.FC<pkmnListBlockType> = (props) => {
    const [pokemonNum, setPokemonNum] = React.useState<string>();
    const [pokemonName, setPokemonName] = React.useState<string>();

    const { pkmnNum } = props;
    let { pkmnName } = props;

    const pokemonNumHandler = () => {
        setPokemonNum( pkmnNum );
    }
    const pokemonNameHandler = () => {
        pkmnName = pkmnName[0].toUpperCase() + pkmnName.slice(1);
        setPokemonName( pkmnName );
    }

    React.useEffect(() => {
        pokemonNumHandler();
        pokemonNameHandler();
    }, []);

    return (
        <View>
            <Text>#{ pokemonNum } { pokemonName }</Text>
        </View>
    )
}

export default PkmnListBlock;
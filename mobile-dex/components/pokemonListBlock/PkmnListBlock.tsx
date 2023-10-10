import * as React from 'react';
import { Text, View } from 'react-native';

type pkmnListBlockType = {
    pkmnNum: number,
    pkmnName: string,
}

const PkmnListBlock: React.FC<pkmnListBlockType> = (props) => {
    const [pokemonNum, setPokemonNum] = React.useState<number>();
    const [pokemonName, setPokemonName] = React.useState<string>();

    const { pkmnNum } = props;
    let { pkmnName } = props;

    const pokemonNumHandler = (): void => {
        setPokemonNum( pkmnNum );
    }
    const pokemonNameHandler = (): void => {
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
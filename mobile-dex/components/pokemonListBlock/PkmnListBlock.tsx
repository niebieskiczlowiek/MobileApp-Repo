import * as React from 'react';
import { Text, View, Pressable } from 'react-native';

// styles
import styles from './styles';

type pkmnListBlockType = {
    pkmnNum: number,
    pkmnName: string,
    pressFunction: () => void,
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
        <Pressable onPress = { props.pressFunction } style={styles.block} >
            <Text>#{ pokemonNum } { pokemonName }</Text>
        </Pressable>
    )
}

export default PkmnListBlock;
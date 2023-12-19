import * as React from 'react';
import { Text, View, Pressable, ImageBackground } from 'react-native';

import { getPokemonSprite, getPokemonType } from './pokemonListBlock_model';

// styles
import {styles, blockStyles} from './styles';

// type colors object
import { type_colors } from '../../assets/types_colors';

type pokemonListBlockType = {
    pkmnNum: number,
    pkmnName: string,
    pressFunction: () => void,
}

const PokemonListBlock: React.FC<pokemonListBlockType> = (props) => {
    const [pokemonNum, setPokemonNum] = React.useState<number | null>();
    const [pokemonName, setPokemonName] = React.useState<string>();
    const [pokemonSprite, setPokemonSprite] = React.useState<string | null>();
    const [backgroundColor, setBackgroundColor] = React.useState<string>();

    const { pkmnNum } = props;
    let { pkmnName } = props;

    const blockTypeColor: any = blockStyles[`block_${backgroundColor}_type`];

    const pokemonNumHandler = (): void => {
        setPokemonNum( pkmnNum );
    }
    const pokemonNameHandler = (): void => {
        pkmnName = pkmnName[0].toUpperCase() + pkmnName.slice(1);
        setPokemonName( pkmnName );
    }
    const pokemonSpriteHandler = async (pokemonNumber: number): Promise<void> => {
        try {
            const sprite = await getPokemonSprite(pokemonNumber)
            setPokemonSprite(sprite);
        } catch (error) {
            console.error(error)
            throw error
        }
    }
    const pokemonTypeColorHandler = async (pokemonNumber: number): Promise<void> => {
        try {
            const type = await getPokemonType(pokemonNumber)
            const typeColor = type_colors.find(object => object.type == type)
            setBackgroundColor(typeColor?.type)
        } catch (error) {
            throw error
        }
    }

    React.useEffect(() => {
        pokemonNameHandler();
        pokemonNumHandler();
        if (pokemonNum) {
            pokemonSpriteHandler(pokemonNum);
            pokemonTypeColorHandler(pokemonNum);
        }
    }, [pokemonNum]);

    return (
        <Pressable onPress = { props.pressFunction } style={blockTypeColor}>
            {pokemonSprite !== null
                ? (<ImageBackground 
                    source={{uri: pokemonSprite}}
                    style={styles.pokemon_sprite}
                    imageStyle={styles.sprite_offset}
                    >
                    <Text style={styles.pokemon_name}> { pokemonName } </Text>
                    <Text style={styles.pokemon_number}> #{ pokemonNum } </Text>
                    </ImageBackground>)
                : (
                    <View>
                        <Text style={styles.pokemon_name}> { pokemonName } </Text>
                        <Text style={styles.pokemon_number}> #{ pokemonNum } </Text>
                    </View>
                )
            }
        </Pressable>
    )
}

export default PokemonListBlock;
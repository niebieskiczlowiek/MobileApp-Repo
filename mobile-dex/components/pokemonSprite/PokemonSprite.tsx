import * as React from 'react'
import {View, Text, Image, Pressable} from 'react-native';

// type
import Pokemon from '../../types/pokemon_type';

// styles
import styles from './pokemonSprite_styles'

type pokemonSpriteType = {
    pokemonForm: Pokemon
}

const PokemonSprite: React.FC<pokemonSpriteType> = (props) => {
    const [pokemonSprite, setPokemonSprite] = React.useState<string | null >()
    const [pokemonSpriteFlipped, setPokemonSpriteFlipped] = React.useState<boolean>(false);

    const pokemonSpriteHandler = (pokemon: Pokemon) => {
        let pokemonSprite: string | null;
        if (pokemonSpriteFlipped) {
            pokemonSprite = pokemon.sprites.back_default
        } else {
            pokemonSprite = pokemon.sprites.front_default
        }

        setPokemonSprite(pokemonSprite)
    }

    const switchSpriteView = () => {
        setPokemonSpriteFlipped(!pokemonSpriteFlipped)
    }

    React.useEffect(() => {
        pokemonSpriteHandler(props.pokemonForm)
    })

    return (
        <View>
            {pokemonSprite !== null 
                ? (
                    <View style={styles.sprite_container}>
                        <Pressable
                            onPress={() => {
                                switchSpriteView()
                            }}
                        >
                            <Image
                                style={styles.sprite}
                                source={{uri: pokemonSprite}}
                                onError={(error) => console.error('Error loading image:', error)}
                            />
                        </Pressable>
                    </View>
                )
                : (
                    <Text>Loading...</Text>
                )
            }
        </View>
    )
}

export default PokemonSprite
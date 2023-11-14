import * as React from 'react'
import {View, Text, Image} from 'react-native';

// type
import Pokemon from '../../types/pokemon_type';

// styles
import styles from './pokemonSprite_styles'

type pokemonSpriteType = {
    pokemonForm: Pokemon
}

const PokemonSprite: React.FC<pokemonSpriteType> = (props) => {
    const [pokemonSprite, setPokemonSprite] = React.useState<string | null >();

    const pokemonSpriteHandler = (pokemon: Pokemon) => {
        const pokemonSprite = pokemon.sprites.front_default
        setPokemonSprite(pokemonSprite)
    }

    React.useEffect(() => {
        pokemonSpriteHandler(props.pokemonForm)
    })

    return (
        <View>
            {pokemonSprite !== null 
                ? (
                    <View style={styles.sprite_container}>
                        <Image
                            style={styles.sprite}
                            source={{uri: pokemonSprite}}
                            onError={(error) => console.error('Error loading image:', error)}
                        />
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
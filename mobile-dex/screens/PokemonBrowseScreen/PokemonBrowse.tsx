import * as React from 'react'
import { Text, View, ScrollView, Pressable, GestureResponderEvent, ScrollViewProps } from 'react-native'

import getPokemonList from './pokemonbrowse_model'
import { NamedAPIResource } from 'pokenode-ts'

// components
import PokemonListBlock from '../../components/pokemonListBlock/PokemonListBlock'
import PokemonListNavigate from '../../components/pokemonListNavigate/PokemonListNavigate';

// types
import PokemonSpecies from '../../types/pokemonspecies_type';

// styles
import styles from './pokemonbrowse_styles';

type PokemonBrowseScreenPorps = {
    navigation: any,
}

const PokemonBrowse: React.FC<PokemonBrowseScreenPorps> = (props) => {
    const [pokemonList, setPokemonList] = React.useState<NamedAPIResource[]>([]);
    const [currentPageNumber, setCurrentPageNumber] = React.useState<number>(0);
    
    const navigation = props.navigation

    const pokemonListHandler = async (pageNumber: number): Promise<void> => {
        try {
            const data = await getPokemonList(pageNumber)
            console.log(data)
            setPokemonList(data)
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    const extractPokemonNumFromUrl = (url: string): number => {
        let pokemonNum: number = parseInt(url.split("/")[6]);
        return pokemonNum
    }

    const navigateToPokemonScreen = (name: string, id: number): void => {
        navigation.navigate('PokemonDetails', { name, id })
    }  
    
    const navigateToNextPage = (): void => {
        setCurrentPageNumber(currentPageNumber + 1);
    }

    const navigateToPreviousPage = (): void => {
        if (currentPageNumber <= 0) {
            setCurrentPageNumber(0);
        } else {
            setCurrentPageNumber(currentPageNumber - 1);
        }
    }

    React.useEffect(() => {
        pokemonListHandler(currentPageNumber)
        console.log(currentPageNumber)
    }, [currentPageNumber]);



    // source={{uri: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/16c93e3b-ce11-48da-a4a8-ad1dca9081ec/dmh4ei-666ff8b3-1e52-4318-93a8-50fa1f33ab6c.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzE2YzkzZTNiLWNlMTEtNDhkYS1hNGE4LWFkMWRjYTkwODFlY1wvZG1oNGVpLTY2NmZmOGIzLTFlNTItNDMxOC05M2E4LTUwZmExZjMzYWI2Yy5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.Ktgv0vpDRHcZ4SHaIFm-Zqz_gyM92dOk7Z3jFxi-4a0'}}
    // resizeMode="cover"
    // style={styles.background_image}

    return (
        <ScrollView>
            <View style={styles.main_container}>
                <View style={styles.header_container}>
                    <Text style={styles.pokedex_header}>
                        Pokedex
                    </Text>
                </View>
                <View style={styles.pokemon_list_container}>
                    {pokemonList.map((pokemon) => {
                        return (
                            <View key={ extractPokemonNumFromUrl(pokemon.url) }>
                                <PokemonListBlock
                                    pkmnNum={extractPokemonNumFromUrl(pokemon.url)}
                                    pkmnName={pokemon.name}

                                    pressFunction={() => {
                                        navigateToPokemonScreen(pokemon.name, extractPokemonNumFromUrl(pokemon.url))
                                    }}
                                />
                            </View>
                        )
                    })}
                </View>
                <View style={styles.navigator_bar}>
                    <View style={styles.nav_button_container}>
                        <PokemonListNavigate 
                            directionRight={false}
                            pressFunction={navigateToPreviousPage}
                        />
                        <Text style={styles.page_number}>{currentPageNumber + 1}</Text>
                        <PokemonListNavigate 
                            directionRight={true}
                            pressFunction={navigateToNextPage}
                        />
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default PokemonBrowse;
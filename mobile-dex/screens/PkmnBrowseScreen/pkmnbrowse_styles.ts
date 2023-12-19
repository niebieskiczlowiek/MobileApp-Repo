import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    main_container: {
      marginTop: 100
    },
    header_container: {
      paddingLeft: 10,
      paddingBottom: 20,
    },
    pokedex_header: {
      fontSize: 30,
      fontWeight: 'bold',
    },
    background_image: {
      width: 100,
      height: 100,
    },
    pokemon_list_container: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItem: 'center'
    },
    navigator_bar: {
      marginTop: 20,
      height: 60,
      width: 385, 
      padding: 20,
      justifyContent: 'center',
      alignItem: 'center'
    },
    nav_button_container: {
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
    },
    page_number: {
      fontSize: 20,
      fontWeight: 'bold',
    }
  });

export default styles
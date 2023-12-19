import { StyleSheet } from 'react-native'
import { type_colors } from '../../assets/types_colors';

const baseBlockStyle = {
  backgroundColor: 'white',
  margin: 5,
  padding: 15,
  marginLeft: 5,
  marginRight: 5,
  borderRadius: 10,
  width: 170,
  height: 160,

  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 5,
  },
  shadowOpacity: 0.34,
  shadowRadius: 6.27,

  elevation: 10,
};

type BlockStyles = Record<string, React.CSSProperties>;

export const blockStyles: BlockStyles = type_colors.reduce((acc: BlockStyles, { type, color }) => {
  acc[`block_${type}_type`] = {  
    ...baseBlockStyle,
    backgroundColor: color,
  };
  return acc;
}, {});

export const styles = StyleSheet.create({
    pokemon_name: {
      fontWeight: 'bold',
      fontSize: 15,
    },
    pokemon_number: {

    },
    pokemon_sprite: {
      height: '100%',
      width: '100%',
      resizeMode: "cover",
    },
    sprite_offset: {
      marginLeft: 20,
      marginTop: 20
    },
  });
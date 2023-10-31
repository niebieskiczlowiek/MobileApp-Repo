import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    top_container: {
      backgroundColor: '#78BD95',
      height: 300,
      padding: 20,
    },
    bottom_container: {
        backgroundColor: '#2596be',
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
        marginTop: -20,
        padding: 20,
        minHeight: 438
      },
    title: {
      marginTop: 16,
      paddingVertical: 8,
      borderWidth: 4,
      borderColor: '#20232a',
      borderRadius: 6,
      backgroundColor: '#61dafb',
      color: '#20232a',
      textAlign: 'center',
      fontSize: 30,
      fontWeight: 'bold',
    },
    form_button: {
      backgroundColor: '#ffff',
      padding: 10,
      margin: 7,
      borderRadius: 10,
    }
  });

export default styles
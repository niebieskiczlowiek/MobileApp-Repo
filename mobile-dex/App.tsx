import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// components
import PkmnBrowse from './screens/PkmnBrowseScreen/PkmnBrowse';
import PkmnDetails from './screens/PkmnDetails/PkmnDetails';

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="PokemonList" component={PkmnBrowse} initialParams={{}} />
        <Stack.Screen name="PokemonDetails" component={PkmnDetails}  initialParams={{}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
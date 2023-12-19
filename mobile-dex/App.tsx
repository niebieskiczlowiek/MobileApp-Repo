import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// components
import PokemonBrowse from './screens/PokemonBrowseScreen/PokemonBrowse';
import PokemonDetails from './screens/PokemonDetails/PokemonDetails';

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="PokemonList"
          component={PokemonBrowse} 
          initialParams={{}}
          options={{
            headerShown: false,
          }} 
          />
        <Stack.Screen 
          name="PokemonDetails" 
          component={PokemonDetails}  
          initialParams={{}} 
          options={{
            animationEnabled: false,
            headerShown: false,
          }}        
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// components
import PkmnBrowse from './components/PkmnBrowseScreen/PkmnBrowse';

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Pokemon" component={PkmnBrowse}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
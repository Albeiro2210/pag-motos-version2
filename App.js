import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider } from './ThemeContext'; // Asegúrate que esté en la raíz

import PaginaPrincipal from './screens/paginaPrincipal';
import MotosDeportivas from './screens/MotosDeportivas';
import MotosUrbanas from './screens/MotosUrbanas';
import MotosTodoTerreno from './screens/MotosTodoTerreno';
import MotosAdventure from './screens/MotosAdventure';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Inicio"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Inicio" component={PaginaPrincipal} />
          <Stack.Screen name="MOTOS_DEPORTIVAS" component={MotosDeportivas} />
          <Stack.Screen name="MOTOS_URBANAS" component={MotosUrbanas} />
          <Stack.Screen name="MOTOS_TODO_TERRENO" component={MotosTodoTerreno} />
          <Stack.Screen name="MOTOS_ADVENTURE" component={MotosAdventure} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}


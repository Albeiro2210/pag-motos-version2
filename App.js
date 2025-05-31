import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider } from './ThemeContext'; 

import PaginaPrincipal from './screens/paginaPrincipal';
import MotosDeportivas from './screens/MotosDeportivas';
import MotosUrbanas from './screens/MotosUrbanas';
import MotosTodoTerreno from './screens/MotosTodoTerreno';
import MotosAdventure from './screens/MotosAdventure';
import ResumenCalificaciones from './screens/ResumenCalificaciones';
import PantallaDatosMoto from './screens/PantallaDatosMoto';

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
          <Stack.Screen name="ResumenCalificaciones" component={ResumenCalificaciones} /> 
          <Stack.Screen name="DatosMoto" component={PantallaDatosMoto} /> 
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

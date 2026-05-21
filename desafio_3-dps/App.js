import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack';

// Importación modular desde tus carpetas del proyecto
import HomeScreen from './src/screens/HomeScreen';
import DetailScreen from './src/screens/DetailScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{ 
          headerTintColor: '#fff', 
          headerTransparent: true, 
          headerTitle: '' 
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Detalles" 
          component={DetailScreen} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
import React, { useState, useEffect } from 'react';
import { Text, View, Button } from 'react-native';
import { css } from './assets/css/Css'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Home, Login, Rastreio } from './views'
import AreaRestrita from './views/AreaRestrita'

export default function App() {

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Bem Vindo',
            headerStyle: { backgroundColor: '#f58634' },
            headerTintColor: '#333',
            headerTitleStyle: { fontWeight: 'bold', alignSelf: 'center' }
          }} />
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
        <Stack.Screen name="Rastreio" component={Rastreio} options={{headerShown: false}} />
        <Stack.Screen name="AreaRestrita" component={AreaRestrita} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

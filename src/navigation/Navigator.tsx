import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import Navigation from '../base/Navigation';
import { Colors } from '../styles/Colors';
import { stacks } from './consts/stacks';
import AuthStack from './stacks/AuthStack';
import HomeStack from './stacks/HomeStack';

const Stack = createStackNavigator();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.surface.white,
  },
};

const Navigator = () => {
  return (
    <NavigationContainer ref={Navigation.navigationRef} theme={navTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={stacks.AUTH_STACK} component={AuthStack} />
        <Stack.Screen name={stacks.HOME_STACK} component={HomeStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;

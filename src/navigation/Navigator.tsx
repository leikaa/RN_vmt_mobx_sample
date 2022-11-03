import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import Navigation from '../base/Navigation';
import { Colors } from '../styles/Colors';
import { Stacks } from './consts/stacks';
import AuthStack from './stacks/AuthStack';
import InitStack from './stacks/InitStack';
import ProfileStack from './stacks/ProfileStack';
import { TabsStack } from './stacks/TabsStack';

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
        <Stack.Screen name={Stacks.INIT_STACK} component={InitStack} />
        <Stack.Screen name={Stacks.AUTH_STACK} component={AuthStack} />
        {TabsStack}
        <Stack.Screen name={Stacks.PROFILE_STACK} component={ProfileStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;

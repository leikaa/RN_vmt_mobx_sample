import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { HomeMainScreen } from '../../screens/HomeMainScreen';
import { screens } from '../consts/screens';

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={screens.HOME_MAIN}
        component={HomeMainScreen}
        options={{ headerShown: true, title: 'Home' }}
      />
    </Stack.Navigator>
  );
};

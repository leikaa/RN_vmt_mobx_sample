import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { HomeMainScreen } from '../../screens/HomeMainScreen';
import { screens } from '../consts/screens';
import { HomeStackParamList } from '../types/HomeStackTypes';

const Stack = createStackNavigator<HomeStackParamList>();

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

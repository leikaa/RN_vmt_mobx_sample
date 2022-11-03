import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { HomeMainScreen } from '../../screens/tabs/home/HomeMainScreen';
import { Screens } from '../consts/screens';
import { TabHomeStackParamList } from '../types/TabHomeStackTypes';

const Stack = createStackNavigator<TabHomeStackParamList>();

export default () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={Screens.HOME_MAIN}
        component={HomeMainScreen}
        options={{ headerShown: true, title: 'Home' }}
      />
    </Stack.Navigator>
  );
};

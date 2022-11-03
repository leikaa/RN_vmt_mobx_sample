import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { InitScreen } from '../../screens/init/InitScreen';
import { Screens } from '../consts/screens';
import { InitStackParamList } from '../types/InitStackTypes';

const Stack = createStackNavigator<InitStackParamList>();

export default () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Screens.INIT_MAIN} component={InitScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { AuthMainScreen } from '../../screens/auth/AuthMainScreen';
import { AuthRegistrationScreen } from '../../screens/auth/AuthRegistrationScreen';
import { screens } from '../consts/screens';

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={screens.AUTH_MAIN}
        component={AuthMainScreen}
        options={{ headerShown: true, title: 'Auth' }}
      />
      <Stack.Screen
        name={screens.AUTH_REGISTRATION}
        component={AuthRegistrationScreen}
        options={{ headerShown: true, title: 'Registration' }}
      />
    </Stack.Navigator>
  );
};

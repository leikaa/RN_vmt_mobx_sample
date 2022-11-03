import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { Header } from '../../components/Header';
import { Ag } from '../../components/ui/Text';
import { AuthMainScreen } from '../../screens/auth/AuthMainScreen';
import { AuthRegistrationScreen } from '../../screens/auth/AuthRegistrationScreen';
import { Screens } from '../consts/screens';
import { AuthStackParamList } from '../types/AuthStackTypes';

const Stack = createStackNavigator<AuthStackParamList>();

export default () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={Screens.AUTH_MAIN} component={AuthMainScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name={Screens.AUTH_REGISTRATION}
        component={AuthRegistrationScreen}
        options={{
          header: () => <Header showBack title={'Sign up'} titleAg={Ag.H2} />,
        }}
      />
    </Stack.Navigator>
  );
};

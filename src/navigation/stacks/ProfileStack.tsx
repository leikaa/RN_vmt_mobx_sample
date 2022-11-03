import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { Header } from '../../components/Header';
import { Ag } from '../../components/ui/Text';
import { ProfileMainScreen } from '../../screens/profile/ProfileMainScreen';
import { Screens } from '../consts/screens';
import { ProfileStackParamList } from '../types/ProfileStackTypes';

const Stack = createStackNavigator<ProfileStackParamList>();

export default () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Screens.PROFILE_MAIN}
        component={ProfileMainScreen}
        options={{
          header: () => <Header showBack title={'Profile'} titleAg={Ag.H2} />,
        }}
      />
    </Stack.Navigator>
  );
};

import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { Header } from '../../components/Header';
import { ProfileButton } from '../../components/ProfileButton';
import { Ag, Align } from '../../components/ui/Text';
import { HomeMainScreen } from '../../screens/tabs/home/HomeMainScreen';
import { Screens } from '../consts/screens';
import { TabHomeStackParamList } from '../types/TabHomeStackTypes';

const Stack = createStackNavigator<TabHomeStackParamList>();

export default () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Screens.HOME_MAIN}
        component={HomeMainScreen}
        options={{
          header: () => (
            <Header title={'Main'} titleAg={Ag.H1} titleAlign={Align.Left} rightComponent={<ProfileButton />} />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

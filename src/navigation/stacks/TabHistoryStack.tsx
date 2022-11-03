import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { Header } from '../../components/Header';
import { ProfileButton } from '../../components/ProfileButton';
import { Ag, Align } from '../../components/ui/Text';
import { HistoryMainScreen } from '../../screens/tabs/history/HistoryMainScreen';
import { Screens } from '../consts/screens';
import { TabHistoryStackParamList } from '../types/TabHistoryStackTypes';

const Stack = createStackNavigator<TabHistoryStackParamList>();

export default () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Screens.HISTORY_MAIN}
        component={HistoryMainScreen}
        options={{
          header: () => (
            <Header title={'History'} titleAg={Ag.H1} titleAlign={Align.Left} rightComponent={<ProfileButton />} />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

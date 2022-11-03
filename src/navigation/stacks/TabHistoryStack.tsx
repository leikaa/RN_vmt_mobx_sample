import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { HistoryMainScreen } from '../../screens/tabs/history/HistoryMainScreen';
import { Screens } from '../consts/screens';
import { TabHistoryStackParamList } from '../types/TabHistoryStackTypes';

const Stack = createStackNavigator<TabHistoryStackParamList>();

export default () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={Screens.HISTORY_MAIN}
        component={HistoryMainScreen}
        options={{ headerShown: true, title: 'History' }}
      />
    </Stack.Navigator>
  );
};

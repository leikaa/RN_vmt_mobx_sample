import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import Navigation from '../../base/Navigation';
import { DocumentFilledIcon } from '../../components/icons/DocumentFilledIcon';
import { DocumentIcon } from '../../components/icons/DocumentIcon';
import { WalletFilledIcon } from '../../components/icons/WalletFilledIcon';
import { WalletIcon } from '../../components/icons/WalletIcon';
import { Tabs } from '../consts/tabs';
import TabHistoryStack from '../stacks/TabHistoryStack';
import TabHomeStack from '../stacks/TabHomeStack';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName={Navigation.initialRoute} screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name={Tabs.HOME}
        component={TabHomeStack}
        options={{
          tabBarLabel: 'Main',
          tabBarIcon: ({ focused }) => (focused ? <WalletFilledIcon /> : <WalletIcon />),
        }}
      />

      <Tab.Screen
        name={Tabs.HISTORY}
        component={TabHistoryStack}
        options={{
          tabBarLabel: 'History',
          tabBarIcon: ({ focused }) => (focused ? <DocumentFilledIcon /> : <DocumentIcon />),
        }}
      />
    </Tab.Navigator>
  );
};

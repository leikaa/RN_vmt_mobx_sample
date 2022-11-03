import { useBackHandler } from '@react-native-community/hooks';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Navigation from '../../../base/Navigation';
import { Screens } from '../../../navigation/consts/screens';

export const HomeMainScreen = () => {
  useBackHandler(() => {
    return Navigation.navigationRef.current?.getCurrentRoute()?.name === Screens.HOME_MAIN;
  });

  return (
    <View style={styles.container}>
      <Text>Home main screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

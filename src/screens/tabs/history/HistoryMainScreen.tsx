import React from 'react';
import { StyleSheet, View } from 'react-native';

import { BalanceInfo } from '../../../widgets/BalanceInfo';

export const HistoryMainScreen = () => {
  return (
    <View style={styles.container}>
      <BalanceInfo />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

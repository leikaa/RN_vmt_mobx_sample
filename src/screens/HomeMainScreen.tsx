import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const HomeMainScreen = () => {
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

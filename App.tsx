import React from 'react';
import { StyleSheet } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { Host } from 'react-native-portalize';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import './src/base/adapters/KeyboardManagerAdapter';
import './src/base/adapters/TextAdapter';
import Navigator from './src/navigation/Navigator';

const App = () => {
  return (
    <SafeAreaProvider style={styles.container}>
      <Host>
        <Navigator />
      </Host>
      <FlashMessage position={'bottom'} />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;

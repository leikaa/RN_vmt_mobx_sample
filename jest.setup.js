/* eslint-disable no-undef -- jest is not defined and cannot be */

/**
 * To be able to test components, we need to mock the following dependencies including native code:
 * async-storage
 * encrypted-storage (mocked inside __mocks__ dir)
 * device-info
 * reanimated & gesture-handler (https://reactnavigation.org/docs/testing)
 */
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import mockRNDeviceInfo from 'react-native-device-info/jest/react-native-device-info-mock';
import 'react-native-gesture-handler/jestSetup';

//async-storage
jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

//device-info
jest.mock('react-native-device-info', () => mockRNDeviceInfo);

//invariant violation: new NativeEventEmitter() requires a non-null argument.
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

//reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

//silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

import { getBuildNumber, getVersion, getUniqueId } from 'react-native-device-info';

export const appConfig = {
  defaultApiUrl: __DEV__ ? 'http://193.124.114.46:3001/' : 'http://193.124.114.46:3001/',
  deviceId: getUniqueId(),
  version: `${getVersion()} (${getBuildNumber()})`,
};

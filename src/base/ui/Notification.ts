import { showMessage } from 'react-native-flash-message';

import { Colors } from '../../styles/Colors';

export default class Notification {
  static showSuccess = (successMessage: string) => {
    showMessage({
      message: successMessage,
      backgroundColor: Colors.green,
    });
  };

  static showError = (errorMessage: string) => {
    showMessage({
      message: errorMessage,
      backgroundColor: Colors.red,
    });
  };
}

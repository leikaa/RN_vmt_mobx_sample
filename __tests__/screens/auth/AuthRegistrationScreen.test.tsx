import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';

import Navigation from '../../../src/base/Navigation';
import { Screens } from '../../../src/navigation/consts/screens';
import { Tabs } from '../../../src/navigation/consts/tabs';
import { AuthRegistrationScreen } from '../../../src/screens/auth/AuthRegistrationScreen';

describe('Auth registration screen', () => {
  const renderScreen = () => render(<AuthRegistrationScreen />);

  it('should validate email', () => {
    const screen = renderScreen();
    const inputEmail = screen.getByTestId('inputEmail');

    fireEvent.changeText(inputEmail, 'test@testvmt.com');
    fireEvent(inputEmail, 'blur');

    expect(screen.queryAllByText('Invalid email').length).toEqual(0);
  });

  it('should display password and repeated password on show press', () => {
    const screen = renderScreen();
    const inputPassword = screen.getByTestId('inputPassword');
    const inputRepeatedPassword = screen.getByTestId('inputRepeatedPassword');
    const buttonShowPassword = screen.getByTestId('buttonShowPassword');

    fireEvent.press(buttonShowPassword);

    expect(inputPassword.props.secureTextEntry).toBeFalsy();
    expect(inputRepeatedPassword.props.secureTextEntry).toBeFalsy();
  });

  it('should give an error if passwords are different', () => {
    const screen = renderScreen();
    const inputPassword = screen.getByTestId('inputPassword');
    const inputRepeatedPassword = screen.getByTestId('inputRepeatedPassword');

    fireEvent.changeText(inputPassword, '123456');
    fireEvent.changeText(inputRepeatedPassword, '654321');
    fireEvent(inputRepeatedPassword, 'blur');

    expect(screen.queryAllByText('Password must be repeated exactly').length).toEqual(1);
  });

  it('should navigate to main screen on submit press with correct credentials', async () => {
    const screen = renderScreen();
    const timestamp = Date.now();
    const inputName = screen.getByTestId('inputName');
    const inputEmail = screen.getByTestId('inputEmail');
    const inputPassword = screen.getByTestId('inputPassword');
    const buttonSubmit = screen.getByTestId('buttonSubmit');

    spyOn(Navigation, 'replace');
    fireEvent.changeText(inputName, `test_vmt${timestamp}`);
    fireEvent.changeText(inputEmail, `test@testvmt${timestamp}.com`);
    fireEvent.changeText(inputPassword, `123456`);
    fireEvent.press(buttonSubmit);

    await waitFor(() => {
      expect(Navigation.replace).toHaveBeenCalledWith(Screens.MAIN_APP, { screen: Tabs.HOME });
    });
  });
});

import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';

import Navigation from '../../../src/base/Navigation';
import { Screens } from '../../../src/navigation/consts/screens';
import { Stacks } from '../../../src/navigation/consts/stacks';
import { Tabs } from '../../../src/navigation/consts/tabs';
import { AuthMainScreen } from '../../../src/screens/auth/AuthMainScreen';

describe('Auth main screen', () => {
  const renderScreen = () => render(<AuthMainScreen />);

  it('should validate email', () => {
    const screen = renderScreen();
    const inputEmail = screen.getByTestId('inputEmail');

    fireEvent.changeText(inputEmail, 'test@testvmt.com');
    fireEvent(inputEmail, 'blur');

    expect(screen.queryAllByText('Invalid email').length).toEqual(0);
  });

  it('should display password on show press', () => {
    const screen = renderScreen();
    const inputPassword = screen.getByTestId('inputPassword');
    const buttonShowPassword = screen.getByTestId('buttonShowPassword');

    fireEvent.press(buttonShowPassword);

    expect(inputPassword.props.secureTextEntry).toBeFalsy();
  });

  it('should navigate to main screen on sign in press with correct credentials', async () => {
    const screen = renderScreen();
    const inputEmail = screen.getByTestId('inputEmail');
    const inputPassword = screen.getByTestId('inputPassword');
    const buttonSubmit = screen.getByTestId('buttonSubmit');

    spyOn(Navigation, 'replace');
    fireEvent.changeText(inputEmail, 'test@test.ru');
    fireEvent.changeText(inputPassword, '123456');
    fireEvent.press(buttonSubmit);

    await waitFor(() => {
      expect(Navigation.replace).toHaveBeenCalledWith(Screens.MAIN_APP, { screen: Tabs.HOME });
    });
  });

  it('should navigate to registration on sign up press', () => {
    const screen = renderScreen();
    const registrationButton = screen.getByTestId('buttonRegistration');

    spyOn(Navigation, 'navigate');
    fireEvent.press(registrationButton);

    expect(Navigation.navigate).toHaveBeenCalledWith(Stacks.AUTH_STACK, { screen: Screens.AUTH_REGISTRATION });
  });
});

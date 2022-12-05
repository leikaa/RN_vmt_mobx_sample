import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';

import Navigation from '../../src/base/Navigation';
import { ProfileButton } from '../../src/components/ProfileButton';
import { Screens } from '../../src/navigation/consts/screens';
import { Stacks } from '../../src/navigation/consts/stacks';

describe('Profile button', () => {
  const profileButton = () => render(<ProfileButton />);

  it('should navigate to profile on button press', () => {
    const component = profileButton();
    const buttonProfile = component.getByTestId('buttonProfile');

    spyOn(Navigation, 'navigate');
    fireEvent.press(buttonProfile);

    expect(Navigation.navigate).toHaveBeenCalledWith(Stacks.PROFILE_STACK, { screen: Screens.PROFILE_MAIN });
  });
});

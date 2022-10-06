import { render } from '@testing-library/react-native';
import React from 'react';

import { AuthMainScreen } from '../../../src/screens/auth/AuthMainScreen';

describe('Auth main screen', () => {
  it('should find submit button', () => {
    const screen = render(<AuthMainScreen />);
    const submitButton = screen.getByTestId('submitButton');
  });
});

import { cleanup, fireEvent, render } from '@testing-library/react-native';
import React from 'react';

import { HomeMainScreen } from '../../../../src/screens/tabs/home/HomeMainScreen';

//we need mocked store to mock initial loader state
jest.mock('../../../../src/modules/user/UserStore', () => {
  return {
    UserStore: jest.fn().mockImplementation(() => {
      return {
        userInfoLoading: false,
        isUserInfoLoaded: true,
        user: {
          id: 1,
          name: 'Mock Name',
          email: 'mock_name@mock_mail@.com',
          balance: 123,
        },

        getUserInfo: jest.fn(),
      };
    }),
  };
});

afterEach(cleanup);

describe('Home main screen', () => {
  const renderScreen = () => render(<HomeMainScreen />);

  it('should open users list modal on select field press', () => {
    const screen = renderScreen();
    const fieldSelectRecipient = screen.getByTestId('fieldSelectRecipient');

    //modal is initially closed
    expect(() => screen.getByTestId('inputModalSearch')).toThrow(
      'Unable to find an element with testID: inputModalSearch',
    );

    fireEvent.press(fieldSelectRecipient);

    expect(screen.getByTestId('inputModalSearch')).toBeTruthy();
  });
});

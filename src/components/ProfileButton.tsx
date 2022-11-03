import React from 'react';
import { TouchableOpacity } from 'react-native';

import Navigation from '../base/Navigation';
import { Screens } from '../navigation/consts/screens';
import { Stacks } from '../navigation/consts/stacks';
import { UserIcon } from './icons/UserIcon';

export const ProfileButton = () => {
  const handleNavigateToProfile = () => {
    Navigation.navigate(Stacks.PROFILE_STACK, { screen: Screens.PROFILE_MAIN });
  };

  return (
    <TouchableOpacity onPress={handleNavigateToProfile}>
      <UserIcon size={32} />
    </TouchableOpacity>
  );
};

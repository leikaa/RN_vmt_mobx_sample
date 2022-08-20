import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { EyeCrossedIcon } from './icons/EyeCrossedIcon';
import { EyeIcon } from './icons/EyeIcon';

interface IPasswordVisibilityButtonProps extends TouchableOpacityProps {
  isVisible: boolean;
}

export const PasswordVisibilityButton = (props: IPasswordVisibilityButtonProps) => {
  return <TouchableOpacity {...props}>{props.isVisible ? <EyeCrossedIcon /> : <EyeIcon />}</TouchableOpacity>;
};

import React from 'react';
import Svg, { Path } from 'react-native-svg';

import { Colors } from '../../styles/Colors';
import { IIconProps } from './types/Icon';

export const EyeCrossedIcon = ({ size, color }: IIconProps) => {
  return (
    <Svg width={size || '24'} height={size || '24'} viewBox="0 0 24 24">
      <Path
        d="M17.882 19.297A10.948 10.948 0 0 1 12 21c-5.392 0-9.878-3.88-10.82-9a10.982 10.982 0 0 1 3.34-6.066L1.393 2.808l1.415-1.415 19.799 19.8-1.415 1.414-3.31-3.31ZM5.935 7.35A8.965 8.965 0 0 0 3.223 12a9.005 9.005 0 0 0 13.2 5.838l-2.027-2.028A4.5 4.5 0 0 1 8.19 9.604L5.935 7.35Zm6.979 6.978-3.242-3.242a2.5 2.5 0 0 0 3.24 3.24l.002.002Zm7.893 2.264-1.431-1.43a8.936 8.936 0 0 0 1.4-3.162A9.006 9.006 0 0 0 9.553 5.338L7.974 3.76A10.99 10.99 0 0 1 12 3c5.392 0 9.878 3.88 10.819 9a10.949 10.949 0 0 1-2.012 4.592Zm-9.084-9.084a4.5 4.5 0 0 1 4.769 4.769l-4.77-4.77Z"
        fill={color || Colors.disabled}
      />
    </Svg>
  );
};

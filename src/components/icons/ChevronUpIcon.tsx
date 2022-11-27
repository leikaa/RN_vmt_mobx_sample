import React from 'react';
import Svg, { Path } from 'react-native-svg';

import { Colors } from '../../styles/Colors';
import { IIconProps } from './types/Icon';

export const ChevronUpIcon = ({ size, color }: IIconProps) => {
  return (
    <Svg width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4.84467 16.1553C5.13756 16.4482 5.61244 16.4482 5.90533 16.1553L12.625 9.43566L19.3447 16.1553C19.6376 16.4482 20.1124 16.4482 20.4053 16.1553C20.6982 15.8624 20.6982 15.3876 20.4053 15.0947L13.1553 7.84467C12.8624 7.55178 12.3876 7.55178 12.0947 7.84467L4.84467 15.0947C4.55178 15.3876 4.55178 15.8624 4.84467 16.1553Z"
        fill={color || Colors.primary}
      />
    </Svg>
  );
};

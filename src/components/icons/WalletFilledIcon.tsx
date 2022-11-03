import React from 'react';
import Svg, { Path, G } from 'react-native-svg';

import { Colors } from '../../styles/Colors';
import { IIconProps } from './types/Icon';

export const WalletFilledIcon = ({ size, color }: IIconProps) => {
  return (
    <Svg width={size || '24'} height={size || '24'} viewBox="0 0 24 24">
      <Path
        fill={color || Colors.surface.primary}
        d="M12.4,13.8L12.4,13.8c0-1.7,1.3-3,3-3H20V8.6c0-0.6-0.4-1-1-1H5c-0.6,0-1,0.4-1,1v10.5c0,0.6,0.4,1,1,1H19
      c0.6,0,1-0.4,1-1v-2.3h-4.6C13.7,16.8,12.4,15.5,12.4,13.8z"
      />
      <Path
        fill={color || Colors.surface.primary}
        d="M20.2,11.8h-4.8c-1.1,0-2,0.9-2,2s0.9,2,2,2h4.8c0.4,0,0.8-0.4,0.8-0.8v-2.4C21,12.2,20.6,11.8,20.2,11.8z
      M15.4,14.6c-0.4,0-0.8-0.4-0.8-0.8S15,13,15.4,13s0.8,0.4,0.8,0.8S15.9,14.6,15.4,14.6z"
      />
      <G>
        <Path fill={color || Colors.surface.primary} d="M10.4,6.6l3-1.4l-0.8-1c-0.3-0.4-1-0.5-1.4-0.2L8.1,6.6H10.4z" />
        <Path
          fill={color || Colors.surface.primary}
          d="M17.9,6.6l-0.5-1c-0.2-0.5-0.8-0.7-1.3-0.5l-1.2,0.6l-2.1,1H17.9z"
        />
      </G>
    </Svg>
  );
};

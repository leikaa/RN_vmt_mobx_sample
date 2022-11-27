import React from 'react';
import Svg, { Path, G } from 'react-native-svg';

import { Colors } from '../../styles/Colors';
import { IIconProps } from './types/Icon';

export const WalletIcon = ({ size, color }: IIconProps) => {
  return (
    <Svg width={size || 24} height={size || 24} viewBox="0 0 24 24">
      <Path
        fill="none"
        stroke={color || Colors.disabled}
        strokeMiterlimit="10"
        d="M19.5,16.7v2.5c0,0.3-0.2,0.5-0.5,0.5H5c-0.3,0-0.5-0.2-0.5-0.5V8.7c0-0.3,0.3-0.6,0.6-0.6H19
      c0.3,0,0.5,0.2,0.5,0.5v2.5"
      />
      <G>
        <Path
          fill={color || Colors.disabled}
          d="M20,11.8v4h-4.6c-1.1,0-2-0.9-2-2s0.9-2,2-2H20 M20,10.8h-4.6c-1.7,0-3,1.3-3,3s1.3,3,3,3H20c0.6,0,1-0.4,1-1
        v-4C21,11.3,20.5,10.8,20,10.8L20,10.8z"
        />
      </G>
      <G>
        <Path
          fill={color || Colors.disabled}
          d="M15.4,13c-0.4,0-0.8,0.4-0.8,0.8s0.4,0.8,0.8,0.8s0.8-0.4,0.8-0.8S15.9,13,15.4,13L15.4,13z"
        />
      </G>
      <G>
        <Path
          fill="none"
          stroke={color || Colors.disabled}
          strokeMiterlimit="10"
          d="M14,6.6l-1.6-2.1c-0.2-0.2-0.5-0.3-0.7-0.1L7,8.1"
        />
        <Path
          fill="none"
          stroke={color || Colors.disabled}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          d="M18,8.1L17,5.8c-0.1-0.3-0.4-0.4-0.7-0.2l-5.4,2.5"
        />
      </G>
    </Svg>
  );
};

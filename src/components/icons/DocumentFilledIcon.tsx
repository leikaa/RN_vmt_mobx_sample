import React from 'react';
import Svg, { Path, G, Defs, ClipPath, Use, Line, Rect } from 'react-native-svg';

import { Colors } from '../../styles/Colors';
import { IIconProps } from './types/Icon';

export const DocumentFilledIcon = ({ size, color }: IIconProps) => {
  return (
    <Svg width={size || '24'} height={size || '24'} viewBox="0 0 24 24">
      <G>
        <Defs>
          <Rect id="SVGID_1_" width="24" height="24" />
        </Defs>
        <ClipPath id="SVGID_2_">
          <Use href="url(#SVGID_1_)" />
        </ClipPath>
        <G id="Repeat_Grid_62_1_" clipPath="url(#SVGID_2_)">
          <G transform="translate(-177 -762)">
            <G id="Group_1091_1_" transform="translate(76 -9)">
              <Path
                fill={color || Colors.surface.primary}
                stroke="#008ABD"
                d="M107,775.5h12c0.3,0,0.5,0.2,0.5,0.5v14c0,0.3-0.2,0.5-0.5,0.5h-12c-0.3,0-0.5-0.2-0.5-0.5v-14
              C106.5,775.7,106.7,775.5,107,775.5z"
              />
              <Line
                id="Line_98_1_"
                fill="none"
                stroke="#FFFFFF"
                strokeLinecap="round"
                x1="109.5"
                y1="781.5"
                x2="116.5"
                y2="781.5"
              />
              <Line
                id="Line_101_1_"
                fill="none"
                stroke="#FFFFFF"
                strokeLinecap="round"
                x1="109.5"
                y1="778.5"
                x2="112.5"
                y2="778.5"
              />
              <Line
                id="Line_99_1_"
                fill="none"
                stroke="#FFFFFF"
                strokeLinecap="round"
                x1="109.5"
                y1="784.5"
                x2="116.5"
                y2="784.5"
              />
              <Line
                id="Line_100_1_"
                fill="none"
                stroke="#FFFFFF"
                strokeLinecap="round"
                x1="109.5"
                y1="787.5"
                x2="116.5"
                y2="787.5"
              />
              <Path
                id="Rectangle_599_1_"
                fill="#FFFFFF"
                d="M115,777h1c0.6,0,1,0.4,1,1v1c0,0.6-0.4,1-1,1h-1c-0.6,0-1-0.4-1-1v-1
              C114,777.4,114.4,777,115,777z"
              />
            </G>
            <Rect id="Rectangle_600_1_" x="177" y="762" fill="none" width="24" height="24" />
          </G>
        </G>
      </G>
    </Svg>
  );
};

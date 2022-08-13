import React from 'react';
import { StyleSheet, Text as RNText, TextProps } from 'react-native';

import { Colors } from '../../styles/Colors';

export enum Ag {
  H1 = 'H1',
  H2 = 'H2',
  Regular = 'Regular',
  Button = 'Button',
  Caption = 'Caption',
}

export enum Align {
  Auto = 'auto',
  Left = 'left',
  Right = 'right',
  Center = 'center',
  Justify = 'justify',
}

interface IText extends TextProps {
  ag: Ag;
  children?: string | React.ReactNode[];
  align?: Align;
  color?: string;
  fontFamily?: string;
}

export const Text = (props: IText) => {
  return (
    <RNText
      {...props}
      style={[
        {
          fontFamily: props.fontFamily || 'Inter-Regular',
        },
        styles[props.ag],
        {
          color: props.color || Colors.text.black,
          textAlign: props.align || Align.Auto,
        },
        props.style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  [Ag.H1]: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '600',
  },
  [Ag.H2]: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '600',
  },
  [Ag.Regular]: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '400',
  },
  [Ag.Button]: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '600',
  },
  [Ag.Caption]: {
    fontSize: 11,
    lineHeight: 13,
    fontWeight: '500',
  },
});

import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { Nullable } from '../base/types/BaseTypes';
import { Colors } from '../styles/Colors';
import { Ag, Text } from './ui/Text';

interface IUserInfoItemProps {
  label?: string;
  title?: Nullable<string | number>;
  containerStyles?: StyleProp<ViewStyle>;
}

export const UserInfoItem = (props: IUserInfoItemProps) => {
  if (!props.title) {
    return null;
  }

  return (
    <View style={props.containerStyles}>
      {props.label && (
        <Text ag={Ag.Caption} color={Colors.grey2} style={styles.label}>
          {props.label}:
        </Text>
      )}
      <Text ag={Ag.Regular}>{props.title.toString()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    marginBottom: 2,
  },
});

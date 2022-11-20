import React from 'react';
import { StyleProp, StyleSheet, TextInputProps, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';

import { Colors } from '../styles/Colors';
import { ChevronDownIcon } from './icons/ChevronDownIcon';
import { Ag, Text } from './ui/Text';

interface ISelectFieldProps extends TextInputProps {
  onPress: () => void;
  label?: string;
  containerStyle?: StyleProp<ViewStyle>;
  textStyles?: StyleProp<TextStyle>;
}

export const SelectField = (props: ISelectFieldProps) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={[styles.container, styles.divider, props.containerStyle]}>
      {props.label && (
        <Text ag={Ag.Caption} color={Colors.grey2}>
          {props.label}
        </Text>
      )}

      <View style={styles.content}>
        <Text
          color={props.value ? Colors.black : Colors.grey1}
          style={[styles.text, props.textStyles]}
          ag={Ag.Regular}
          numberOfLines={1}
        >
          {props.value || props.placeholder}
        </Text>
        <View style={styles.iconContainer}>
          <ChevronDownIcon />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 48,
    position: 'relative',
    backgroundColor: Colors.white,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.disabled,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    overflow: 'hidden',
  },
  text: {
    flex: 1,
    paddingRight: 16,
    paddingLeft: 0,
    margin: 0,
    paddingVertical: 7,
    fontSize: 16,
    lineHeight: 18,
  },
  iconContainer: {
    marginRight: 3,
    justifyContent: 'center',
  },
});

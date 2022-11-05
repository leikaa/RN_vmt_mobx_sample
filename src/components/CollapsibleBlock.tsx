import React, { ReactNode, useState } from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import Collapsible from 'react-native-collapsible';

import { Colors } from '../styles/Colors';
import { ChevronDownIcon } from './icons/ChevronDownIcon';
import { ChevronUpIcon } from './icons/ChevronUpIcon';
import { Ag, Text } from './ui/Text';

interface ICollapsibleBlockProps {
  title: string;
  children: ReactNode;
  containerStyles?: StyleProp<ViewStyle>;
  initialState?: boolean;
}

export const CollapsibleBlock = ({ initialState = true, ...props }: ICollapsibleBlockProps) => {
  const [isCollapsed, setIsCollapsed] = useState(initialState);

  const toggleCollapsed = () => {
    setIsCollapsed(!isCollapsed);
  };

  const renderCollapsible = () => {
    // @ts-ignore https://github.com/oblador/react-native-collapsible/issues/450
    return <Collapsible collapsed={isCollapsed}>{props.children}</Collapsible>;
  };

  return (
    <View style={props.containerStyles}>
      <TouchableOpacity style={styles.titleContainer} onPress={toggleCollapsed}>
        <Text ag={Ag.Subtitle1} color={Colors.black} style={styles.title}>
          {props.title}
        </Text>
        <View style={styles.iconWrapper}>{isCollapsed ? <ChevronDownIcon /> : <ChevronUpIcon />}</View>
      </TouchableOpacity>

      {renderCollapsible()}
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  iconWrapper: {
    width: 24,
    height: 24,
    marginRight: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

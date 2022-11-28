import React from 'react';
import { FlatListProps, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Modalize, ModalizeProps } from 'react-native-modalize';
import { IHandles } from 'react-native-modalize/lib/options';
import { Portal } from 'react-native-portalize';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { isTrue } from '../../base/utils/baseUtil';
import { CloseTransparentCircleIcon } from '../icons/CloseTransparentCircleIcon';
import { Ag, Text } from './Text';

interface ISwipeModalProps extends ModalizeProps {
  modalRef: React.RefObject<IHandles>;
  title?: string;
  modalHeight?: number;
  flatListProps?: FlatListProps<any>;
}

export const SwipeModal = (props: ISwipeModalProps) => {
  const insets = useSafeAreaInsets();

  const handleModalClose = () => {
    props.modalRef.current?.close();
  };

  return (
    <Portal>
      <Modalize
        ref={props.modalRef}
        scrollViewProps={
          props.flatListProps
            ? undefined
            : {
                showsVerticalScrollIndicator: false,
                keyboardShouldPersistTaps: 'handled',
                contentContainerStyle: { paddingBottom: 16 + insets.bottom },
              }
        }
        closeOnOverlayTap
        withHandle={false}
        tapGestureEnabled
        disableScrollIfPossible={false}
        panGestureComponentEnabled
        adjustToContentHeight={!isTrue(props.modalHeight)}
        HeaderComponent={
          <View style={styles.containerHeader}>
            <View style={styles.hide}>
              <CloseTransparentCircleIcon />
            </View>

            <View style={styles.header}>
              <Text ag={Ag.Subtitle1} style={styles.textTitle} numberOfLines={1}>
                {props.title}
              </Text>
            </View>

            <TouchableOpacity onPress={handleModalClose} style={styles.iconContainer}>
              <CloseTransparentCircleIcon />
            </TouchableOpacity>
          </View>
        }
        children={props.flatListProps ? undefined : props.children}
        {...props}
      />
    </Portal>
  );
};

const styles = StyleSheet.create({
  containerHeader: {
    marginTop: 6,
    marginBottom: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 48,
  },
  header: {
    padding: 9,
    flexShrink: 1,
  },
  textTitle: {
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  iconContainer: {
    width: 24,
    height: 24,
  },
  hide: {
    opacity: 0,
  },
});

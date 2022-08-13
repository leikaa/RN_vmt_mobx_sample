import React, { forwardRef, Ref, useEffect, useRef, useState } from 'react';
import { ColorValue, StyleProp, StyleSheet, TextInput, TextInputProps, View, ViewStyle } from 'react-native';
import Animated, { EasingNode, interpolateNode, timing } from 'react-native-reanimated';

import { Colors } from '../../styles/Colors';
import { CloseCircleIcon } from '../icons/CloseCircleIcon';
import { Ag, Text } from './Text';

export enum InputSize {
  Large = 'large',
  Medium = 'medium',
  Small = 'small',
}

export interface IInputProps extends TextInputProps {
  label?: string;
  isValid?: boolean;
  isRequired?: boolean;
  errorMessage?: string;
  size?: InputSize;
  containerStyle?: StyleProp<ViewStyle>;
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  backgroundColor?: ColorValue;
  onChangeText?: (value: string) => void;
}

export const Input = forwardRef((props: IInputProps, inputRef: Ref<TextInput>) => {
  const { size = InputSize.Large } = props;
  const hasValue = props.value?.length;
  const isError = props.isValid === false && props.errorMessage?.trim().length;

  const [isFocused, setIsFocused] = useState<boolean>(Boolean(props.autoFocus || hasValue));
  const [isValueDefined, setIsValueDefined] = useState<boolean>(false);

  const labelAnimation = useRef(new Animated.Value(props.autoFocus || hasValue ? 1 : 0)).current;

  useEffect(() => {
    setTimeout(() => {
      timing(labelAnimation, {
        toValue: isFocused || hasValue ? 1 : 0,
        duration: 50,
        easing: EasingNode.sin,
      }).start();
    }, 0);
  }, [isFocused, hasValue]);

  const handleOnChangeText = (value: string) => {
    if (props.onChangeText) {
      props.onChangeText(value);
    }

    setIsValueDefined(true);
  };

  const handleOnFocus = () => {
    setIsFocused(true);
  };

  const handleOnBlur = () => {
    setIsFocused(false);
  };

  const renderError = (title: string) => {
    return (
      <View style={styles.errorWrap}>
        <View style={styles.errorIcon}>
          <CloseCircleIcon color={Colors.surface.red} />
        </View>
        <Text ag={Ag.Caption} color={Colors.surface.red}>
          {title}
        </Text>
      </View>
    );
  };

  const renderErrorMessage = () => {
    if (props.isRequired && props.value?.length && isValueDefined) {
      return renderError('This field is required');
    }

    if (isError && props.errorMessage) {
      return renderError(props.errorMessage);
    }

    return null;
  };

  return (
    <>
      <View
        style={[
          styles.container,
          props.containerStyle,
          isFocused && styles.focused,
          size && styles[size],
          props.multiline && styles.multiline,
          isError ? styles.containerError : {},
        ]}
      >
        {props.leftComponent ? null : (
          <View
            pointerEvents={'none'}
            style={[StyleSheet.absoluteFill, styles.label, props.multiline ? styles.multilineLabel : {}]}
          >
            <Animated.View
              style={{
                transform: [
                  {
                    translateX: interpolateNode(labelAnimation, {
                      inputRange: [0, 1],
                      outputRange: [0, 0],
                    }),
                  },
                  {
                    translateY: interpolateNode(labelAnimation, {
                      inputRange: [0, 1],
                      outputRange: [0, -12],
                    }),
                  },
                ],
              }}
            >
              <Animated.View
                style={[
                  styles.labelBackLine,
                  {
                    opacity: interpolateNode(labelAnimation, {
                      inputRange: [0, 1],
                      outputRange: [0, 1],
                    }),
                  },
                ]}
              />
              <Animated.Text
                style={{
                  fontSize: interpolateNode(labelAnimation, {
                    inputRange: [0, 1],
                    outputRange: [16, 12],
                  }),
                  ...styles.labelText,
                }}
              >
                {props.placeholder}
              </Animated.Text>
            </Animated.View>
          </View>
        )}

        <View style={styles.content} pointerEvents={props.editable === false ? 'none' : 'auto'}>
          {props.leftComponent && <View style={styles.leftComponentWrap}>{props.leftComponent}</View>}

          <TextInput
            {...props}
            ref={inputRef}
            onChangeText={handleOnChangeText}
            style={[
              styles.input,
              props.leftComponent ? styles.leftComponentText : {},
              props.multiline ? styles.multilineInput : {},
            ]}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            placeholder={props.leftComponent ? props.placeholder : ''}
            selectionColor={Colors.surface.primary}
          />

          {props.rightComponent && <View style={styles.rightComponentWrap}>{props.rightComponent}</View>}
        </View>
      </View>

      {renderErrorMessage()}
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.surface.grey2,
    height: 48,
    position: 'relative',
    backgroundColor: Colors.surface.white,
  },
  containerError: {
    borderColor: Colors.surface.red,
  },
  focused: {
    borderColor: Colors.surface.grey2,
  },
  multiline: {
    height: 180,
  },
  multilineInput: {
    textAlignVertical: 'top',
  },
  label: {
    zIndex: 1,
    position: 'absolute',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  labelText: {
    lineHeight: 18,
    color: Colors.text.grey2,
  },
  multilineLabel: {
    justifyContent: 'flex-start',
    top: 16,
  },
  labelBackLine: {
    position: 'absolute',
    top: 10,
    left: -5,
    right: -5,
    height: 2,
    backgroundColor: Colors.surface.white,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    overflow: 'hidden',
    borderRadius: 5,
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    margin: 0,
    paddingTop: 21,
    paddingBottom: 7,
    color: Colors.text.black,
    fontSize: 16,
    lineHeight: 18,
  },
  errorWrap: {
    marginTop: 4,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  errorIcon: {
    width: 13,
    height: 13,
    marginRight: 3,
  },
  leftComponentText: {
    paddingLeft: 6,
    paddingTop: 8,
  },
  leftComponentWrap: {
    width: 22,
    height: 22,
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  rightComponentWrap: {
    justifyContent: 'center',
    paddingRight: 8,
  },

  large: {
    height: 48,
  },
  medium: {
    height: 38,
  },
  small: {
    height: 32,
  },
});

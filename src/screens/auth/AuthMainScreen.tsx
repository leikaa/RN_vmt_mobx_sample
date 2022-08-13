import { observer } from 'mobx-react';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { useRootStore } from '../../base/hooks/useRootStore';
import { Input } from '../../components/ui/Input';
import { DefaultStyles } from '../../styles/DefaultStyles';

export const AuthMainScreen = observer(() => {
  const { authStore } = useRootStore();

  const handleChangeForm = (key: any, value: any) => {};

  return (
    <View style={styles.container}>
      <Input
        placeholder={'e-mail'}
        onChangeText={value => console.log('email value')}
        value={'email value'}
        autoCapitalize={'none'}
        containerStyle={DefaultStyles.mb24}
      />
      <Input
        placeholder={'password'}
        onChangeText={value => console.log('password value')}
        value={'password value'}
        secureTextEntry
        containerStyle={DefaultStyles.mb24}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

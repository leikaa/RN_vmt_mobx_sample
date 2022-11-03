import { observer } from 'mobx-react';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Navigation from '../../base/Navigation';
import { useRootStore } from '../../base/hooks/useRootStore';
import { Button } from '../../components/ui/Button';
import { Screens } from '../../navigation/consts/screens';
import { Stacks } from '../../navigation/consts/stacks';

export const ProfileMainScreen = observer(() => {
  const { authStore } = useRootStore();

  //TODO vmt - add confirmation modal
  const handleLogout = async () => {
    await authStore.logout();

    Navigation.replace(Stacks.AUTH_STACK, { screen: Screens.AUTH_MAIN });
  };

  return (
    <View style={styles.container}>
      <Text>Profile screen</Text>
      <Button title={'Logout'} onPress={handleLogout} loading={authStore.logoutLoading} />
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

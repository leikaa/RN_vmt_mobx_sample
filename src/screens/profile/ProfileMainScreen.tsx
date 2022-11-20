import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Navigation from '../../base/Navigation';
import { useRootStore } from '../../base/hooks/useRootStore';
import { AlertModal } from '../../components/AlertModal';
import { DataShower } from '../../components/DataShower';
import { UserInfoItem } from '../../components/UserInfoItem';
import { Button } from '../../components/ui/Button';
import { Screens } from '../../navigation/consts/screens';
import { Stacks } from '../../navigation/consts/stacks';

export const ProfileMainScreen = observer(() => {
  const { authStore, userStore } = useRootStore();

  const insets = useSafeAreaInsets();

  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);

  const handleLogout = async () => {
    await authStore.logout();
    userStore.setUser(null);
    handleLogoutModalVisibility();

    Navigation.replace(Stacks.AUTH_STACK, { screen: Screens.AUTH_MAIN });
  };

  const handleLogoutModalVisibility = () => {
    setIsLogoutModalVisible(!isLogoutModalVisible);
  };

  const handleUpdate = () => {
    userStore.getUserInfo();
  };

  return (
    <View style={styles.container}>
      <DataShower
        isLoading={userStore.userInfoLoading}
        isSuccess={userStore.isUserInfoLoaded}
        updateAction={handleUpdate}
      >
        <UserInfoItem label={'Name'} title={userStore.user?.name} containerStyles={styles.item} />
        <UserInfoItem label={'Email'} title={userStore.user?.email} containerStyles={styles.item} />
      </DataShower>

      <Button
        title={'Logout'}
        onPress={handleLogoutModalVisibility}
        loading={authStore.logoutLoading}
        wrapperStyle={[styles.logoutButton, { bottom: insets.bottom + 20 }]}
      />

      <AlertModal
        isVisible={isLogoutModalVisible}
        title={'Are you sure you want to log out?'}
        leftButtonTitle={'Cancel'}
        rightButtonTitle={'OK'}
        leftButtonAction={handleLogoutModalVisibility}
        rightButtonAction={handleLogout}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  item: {
    marginBottom: 16,
  },
  logoutButton: {
    position: 'absolute',
    left: 16,
    width: '100%',
  },
});

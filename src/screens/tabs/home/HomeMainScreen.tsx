import { useBackHandler } from '@react-native-community/hooks';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import Navigation from '../../../base/Navigation';
import { useRootStore } from '../../../base/hooks/useRootStore';
import { DataShower } from '../../../components/DataShower';
import { Screens } from '../../../navigation/consts/screens';
import { BalanceInfo } from '../../../widgets/BalanceInfo';

export const HomeMainScreen = observer(() => {
  const { userStore } = useRootStore();

  useEffect(() => {
    userStore.getUserInfo();
  }, []);

  useBackHandler(() => {
    return Navigation.navigationRef.current?.getCurrentRoute()?.name === Screens.HOME_MAIN;
  });

  const handleUpdate = () => {
    userStore.getUserInfo();
  };

  return (
    <DataShower
      isLoading={userStore.userInfoLoading}
      isSuccess={userStore.isUserInfoLoaded}
      updateAction={handleUpdate}
    >
      <View style={styles.container}>
        <BalanceInfo />
      </View>
    </DataShower>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

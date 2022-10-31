import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import BootSplash from 'react-native-bootsplash';

import Navigation from '../../base/Navigation';
import { useRootStore } from '../../base/hooks/useRootStore';
import { screens } from '../../navigation/consts/screens';
import { stacks } from '../../navigation/consts/stacks';

export const InitScreen = observer(() => {
  const { authStore } = useRootStore();

  useEffect(() => {
    (async () => {
      await handleNavigate();
      await BootSplash.hide();
    })();
  }, []);

  const handleNavigate = async () => {
    await authStore.checkAuth();

    if (authStore.accessToken) {
      Navigation.replace(stacks.HOME_STACK, { screen: screens.HOME_MAIN });
      return;
    }

    Navigation.replace(stacks.AUTH_STACK, { screen: screens.AUTH_MAIN });
  };

  return <></>;
});

import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import BootSplash from 'react-native-bootsplash';

import Navigation from '../../base/Navigation';
import { useRootStore } from '../../base/hooks/useRootStore';
import { Screens } from '../../navigation/consts/screens';
import { Stacks } from '../../navigation/consts/stacks';
import { Tabs } from '../../navigation/consts/tabs';

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
      Navigation.replace(Screens.MAIN_APP, { screen: Tabs.HOME });
      return;
    }

    Navigation.replace(Stacks.AUTH_STACK, { screen: Screens.AUTH_MAIN });
  };

  return <></>;
});

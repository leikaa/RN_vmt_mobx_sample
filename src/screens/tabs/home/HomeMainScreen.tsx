import { useBackHandler } from '@react-native-community/hooks';
import { observer } from 'mobx-react';
import React, { useEffect, useRef } from 'react';
import { Modalize } from 'react-native-modalize';

import Navigation from '../../../base/Navigation';
import { useRootStore } from '../../../base/hooks/useRootStore';
import { Container } from '../../../components/Container';
import { DataShower } from '../../../components/DataShower';
import { SelectField } from '../../../components/SelectField';
import { Screens } from '../../../navigation/consts/screens';
import { BalanceInfo } from '../../../widgets/BalanceInfo';
import { UsersListModal } from '../../../widgets/UsersListModal';

export const HomeMainScreen = observer(() => {
  const { userStore, transactionStore } = useRootStore();

  const modalRecipientRef = useRef<Modalize>(null);

  useEffect(() => {
    userStore.getUserInfo();
  }, []);

  useBackHandler(() => {
    return Navigation.navigationRef.current?.getCurrentRoute()?.name === Screens.HOME_MAIN;
  });

  const handleUpdate = () => {
    userStore.getUserInfo();
  };

  const handleOpenRecipientModal = () => {
    modalRecipientRef.current?.open();
  };

  return (
    <DataShower
      isLoading={userStore.userInfoLoading}
      isSuccess={userStore.isUserInfoLoaded}
      updateAction={handleUpdate}
    >
      <Container>
        <BalanceInfo />
        <SelectField
          onPress={handleOpenRecipientModal}
          value={transactionStore.transactionForm.name}
          label={'Select a payment recipient'}
          placeholder={'Name'}
        />
      </Container>

      <UsersListModal modalRef={modalRecipientRef} />
    </DataShower>
  );
});

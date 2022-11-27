import { useBackHandler } from '@react-native-community/hooks';
import { observer } from 'mobx-react';
import React, { useEffect, useMemo, useRef } from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { Modalize } from 'react-native-modalize';

import Navigation from '../../../base/Navigation';
import { useRootStore } from '../../../base/hooks/useRootStore';
import Notification from '../../../base/ui/Notification';
import { isEmpty } from '../../../base/utils/baseUtil';
import { DataShower } from '../../../components/DataShower';
import { SelectField } from '../../../components/SelectField';
import { ChevronRightIcon } from '../../../components/icons/ChevronRightIcon';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { TransactionFormFields } from '../../../modules/transaction/forms/TransactionForm';
import TransactionRenderHelper from '../../../modules/transaction/helpers/TransactionRenderHelper';
import { Screens } from '../../../navigation/consts/screens';
import { Colors } from '../../../styles/Colors';
import { BalanceInfo } from '../../../widgets/BalanceInfo';
import { UsersListModal } from '../../../widgets/UsersListModal';

export const HomeMainScreen = observer(() => {
  const { userStore, transactionStore } = useRootStore();

  const modalRecipientRef = useRef<Modalize>(null);

  const isTransferAmountValid = useMemo(
    () =>
      TransactionRenderHelper.isTransactionAmountValid(
        userStore.user?.balance!,
        +transactionStore.transactionForm.amount,
      ),
    [transactionStore.transactionForm.amount],
  );

  useBackHandler(() => {
    return Navigation.navigationRef.current?.getCurrentRoute()?.name === Screens.HOME_MAIN;
  });

  useEffect(() => {
    userStore.getUserInfo();
  }, []);

  const handleUpdate = () => {
    transactionStore.resetTransactionForm();
    userStore.getUserInfo();
  };

  const handleOpenRecipientModal = () => {
    modalRecipientRef.current?.open();
  };

  const handleChangeTransactionForm = (key: TransactionFormFields, value: string) => {
    transactionStore.changeTransactionForm(key, value);
  };

  const handleOnSubmitTransaction = async () => {
    const transaction = await transactionStore.createTransaction();

    if (transaction) {
      Notification.showSuccess('The operation was successfully completed');

      userStore.updateUserBalance(transaction?.balance);
      transactionStore.resetTransactionForm();
    }
  };

  const renderBalanceBlock = () => {
    return (
      <View style={styles.balanceContainer}>
        <View style={styles.balanceInput}>
          <Input
            value={transactionStore.transactionForm.amount}
            onChangeText={value => handleChangeTransactionForm(TransactionFormFields.amount, value)}
            placeholder={'Transfer amount'}
            keyboardType={'number-pad'}
            autoCapitalize={'none'}
            isValid={isTransferAmountValid}
            errorMessage={'Incorrect amount specified'}
          />
        </View>
        <Button
          onPress={handleOnSubmitTransaction}
          startIcon={<ChevronRightIcon color={Colors.white} />}
          containerStyle={styles.submitTransferButton}
          loading={transactionStore.transactionLoading}
          disabled={
            !isTransferAmountValid || !transactionStore.transactionForm.isValidForm(transactionStore.transactionForm)
          }
        />
      </View>
    );
  };

  return (
    <DataShower
      isLoading={userStore.userInfoLoading}
      isSuccess={userStore.isUserInfoLoaded}
      updateAction={handleUpdate}
    >
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'handled'}
        refreshControl={<RefreshControl refreshing={userStore.userInfoLoading} onRefresh={handleUpdate} />}
      >
        <BalanceInfo />
        <SelectField
          onPress={handleOpenRecipientModal}
          value={transactionStore.transactionForm.name}
          label={'Select a payment recipient'}
          placeholder={'Name'}
          containerStyle={styles.recipientContainer}
        />
        {!isEmpty(userStore.user?.balance) && renderBalanceBlock()}
      </ScrollView>

      <UsersListModal modalRef={modalRecipientRef} />
    </DataShower>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 16,
  },
  recipientContainer: {
    marginBottom: 16,
  },
  balanceContainer: {
    flexDirection: 'row',
  },
  balanceInput: {
    flexShrink: 1,
    width: '100%',
    marginRight: 16,
  },
  submitTransferButton: {
    width: 48,
    height: 48,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
});

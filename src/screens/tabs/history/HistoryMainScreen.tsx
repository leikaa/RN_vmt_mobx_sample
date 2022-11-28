import { observer } from 'mobx-react';
import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';

import { useRootStore } from '../../../base/hooks/useRootStore';
import { Nullable } from '../../../base/types/BaseTypes';
import Notification from '../../../base/ui/Notification';
import { isTrue } from '../../../base/utils/baseUtil';
import { AlertModal } from '../../../components/AlertModal';
import { Container } from '../../../components/Container';
import { DataShower } from '../../../components/DataShower';
import { ChevronDownIcon } from '../../../components/icons/ChevronDownIcon';
import { ChevronUpIcon } from '../../../components/icons/ChevronUpIcon';
import { SearchInput } from '../../../components/search/SearchInput';
import { Button, ButtonType } from '../../../components/ui/Button';
import { Ag, Text } from '../../../components/ui/Text';
import TransactionHelper from '../../../modules/transaction/helpers/TransactionHelper';
import { TransactionItem } from '../../../modules/transaction/models/TransactionItem';
import { Colors } from '../../../styles/Colors';
import { BalanceInfo } from '../../../widgets/BalanceInfo';
import { TransactionListItem } from './components/TransactionListItem';

export const HistoryMainScreen = observer(() => {
  const { transactionStore, userStore } = useRootStore();

  const [recipientName, setRecipientName] = useState('');
  const [activeRepeat, setActiveRepeat] = useState<Nullable<TransactionItem>>(null);

  const filteredData = useMemo(
    () =>
      TransactionHelper.getFilteredData(
        recipientName,
        transactionStore.transactionList,
        transactionStore.isListSortByDesc,
      ),
    [transactionStore.transactionList, recipientName, transactionStore.isListSortByDesc],
  );

  useEffect(() => {
    transactionStore.getTransactionList();

    return () => transactionStore.resetTransactionList();
  }, []);

  const handleUpdate = () => {
    transactionStore.resetTransactionList();
    transactionStore.getTransactionList();
  };

  const handleFilterByName = (text: string) => {
    setRecipientName(text);
  };

  const handleSortByDate = () => {
    transactionStore.setIsListSortByDesc(!transactionStore.isListSortByDesc);
  };

  const handleOnRepeatTransactionPress = (item: TransactionItem) => {
    setActiveRepeat(item);
  };

  const handleRepeatTransaction = () => {
    const isTransactionPrepared = transactionStore.prepareTemplateTransaction(activeRepeat);

    if (isTransactionPrepared) {
      transactionStore.createTransaction().then((transaction: Nullable<TransactionItem>) => {
        userStore.updateUserBalance(transaction?.balance);
        transactionStore.resetTransactionForm();

        Notification.showSuccess('Transaction successfully repeated');
      });
    }

    handleResetActiveRepeat();
  };

  const handleResetActiveRepeat = () => {
    setActiveRepeat(null);
  };

  const renderEmptyTransactionsList = () => {
    if (transactionStore.transactionList.length) {
      return null;
    }

    return (
      <Container containerStyle={styles.emptyStubContainer}>
        <Text ag={Ag.Regular}>You have no history</Text>
      </Container>
    );
  };

  return (
    <View style={styles.container}>
      <BalanceInfo containerStyles={styles.balanceContainer} />
      <View style={styles.filterContainer}>
        <SearchInput
          placeholder={"Correspondent's name"}
          debounceAction={handleFilterByName}
          style={styles.filterNameContainer}
        />
        <Button
          onPress={handleSortByDate}
          type={ButtonType.Outline}
          startIcon={transactionStore.isListSortByDesc ? <ChevronDownIcon /> : <ChevronUpIcon />}
          containerStyle={styles.sortDateButton}
          disabled={!filteredData.length}
        />
      </View>
      <DataShower
        isLoading={transactionStore.transactionListLoading}
        isSuccess={transactionStore.isTransactionListLoaded}
        updateAction={handleUpdate}
      >
        <FlatList
          keyExtractor={item => `transaction_${item.id}`}
          data={filteredData}
          renderItem={({ item }) => <TransactionListItem item={item} onRepeatPress={handleOnRepeatTransactionPress} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
          style={styles.contentWrapper}
          ListEmptyComponent={renderEmptyTransactionsList()}
          refreshControl={
            <RefreshControl refreshing={transactionStore.transactionListLoading} onRefresh={handleUpdate} />
          }
        />
      </DataShower>

      <AlertModal
        isVisible={isTrue(activeRepeat)}
        title={'Do you want to use this transaction as a template for a new transfer?'}
        leftButtonTitle={'Cancel'}
        rightButtonTitle={'OK'}
        leftButtonAction={handleResetActiveRepeat}
        rightButtonAction={handleRepeatTransaction}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  balanceContainer: {
    paddingHorizontal: 16,
  },
  filterContainer: {
    paddingHorizontal: 16,
    marginBottom: 12,
    flexDirection: 'row',
  },
  filterNameContainer: {
    flex: 1,
    marginRight: 16,
  },
  sortDateButton: {
    width: 48,
    height: 48,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  contentWrapper: {
    backgroundColor: Colors.grey3,
  },
  contentContainer: {
    flexGrow: 1,
    marginHorizontal: 16,
    paddingTop: 12,
  },
  emptyStubContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 8,
    marginBottom: 10,
  },
});

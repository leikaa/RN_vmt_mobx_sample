import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import { useRootStore } from '../../../base/hooks/useRootStore';
import { DataShower } from '../../../components/DataShower';
import { Colors } from '../../../styles/Colors';
import { BalanceInfo } from '../../../widgets/BalanceInfo';
import { TransactionListItem } from './components/TransactionListItem';

//todo vmt - add filter - search
//todo vmt - add refresh control
export const HistoryMainScreen = observer(() => {
  const { transactionStore } = useRootStore();

  useEffect(() => {
    transactionStore.getTransactionList();
  }, []);

  const handleUpdate = () => {};

  return (
    <DataShower
      isLoading={transactionStore.transactionListLoading}
      isSuccess={transactionStore.isTransactionListLoaded}
      updateAction={handleUpdate}
    >
      <BalanceInfo containerStyles={styles.balanceContainer} />
      <FlatList
        keyExtractor={item => `transaction_${item.id}`}
        data={transactionStore.transactionList}
        renderItem={({ item }) => <TransactionListItem item={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        style={styles.contentWrapper}
      />
    </DataShower>
  );
});

const styles = StyleSheet.create({
  balanceContainer: {
    paddingHorizontal: 16,
  },
  contentWrapper: {
    backgroundColor: Colors.grey3,
  },
  contentContainer: {
    marginHorizontal: 16,
    paddingTop: 12,
  },
});

import { observer } from 'mobx-react';
import React from 'react';
import { StyleSheet } from 'react-native';

import { useRootStore } from '../base/hooks/useRootStore';
import { CollapsibleBlock } from '../components/CollapsibleBlock';
import { UserInfoItem } from '../components/UserInfoItem';

export const BalanceInfo = observer(() => {
  const { userStore } = useRootStore();

  return (
    <CollapsibleBlock title={'Balance info'} initialState={false} containerStyles={styles.container}>
      <UserInfoItem label={'Name'} title={userStore.user?.name} containerStyles={styles.item} />
      <UserInfoItem label={'Balance'} title={userStore.user?.balance} />
    </CollapsibleBlock>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 20,
    marginBottom: 24,
  },
  item: {
    marginVertical: 16,
  },
});

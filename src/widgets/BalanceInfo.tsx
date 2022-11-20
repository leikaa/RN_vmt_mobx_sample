import { observer } from 'mobx-react';
import React from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

import { useRootStore } from '../base/hooks/useRootStore';
import { CollapsibleBlock } from '../components/CollapsibleBlock';
import { UserInfoItem } from '../components/UserInfoItem';

interface IBalanceInfoProps {
  containerStyles?: StyleProp<ViewStyle>;
}

export const BalanceInfo = observer((props: IBalanceInfoProps) => {
  const { userStore } = useRootStore();

  return (
    <CollapsibleBlock
      title={'Balance info'}
      initialState={true}
      containerStyles={[styles.container, props.containerStyles]}
    >
      <UserInfoItem label={'Name'} title={userStore.user?.name} containerStyles={styles.item} />
      <UserInfoItem label={'Balance'} title={userStore.user?.balance} />
    </CollapsibleBlock>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    marginBottom: 24,
  },
  item: {
    marginVertical: 12,
  },
});

import React from 'react';
import { StyleSheet } from 'react-native';

import { Container } from '../../../components/Container';
import { BalanceInfo } from '../../../widgets/BalanceInfo';

export const HistoryMainScreen = () => {
  return (
    <Container>
      <BalanceInfo />
    </Container>
  );
};

const styles = StyleSheet.create({});

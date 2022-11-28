import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { Nullable } from '../../../../base/types/BaseTypes';
import { isEmpty, isTrue } from '../../../../base/utils/baseUtil';
import { ArrowsCircledIcon } from '../../../../components/icons/ArrowsCircledIcon';
import { Ag, Text } from '../../../../components/ui/Text';
import DateHelper from '../../../../helpers/DateHelper';
import TransactionRenderHelper from '../../../../modules/transaction/helpers/TransactionRenderHelper';
import { TransactionItem } from '../../../../modules/transaction/models/TransactionItem';
import { Colors } from '../../../../styles/Colors';
import { DateTypes } from '../../../../types/Date';

interface ITransactionListItemProps {
  item: TransactionItem;
  onRepeatPress: (item: TransactionItem) => void;
}

export const TransactionListItem = (props: ITransactionListItemProps) => {
  const renderAmountItem = (title: string, amount: Nullable<number>, color?: string) => {
    return (
      <View style={styles.amountContainer}>
        <Text ag={Ag.Regular} color={Colors.grey1} style={styles.amountTitle}>
          {title}
        </Text>
        <Text ag={Ag.Regular} color={color || Colors.black} style={styles.amountText}>
          {amount?.toString()}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerBlock}>
        {isTrue(props.item.formattedZeroDate) && (
          <View style={styles.headerTopContainer}>
            <Text ag={Ag.Subtitle1} style={styles.headerDate}>
              {DateHelper.getFormattedDate(props.item.formattedZeroDate!, DateTypes.dayMonthSeparatedHoursMinutes)}
            </Text>
            <TouchableOpacity onPress={() => props.onRepeatPress(props.item)} style={styles.headerRepeatButton}>
              <ArrowsCircledIcon />
            </TouchableOpacity>
          </View>
        )}

        {isTrue(props.item.username) && (
          <>
            <Text ag={Ag.Caption} color={Colors.grey1} style={styles.headerCorrespondentLabel}>
              Correspondent name:
            </Text>
            <Text ag={Ag.Regular}>{props.item.username!}</Text>
          </>
        )}
      </View>

      <View style={styles.contentBlock}>
        <View style={styles.amountWrapper}>
          {!isEmpty(props.item.amount) &&
            renderAmountItem(
              'Transaction amount:',
              props.item.amount,
              TransactionRenderHelper.isCreditTransaction(props.item.amount!) ? Colors.green : Colors.red,
            )}
        </View>

        {!isEmpty(props.item.balance) && renderAmountItem('Resulting balance:', props.item.balance)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 192,
    backgroundColor: Colors.white,
    marginBottom: 10,
    borderRadius: 8,

    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },

  headerBlock: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: Colors.grey3,
  },
  headerTopContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  headerDate: {
    flexShrink: 1,
    marginRight: 10,
  },
  headerRepeatButton: {
    width: 30,
    height: 30,
    alignItems: 'flex-end',
  },
  headerCorrespondentLabel: {
    marginBottom: 4,
  },

  contentBlock: {
    padding: 16,
  },
  amountWrapper: {
    marginBottom: 14,
  },
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  amountTitle: {
    marginRight: 10,
  },
  amountText: {
    flexShrink: 1,
  },
});

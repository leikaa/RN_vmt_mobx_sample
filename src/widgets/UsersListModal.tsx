import { observer } from 'mobx-react';
import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { IHandles } from 'react-native-modalize/lib/options';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useRootStore } from '../base/hooks/useRootStore';
import { Container } from '../components/Container';
import { DataShower } from '../components/DataShower';
import { ChevronRightIcon } from '../components/icons/ChevronRightIcon';
import { SwipeModal } from '../components/ui/SwipeModal';
import { Ag, Text } from '../components/ui/Text';
import SearchRenderHelper from '../modules/search/helpers/SearchRenderHelper';
import { UsersListItem } from '../modules/search/models/UsersListItem';
import { TransactionFormFields } from '../modules/transaction/forms/TransactionForm';
import { Colors } from '../styles/Colors';
import { SearchWidget } from './SearchWidget';

interface IRecipientModalProps {
  modalRef: React.RefObject<IHandles>;
}

export const UsersListModal = observer((props: IRecipientModalProps) => {
  const { searchStore, transactionStore } = useRootStore();

  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();

  const handleOnModalClose = () => {
    searchStore.setSearchQuery('');
    searchStore.resetUsersList();
  };

  const handleSearch = async (query: string) => {
    if (!query) {
      searchStore.resetUsersList();
      return;
    }

    if (!searchStore.usersListLoading) {
      await searchStore.getUsersList(query);
    }
  };

  const handleOnItemPress = (item: UsersListItem) => {
    if (item.name) {
      transactionStore.changeTransactionForm(TransactionFormFields.name, item.name);
      props.modalRef.current?.close();
    }
  };

  const renderUsersListItem = ({ item }: { item: UsersListItem }) => {
    return (
      <TouchableOpacity style={styles.itemContainer} onPress={() => handleOnItemPress(item)}>
        {item.name && (
          <Text ag={Ag.Regular} color={Colors.black} style={styles.itemTitle}>
            {item.name}
          </Text>
        )}

        <View style={styles.itemIcon}>
          <ChevronRightIcon />
        </View>
      </TouchableOpacity>
    );
  };

  const renderNoUsersStub = () => {
    if (SearchRenderHelper.shouldDisplayEmptyStub(searchStore.searchQuery, searchStore.isSearchStarted)) {
      return null;
    }

    return (
      <Container containerStyle={styles.emptyStubContainer}>
        <Text ag={Ag.Regular}>No recipients were found</Text>
      </Container>
    );
  };

  return (
    <SwipeModal
      title={'Select a payment recipient'}
      modalRef={props.modalRef}
      onClose={handleOnModalClose}
      modalHeight={height}
      modalStyle={[styles.modalWrapper, { marginTop: insets.top + 16 }]}
      customRenderer={
        <View style={styles.contentWrapper}>
          <SearchWidget
            testID={'inputModalSearch'}
            placeholder={"Enter the recipient's name"}
            debounceAction={handleSearch}
            style={styles.searchContainer}
          />
          <DataShower isSuccess={searchStore.isUsersListLoaded} isLoading={searchStore.usersListLoading}>
            <FlatList
              data={searchStore.usersList}
              renderItem={renderUsersListItem}
              keyExtractor={(item: UsersListItem) => `user_${item.id}`}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={[styles.contentContainer, { paddingBottom: insets.bottom + 16 }]}
              keyboardShouldPersistTaps={'handled'}
              ListEmptyComponent={renderNoUsersStub()}
            />
          </DataShower>
        </View>
      }
    />
  );
});

const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  emptyStubContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  searchContainer: {
    paddingHorizontal: 16,
    marginBottom: 10,
  },

  itemContainer: {
    marginBottom: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemTitle: {
    flexShrink: 1,
  },
  itemIcon: {
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

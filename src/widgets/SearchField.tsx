import { observer } from 'mobx-react';
import React, { useRef } from 'react';
import { TextInputProps, View } from 'react-native';

import { useRootStore } from '../base/hooks/useRootStore';
import { SearchIcon } from '../components/icons/SearchIcon';
import { Input } from '../components/ui/Input';
import DebounceHelper from '../helpers/DebounceHelper';

interface ISearchFieldProps extends TextInputProps {
  debounceAction?: (text: string) => Promise<void>;
}

export const SearchField = observer((props: ISearchFieldProps) => {
  const { searchStore } = useRootStore();

  let searchTimer = useRef<ReturnType<typeof setTimeout>>();

  const handleOnTextChange = (text: string) => {
    searchStore.setIsSearchStarted(true);
    searchStore.setSearchQuery(text);

    const trimmedText = text.trim();

    if (props.debounceAction) {
      searchTimer.current = DebounceHelper.debounce(
        searchTimer?.current,
        async () => {
          await props.debounceAction!(trimmedText);
          searchStore.setIsSearchStarted(false);
        },
        500,
      );
    }
  };

  return (
    <View style={props.style}>
      <Input
        value={searchStore.searchQuery}
        onChangeText={handleOnTextChange}
        rightComponent={<SearchIcon />}
        {...props}
      />
    </View>
  );
});

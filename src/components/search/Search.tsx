import React, { Ref, forwardRef, useRef } from 'react';
import { TextInput, TextInputProps, View } from 'react-native';

import DebounceHelper from '../../helpers/DebounceHelper';
import { SearchIcon } from '../icons/SearchIcon';
import { Input } from '../ui/Input';

interface ISearchProps extends TextInputProps {
  query: string;
  setQuery: (query: string) => void;
  debounceAction?: (text: string) => void;
  isSearchStarted?: (value: boolean) => void;
}

export const Search = forwardRef((props: ISearchProps, searchRef: Ref<TextInput>) => {
  let searchTimer = useRef<ReturnType<typeof setTimeout>>();

  const handleOnTextChange = (text: string) => {
    props.isSearchStarted && props.isSearchStarted(true);
    props.setQuery(text);

    if (props.debounceAction) {
      searchTimer.current = DebounceHelper.debounce(
        searchTimer?.current,
        () => props.debounceAction!(text.trim()),
        300,
      );
    }
  };

  return (
    <View style={props.style}>
      <Input
        {...props}
        ref={searchRef}
        value={props.query}
        onChangeText={handleOnTextChange}
        rightComponent={<SearchIcon />}
      />
    </View>
  );
});

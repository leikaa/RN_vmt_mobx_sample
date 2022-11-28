import React, { useState, Ref, forwardRef } from 'react';
import { TextInput, TextInputProps } from 'react-native';

import { Search } from './Search';

interface ISearchInputProps extends TextInputProps {
  debounceAction?: (text: string) => void;
}

export const SearchInput = forwardRef((props: ISearchInputProps, searchRef: Ref<TextInput>) => {
  const [query, setQuery] = useState('');

  return <Search {...props} ref={searchRef} query={query} setQuery={setQuery} debounceAction={props.debounceAction} />;
});

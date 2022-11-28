import { observer } from 'mobx-react';
import React from 'react';
import { TextInputProps } from 'react-native';

import { useRootStore } from '../base/hooks/useRootStore';
import { Search } from '../components/search/Search';

interface ISearchWidgetProps extends TextInputProps {
  debounceAction?: (text: string) => Promise<void>;
}

export const SearchWidget = observer((props: ISearchWidgetProps) => {
  const { searchStore } = useRootStore();

  const handleDebounceAction = async (text: string) => {
    if (props.debounceAction) {
      await props.debounceAction(text);
      searchStore.setIsSearchStarted(false);
    }
  };

  return (
    <Search
      {...props}
      query={searchStore.searchQuery}
      setQuery={searchStore.setSearchQuery}
      isSearchStarted={searchStore.setIsSearchStarted}
      debounceAction={handleDebounceAction}
    />
  );
});

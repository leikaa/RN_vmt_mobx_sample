export default class SearchRenderHelper {
  static shouldDisplayEmptyStub = (searchQuery: string, isSearchStarted: boolean) => {
    return !searchQuery || (searchQuery && isSearchStarted);
  };
}

export interface IApiClient {
  setBaseUrl: (value: string) => void;
  setAccessToken: (token: string, tokenType: string) => void;
  clearAccessToken: () => void;

  get: <T extends {}>(config: any) => any;
  post: <T extends {}>(config: any) => any;
  put: <T extends {}>(config: any) => any;
  delete: <T extends {}>(config: any) => any;
}

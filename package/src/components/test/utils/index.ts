export const accounts = [
  {
    address: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
    balance: BigInt(10000000000000000000000),
    privateKey:
      '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
  },
];
export class ProviderRpcError extends Error {
  code: number;
  details: string;

  constructor(code: number, message: string) {
    super(message);
    this.code = code;
    this.details = message;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const requestObject = ({ method, params }: any) => {
  if (method === 'eth_requestAccounts') {
    return [accounts[0].address];
  }
  if (method === 'personal_sign') {
    method = 'eth_sign';
    if (Array.isArray(params)) {
      params = [params[1], params[0]];
    }
    if (method === 'wallet_watchAsset') {
      if ((params as { type: string }).type === 'ERC721') {
        throw new ProviderRpcError(-32602, 'Token type ERC721 not supported.');
      }
      return true;
    }
    if (method === 'wallet_addEthereumChain') return null;
    if (method === 'wallet_switchEthereumChain') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (params[0]?.chainId === '0xfa') {
        throw new ProviderRpcError(-4902, 'Unrecognized chain.');
      }
      return null;
    }
    if (
      method === 'wallet_getPermissions' ||
      method === 'wallet_requestPermissions'
    )
      return [
        {
          invoker: 'https://example.com',
          parentCapability: 'eth_accounts',
          caveats: [
            {
              type: 'filterResponse',
              value: ['0x0c54fccd2e384b4bb6f2e405bf5cbc15a017aafb'],
            },
          ],
        },
      ];
  }
};

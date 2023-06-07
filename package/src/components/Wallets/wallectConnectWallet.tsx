import { EthereumProvider } from '@walletconnect/ethereum-provider';
// import {} from '@walletconnect/web3-provider';
import { createWalletClient, custom } from 'viem';
import { mainnet } from 'viem/chains';
import { useAddress } from '../../hooks/useAddress';
import { useSetWalletClient } from '../KitProvider/KitProvider';

const projectId = '5a13f1a5297da2cd768519079890e4fe';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment

export const useWalletConnectWallet = () => {
  const { setAddress } = useAddress();
  const setWalletClient = useSetWalletClient();
  return {
    id: 1,
    name: 'WalletConnect',
    connect: async () => {
      const provider = await EthereumProvider.init({
        chains: [1],
        projectId,
        events: ['chainChanged', 'accountsChanged'],
        methods: ['eth_requestAccounts'],
        rpcMap: {
          1: 'https://cloudflare-eth.com',
        },
        showQrModal: true,
      });

      provider.on('display_uri', (uri: string) => {
        console.log('URI: ', uri);
      });

      await provider.connect();

      const walletClient = createWalletClient({
        chain: mainnet,
        transport: custom(provider),
      });

      setWalletClient(walletClient);

      if (!walletClient) {
        return;
      }
      const accounts = await walletClient.requestAddresses();
      console.log(accounts);
      setAddress(accounts);
    },
  };
};

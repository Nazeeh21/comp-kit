import { EthereumProvider } from '@walletconnect/ethereum-provider';
import { createWalletClient, custom } from 'viem';
import { mainnet } from 'viem/chains';
import { useAddress } from '../../hooks/useAddress';
import { useSetWalletClient } from '../KitProvider/KitProvider';

export const useWalletConnectWallet = () => {
  const { setAddress } = useAddress();
  const setWalletClient = useSetWalletClient();
  return {
    id: 1,
    name: 'WalletConnect',
    connect: async () => {
      const projectId = '5a13f1a5297da2cd768519079890e4fe';

      const provider = await EthereumProvider.init({
        chains: [1],
        projectId,
        rpcMap: {
          1: 'https://cloudflare-eth.com',
        },
        showQrModal: true,
      });
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
